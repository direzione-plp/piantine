import { AnalysisRequest, AnalysisResponse } from '@/types/plant';
import { getMockDiagnosis } from './mockPlantDiagnosis';
import { generateId } from './storage';

// ─── Provider interface ───────────────────────────────────────────────────────

export interface PlantAnalyzerProvider {
  analyze(request: AnalysisRequest): Promise<AnalysisResponse>;
}

// ─── Mock provider (fallback) ─────────────────────────────────────────────────

const mockProvider: PlantAnalyzerProvider = {
  async analyze(request: AnalysisRequest): Promise<AnalysisResponse> {
    await new Promise((r) => setTimeout(r, 2000 + Math.random() * 1000));
    const issue = getMockDiagnosis();
    return {
      result: {
        id: generateId(),
        timestamp: Date.now(),
        imageDataUrl: request.imageDataUrl,
        issue,
        plantNickname: request.plantNickname,
      },
    };
  },
};

// ─── API provider — calls /api/analyze (backed by Hugging Face) ──────────────

const apiProvider: PlantAnalyzerProvider = {
  async analyze(request: AnalysisRequest): Promise<AnalysisResponse> {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageDataUrl: request.imageDataUrl,
        plantNickname: request.plantNickname,
      }),
    });

    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: 'Errore di rete' }));
      throw new Error(error ?? `HTTP ${res.status}`);
    }

    return res.json();
  },
};

// ─── Public API ───────────────────────────────────────────────────────────────

let activeProvider: PlantAnalyzerProvider = apiProvider;

export function setAnalyzerProvider(provider: PlantAnalyzerProvider) {
  activeProvider = provider;
}

export function useMockProvider() {
  activeProvider = mockProvider;
}

export async function analyzePlant(request: AnalysisRequest): Promise<AnalysisResponse> {
  try {
    return await activeProvider.analyze(request);
  } catch (error) {
    return {
      result: {
        id: generateId(),
        timestamp: Date.now(),
        imageDataUrl: request.imageDataUrl,
        issue: {
          id: 'low_confidence',
          name: 'Analisi non riuscita',
          summary: 'Qualcosa è andato storto durante l\'analisi. Riprova con una foto più chiara.',
          severity: 'low',
          confidence: 0,
          causes: [],
          watchFor: [],
          careInstructions: [],
        },
      },
      error: error instanceof Error ? error.message : 'Errore sconosciuto',
    };
  }
}
