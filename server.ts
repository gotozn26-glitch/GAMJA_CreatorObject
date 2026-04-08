import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // Gemini API Proxy Route
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
        contents: `You are a creative prompt engineer for an AI image generator.
        Translate the Korean word "${keyword}" into a cute, toy-like English visual description.
        
        Strict Rules:
        1. If the word is "주사위" or relates to "Dice", translate it as "a cute decorative toy cube with soft rounded edges". NEVER use the word 'dice' or 'gambling'.
        2. Describe the object as a simplified, chunky, and adorable miniature toy version.
        3. Focus on "kawaii" proportions: oversized features, soft rounded silhouettes, and a charming toy-like structure.
        4. Do NOT include color words in the translation unless essential.
        5. Output ONLY the English description.`,
      });
      
      const safeVisualDescription = translationResponse.text?.trim().replace(/["'.]/g, '') || keyword;

      // 2. Generate Image
      const viewpoints = [
        "straight-on eye-level studio portrait view", 
        "charming high-angle three-quarter view looking down", 
        "playful low-angle view looking up"
      ];
      const selectedView = viewpoints[variationIndex % viewpoints.length];

      const fullPrompt = `A high-quality 3D digital asset of a charming miniature toy version of ${safeVisualDescription}.
      Style & Material: ${styleSuffix}. 
      Background: ESSENTIAL - Solid, pure, clean flat WHITE background. NO shadows on the floor, NO horizon line, just the object isolated on WHITE.
      Detail: Focus intensely on the tactile surface qualities. 
      If fabric/knitted, make sure to show the intricate weave, wool fibers, and amigurumi knit/crochet stitch patterns clearly like a real handmade doll.
      If glass, show clear transparency and refraction. 
      If clay, show matte plasticine texture.
      Form: Chunky, simplified, rounded "kawaii" designer toy silhouette.
      Lighting: Soft studio lighting that enhances the material's texture without casting heavy dark shadows.
      Composition: ${selectedView}, perfectly centered.
      Prohibited: NO text, NO labels, NO people, NO realistic skin, NO photographic noise, NO background elements.`;

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
        return res.status(403).json({ error: 'AI 안전 필터에 의해 생성이 제한되었습니다. 다른 키워드로 시도해주세요.' });
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
