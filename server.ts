import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 8080;

  // 1. 미들웨어 설정 (항상 상단)
  app.use(express.json({ limit: '50mb' }));

  // 2. Gemini API Route (정적 파일 설정보다 '위'에 있어야 함)
  app.post("/api/generate", async (req, res) => {
    const { keyword, styleSuffix, referenceImageBase64, variationIndex } = req.body;
    
    if (!keyword || !styleSuffix) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const ai = new GoogleGenAI({ apiKey });

    try {
      // 1. Translate/Refine keyword
      const translationResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a creative prompt engineer for an AI image generator... (중략)`,
      });
      
      const safeVisualDescription = translationResponse.text?.trim().replace(/["'.]/g, '') || keyword;

      // 2. Generate Image
      const viewpoints = [
        "straight-on eye-level studio portrait view", 
        "charming high-angle three-quarter view looking down", 
        "playful low-angle view looking up"
      ];
      const selectedView = viewpoints[variationIndex % viewpoints.length];

      const fullPrompt = `A high-quality 3D digital asset of a charming miniature toy version of ${safeVisualDescription}... (중략)`;

      const parts: any[] = [{ text: fullPrompt }];
      
      if (referenceImageBase64) {
        const base64Data = referenceImageBase64.split(',')[1] || referenceImageBase64;
        parts.unshift({
          inlineData: {
            data: base64Data,
            mimeType: 'image/png'
          }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      if (!response.candidates?.[0]?.content?.parts) {
        return res.status(403).json({ error: 'AI 안전 필터에 의해 생성이 제한되었습니다.' });
      }

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return res.json({ url: `data:image/png;base64,${part.inlineData.data}` });
        }
      }
      
      res.status(500).json({ error: '이미지 생성 데이터가 없습니다.' });
    } catch (error: any) {
      console.error("Gemini Server Error:", error);
      res.status(500).json({ error: error.message || "생성에 실패했습니다." });
    }
  });

  // 3. 환경별 정적 파일 서빙 (API 아래에 배치)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // 배포 환경
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    // API 주소가 아닌 모든 요청은 index.html로 (가장 마지막 순서)
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // 4. 서버 시작 (한 번만 실행)
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
