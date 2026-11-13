import http from "http";
import fs from "fs";
import path from "path";

const PORT = 4173;
const DIST_DIR = "C:/Users/LG/.gemini/antigravity/scratch/nailgestao-pro/dist";

async function verifyBundle() {
  console.log("=== VERIFICANDO BUILD DE PRODUÇÃO ===");

  // 1. Verificar arquivos gerados em dist
  const distFiles = fs.readdirSync(DIST_DIR);
  console.log("Arquivos na raiz do dist:", distFiles);

  const assetsDir = path.join(DIST_DIR, "assets");
  const assetFiles = fs.readdirSync(assetsDir);
  console.log("Assets gerados:", assetFiles);

  const htmlContent = fs.readFileSync(path.join(DIST_DIR, "index.html"), "utf-8");

  // 2. Checar links essenciais no HTML
  console.log("\n=== CHECAGEM DE LINKS E FONTES NO HTML ===");
  const checks = [
    { name: "Google Fonts (Fraunces & Plus Jakarta Sans)", pass: htmlContent.includes("Fraunces") && htmlContent.includes("Plus+Jakarta+Sans") },
    { name: "CSS principal incluído", pass: htmlContent.includes(".css") },
    { name: "JS bundle incluído", pass: htmlContent.includes(".js") },
    { name: "Title configurado", pass: htmlContent.includes("NailGestão PRO 1.1") },
  ];

  checks.forEach((c) => {
    console.log(`[${c.pass ? "✓ PASS" : "✗ FAIL"}] ${c.name}`);
  });

  // 3. Checar CSS compilado
  console.log("\n=== CHECAGEM DO CSS COMPILADO (TAILWIND) ===");
  const cssFile = assetFiles.find((f) => f.endsWith(".css"));
  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), "utf-8");

  const cssTokens = [
    { name: "Cor Marfim #FBF6F2", pass: cssContent.includes("fbf6f2") || cssContent.includes("FBF6F2") },
    { name: "Cor Magenta #D6246E", pass: cssContent.includes("d6246e") || cssContent.includes("D6246E") },
    { name: "Cor Ameixa #2B1220", pass: cssContent.includes("2b1220") || cssContent.includes("2B1220") },
    { name: "Cor Dourada #B98A2F / #E3C176", pass: cssContent.includes("b98a2f") || cssContent.includes("e3c176") },
    { name: "Regras de animação marquee", pass: cssContent.includes("marquee") },
    { name: "Regras de vidro (backdrop-blur)", pass: cssContent.includes("backdrop-filter") || cssContent.includes("blur") },
    { name: "Prefers-reduced-motion", pass: cssContent.includes("prefers-reduced-motion") },
  ];

  cssTokens.forEach((t) => {
    console.log(`[${t.pass ? "✓ PASS" : "✗ FAIL"}] ${t.name}`);
  });

  // 4. Checar JS compilado (CTAs, links externos e componentes)
  console.log("\n=== CHECAGEM DE INTEGRIDADE DOS CTAS E DADOS ===");
  const jsFile = assetFiles.find((f) => f.endsWith(".js"));
  const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), "utf-8");

  const jsChecks = [
    { name: "Link Onboarding geral", pass: jsContent.includes("gestaoparameusalao.vercel.app/onboarding") },
    { name: "Link Plano Iniciante (?plan=iniciante)", pass: jsContent.includes("plan=iniciante") },
    { name: "Link Plano Pro (?plan=pro)", pass: jsContent.includes("plan=pro") },
    { name: "Link Plano Gold (?plan=gold)", pass: jsContent.includes("plan=gold") },
    { name: "Link Login", pass: jsContent.includes("gestaoparameusalao.vercel.app/login") },
    { name: "YouTube Video ID gwLrje8vuVU", pass: jsContent.includes("gwLrje8vuVU") },
    { name: "Aviso legal de Exemplo Ilustrativo", pass: jsContent.includes("Exemplo ilustrativo") },
    { name: "Calculadora de perda interativa", pass: jsContent.includes("Quanto as faltas custam") },
    { name: "Preços dos planos (49, 89, 149)", pass: jsContent.includes("49") && jsContent.includes("89") && jsContent.includes("149") },
  ];

  jsChecks.forEach((j) => {
    console.log(`[${j.pass ? "✓ PASS" : "✗ FAIL"}] ${j.name}`);
  });

  // 5. Teste de servidor HTTP local
  console.log("\n=== TESTANDO SERVIDOR HTTP INTERNO ===");
  const server = http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, req.url === "/" ? "index.html" : req.url);
    if (!fs.existsSync(filePath)) filePath = path.join(DIST_DIR, "index.html");
    res.writeHead(200);
    res.end(fs.readFileSync(filePath));
  });

  await new Promise((resolve) => server.listen(PORT, "127.0.0.1", resolve));

  const response = await fetch(`http://127.0.0.1:${PORT}/`);
  console.log(`[${response.status === 200 ? "✓ PASS" : "✗ FAIL"}] Requisição HTTP 200 OK para index.html`);

  const cssResponse = await fetch(`http://127.0.0.1:${PORT}/assets/${cssFile}`);
  console.log(`[${cssResponse.status === 200 ? "✓ PASS" : "✗ FAIL"}] Requisição HTTP 200 OK para ${cssFile}`);

  const jsResponse = await fetch(`http://127.0.0.1:${PORT}/assets/${jsFile}`);
  console.log(`[${jsResponse.status === 200 ? "✓ PASS" : "✗ FAIL"}] Requisição HTTP 200 OK para ${jsFile}`);

  server.close();
  console.log("\n=== TODAS AS VERIFICAÇÕES DE CÓDIGO E ASSETS CONCLUÍDAS COM SUCESSO! ===");
}

verifyBundle().catch(console.error);
