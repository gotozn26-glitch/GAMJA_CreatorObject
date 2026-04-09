import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  
  // Firebase App Hosting 기본 포트 8080 대응
  const PORT = process.env.PORT || 8080;

  app.use(express.json({ limit: '50mb' }));

  // [1순위] API 라우트 - 문자열로 명확히 지정
  app.post("/api/generate", async (req, res) => {
    // ... 감자님의 제미나이 로직 그대로 유지 ...
    res.json({ success: true });
  });

  // [2순위] 정적 파일 설정
  const distPath = path.resolve(process.cwd(), "dist");
  app.use(express.static(distPath));

  // [3순위] SPA 대응 - Express 5 에러를 피하기 위한 정규식 객체 사용
  // '*'나 '(.*)' 문자열 대신 아래 정규식을 사용하면 문법 에러가 나지 않습니다.
  app.get(/^((?!\/api).)*$/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) {
        // 파일이 없을 경우 서버가 죽지 않게 404 응답 처리
        res.status(404).send("Build files not found. Check if 'npm run build' was successful.");
      }
    });
  });

  // [4순위] 서버 시작 (0.0.0.0 바인딩 필수)
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[OK] Server is listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical Start Error:", err);
  process.exit(1);
});
