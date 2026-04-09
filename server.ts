import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  // Firebase App Hosting 환경 변수 우선, 없으면 8080
  const PORT = process.env.PORT || 8080;

  app.use(express.json({ limit: '50mb' }));

  // 1. API 경로 (항상 최상단)
  app.post("/api/generate", async (req, res) => {
    try {
      // 기존 제미나이 로직...
      res.json({ message: "Success" });
    } catch (err) {
      res.status(500).json({ error: "API Error" });
    }
  });

  // 2. 정적 파일 경로 설정 (가장 안전한 경로 계산법)
  const root = process.cwd();
  const distPath = path.resolve(root, "dist");

  // dist 폴더가 있는지 콘솔에 찍어봅니다 (로그 확인용)
  console.log(`Checking dist folder at: ${distPath}`);

  app.use(express.static(distPath));

  // 3. SPA 대응: 모든 요청은 index.html로 (경로 에러 방지용 안전 장치)
  app.get("*", (req, res) => {
    const indexPath = path.join(distPath, "index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        // 파일이 없으면 여기서 에러를 뱉고 서버가 죽지 않게 처리
        res.status(404).send("Build files not found. Please check build process.");
      }
    });
  });

  // 4. 서버 시작 (0.0.0.0 바인딩 필수)
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[OK] Server listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical Start Error:", err);
});
