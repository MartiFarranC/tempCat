# tempCat

Comparador de previsions de pluja per a Catalunya: tots els models gratuïts d'Open-Meteo (AROME, HARMONIE, ICON, ECMWF, GFS…), probabilitats d'ensemble i radar, hora a hora.

Pàgina estàtica (`index.html`), sense claus d'API. Publica-la amb GitHub Pages des de la branca `main`, carpeta arrel.

## Ruta amb el temps (`ruta.html`)

Tries la sortida (ubicació actual, cerca o un clic al mapa) i la destinació. La pàgina dibuixa la ruta més ràpida en cotxe i mostra el temps **actual** a cada municipi que travessa el trajecte, agrupat per comarca: estat del cel, temperatura, pluja o neu, vent i ràfegues, núvols.

- Ruta: OSRM (`router.project-osrm.org`), dades d'OpenStreetMap.
- Municipis i comarques de Catalunya: `data/municipis.topo.json`, límits de l'IGN (2024) simplificats, via [ArnauInes/geometries_cat_bcn_2024](https://github.com/ArnauInes/geometries_cat_bcn_2024). Fora de Catalunya, el nom del lloc ve de Nominatim (màx. 1 consulta/s).
- Temps: Open-Meteo `current`, consultat al punt de la carretera dins de cada municipi.
- Mapa: Leaflet + CARTO/OSM.

## TODO

- [ ] **Fase 2 de la ruta: temps a l'hora d'arribada.** En lloc del temps d'ara a tot arreu, mostrar a cada punt el temps previst per a l'hora en què hi passaràs (sortida = ara, destinació = ara + durada del trajecte). Exemple: Barcelona → Andorra, si són 3 h, a Barcelona el temps d'ara i a Andorra la previsió d'aquí 3 h. Ja es calcula l'hora de pas de cada tram (`s.eta`, a partir de les durades per tram d'OSRM); falta demanar a Open-Meteo `hourly`/`minutely_15` i agafar el valor de l'hora de pas. Opcional: triar l'hora de sortida.
