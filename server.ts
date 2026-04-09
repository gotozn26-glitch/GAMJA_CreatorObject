import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  
  // 핵심: Firebase가 주는 PORT를 최우선으로 사용, 없으면 8080 고정
  const PORT = Number(process.env.PORT) || 8080;

  app.use(express.json({ limit: '50mb' }));

  // API 라우트를 항상 정적 파일 설정보다 '위'에 배치
  app.post("/api/generate", async (req, res) => {
    // ... 기존 이미지 생성 로직 ...
  });

  // 빌드된 프론트엔드 파일(dist) 서빙
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  // 0.0.0.0으로 바인딩하여 외부 접속 허용
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical Error:", err);
  process.exit(1);
});
