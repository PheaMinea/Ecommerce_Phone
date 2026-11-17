// Temporary verification harness: real viewport emulation + screenshots via CDP.
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith("--")) acc.push([cur.slice(2), arr[i + 1]]);
    return acc;
  }, [])
);

const url = args.url || "http://localhost:5175/";
const out = args.out || ".shots/capture.png";
const width = Number(args.width || 1440);
const height = Number(args.height || 900);
const seed = args.seed || "";
const fullPage = args.full === "1";
const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const port = 9333 + Math.floor(Math.random() * 200);
const profile = path.resolve(`.shots/cdp-profile-${port}`);

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ],
  { stdio: "ignore" }
);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getTarget() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      const list = await res.json();
      const page = list.find((item) => item.type === "page");
      if (page) return page;
    } catch {
      /* starting */
    }
    await wait(250);
  }
  throw new Error("Could not connect to Chrome");
}

const target = await getTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});

let nextId = 1;
const pending = new Map();
const events = [];
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(JSON.stringify(msg.error)));
    else resolve(msg.result);
  } else if (msg.method) {
    events.push(msg);
  }
};

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width < 700,
  screenWidth: width,
  screenHeight: height,
});
await send("Emulation.setTouchEmulationEnabled", { enabled: width < 700 });

const seedScript = `
(() => {
  try {
    const seed = ${JSON.stringify(seed)};
    if (seed.includes("user")) {
      localStorage.setItem("north_user_v1", JSON.stringify({
        name: "Alex Morgan", email: "alex.morgan@example.com",
        phone: "+44 7700 900123", joined: "2026-01-12"
      }));
    }
    if (seed.includes("wishlist")) {
      localStorage.setItem("north_wishlist_v1", JSON.stringify([4, 7, 10]));
    }
    if (seed.includes("cart")) {
      localStorage.setItem("north_cart_v1", JSON.stringify([
        { key: "1|Deep Blue|256GB|12GB", id: 1, slug: "iphone-17-pro-max",
          name: "iPhone 17 Pro Max", brand: "Apple", price: 1299, oldPrice: 1449,
          color: "Deep Blue", storage: "256GB", ram: "12GB", quantity: 1 },
        { key: "13|White||", id: 13, slug: "airpods-pro-3", name: "AirPods Pro 3",
          brand: "Apple", price: 249, oldPrice: 279, color: "White",
          storage: "", ram: "", quantity: 1 }
      ]));
    }
    if (seed.includes("coupon")) {
      localStorage.setItem("north_cart_v1", localStorage.getItem("north_cart_v1") || "[]");
    }
  } catch (e) {}
})();
`;

await send("Page.addScriptToEvaluateOnNewDocument", { source: seedScript });
await send("Page.navigate", { url });
await wait(2200);

const metrics = await send("Runtime.evaluate", {
  expression: `JSON.stringify({
    innerWidth: window.innerWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
    errors: window.__errors || []
  })`,
  returnByValue: true,
});
console.log(metrics.result.value);

const shot = await send("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
  captureBeyondViewport: fullPage,
  ...(fullPage
    ? { clip: { x: 0, y: 0, width, height: Math.min(1900, height), scale: 1 } }
    : {}),
});

fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
fs.writeFileSync(path.resolve(out), Buffer.from(shot.data, "base64"));
console.log("saved", out);

ws.close();
chrome.kill();
