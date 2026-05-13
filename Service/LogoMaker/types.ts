
export type AspectRatio = '1:1' | '4:3' | '16:9';
export type ColorMode = 'manual' | 'auto';

export interface LogoVariation {
  id: string;
  imageUrl: string;
  prompt: string;
  loading: boolean;
  error?: string;
}

export interface DesignConfig {
  aspectRatio: AspectRatio;
  colors: {
    main: string; // 포인트/강조 컬러
    sub: string;  // 베이스/보조 컬러
  };
  colorMode: ColorMode;
  fontSketchImage: string; // 글자 형태 참고용 단일 스케치
  referenceImages: string[]; // 최대 4개
}
