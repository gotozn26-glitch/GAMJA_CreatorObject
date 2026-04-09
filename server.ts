import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  
  // Firebase App Hosting은 반드시 process.env.PORT(8080)를 써야 합니다.
  // 이 줄이 실행되지 않으면 타임아웃이 납니다.
  const PORT = 8080;

  app.use(express.json({ limit: '50mb' }));

  // API 경로는 무조건 정적 파일 설정보다 '위'에 배치
  app.post("/api/generate", async (req, res) => {
    // ... 기존 제미나이 로직 유지 ...
  });

  // 배포된 프론트엔드 파일 서빙
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  // 0.0.0.0으로 바인딩해야 외부(Firebase) 신호를 받을 수 있습니다.
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical Server Error:", err);
  process.exit(1); // 에러 발생 시 명시적으로 종료하여 로그에 남김
});
