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

  // [1순위] API 라우트 - 반드시 정적 파일 설정보다 위에 있어야 함
  app.post("/api/generate", async (req, res) => {
    // ... 감자님의 제미나이 이미지 생성 로직
    res.json({ success: true });
  });

  // [2순위] 정적 파일 설정 - 배포 환경의 'dist' 폴더를 절대 경로로 잡음
  // process.cwd()는 현재 작업 디렉토리이므로 배포 서버의 루트를 가리킵니다.
  const distPath = path.resolve(process.cwd(), "dist");
  
  // 브라우저가 js, css 파일을 요청하면 dist 폴더에서 즉시 찾아서 줌
  app.use(express.static(distPath));

  // [3순위] SPA 대응 - 파일을 못 찾았을 때만 index.html을 보냄
  // Express 5 에러를 피하기 위해 정규식 객체 사용
  app.get(/^((?!\/api).)*$/, (req, res) => {
    const indexPath = path.join(distPath, "index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        // 만약 index.html조차 없다면 에러 메시지 출력
        res.status(404).send("Build folder 'dist' or 'index.html' not found.");
      }
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[OK] Server is listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical Start Error:", err);
  process.exit(1);
});
