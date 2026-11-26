// Uso: node previews/shots.mjs <kit> <salida> [diseños…] → <diseño>-d.jpg (1440) y -m.jpg (390), primera pantalla + página entera
import { chromium } from 'playwright-core'
import fs from 'fs'; import path from 'path'; import { pathToFileURL } from 'url'
const [kit, out, ...only] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true })
const files = fs.readdirSync(kit).filter(f => /^[a-z]+-\d-[\w-]+\.html$/.test(f) && (!only.length || only.some(o => f.startsWith(o))))
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] })
for (const f of files) for (const [n, w, h] of [['d', 1440, 900], ['m', 390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } }); const errs = []
  p.on('pageerror', e => errs.push(e.message))
  await p.goto(pathToFileURL(path.resolve(kit, f)).href, { waitUntil: 'networkidle' }); await p.waitForTimeout(2200)
  await p.screenshot({ path: `${out}/${f.replace('.html', '')}-${n}.jpg`, type: 'jpeg', quality: 60, fullPage: !f.startsWith('navbar') && !f.startsWith('hero') })
  if (errs.length) console.log(f, n, errs.join(' | ')); await p.close()
}
await b.close()
