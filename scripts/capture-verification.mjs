import http from "http";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";

const PORT = 4173;
const ARTIFACT_DIR = "C:/Users/LG/.gemini/antigravity/brain/a136a0f7-ea53-4943-830a-0d8559303b4d";
const DIST_DIR = "C:/Users/LG/.gemini/antigravity/scratch/nailgestao-pro/dist";
const USER_DATA_DIR = "C:/Users/LG/.gemini/antigravity/scratch/nailgestao-pro/.edge-temp";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Simple static file server for dist
function startStaticServer() {
  const mimeTypes = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
  };

  const server = http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, req.url === "/" ? "index.html" : req.url);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(DIST_DIR, "index.html");
    }

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || "application/octet-stream";

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Server error");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, "127.0.0.1", () => {
      console.log(`Static server listening on http://127.0.0.1:${PORT}`);
      resolve(server);
    });
  });
}

async function run() {
  const server = await startStaticServer();

  if (!fs.existsSync(USER_DATA_DIR)) {
    fs.mkdirSync(USER_DATA_DIR, { recursive: true });
  }

  console.log("Launching headless Edge with remote debugging...");
  const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const edge = spawn(
    edgePath,
    [
      "--headless=new",
      "--remote-debugging-port=9225",
      `--user-data-dir=${USER_DATA_DIR}`,
      "--disable-gpu",
      "--no-sandbox",
      "--disable-extensions",
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  // Fetch CDP WebSocket URL
  let pageWsUrl = null;
  const start = Date.now();
  while (Date.now() - start < 20000) {
    try {
      const res = await fetch("http://127.0.0.1:9225/json/list");
      if (res.ok) {
        const pages = await res.json();
        if (pages[0]?.webSocketDebuggerUrl) {
          pageWsUrl = pages[0].webSocketDebuggerUrl;
          break;
        }
      }
    } catch {}
    await sleep(500);
  }

  if (!pageWsUrl) {
    edge.kill();
    server.close();
    throw new Error("Could not connect to Edge DevTools");
  }

  console.log("Connected to CDP:", pageWsUrl);
  const ws = new WebSocket(pageWsUrl);
  await new Promise((resolve) => (ws.onopen = resolve));

  let msgId = 1;
  const pending = new Map();
  ws.onmessage = (evt) => {
    const data = JSON.parse(evt.data);
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    }
  };

  function sendCdp(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await sendCdp("Page.enable");
  await sendCdp("DOM.enable");

  const viewports = [
    { name: "390", width: 390, height: 844, file: "nailgestao_mobile_390.png" },
    { name: "768", width: 768, height: 1024, file: "nailgestao_tablet_768.png" },
    { name: "1440", width: 1440, height: 900, file: "nailgestao_desktop_1440.png" },
  ];

  for (const vp of viewports) {
    console.log(`Testing viewport ${vp.name} (${vp.width}x${vp.height})...`);
    await sendCdp("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 800,
    });

    await sendCdp("Page.navigate", { url: `http://127.0.0.1:${PORT}/` });
    await sleep(2500);

    // Check for horizontal scroll overflow
    const evalRes = await sendCdp("Runtime.evaluate", {
      expression: `({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth
      })`,
      returnByValue: true,
    });

    console.log(`Viewport ${vp.name} metrics:`, evalRes?.result?.value);

    // Capture screenshot
    const screenshot = await sendCdp("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });

    const outPath = path.join(ARTIFACT_DIR, vp.file);
    fs.writeFileSync(outPath, Buffer.from(screenshot.data, "base64"));
    console.log(`Saved screenshot to ${outPath}`);
  }

  ws.close();
  edge.kill();
  server.close();
  console.log("All viewport captures and checks finished successfully!");
}

run().catch((err) => {
  console.error("Error during capture:", err);
  process.exit(1);
});
