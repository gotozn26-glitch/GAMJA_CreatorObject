
export interface GeneratedImage {
  url: string;
  title: string;
  view: string;
}

export interface Rotation {
  x: number;
  y: number;
  z: number;
}

export interface AppState {
  sourceImage: string | null;
  results: GeneratedImage[];
  isProcessing: boolean;
  rotation: Rotation;
}