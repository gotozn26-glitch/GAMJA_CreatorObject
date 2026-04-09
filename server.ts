import express from "express";
import path from "path";
import fs from "fs"; // 파일 시스템 체크용 추가
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 8080;

  app.use(express.json({ limit: '50mb' }));

  // [1] API
  app.post("/api/generate", async (req, res) => { /* ... 로직 ... */ });

  // [2] 정적 파일 경로 상세 진단
  const distPath = path.resolve(process.cwd(), "dist");
  
  // 로그에 폴더 존재 여부 출력 (이걸 로그 서버에서 확인해야 합니다!)
  if (fs.existsSync(distPath)) {
    console.log("✅ dist folder found at:", distPath);
    console.log("📁 files in dist:", fs.readdirSync(distPath));
  } else {
    console.error("❌ dist folder NOT FOUND at:", distPath);
  }

  app.use(express.static(distPath));

  // [3] SPA 대응 (Express 5 문법)
  app.get("(.*)", (req, res) => {
    const indexPath = path.join(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("index.html not found in dist folder.");
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch(console.error);
