# tempCat: notes per a qui hi treballi

- Web estàtica (HTML + CSS + JS dins de cada pàgina, sense build), publicada a GitHub Pages des de `main`.
- Pàgines: `index.html` (portada mòbil), `ruta.html` (ruta amb el temps), `comparador.html` (comparador de models).
  `ui.js` té el comportament compartit (teclat als cercadors).
- `revisio/` té còpies per comentar cada pàgina: carreguen l'original en un iframe, així que no cal tocar-les quan canvia una pàgina. Si se n'afegeix una de nova, crea `revisio/<nom>.html` (copia'n una) i afegeix-la a `PAGES` de `revisio/revisio.js`. Proves: `node tests/revisio.test.mjs`.
- Textos de la interfície en català.

## Disseny d'interfície

Qualsevol canvi d'interfície ha de seguir `docs/guia-disseny.md` (guia UI/HCI per a mòbil i escriptori).
Abans de donar per bo un canvi, passa les llistes de la §23 (sobretot 23.1, 23.2 i 23.5). Resum del que ja apliquen les pàgines:

- Colors només amb els tokens de `:root` (clar i fosc). Text ≥ 4,5:1; vores de camps i controls ≥ 3:1 (`--field`).
- Zones tàctils ≥ 44 px (camps, botons, resultats de cerca); controls secundaris ≥ 40 px.
- Text base 16 px; res per sota de 12 px (`.75rem`).
- Focus visible: `outline: 3px solid var(--accent)`; tot el que es pot tocar també funciona amb teclat (Enter/Espai, Esc tanca).
- Icones emoji amb significat: `role=img` + `aria-label`; decoratives: `aria-hidden`. Text només per a lectors de pantalla: `.sr`.
- Moviment només dins `@media (prefers-reduced-motion: no-preference)`, animant `transform`/`opacity`, mai `transition: all`.
- Hover només dins `@media (hover: hover)` quan és decoració; cap funció depèn del hover.
