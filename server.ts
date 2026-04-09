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

  // [1순위] API 라우트 - 정적 파일보다 무조건 위에 있어야 함
  app.post("/api/generate", async (req, res) => {
    // ... 기존 제미나이 로직 ...
    res.json({ success: true });
  });

  // [2순위] 정적 파일 설정
  // process.cwd()는 배포 서버의 루트(/workspace)를 가리킵니다.
  const distPath = path.resolve(process.cwd(), "dist");
  
  // 중요: express.static이 'dist' 폴더 내부를 직접 바라보게 합니다.
  app.use(express.static(distPath));

  // [3순위] SPA 대응 - Express 5에서 가장 안전한 정규식 방식
  // 브라우저가 직접 주소를 치고 들어오거나 새로고침할 때 index.html을 보내줍니다.
  app.get(/.*/, (req, res) => {
    // 만약 요청한 경로에 실제 파일이 존재하면(예: .js, .css) express.static이 먼저 처리합니다.
    // 여기까지 내려왔다는 건 파일을 못 찾았다는 뜻이므로 index.html을 보냅니다.
    res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) {
        res.status(404).send("Build files not found in dist folder.");
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
