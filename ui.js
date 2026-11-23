// Comportament compartit de les pàgines (vegeu docs/guia-disseny.md, §15.2 i §23.3).
// Cercadors (.search amb un <input> i una llista .results de botons):
//   ↓ des del camp va al primer resultat, ↑/↓ es mouen per la llista,
//   Esc tanca la llista i torna el focus al camp.
(() => {
  document.addEventListener("keydown", (e) => {
    const box = e.target.closest?.(".search");
    if (!box) return;
    const input = box.querySelector("input");
    const list = box.querySelector(".results");
    if (!input || !list) return;
    const items = [...list.querySelectorAll("button")];
    const open = !list.hidden && items.length > 0;
    const i = items.indexOf(e.target);
    if (e.key === "Escape" && !list.hidden) {
      list.hidden = true; input.focus(); e.preventDefault(); e.stopPropagation();
    } else if (e.key === "ArrowDown" && open) {
      items[Math.min(i + 1, items.length - 1)].focus(); e.preventDefault();
    } else if (e.key === "ArrowUp" && open && i >= 0) {
      (i === 0 ? input : items[i - 1]).focus(); e.preventDefault();
    }
  }, true);
})();
