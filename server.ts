import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  
  // Firebase App Hosting은 반드시 process.env.PORT를 사용해야 함
  const PORT = process.env.PORT || 8080;

  app.use(express.json({ limit: '50mb' }));

  // [1순위] API 라우트
  app.post("/api/generate", async (req, res) => {
    // ... 감자님의 제미나이 로직 ...
    res.json({ success: true }); 
  });

  // [2순위] 정적 파일 설정
  const distPath = path.resolve(process.cwd(), "dist");
  app.use(express.static(distPath));

  // [3순위] SPA 대응 (Express 5 문법 적용)
  // 에러 로그에 찍힌 '*' 대신 '(.*)'를 사용해야 합니다.
  app.get("(.*)", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  // [4순위] 서버 시작 (0.0.0.0 바인딩 필수)
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is actually running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical Start Error:", err);
  process.exit(1);
});
