// Uso: node capt.mjs <url> <carpeta> [ids...]
// Captura cada sección (por id; 'footer' por etiqueta) en desktop 1440 y mobile 390.
// Variables: CHROME (ruta a Chrome), FONTSOURCE_DIR (carpeta @fontsource).
import { chromium } from 'playwright-core'
import fs from 'fs'
const [url, out, ...only] = process.argv.slice(2)
const ids = only.length ? only : ['hero', 'final', 'libertadores', 'estadisticas', 'videos', 'galeria', 'prensa', 'contact', 'footer']
fs.mkdirSync(out, { recursive: true })
// Fuentes locales (@fontsource) para que la captura no dependa de Google Fonts
const fdir = process.env.FONTSOURCE_DIR || './node_modules/@fontsource'
let css = ''
for (const [pkg, fam, weights] of [['bebas-neue','Bebas Neue',[400]],['barlow-condensed','Barlow Condensed',[400,500,600,700]],['barlow','Barlow',[300,400,500,600]]]) for (const w of weights) {
  const f = `${fdir}/${pkg}/files/${pkg}-latin-${w}-normal.woff2`; if (fs.existsSync(f)) css += `@font-face{font-family:'${fam}';font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(f).toString('base64')}) format('woff2');}\n`
}
const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] })
const errs = []
for (const [n, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
  page.on('pageerror', e => errs.push(`${n}: ${e.message}`))
  // Las fuentes de Google se bloquean a propósito (se inyectan locales): no cuentan como error
  page.on('console', m => { if (m.type() === 'error' && !/fonts\.g|net::ERR_FAILED/.test(m.text())) errs.push(`${n} console: ${m.text()}`) })
  page.on('requestfailed', r => { if (!/fonts\.(googleapis|gstatic)/.test(r.url())) errs.push(`${n} falló: ${r.url()}`) })
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort())
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: css }); await page.evaluate(() => document.fonts.ready)
  // recorrer toda la página para disparar los reveals
  const H = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < H; y += 300) { await page.evaluate(y => window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y), y); await page.waitForTimeout(60) }
  await page.evaluate(async () => { for (const i of document.querySelectorAll('img')) { i.loading = 'eager'; await i.decode().catch(() => {}) } })
  // ocultar navbar fija para que no tape las capturas
  await page.addStyleTag({ content: '#root nav{visibility:hidden !important}' })
  for (const id of ids) {
    const sel = id === 'footer' ? 'footer' : `#${id}`
    const el = page.locator(sel).first()
    if (!(await el.count())) continue
    if (id === 'hero') {
      await page.evaluate(() => window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : scrollTo(0, 0)); await page.waitForTimeout(700)
      await page.screenshot({ path: `${out}/${id}-${n}.jpg`, type: 'jpeg', quality: 72 })
      continue
    }
    const box = await el.boundingBox()
    const top = await page.evaluate(s => document.querySelector(s).getBoundingClientRect().top + scrollY, sel)
    await page.evaluate(y => window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y), top)
    await page.waitForTimeout(700)
    const hh = Math.min(box.height, n === 'desktop' ? 2200 : 3200)
    await page.screenshot({ path: `${out}/${id}-${n}.jpg`, type: 'jpeg', quality: 72, fullPage: true, clip: { x: 0, y: top, width: w, height: hh } })
  }
  await page.close()
}
console.log(errs.length ? errs.join('\n') : 'sin errores')
await browser.close()
