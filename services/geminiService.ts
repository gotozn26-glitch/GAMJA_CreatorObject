
export class GeminiService {
  async generateStylizedObject(
    keyword: string, 
    styleSuffix: string, 
    referenceImageBase64?: string,
    variationIndex: number = 0
  ): Promise<string> {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword,
          styleSuffix,
          referenceImageBase64,
          variationIndex
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '생성에 실패했습니다.');
      }

      return data.url;
    } catch (error: any) {
      console.error("Gemini Service Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
