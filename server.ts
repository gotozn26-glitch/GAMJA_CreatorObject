import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  
  // 핵심: 환경 변수 PORT를 우선 사용하도록 수정 (8080 대응)
  const PORT = Number(process.env.PORT) || 8080;

  app.use(express.json({ limit: '50mb' }));

  // API 라우트를 항상 정적 파일 설정보다 위에 배치
  app.post("/api/generate", async (req, res) => {
    // ... 기존 제미나이 로직 유지 ...
  });

  // 배포 환경 전용 설정: 빌드된 dist 폴더 서빙
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  // 외부 접속을 허용하기 위해 0.0.0.0으로 바인딩
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

startServer().catch(err => console.error("서버 시작 실패:", err));
