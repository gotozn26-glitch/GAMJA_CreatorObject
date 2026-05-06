
export interface ReferenceSlot {
  id: string;
  color: string;
  name: string;
  type: string;
  image?: string;
  confidence?: number;
}

export interface StoryboardLayer {
  id: string;
  name: string;
  type: 'mask' | 'base';
  visible: boolean;
  locked: boolean;
  active?: boolean;
}

export interface ProjectInfo {
  title: string;
  date: string;
  resolution: string;
  description: string;
}

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  preview: string;
  promptHint: string;
}
