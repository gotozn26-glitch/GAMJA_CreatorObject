import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  // Firebase가 주는 PORT를 최우선, 없으면 8080
  const PORT = process.env.PORT || 8080;

  app.use(express.json({ limit: '50mb' }));

  // API 라우트
  app.post("/api/generate", async (req, res) => {
    // ... 감자님의 제미나이 로직 ...
    res.json({ message: "API 살아있음!" });
  });

  // 정적 파일 경로 설정 (dist 폴더)
  const distPath = path.resolve(process.cwd(), "dist");
  app.use(express.static(distPath));

  // SPA 대응: 모든 요청은 index.html로
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is listening on 0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("서버 구동 실패:", err);
  process.exit(1);
});
