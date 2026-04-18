import { NextRequest, NextResponse } from 'next/server';
import { IssueCategory, ScanResult } from '@/types/plant';
import { getDiagnosisById, getMockDiagnosis } from '@/lib/mockPlantDiagnosis';
import { generateId } from '@/lib/storage';

// ─── Disease / health labels ──────────────────────────────────────────────────

const CATEGORY_LABELS: { label: string; category: IssueCategory }[] = [
  {
    label: 'healthy green houseplant with vibrant leaves and no signs of disease or damage',
    category: 'healthy',
  },
  {
    label: 'houseplant with yellow wilting leaves and soggy soil caused by too much water',
    category: 'overwatering',
  },
  {
    label: 'drooping houseplant with dry brown crispy leaf edges from lack of water',
    category: 'underwatering',
  },
  {
    label: 'houseplant with bleached white patches or brown burnt leaf tips from too much direct sunlight',
    category: 'leaf_burn',
  },
  {
    label: 'houseplant with powdery mildew fungal spots or dark mold patches on leaves',
    category: 'fungal',
  },
  {
    label: 'houseplant with pale discolored leaves and stunted slow growth from nutrient deficiency',
    category: 'nutrient',
  },
  {
    label: 'houseplant leaves with insect pest damage tiny webbing sticky honeydew or small crawling bugs',
    category: 'pest',
  },
  {
    label: 'blurry dark or out of focus photo where plant details are not clearly visible',
    category: 'low_confidence',
  },
];

// ─── Raw HF helpers ───────────────────────────────────────────────────────────
// Uses api-inference.huggingface.co directly — bypasses the SDK's provider
// routing system which requires third-party provider credits.

const HF_BASE = 'https://api-inference.huggingface.co/models';

async function hfPost(
  model: string,
  token: string,
  body: BodyInit,
  contentType: string
): Promise<unknown> {
  const res = await fetch(`${HF_BASE}/${model}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': contentType,
      // Wait up to ~20 s for cold-start instead of getting a 503 immediately
      'X-Wait-For-Model': 'true',
    },
    body,
  });

  const ct = res.headers.get('content-type') ?? '';
  if (!ct.includes('application/json')) {
    throw new Error(`HF returned non-JSON (${res.status}): ${ct}`);
  }
  const data = await res.json();
  if (!res.ok) {
    throw new Error((data as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  return data;
}

// ─── Disease classification via zero-shot CLIP ────────────────────────────────

async function classifyDisease(
  base64: string,
  token: string
): Promise<{ category: IssueCategory; confidence: number }> {
  const scores = (await hfPost(
    'openai/clip-vit-large-patch14',
    token,
    JSON.stringify({
      inputs: { image: base64 },
      parameters: { candidate_labels: CATEGORY_LABELS.map((c) => c.label) },
    }),
    'application/json'
  )) as Array<{ label: string; score: number }>;

  const top = scores[0];
  const match = CATEGORY_LABELS.find((c) => c.label === top.label);
  return {
    category: match?.category ?? 'low_confidence',
    confidence: Math.round((top.score ?? 0) * 100),
  };
}

// ─── Plant type identification ────────────────────────────────────────────────
// umutbozdag/plant-identification classifies ~31 common houseplant species.
// Input: raw image bytes (application/octet-stream).

async function identifyPlantType(
  imageBuffer: BodyInit,
  token: string
): Promise<string | null> {
  const results = (await hfPost(
    'umutbozdag/plant-identification',
    token,
    imageBuffer,
    'application/octet-stream'
  )) as Array<{ label: string; score: number }>;

  if (!Array.isArray(results) || results.length === 0) return null;

  const top = results[0];
  // Only report if reasonably confident
  if ((top.score ?? 0) < 0.25) return null;

  // Labels look like "Monstera Deliciosa" or "Snake Plant (Sansevieria trifasciata)"
  // Keep the common name before the parenthesis
  return top.label.replace(/\s*\(.*\)$/, '').trim();
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let imageDataUrl = '';
  let plantNickname: string | undefined;

  try {
    const body = await req.json();
    imageDataUrl = body.imageDataUrl ?? '';
    plantNickname = body.plantNickname;
  } catch {
    return NextResponse.json({ error: 'Request body non valido' }, { status: 400 });
  }

  if (!imageDataUrl) {
    return NextResponse.json({ error: 'imageDataUrl è obbligatorio' }, { status: 400 });
  }

  const token = process.env.HF_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'HF_TOKEN non configurato sul server' }, { status: 500 });
  }

  // Strip the data-URL prefix to get the raw base64 string + buffer
  const base64 = imageDataUrl.split(',')[1] ?? '';
  const imageBuffer = Buffer.from(base64, 'base64') as unknown as BodyInit;

  // Run both calls in parallel; each can fail independently
  const [diseaseResult, plantTypeResult] = await Promise.allSettled([
    classifyDisease(base64, token),
    identifyPlantType(imageBuffer, token),
  ]);

  let category: IssueCategory = 'low_confidence';
  let confidence = 50;
  let usedFallback = false;

  if (diseaseResult.status === 'fulfilled') {
    category = diseaseResult.value.category;
    confidence = diseaseResult.value.confidence;
  } else {
    console.error('[analyze/disease]', diseaseResult.reason);
    const mock = getMockDiagnosis();
    category = mock.id;
    confidence = mock.confidence;
    usedFallback = true;
  }

  const plantType =
    plantTypeResult.status === 'fulfilled' ? plantTypeResult.value ?? undefined : undefined;

  if (plantTypeResult.status === 'rejected') {
    console.error('[analyze/plantType]', plantTypeResult.reason);
  }

  const issue = { ...getDiagnosisById(category), confidence };

  const result: ScanResult = {
    id: generateId(),
    timestamp: Date.now(),
    imageDataUrl,
    issue,
    plantNickname,
    plantType,
  };

  return NextResponse.json({
    result,
    ...(usedFallback && {
      warning: 'Hugging Face non disponibile — risultato di esempio mostrato',
    }),
  });
}
