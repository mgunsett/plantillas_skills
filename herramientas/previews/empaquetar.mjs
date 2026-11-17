// Empaqueta las previews de un kit en HTML autocontenidos (fotos, fuentes, CSS y JS adentro)
// y saca la miniatura .jpg de cada una.
//
// Uso (desde herramientas/):
//   node previews/empaquetar.mjs ../kits/neon                → escribe en ../modelos/<sección>/previews/neon-N-slug.html
//   node previews/empaquetar.mjs ../kits/neon ./salida       → escribe todo junto en ./salida (para mostrarle al cliente)
//   node previews/empaquetar.mjs ../kits/neon ./salida hero-4-transmision stats-3-radar   → solo esas
//
// Variables: CHROME (ruta a Chrome; por defecto /usr/bin/google-chrome), SIN_MINIATURAS=1.
import { chromium } from 'playwright-core'
import fs from 'fs'
import path from 'path'
import vm from 'vm'
import { pathToFileURL } from 'url'

const [kitArg, outArg, ...only] = process.argv.slice(2)
if (!kitArg) { console.error('Uso: node previews/empaquetar.mjs <kit> [salida] [diseños…]'); process.exit(1) }
const KIT = path.resolve(kitArg)
const KIT_NAME = path.basename(KIT)
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..')
const SECCIONES = { hero: '01-hero', stats: '03-estadisticas', videos: '04-videos', galeria: '05-galeria', prensa: '06-prensa', contacto: '07-contacto', footer: '08-footer', clubes: '09-clubes' }
const MIME = { webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', svg: 'image/svg+xml', woff2: 'font/woff2' }
const ASSET_RX = /(?:img|fonts)\/[\w.-]+\.(?:webp|png|jpe?g|svg|woff2)/g

// Datos del jugador: se evalúa player.js como en el navegador
const sandbox = { window: {} }
vm.runInNewContext(fs.readFileSync(path.join(KIT, 'player.js'), 'utf8'), sandbox)
const P = sandbox.window.P
const get = p => p.trim().split('.').reduce((o, k) => (o == null ? o : o[k]), P) ?? ''
const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const resolve = s => s.replace(/\{\{\{([^}]+)\}\}\}/g, (_, k) => get(k)).replace(/\{\{([^}]+)\}\}/g, (_, k) => esc(get(k)))

const dataUri = rel => {
  const f = path.join(KIT, rel)
  if (!fs.existsSync(f)) { console.warn(`  ! falta ${rel}`); return rel }
  return `data:${MIME[path.extname(f).slice(1).toLowerCase()]};base64,${fs.readFileSync(f).toString('base64')}`
}
const read = f => fs.readFileSync(path.join(KIT, f), 'utf8')

const files = fs.readdirSync(KIT).filter(f => /^[a-z]+-\d-[\w-]+\.html$/.test(f) && (!only.length || only.includes(f.replace('.html', ''))))
const chrome = process.env.CHROME || (fs.existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined)
const browser = await chromium.launch({ ...(chrome ? { executablePath: chrome } : {}), args: ['--no-sandbox'] })

for (const f of files) {
  const [, sec, num, slug] = f.match(/^([a-z]+)-(\d)-([\w-]+)\.html$/)
  // 1) Qué fotos usa de verdad la página (para no meter las 50 en cada archivo)
  const used = new Set()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  page.on('request', r => { const m = decodeURIComponent(r.url()).match(/\/((?:img|fonts)\/[^/?#]+)$/); if (m) used.add(m[1]) })
  page.on('pageerror', e => console.warn(`  ! ${f}: ${e.message}`))
  await page.goto(pathToFileURL(path.join(KIT, f)).href, { waitUntil: 'networkidle' })
  await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(150)
  await page.close()
  if (sec === 'galeria') P.gallery.forEach(g => used.add(g.s)) // el visor abre todas

  // 2) Armar el HTML autocontenido
  let html = read(f)
  html = html.replace('<link rel="stylesheet" href="base.css">', () => `<style>\n${read('base.css')}</style>`)
  html = html.replace(/<script src="bind\.js"><\/script>/, '')
  html = html.replace(/<script src="([\w.-]+\.js)"><\/script>/g, (_, s) => `<script>\n${read(s)}</script>`)
  html = resolve(html)
  const cache = {}
  html = html.replace(ASSET_RX, m => (used.has(m) || m.startsWith('fonts/')) ? (cache[m] ??= dataUri(m)) : m)
  html = html.replace('<head>', `<head>\n<!-- Preview generada desde kits/${KIT_NAME}/${f} con herramientas/previews/empaquetar.mjs. Para otro jugador: editá player.js del kit y volvé a correrlo. -->`)

  const outDir = outArg ? path.resolve(outArg) : path.join(ROOT, 'modelos', SECCIONES[sec], 'previews')
  fs.mkdirSync(outDir, { recursive: true })
  const base = outArg ? `${sec}-${num}-${slug}` : `${KIT_NAME}-${num}-${slug}`
  const out = path.join(outDir, `${base}.html`)
  fs.writeFileSync(out, html)

  // 3) Miniatura: página completa en desktop 1440 (como las demás previews del catálogo)
  if (!process.env.SIN_MINIATURAS) {
    const pg = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
    await pg.goto(pathToFileURL(out).href, { waitUntil: 'networkidle' })
    await pg.evaluate(() => document.fonts.ready)
    await pg.waitForTimeout(sec === 'hero' ? 2600 : 1400) // que terminen las entradas
    const shot = { path: out.replace(/\.html$/, '.jpg'), type: 'jpeg', quality: 72 }
    if (sec === 'footer') await pg.locator('footer').screenshot(shot) // sin el relleno de arriba
    else await pg.screenshot({ ...shot, fullPage: true })
    await pg.close()
  }
  console.log(`✓ ${path.relative(process.cwd(), out)} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`)
}
await browser.close()
