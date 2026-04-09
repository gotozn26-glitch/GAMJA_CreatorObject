import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 8080;

  app.use(express.json({ limit: '50mb' }));

  // [1순위] API - 반드시 정적 파일 설정보다 위에 배치
  app.post("/api/generate", async (req, res) => {
    // ... 기존 제미나이 이미지 생성 로직
    res.json({ success: true });
  });

  // [2순위] 정적 파일 설정 - 절대 경로로 확실히 지정
  // 배포 환경에서 dist 폴더를 한 치의 오차 없이 찾도록 설정합니다.
  const distPath = path.resolve(process.cwd(), "dist");
  app.use(express.static(distPath));

  // [3순위] SPA 대응 - Express 5에서 경로 에러가 나지 않는 정규식 방식
  // '/api'로 시작하는 요청은 절대 index.html로 빠지지 않게 합니다.
  app.get(/^((?!\/api).)*$/, (req, res) => {
    const indexPath = path.join(distPath, "index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        // 빌드된 파일이 없는 경우를 대비한 최후의 에러 처리
        res.status(404).send("Build directory 'dist' or 'index.html' not found.");
      }
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[DEPLOY SUCCESS] Server listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical Start Error:", err);
  process.exit(1);
});
