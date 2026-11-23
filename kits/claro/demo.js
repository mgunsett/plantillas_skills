// Página de relleno para las previews de navbar: un hero con foto y una sección por link del menú.
(function () {
  const P = window.P, m = document.getElementById('demo'); if (!m) return
  let h = `<section class="demo-hero" id="hero"><img src="${P.photos.heroWide}" alt=""><h1><small>${P.first}</small>${P.last}</h1></section>`
  P.nav.slice(1).forEach(([l, href]) => { h += `<section class="demo-sec" id="${href.slice(1)}"><div class="k">Sección</div><h2>${l}</h2><div class="ph"><i></i><i></i><i></i></div></section>` })
  m.innerHTML = h
})();
