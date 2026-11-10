// Renderiza og.html a og-image.jpg (1200×630) para Open Graph / WhatsApp / X.
// Uso: node og.mjs [ruta/a/og.html] [salida.jpg]
// Requiere playwright-core y Chrome (ajustá CHROME si está en otra ruta).
import { chromium } from 'playwright-core'
import { pathToFileURL } from 'url'
import path from 'path'
const src = path.resolve(process.argv[2] || 'og.html')
const out = path.resolve(process.argv[3] || 'og-image.jpg')
const CHROME = process.env.CHROME || '/usr/bin/google-chrome'
const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.goto(pathToFileURL(src).href)
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(300)
await page.screenshot({ path: out, type: 'jpeg', quality: 86 })
await browser.close()
console.log('OG lista:', out)
