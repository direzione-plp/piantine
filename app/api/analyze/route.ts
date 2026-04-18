import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';
import { IssueCategory, ScanResult } from '@/types/plant';
import { getDiagnosisById, getMockDiagnosis } from '@/lib/mockPlantDiagnosis';
import { generateId } from '@/lib/storage';

// One descriptive label per diagnosis category.
// CLIP scores these against the image; the highest-scoring label wins.
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

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(',');
  const mimeType = header.match(/data:([^;]+)/)?.[1] ?? 'image/jpeg';
  const bytes = Buffer.from(base64, 'base64');
  return new Blob([bytes], { type: mimeType });
}

async function classifyWithHuggingFace(
  imageBlob: Blob,
  token: string
): Promise<{ category: IssueCategory; confidence: number }> {
  const hf = new HfInference(token);

  const scores = await hf.zeroShotImageClassification({
    model: 'openai/clip-vit-large-patch14',
    inputs: imageBlob,
    parameters: {
      candidate_labels: CATEGORY_LABELS.map((c) => c.label),
    },
  });

  // scores is sorted descending by score
  const top = scores[0];
  const match = CATEGORY_LABELS.find((c) => c.label === top.label);

  return {
    category: match?.category ?? 'low_confidence',
    confidence: Math.round((top.score ?? 0) * 100),
  };
}

export async function POST(req: NextRequest) {
  // Read body once — cannot be re-read after the first await
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

  let category: IssueCategory = 'low_confidence';
  let confidence = 50;
  let usedFallback = false;

  try {
    const blob = dataUrlToBlob(imageDataUrl);
    ({ category, confidence } = await classifyWithHuggingFace(blob, token));
  } catch (hfError) {
    console.error('[analyze/hf] Hugging Face non raggiungibile, uso fallback mock:', hfError);
    const mock = getMockDiagnosis();
    category = mock.id;
    confidence = mock.confidence;
    usedFallback = true;
  }

  const issue = { ...getDiagnosisById(category), confidence };

  const result: ScanResult = {
    id: generateId(),
    timestamp: Date.now(),
    imageDataUrl,
    issue,
    plantNickname,
  };

  return NextResponse.json({
    result,
    ...(usedFallback && {
      warning: 'Hugging Face non disponibile — risultato di esempio mostrato',
    }),
  });
}
