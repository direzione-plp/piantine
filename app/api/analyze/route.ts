import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { IssueCategory, ScanResult } from '@/types/plant';
import { getDiagnosisById } from '@/lib/mockPlantDiagnosis';
import { generateId } from '@/lib/storage';

const PROMPT = `Sei un esperto botanico che diagnostica piante d'appartamento da fotografie.

Analizza questa immagine e identifica il problema principale della pianta (se presente).

Rispondi SOLO con un oggetto JSON valido (nessun testo aggiuntivo), in questo formato:
{
  "category": "<categoria>",
  "confidence": <numero 0-100>
}

Le categorie disponibili sono:
- "healthy" — pianta sana, nessun problema visibile
- "overwatering" — annaffiatura eccessiva (foglie gialle, terreno sempre bagnato, stelo molle)
- "underwatering" — annaffiatura insufficiente (foglie avvizzite, bordi secchi, terreno completamente asciutto)
- "leaf_burn" — scottatura da sole (macchie sbiancate, punte marroni bruciate)
- "fungal" — problema fungino (macchie, residui polverosi, scolorimento insolito)
- "nutrient" — carenza nutritiva (foglie pallide, crescita stentata, schemi di colore anomali)
- "pest" — parassiti (piccole macchie, ragnatele, residui appiccicosi, danni irregolari)
- "low_confidence" — immagine non abbastanza chiara per una diagnosi sicura

Scegli la categoria che meglio corrisponde a ciò che vedi. Se la pianta sembra sana, usa "healthy".
Se l'immagine è troppo sfocata, buia o non mostra chiaramente una pianta, usa "low_confidence".`;

function compressBase64(dataUrl: string): { base64: string; mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' } {
  const [header, base64] = dataUrl.split(',');
  const mimeMatch = header.match(/data:([^;]+)/);
  const rawMime = mimeMatch ? mimeMatch[1] : 'image/jpeg';

  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const;
  type AllowedMime = typeof allowed[number];
  const mediaType: AllowedMime = allowed.includes(rawMime as AllowedMime)
    ? (rawMime as AllowedMime)
    : 'image/jpeg';

  return { base64, mediaType };
}

export async function POST(req: NextRequest) {
  try {
    const { imageDataUrl, plantNickname } = await req.json();

    if (!imageDataUrl) {
      return NextResponse.json({ error: 'imageDataUrl is required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY non configurata' }, { status: 500 });
    }

    const client = new Anthropic({ apiKey });
    const { base64, mediaType } = compressBase64(imageDataUrl);

    const msg = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64 },
            },
            { type: 'text', text: PROMPT },
          ],
        },
      ],
    });

    const rawText = (msg.content[0] as { type: string; text: string }).text.trim();

    let category: IssueCategory = 'low_confidence';
    let confidence = 60;

    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const validCategories: IssueCategory[] = [
          'healthy', 'overwatering', 'underwatering', 'leaf_burn',
          'fungal', 'nutrient', 'pest', 'low_confidence',
        ];
        if (validCategories.includes(parsed.category)) {
          category = parsed.category;
        }
        if (typeof parsed.confidence === 'number') {
          confidence = Math.max(0, Math.min(100, parsed.confidence));
        }
      }
    } catch {
      // fall through to low_confidence defaults
    }

    const issue = { ...getDiagnosisById(category), confidence };

    const result: ScanResult = {
      id: generateId(),
      timestamp: Date.now(),
      imageDataUrl,
      issue,
      plantNickname,
    };

    return NextResponse.json({ result });
  } catch (error) {
    console.error('[analyze]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Errore sconosciuto' },
      { status: 500 }
    );
  }
}
