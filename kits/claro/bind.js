// Reemplaza {{campo}} (texto) y {{{campo}}} (HTML) por los valores de window.P.
// Solo hace falta para abrir los HTML del kit sueltos; empaquetar.mjs ya lo resuelve.
(function () {
  const get = p => p.trim().split('.').reduce((o, k) => (o == null ? o : o[k]), window.P) ?? '';
  const RX = /\{\{\{([^}]+)\}\}\}|\{\{([^}]+)\}\}/g;
  document.title = document.title.replace(RX, (_, a, b) => get(a || b));
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  const texts = [];
  for (let n = w.currentNode; n; n = w.nextNode()) {
    if (n.nodeType === 1) {
      if (n.tagName === 'SCRIPT' || n.tagName === 'STYLE') continue;
      for (const at of [...n.attributes]) if (at.value.includes('{{')) at.value = at.value.replace(RX, (_, a, b) => get(a || b));
    } else if (n.nodeValue.includes('{{') && n.parentNode.tagName !== 'SCRIPT') texts.push(n);
  }
  for (const t of texts) {
    if (t.nodeValue.includes('{{{')) {
      const tpl = document.createElement('template');
      tpl.innerHTML = t.nodeValue.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])).replace(RX, (_, a, b) => a ? get(a) : String(get(b)).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])));
      t.replaceWith(tpl.content);
    } else t.nodeValue = t.nodeValue.replace(RX, (_, a, b) => get(a || b));
  }
})();
