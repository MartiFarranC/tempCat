# Sistema de revisió amb comentaris

Instruccions per muntar, en qualsevol web, una còpia de cada pàgina on pots deixar comentaris sobre qualsevol element. Després passes els comentaris a Claude perquè els apliqui. És el sistema que fa servir tempCat (`revisio/`).

## Què fa

- Hi ha una **còpia de cada pàgina** (`revisio/<pàgina>.html`). Es veu exactament igual que l'original perquè la carrega dins d'un iframe. No en duplica el codi, així que mai no queda desfasada.
- Una barra flotant té dos botons:
  - **💬 Comentar** activa el mode comentari. Tocar o fer clic en qualsevol element (o prémer Enter amb el teclat) obre un camp per escriure. Mentrestant els enllaços i botons de la pàgina no fan res. «Tot el contenidor ↑» amplia la selecció a l'element pare. Esc surt del mode.
  - **🗒️ Comentaris** mostra la llista i l'exportació.
- Cada comentari queda marcat amb un **número sobre l'element**. Si el toques, el pots editar o esborrar.
- Els comentaris es guarden al navegador (`localStorage`). Per a cada un es desa:
  - la pàgina;
  - un **selector CSS únic** de l'element;
  - una descripció (`tag#id.classe`), el text visible i la secció on és;
  - l'amplada de la pantalla (mòbil o escriptori).
- **Exportació:** es poden copiar en Markdown o descarregar en `.md` o `.json`. S'hi inclouen els de totes les pàgines, en un format pensat per enganxar-lo a Claude.

## Requisits

- **Les pàgines s'han de servir des del mateix origen que la còpia** (mateix domini). Si no, l'iframe no hi pot accedir. GitHub Pages, Netlify o un servidor local serveixen.
- No cal build ni dependències. Les pàgines originals no s'han de tocar.
- **Si la web té un *router* de SPA** (React, Vue…), funciona igual. L'adreça de la pàgina és la ruta de dins de l'iframe. Cal adaptar la funció `pagina()` si es vol separar els comentaris per ruta.
- **Si la web envia `X-Frame-Options: DENY`** o `frame-ancestors 'none'`, cal permetre `'self'`.

## Fitxers

Copia aquests fitxers de tempCat i adapta'ls:

| Fitxer | Què és | Què cal canviar |
|---|---|---|
| `revisio/revisio.js` | Tota la lògica: iframe, mode comentari, marques, editor, llista, exportació | `KEY` (clau de `localStorage`), `PAGES` (nom llegible de cada pàgina) i el títol de l'exportació a `toMarkdown` |
| `revisio/revisio.css` | Estils de la barra i els diàlegs | Els tokens de `:root` (colors clar i fosc) i la font, perquè quadrin amb la web |
| `revisio/<pàgina>.html` | Una còpia per pàgina, de 15 línies | Només `data-pagina="<pàgina>.html"` |
| `tests/revisio.test.mjs` | Proves amb Playwright (opcional) | Els selectors dels elements de prova (`#routebtn`, `#pname`…) |

Cada còpia té aquest contingut:

```html
<!doctype html>
<html lang="ca">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Revisió</title>
<link rel="stylesheet" href="revisio.css">
</head>
<body>
<script src="revisio.js" data-pagina="index.html"></script>
</body>
</html>
```

Si les pàgines no són a l'arrel, ajusta `frame.src = "../" + target + …` a `revisio.js`.

## Com funciona per dins (per si cal adaptar-lo)

1. **Iframe del mateix origen.** La còpia crea `<iframe id="pagina">` a pantalla completa amb l'original. Com que és el mateix origen, `revisio.js` accedeix a `iframe.contentDocument` i hi injecta una capa `[data-revisio]` (`position: fixed`, `pointer-events: none`) amb el ressaltat i les marques. No modifica cap estil de la pàgina.
2. **Captura d'esdeveniments.** S'escolten `click`, `mousedown`, `pointerdown`, `submit` i `keydown` a la finestra de l'iframe en fase de captura. Amb el mode actiu es fa `preventDefault` i `stopPropagation`. Així el clic tria l'element i no arriba a la pàgina.
3. **Selector estable.** S'usa `#id` si és únic. Si no, es construeix un camí `tag:nth-of-type(n)` fins a l'avantpassat més proper amb id. No es fan servir classes, perquè canvien amb l'estat (`.open`, `.active`…).
4. **Posició de les marques.** Es recalcula amb `getBoundingClientRect` un cop per fotograma quan hi ha `scroll` (en captura, per als contenidors amb scroll intern), `resize` o un `MutationObserver` del `body`. Si l'element ja no hi és (contingut dinàmic), la marca s'amaga i la llista diu «ara no és a la pàgina».
5. **Navegació.** Si dins l'iframe vas a una altra pàgina, l'adreça de la còpia canvia amb `history.replaceState` i la capa es torna a injectar a l'esdeveniment `load`.

## Flux de treball

1. Obre `https://<la-teva-web>/revisio/<pàgina>.html`, al mòbil o a l'ordinador.
2. Prem **💬 Comentar**, toca un element i escriu què vols canviar. Si has tocat una part massa petita, prem «Tot el contenidor ↑» fins que el ressaltat cobreixi el bloc que vols.
3. Repeteix-ho a totes les pàgines. Els comentaris es guarden al navegador.
4. Prem **🗒️ Comentaris** i després **Copia en Markdown**. Si no deixa copiar, prem **Descarrega .md**.
5. Enganxa el text a Claude amb el prompt de sota.
6. Quan Claude hagi aplicat els canvis, recarrega les còpies per revisar-los. Pots esborrar els comentaris ja resolts, o tots amb «Esborra'ls tots».

**Consell:** escriu els comentaris com a ordres concretes («elimina aquest bloc», «ha de ser només icona»). Quan sigui un gust («no m'agrada»), afegeix què prefereixes. Si no ho fas, Claude haurà d'endevinar-ho.

## Prompt per demanar a Claude que el munti en un projecte nou

> Afegeix al repositori un sistema de revisió amb comentaris com el de tempCat (docs/sistema-revisio-comentaris.md de github.com/MartiFarranC/tempCat). Per a cada pàgina, una còpia a `revisio/<pàgina>.html` que carregui l'original en un iframe del mateix origen. Un script compartit `revisio/revisio.js` hi injectarà un mode comentari:
> - clicar o prémer Enter sobre qualsevol element obre un editor amb el selector CSS únic de l'element i un botó per ampliar la selecció al pare;
> - marques numerades sobre els elements comentats;
> - llista de comentaris;
> - exportació en Markdown i JSON de totes les pàgines;
> - desat a localStorage.
>
> No toquis les pàgines originals. Fes que segueixi l'estil i els tokens de color de la web (clar i fosc), amb zones tàctils de 44 px i que funcioni amb el teclat. Afegeix proves amb Playwright. Dona'm els enllaços de les còpies.

## Prompt per passar-li els comentaris

> Aquí tens els comentaris de revisió exportats. Cada un porta la pàgina, el selector CSS de l'element, el text visible i l'amplada de pantalla on el vaig fer. Aplica'ls a les pàgines originals (no a les còpies de `revisio/`). Quan un comentari sigui ambigu, tria la interpretació més probable i digues-me quina has triat. Prova-ho en mòbil i escriptori i puja-ho.
>
> *(enganxa aquí el Markdown)*

## Limitacions

- **Els comentaris són per navegador.** Els del mòbil i els de l'ordinador no es comparteixen. Exporta'ls de cada aparell. Si cal compartir-los entre persones, es pot canviar `load` i `save` de `revisio.js` per una API o una base de dades.
- **El contingut que es genera amb JavaScript pot canviar de posició** (llistes, resultats). Llavors el selector pot apuntar a un altre element o a cap. El text i la secció desats ajuden a identificar-lo igualment.
- **El contingut d'un iframe de tercers** (un mapa incrustat d'un altre domini, un vídeo) no es pot seleccionar per dins. Selecciona'n el contenidor.
