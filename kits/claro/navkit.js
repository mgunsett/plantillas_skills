// Ayudas comunes de los navbar del kit: links desde player.js, sección activa, estado de scroll
// y apertura automática del menú con #open (lo usa el comparador para mostrar el menú abierto en mobile).
window.NK = {
  links(el, tpl) { el.innerHTML = window.NAVL.map(([l, h], i) => tpl(l, h, i)).join('') },
  spy(cb) {
    const ids = window.NAVL.map(([, h]) => h.slice(1)), seen = {}
    const io = new IntersectionObserver(es => {
      es.forEach(e => { seen[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0 })
      let best = ids[0], r = -1; ids.forEach(id => { if ((seen[id] || 0) > r) { r = seen[id] || 0; best = id } })
      cb('#' + best)
    }, { threshold: [0, .25, .5, .75, 1], rootMargin: '-20% 0px -40% 0px' })
    ids.forEach(id => { const s = document.getElementById(id); if (s) io.observe(s) })
  },
  scroll(cb) { let last = 0; const f = () => { const y = scrollY; cb(y, y > last); last = y }; addEventListener('scroll', f, { passive: true }); f() },
  go(e) { const a = e.target.closest('a[href^="#"]'); if (!a) return; const t = document.querySelector(a.getAttribute('href')); if (!t) return; e.preventDefault(); t.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }) },
  autoOpen(fn) { if (location.hash === '#open') setTimeout(fn, 400) },
};
