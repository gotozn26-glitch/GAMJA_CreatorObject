// server.ts 핵심 구조
import express from "express";
import path from "path";
// ... 기타 import

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));

  // [1순위] API 경로는 무조건 '맨 위'에!
  app.post("/api-v1/generate", async (req, res) => {
    console.log("AI 생성 시작..."); // 이게 로그에 찍혀야 성공입니다.
    // ... 제미나이 로직 ...
    res.json({ url: "결과물" });
  });

  // [2순위] 정적 파일 서빙
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));

  // [3순위] 나머지는 다 index.html로 (이게 API 위에 있으면 0.002초 만에 HTML을 뱉음)
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`서버가 포트 ${PORT}에서 살아났습니다!`);
  });
}
startServer();
