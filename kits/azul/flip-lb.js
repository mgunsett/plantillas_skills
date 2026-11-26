// Visor que crece desde la miniatura (FLIP con transform + clip-path).
// Abrir: 300 ms ease-out. Cerrar: 220 ms, vuelve a la miniatura. Teclado: sin animación.
// Touch: se arrastra hacia abajo para cerrar; alcanza con un gesto rápido.
(function () {
  const OUT = 'cubic-bezier(.23,1,.32,1)', IO = 'cubic-bezier(.77,0,.175,1)'
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches
  const css = document.createElement('style')
  css.textContent = `
.flb{position:fixed;inset:0;z-index:200;display:none}
.flb.on{display:block}
.flb .bd{position:absolute;inset:0;background:#050b14;opacity:0;transition:opacity 240ms ease}
.flb.show .bd{opacity:.94}
.flb .im{position:fixed;object-fit:contain;transform-origin:50% 50%;will-change:transform,clip-path;touch-action:none;user-select:none;-webkit-user-drag:none;border-radius:6px}
.flb .ui{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity 200ms ease}
.flb.show .ui{opacity:1}
.flb .ui>*{pointer-events:auto}
.flb button{position:absolute;display:grid;place-items:center;width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.16);background:rgba(11,22,38,.7);color:#fff;font-size:18px;cursor:pointer;transition:transform 140ms ${OUT},border-color 200ms ease}
.flb button:active{transform:scale(.94)}
.flb button:focus-visible{outline:2px solid #4d93d6;outline-offset:3px}
.flb .x{top:18px;right:18px}.flb .p{left:18px;top:50%;margin-top:-24px}.flb .n{right:18px;top:50%;margin-top:-24px}
.flb .cap{position:absolute;left:0;right:0;bottom:22px;text-align:center;font-size:13px;color:#d6e0ec;letter-spacing:.04em}
.flb .cap b{color:#d4a84b;font-weight:700;letter-spacing:.16em;margin-right:12px}
@media (hover:hover) and (pointer:fine){.flb button:hover{border-color:#4d93d6}}
@media (max-width:640px){.flb .p,.flb .n{top:auto;bottom:62px;margin:0}.flb .cap{bottom:24px;padding:0 70px}}`
  document.head.appendChild(css)

  const el = document.createElement('div')
  el.className = 'flb'
  el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Visor de fotos')
  el.innerHTML = `<div class="bd"></div><img class="im" alt=""><div class="ui"><button class="x" type="button" aria-label="Cerrar">✕</button><button class="p" type="button" aria-label="Foto anterior">←</button><button class="n" type="button" aria-label="Foto siguiente">→</button><div class="cap" aria-live="polite"></div></div>`
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(el))
  if (document.readyState !== 'loading') document.body.appendChild(el)
  const im = el.querySelector('.im'), bd = el.querySelector('.bd'), cap = el.querySelector('.cap')
  let list = [], idx = 0, origins = [], back = null, anim = null

  function fit(w, h) {
    const m = innerWidth < 640 ? 12 : 90, top = innerWidth < 640 ? 76 : 70, bot = innerWidth < 640 ? 120 : 70
    const mw = innerWidth - m * 2, mh = innerHeight - top - bot
    const s = Math.min(mw / w, mh / h, 1.6)
    const W = w * s, H = h * s
    return { x: (innerWidth - W) / 2, y: top + (mh - H) / 2, w: W, h: H }
  }
  function place(t) { Object.assign(im.style, { left: t.x + 'px', top: t.y + 'px', width: t.w + 'px', height: t.h + 'px' }) }
  // Transform + recorte que hacen que la foto grande coincida con la miniatura
  function fromThumb(t, r) {
    const s = Math.max(r.width / t.w, r.height / t.h)
    const iw = (t.w - r.width / s) / 2, ih = (t.h - r.height / s) / 2
    const dx = r.left + r.width / 2 - (t.x + t.w / 2), dy = r.top + r.height / 2 - (t.y + t.h / 2)
    return { transform: `translate(${dx}px,${dy}px) scale(${s})`, clipPath: `inset(${ih}px ${iw}px round ${10 / s}px)` }
  }
  const FULL = { transform: 'none', clipPath: 'inset(0px 0px round 6px)' }
  function caption() { const it = list[idx]; cap.innerHTML = `<b>${String(idx + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}</b>${it.a || ''}` }
  function load(it) { return new Promise(res => { im.onload = res; im.onerror = res; im.src = it.s; im.alt = it.a || ''; if (im.complete && im.naturalWidth) res() }) }

  async function open(items, i, originEls) {
    list = items; idx = i; origins = originEls || []; back = document.activeElement
    await load(list[idx]); caption()
    const t = fit(im.naturalWidth, im.naturalHeight); place(t)
    el.classList.add('on'); document.documentElement.style.overflow = 'hidden'; window.__lenis && window.__lenis.stop()
    const o = origins[idx]
    requestAnimationFrame(() => {
      el.classList.add('show')
      if (o && !reduce()) {
        const k = fromThumb(t, o.getBoundingClientRect())
        anim = im.animate([k, FULL], { duration: 300, easing: OUT, fill: 'both' })
      } else anim = im.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: 'ease', fill: 'both' })
      el.querySelector('.x').focus({ preventScroll: true })
    })
  }
  function finish() { el.classList.remove('on', 'show'); im.style.transform = ''; document.documentElement.style.overflow = ''; window.__lenis && window.__lenis.start(); back && back.focus && back.focus({ preventScroll: true }) }
  function close(instant) {
    if (!el.classList.contains('on')) return
    el.classList.remove('show')
    const o = origins[idx], r = o && o.getBoundingClientRect()
    const visible = r && r.bottom > 0 && r.top < innerHeight
    if (anim) anim.cancel()
    if (instant || reduce()) { finish(); return }
    const t = { x: parseFloat(im.style.left), y: parseFloat(im.style.top), w: parseFloat(im.style.width), h: parseFloat(im.style.height) }
    const from = { transform: im.style.transform || 'none', clipPath: 'inset(0px 0px round 6px)' }
    anim = visible
      ? im.animate([from, fromThumb(t, r)], { duration: 220, easing: IO, fill: 'both' })
      : im.animate([{ opacity: 1, transform: from.transform }, { opacity: 0, transform: 'translateY(24px) scale(.97)' }], { duration: 200, easing: OUT, fill: 'both' })
    anim.onfinish = () => { anim.cancel(); anim = null; finish() }
  }
  // Pasar de foto: con botón, cruce corto con blur; con teclado, instantáneo.
  async function go(d, instant) {
    if (!list.length) return
    idx = (idx + d + list.length) % list.length
    if (instant || reduce()) { if (anim) anim.cancel(); await load(list[idx]); place(fit(im.naturalWidth, im.naturalHeight)); caption(); return }
    if (anim) anim.cancel()
    const a = im.animate([{ opacity: 1, filter: 'blur(0)', transform: 'none' }, { opacity: 0, filter: 'blur(6px)', transform: `translateX(${-14 * d}px)` }], { duration: 120, easing: 'ease', fill: 'forwards' })
    await a.finished; await load(list[idx]); place(fit(im.naturalWidth, im.naturalHeight)); caption()
    a.cancel()
    anim = im.animate([{ opacity: 0, filter: 'blur(6px)', transform: `translateX(${14 * d}px)` }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { duration: 220, easing: OUT, fill: 'both' })
  }
  el.addEventListener('click', e => {
    if (e.target.closest('.x') || e.target === bd) close()
    else if (e.target.closest('.p')) go(-1)
    else if (e.target.closest('.n')) go(1)
  })
  document.addEventListener('keydown', e => {
    if (!el.classList.contains('on')) return
    if (e.key === 'Escape') close(true)
    if (e.key === 'ArrowRight') go(1, true)
    if (e.key === 'ArrowLeft') go(-1, true)
    if (e.key === 'Tab') { // foco atrapado dentro del visor
      const b = [...el.querySelectorAll('button')], f = b[0], l = b[b.length - 1]
      if (e.shiftKey && document.activeElement === f) { e.preventDefault(); l.focus() } else if (!e.shiftKey && document.activeElement === l) { e.preventDefault(); f.focus() }
    }
  })
  // Arrastrar hacia abajo para cerrar (touch). Sigue al dedo y suelta con velocidad.
  let sy = null, st = 0, dy = 0, pid = null
  im.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse' || sy !== null) return; sy = e.clientY; st = performance.now(); dy = 0; pid = e.pointerId; im.setPointerCapture(pid); if (anim) { anim.commitStyles && anim.commitStyles(); anim.cancel(); anim = null } })
  im.addEventListener('pointermove', e => {
    if (sy === null || e.pointerId !== pid) return
    dy = e.clientY - sy; const d = dy < 0 ? dy * 0.25 : dy // hacia arriba con fricción
    im.style.transform = `translateY(${d}px) scale(${1 - Math.min(Math.abs(d), 400) / 2000})`
    bd.style.opacity = String(0.94 * (1 - Math.min(Math.max(d, 0), 400) / 520))
  })
  const end = e => {
    if (sy === null || e.pointerId !== pid) return
    const v = Math.abs(dy) / (performance.now() - st); sy = null; pid = null; bd.style.opacity = ''
    if (dy > 120 || (dy > 20 && v > 0.11)) { close(); return }
    const cur = im.style.transform; im.style.transform = ''
    anim = im.animate([{ transform: cur }, { transform: 'none' }], { duration: 200, easing: OUT })
  }
  im.addEventListener('pointerup', end); im.addEventListener('pointercancel', end)
  addEventListener('resize', () => { if (el.classList.contains('on') && im.naturalWidth) place(fit(im.naturalWidth, im.naturalHeight)) })
  window.FLB = { open, close }
})()
