import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  
  // Firebase App Hosting은 환경 변수로 전달되는 PORT를 반드시 사용해야 합니다.
  const PORT = Number(process.env.PORT) || 8080;

  app.use(express.json({ limit: '50mb' }));

  // [1순위] API Proxy Route: 정적 파일 설정보다 무조건 위에 있어야 합니다.
  app.post("/api/generate", async (req, res) => {
    const { keyword, styleSuffix, referenceImageBase64, variationIndex } = req.body;
    
    if (!keyword || !styleSuffix) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "서버에 API 키가 설정되지 않았습니다." });
    }

    const ai = new GoogleGenAI(apiKey);

    try {
      // 1. 키워드 번역 및 정제
      const model3 = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Translate the Korean word "${keyword}" into a cute, toy-like English visual description. Output ONLY the English description.`;
      const translationResult = await model3.generateContent(prompt);
      const safeVisualDescription = translationResult.response.text().trim();

      // 2. 이미지 생성
      const viewpoints = ["straight-on view", "high-angle view", "low-angle view"];
      const selectedView = viewpoints[variationIndex % viewpoints.length];
      const fullPrompt = `A 3D digital asset of a miniature toy ${safeVisualDescription}. Style: ${styleSuffix}. Solid WHITE background, ${selectedView}.`;

      const imgModel = ai.getGenerativeModel({ model: "gemini-pro-vision" }); // 혹은 사용하시는 이미지 모델명
      
      // 이미지 생성 로직 (현재 라이브러리 버전에 맞게 수정 필요할 수 있음)
      // ... 기존 로직 유지 ...

      // 임시 응답 예시 (성공 시)
      // res.json({ url: "data:image/png;base64,..." });
      
    } catch (error: any) {
      console.error("Gemini Server Error:", error);
      res.status(500).json({ error: error.message || "이미지 생성 중 오류가 발생했습니다." });
    }
  });

  // [2순위] 정적 파일 서빙 (빌드된 프론트엔드 파일)
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));

  // [3순위] 나머지 모든 요청은 index.html로 (SPA 지원)
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch(console.error);
