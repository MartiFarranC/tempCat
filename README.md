# tempCat

Comparador de previsions de pluja per a Catalunya: tots els models gratuïts d'Open-Meteo (AROME, HARMONIE, ICON, ECMWF, GFS…), probabilitats d'ensemble i radar, hora a hora.

## Inici (`index.html`)

Pensada per al mòbil: només obrir-la, et localitza i mostra el municipi on ets, la temperatura d'ara, l'avís de pluja de les pròximes 12 hores, les pròximes hores i els 7 dies, i un botó gran cap a la ruta amb el temps.

- Temperatura i humitat d'ara: **mesures reals** de l'estació XEMA del Meteocat més representativa (a menys de 15 km i amb altitud semblant), via les dades obertes de la Generalitat (`analisi.transparenciacatalunya.cat`, datasets `yqwd-vj5e` i `nzvn-apee`). Si no n'hi ha cap de recent, el valor del model.
- Estat del cel i previsió: Open-Meteo (`best_match`).
- «Què diuen els models»: per a ara (3 h), la resta d'avui o demà, classifica cada un dels 10 models (Météo-France AROME/ARPEGE, KNMI, DWD ICON-EU, ECMWF IFS i AIFS, Met Office, GFS, GEM) en sol, sol i núvols, ennuvolat, boira, pluja, tempesta o neu, i mostra quants en diu cada cosa. Pluja = ≥ 0,3 mm a la franja; sol/núvols per la nuvolositat mitjana.
- Municipi: `data/municipis.topo.json`; fora de Catalunya, Nominatim.

## Comparador de models (`comparador.html`)

Pàgina estàtica, sense claus d'API. Publica-la amb GitHub Pages des de la branca `main`, carpeta arrel.

## Ruta amb el temps (`ruta.html`)

Tries la sortida (ubicació actual, cerca o un clic al mapa) i la destinació. Pots triar l'hora de sortida (o «Surto ara»). La pàgina dibuixa la ruta més ràpida en cotxe i mostra, per a cada municipi que travessa el trajecte, agrupat per comarca, el temps **previst a l'hora que hi passaràs**: estat del cel, temperatura, pluja o neu i probabilitat, vent i ràfegues, núvols. Si hi passes d'aquí menys de 30 minuts, és el temps d'ara.

Les rutes es poden guardar (⭐, en el `localStorage` del navegador, clau `bmc.routes`) i surten també a la portada. Una ruta guardada amb hora de sortida es recalcula cada cop que l'obres per al proper trajecte: avui si encara no l'has acabat, si no, demà.

- Ruta: OSRM (`router.project-osrm.org`), dades d'OpenStreetMap.
- Municipis i comarques de Catalunya: `data/municipis.topo.json`, límits de l'IGN (2024) simplificats, via [ArnauInes/geometries_cat_bcn_2024](https://github.com/ArnauInes/geometries_cat_bcn_2024). Fora de Catalunya, el nom del lloc ve de Nominatim (màx. 1 consulta/s).
- Temps: Open-Meteo `hourly` (i `current` per als punts de la pròxima mitja hora), consultat al punt de la carretera dins de cada municipi a l'hora de pas estimada amb les durades per tram d'OSRM.
- Mapa: Leaflet 1.9.4 servit des del mateix repo (`vendor/leaflet/`, sense CDN) amb les imatges d'OpenStreetMap (`tile.openstreetmap.org`); si no carreguen, CARTO de reserva.
- Ruta: si `router.project-osrm.org` falla o triga més de 15 s, es prova `routing.openstreetmap.de`.
- Línia del recorregut: un color per a cada tipus de previsió (sol, mig ennuvolat, cobert, boira, pluja, pluja forta, tempesta, neu) a l'hora de pas, amb degradat de 1,2 km a cada costat dels canvis. Les icones de temps al mapa només surten si es marca la casella (es recorda al navegador).
- Ràfegues: els trams amb ràfegues de 50 km/h o més tenen una vora discontínua taronja (vermella a partir de 70 km/h).

## Revisió amb comentaris (`revisio/`)

Còpies de cada pàgina per revisar-ne el disseny: `revisio/index.html`, `revisio/ruta.html` i `revisio/comparador.html`. Mostren l'original tal qual (dins d'un iframe, sense duplicar-ne el codi) i hi afegeixen una barra amb **💬 Comentar**: amb el mode actiu, tocar (o prémer Enter sobre) qualsevol element obre un camp per comentar-lo; «Tot el contenidor ↑» amplia la selecció a l'element pare. Cada comentari queda marcat amb un número sobre l'element.

- Es guarden al navegador (`localStorage`, clau `tempcat.revisio`), amb la pàgina, el selector CSS, el text de l'element, la secció i l'amplada de la vista.
- **🗒️ Comentaris** els llista i els exporta (de totes les pàgines) en Markdown o JSON per passar-los a Claude.
- Codi: `revisio/revisio.js` i `revisio/revisio.css`. Proves: `node tests/revisio.test.mjs`.

## Disseny

Les pàgines segueixen la guia d'interfície de [`docs/guia-disseny.md`](docs/guia-disseny.md) (contrast, mides de toc, teclat, moviment reduït). Les normes concretes del projecte són a [`CLAUDE.md`](CLAUDE.md).
