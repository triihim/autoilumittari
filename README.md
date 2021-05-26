# Autoilumittari
Ratkaisu Solidabiksen koodihaasteeseen 2021.

## Yleistä
Tavoitteena oli luoda mahdollisimman selkeäkäyttöinen ja yksinkertainen käyttöliittymä matka-ajan ja polttoaineenkulutuksen vertailuun kahden eri nopeuden välillä.

Haaste on toteutettu raa'alla HTML:llä, CSS:llä ja TypeScriptillä ilman ylimääräisiä kirjastoja tai frameworkkeja. Kehitysympäristönä toimi Ubuntu 20.

## Toteutus
Matka-ajan ja polttoaineenkulutuksen laskeminen on melko kevyt ja suoraviivainen operaatio. Näin ollen vertailu suoritetaan ja vertailutaulukko päivitetään aina käyttäjän muuttaessa jotakin vertailuun vaikuttavaa parametria. Tämä pitää sovelluksen suoraviivaisena ja helppokäyttöisenä.

Toteutuksen kannalta olennaisimmat osat löytyvät tiedostoista:
- src/ts/fuel-consumption.ts
- src/ts/drive-duration.ts
- src/ts/comparison.ts

Kaikki käyttöliittymän manipulointiin ja näin ollen sivuvaikutuksia sisältävä toiminnallisuus on keskitetty tiedostoon:
- src/ts/ui.ts

## Käynnistys

```
npm install
npm start
```
