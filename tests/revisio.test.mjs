// Proves de les pàgines de revisió (revisio/*.html + revisio/revisio.js).
// Executa: node tests/revisio.test.mjs   (fa servir el Playwright i el Chromium instal·lats)
// Serveix el repo en local i bloqueja totes les peticions externes perquè siguin deterministes.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import assert from "node:assert/strict";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = fileURLToPath(new URL("..", import.meta.url));
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml" };

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const file = normalize(join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  try { const b = await readFile(file); res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" }).end(b); }
  catch { res.writeHead(404).end("no"); }
});
await new Promise(r => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
let failed = 0;
const tests = [];
const test = (name, fn) => tests.push([name, fn]);

async function open(path, opts = {}) {
  const ctx = await browser.newContext({ viewport: opts.viewport || { width: 1280, height: 800 }, hasTouch: !!opts.touch, isMobile: !!opts.touch });
  await ctx.route("**/*", r => r.request().url().startsWith(base) ? r.continue() : r.abort());
  const page = await ctx.newPage();
  page.setDefaultTimeout(8000);
  const errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  await page.goto(base + path);
  await page.waitForFunction(() => window.Revisio && window.Revisio.ready);
  const frame = page.frameLocator("#pagina");
  return { ctx, page, frame, errors };
}

// La pàgina de dins de l'iframe
const inner = page => page.frames().find(f => f.name() === "pagina" || f.url().includes(".html") && f !== page.mainFrame());

test("cada còpia carrega la pàgina original sense errors", async () => {
  for (const [copy, orig] of [["/revisio/index.html", "/index.html"], ["/revisio/ruta.html", "/ruta.html"], ["/revisio/comparador.html", "/comparador.html"]]) {
    const { ctx, page, errors } = await open(copy);
    const src = await page.$eval("#pagina", f => new URL(f.src).pathname);
    assert.equal(src, orig);
    const h = await inner(page).evaluate(() => document.title);
    assert.ok(h.length > 0, "l'original té títol");
    assert.deepEqual(errors, [], "sense errors de JS a la còpia");
    await ctx.close();
  }
});

test("el selector de cada element el torna a trobar (únic)", async () => {
  const { ctx, page } = await open("/revisio/ruta.html");
  const bad = await page.evaluate(() => {
    const doc = document.getElementById("pagina").contentDocument;
    const out = [];
    for (const el of doc.body.querySelectorAll("*")) {
      if (el.closest("[data-revisio]")) continue;
      const s = window.Revisio.selectorFor(el);
      if (doc.querySelector(s) !== el) out.push(s);
    }
    return out;
  });
  assert.deepEqual(bad, []);
  await ctx.close();
});

test("comentar un element: es guarda, surt la marca i persisteix", async () => {
  const { ctx, page } = await open("/revisio/index.html");
  await page.click("#rv-mode");
  assert.equal(await page.getAttribute("#rv-mode", "aria-pressed"), "true");
  // Clicar un enllaç en mode comentari no ha de navegar
  await inner(page).click("#routebtn");
  await page.waitForSelector("#rv-editor[open]");
  assert.match(await page.textContent("#rv-target"), /#routebtn/);
  // Cada clic tria l'element més concret; «Tot el contenidor» puja fins al botó sencer
  while (!/^#routebtn$/m.test(await page.textContent("#rv-target code"))) await page.click("#rv-parent");
  await page.fill("#rv-text", "El botó hauria de ser més gran");
  await page.click("#rv-save");
  await page.waitForSelector("#rv-editor:not([open])", { state: "attached" });
  assert.equal(new URL(inner(page).url()).pathname, "/index.html", "no ha navegat a la ruta");
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("tempcat.revisio")));
  assert.equal(saved.length, 1);
  assert.equal(saved[0].pagina, "index.html");
  assert.equal(saved[0].selector, "#routebtn");
  assert.equal(saved[0].comentari, "El botó hauria de ser més gran");
  assert.match(await page.textContent("#rv-count"), /1/);
  await inner(page).waitForSelector("[data-revisio] .rv-pin");
  // Recarrega: la marca hi torna a ser
  await page.reload();
  await page.waitForFunction(() => window.Revisio && window.Revisio.ready);
  await inner(page).waitForSelector("[data-revisio] .rv-pin");
  await ctx.close();
});

test("ampliar la selecció a l'element contenidor", async () => {
  const { ctx, page } = await open("/revisio/index.html");
  await page.click("#rv-mode");
  await inner(page).dispatchEvent("#pname", "click"); // sense xarxa, el missatge d'error tapa el títol
  await page.waitForSelector("#rv-editor[open]");
  assert.equal(await page.textContent("#rv-target code"), "#pname");
  await page.click("#rv-parent");
  assert.notEqual(await page.textContent("#rv-target code"), "#pname");
  assert.match(await page.textContent("#rv-target"), /Buscant on ets|div|header/);
  await page.keyboard.press("Escape");
  await page.waitForSelector("#rv-editor:not([open])", { state: "attached" });
  await ctx.close();
});

test("editar, exportar i esborrar", async () => {
  const { ctx, page } = await open("/revisio/index.html");
  await page.evaluate(() => localStorage.setItem("tempcat.revisio", JSON.stringify([
    { id: "a", pagina: "index.html", selector: "#routebtn", element: "a#routebtn", text: "Ruta", context: "", comentari: "Primer", creat: "2026-11-23T09:00:00Z", amplada: 390 },
    { id: "b", pagina: "ruta.html", selector: "h1", element: "h1", text: "Ruta", context: "", comentari: "Altre pàgina", creat: "2026-11-23T09:01:00Z", amplada: 1280 },
  ])));
  await page.reload();
  await page.waitForFunction(() => window.Revisio && window.Revisio.ready);
  const md = await page.evaluate(() => window.Revisio.toMarkdown());
  assert.match(md, /## index\.html/);
  assert.match(md, /## ruta\.html/);
  assert.match(md, /`#routebtn`/);
  assert.match(md, /Primer/);
  // Llista: només els d'aquesta pàgina; obrir-ne un i esborrar-lo
  await page.click("#rv-list-btn");
  await page.waitForSelector("#rv-panel[open]");
  assert.equal(await page.locator("#rv-items > li").count(), 1);
  await page.click("#rv-items > li button.rv-open");
  await page.waitForSelector("#rv-editor[open]");
  assert.equal(await page.inputValue("#rv-text"), "Primer");
  await page.click("#rv-delete");
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("tempcat.revisio")));
  assert.deepEqual(saved.map(c => c.id), ["b"]);
  await ctx.close();
});

test("teclat: Esc surt del mode comentari; Enter comenta l'element amb focus", async () => {
  const { ctx, page } = await open("/revisio/index.html");
  await page.click("#rv-mode");
  await inner(page).focus("#routebtn");
  await page.keyboard.press("Enter");
  await page.waitForSelector("#rv-editor[open]");
  await page.keyboard.press("Escape");
  await page.waitForSelector("#rv-editor:not([open])", { state: "attached" });
  await inner(page).focus("#routebtn");
  await page.keyboard.press("Escape");
  assert.equal(await page.getAttribute("#rv-mode", "aria-pressed"), "false");
  await ctx.close();
});

test("navegar dins la còpia manté el mode revisió i actualitza l'adreça", async () => {
  const { ctx, page } = await open("/revisio/index.html");
  await inner(page).click("a[href='comparador.html']");
  await page.waitForFunction(() => location.pathname.endsWith("/revisio/comparador.html"));
  await page.waitForFunction(() => window.Revisio.pagina() === "comparador.html");
  await ctx.close();
});

test("mòbil: tocar un element obre l'editor", async () => {
  const { ctx, page } = await open("/revisio/index.html", { viewport: { width: 390, height: 844 }, touch: true });
  await page.tap("#rv-mode");
  await inner(page).tap("#routebtn");
  await page.waitForSelector("#rv-editor[open]");
  const box = await page.locator("#rv-mode").boundingBox();
  assert.ok(box.height >= 44 && box.width >= 44, "botó de 44 px o més");
  await ctx.close();
});

for (const [name, fn] of tests) {
  try { await fn(); console.log("✓", name); }
  catch (e) { failed++; console.log("✗", name, "\n ", e.message); }
}
await browser.close();
server.close();
console.log(failed ? `${failed} proves han fallat` : "Totes les proves passen");
process.exit(failed ? 1 : 0);
