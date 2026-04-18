export type IssueSeverity = 'healthy' | 'low' | 'medium' | 'high' | 'urgent';

export type IssueCategory =
  | 'healthy'
  | 'overwatering'
  | 'underwatering'
  | 'leaf_burn'
  | 'fungal'
  | 'nutrient'
  | 'pest'
  | 'low_confidence';

export interface CareInstruction {
  category: 'watering' | 'light' | 'humidity' | 'soil' | 'pruning' | 'urgency';
  title: string;
  description: string;
  icon: string;
}

export interface PlantIssue {
  id: IssueCategory;
  name: string;
  summary: string;
  severity: IssueSeverity;
  confidence: number; // 0–100
  causes: string[];
  watchFor: string[]; // what to monitor over 7 days
  careInstructions: CareInstruction[];
}

export interface ScanResult {
  id: string;
  timestamp: number;
  imageDataUrl: string;
  issue: PlantIssue;
  plantNickname?: string;
  plantType?: string; // identified species, e.g. "Monstera Deliciosa"
}

export interface SavedScan extends ScanResult {
  plantNickname: string;
}

export interface UserPlantProfile {
  id: string;
  nickname: string;
  species?: string;
  scans: string[]; // ScanResult ids
  createdAt: number;
}

export interface AnalysisRequest {
  imageDataUrl: string;
  plantNickname?: string;
}

export interface AnalysisResponse {
  result: ScanResult;
  error?: string;
}
