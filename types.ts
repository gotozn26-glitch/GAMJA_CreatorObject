
export interface StyleConfig {
  id: string;
  name: string;
  image: string;
  promptSuffix: string;
  isActive: boolean;
}

export interface GeneratedVariation {
  id: string;
  url: string;
  timestamp: number;
  keyword: string;
  styleId: string;
}

export type GenerationStatus = 'idle' | 'generating' | 'completed' | 'error';
