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

  // [1순위] API 라우트 - 정적 파일 서빙보다 무조건 위에 있어야 합니다.
  app.post("/api/generate", async (req, res) => {
    // ... 감자님의 제미나이 이미지 생성 로직
    res.json({ success: true });
  });

  // [2순위] 정적 파일 설정 - 절대 경로로 고정
  // process.cwd()는 프로젝트 루트(package.json이 있는 곳)를 가리킵니다.
  const distPath = path.resolve(process.cwd(), "dist");
  
  // 브라우저가 .js, .css 파일을 요청하면 dist 폴더에서 즉시 찾아서 반환합니다.
  app.use(express.static(distPath));

  // [3순위] SPA 대응 - Express 5에서 경로 에러가 나지 않는 가장 안전한 방식
  // '/api'로 시작하지 않는 모든 요청에 대해서만 index.html을 보냅니다.
  app.get(/^((?!\/api).)*$/, (req, res) => {
    const indexPath = path.join(distPath, "index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        // 빌드 파일이 없을 경우 404와 메시지 출력 (서버 다운 방지)
        res.status(404).send("Build folder 'dist' or 'index.html' not found.");
      }
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[OK] Server listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical Start Error:", err);
  process.exit(1);
});
