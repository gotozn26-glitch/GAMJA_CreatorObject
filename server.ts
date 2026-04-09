import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 8080;

  app.use(express.json({ limit: '50mb' }));

  // [1순위] API - 문자열로 명확히 지정
  app.post("/api/generate", async (req, res) => {
    // ... 감자님의 제미나이 로직 ...
    res.json({ success: true });
  });

  // [2순위] 정적 파일 설정
  const distPath = path.resolve(process.cwd(), "dist");
  app.use(express.static(distPath));

  // [3순위] SPA 대응 - Express 5 에러를 완벽히 피하는 정규식 방식
  // 문자열 '(.*)' 대신 정규식 객체 /.*/ 를 사용합니다. 
  // 이렇게 하면 "Unexpected (" 에러가 원천 차단됩니다.
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) {
        res.status(404).send("Build files not found.");
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
