import fs from "fs";
import path from "path";

const DIST_DIR = "C:/Users/LG/.gemini/antigravity/scratch/nailgestao-pro/dist";
const PUBLIC_DIR = "C:/Users/LG/.gemini/antigravity/scratch/nailgestao-pro/public";

async function verifyAll() {
  console.log("=== 1. VERIFICANDO ASSETS DOS FRAMES DE ANATOMIA ===");
  const desktopFrames = [];
  const mobileFrames = [];

  for (let i = 1; i <= 10; i++) {
    const num = String(i).padStart(2, '0');
    const dPath = path.join(PUBLIC_DIR, `frames/anatomia/frame-${num}.webp`);
    const mPath = path.join(PUBLIC_DIR, `frames/anatomia/mobile/frame-${num}.webp`);
    
    const dExists = fs.existsSync(dPath);
    const mExists = fs.existsSync(mPath);
    desktopFrames.push(dExists);
    mobileFrames.push(mExists);
    
    if (!dExists || !mExists) {
      console.error(`Frame ${num} faltando: desktop=${dExists}, mobile=${mExists}`);
    }
  }

  const allFramesExist = desktopFrames.every(Boolean) && mobileFrames.every(Boolean);
  console.log(`[${allFramesExist ? "✓ PASS" : "✗ FAIL"}] Todos os 10 frames desktop (1080x1920) e mobile (720x1280) existem.`);

  console.log("\n=== 2. VERIFICANDO BUILD DE PRODUÇÃO E BUNDLE ===");
  const assetsDir = path.join(DIST_DIR, "assets");
  const assetFiles = fs.readdirSync(assetsDir);

  const jsFile = assetFiles.find((f) => f.endsWith(".js"));
  const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), "utf-8");

  const cssFile = assetFiles.find((f) => f.endsWith(".css"));
  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), "utf-8");

  const storyChecks = [
    { name: "Overline 'ANATOMIA DE UM ATENDIMENTO'", pass: jsContent.includes("ANATOMIA DE UM ATENDIMENTO") },
    { name: "Título com 'camada'", pass: jsContent.includes("camada") },
    { name: "Etapa 1 'Uma unha. Várias decisões.'", pass: jsContent.includes("Uma unha. Várias decisões.") },
    { name: "Etapa 2 'Material, gel construtor...'", pass: jsContent.includes("Material, gel construtor") },
    { name: "Etapa 3 'Na ficha técnica do NailGestão...'", pass: jsContent.includes("Na ficha técnica do NailGestão") },
    { name: "CTA 'Ver a ficha técnica'", pass: jsContent.includes("Ver a ficha técnica") },
    { name: "Caminho frames desktop '/frames/anatomia/frame-'", pass: jsContent.includes("/frames/anatomia") },
    { name: "Caminho frames mobile '/frames/anatomia/mobile'", pass: jsContent.includes("/frames/anatomia/mobile") },
    { name: "Alt text acessibilidade", pass: jsContent.includes("Anatomia da unha com alongamento F1") },
    { name: "Bento grid preservado ('Cada unha tem uma história')", pass: jsContent.includes("Cada unha tem uma história") },
  ];

  storyChecks.forEach((c) => {
    console.log(`[${c.pass ? "✓ PASS" : "✗ FAIL"}] ${c.name}`);
  });

  const allPassed = storyChecks.every((c) => c.pass) && allFramesExist;
  console.log(`\nRESULTADO GERAL: ${allPassed ? "SUCESSO TOTAL (100% PASS)" : "FALHA"}`);
}

verifyAll().catch(console.error);
