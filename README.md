# Tassen – Hundpensionat & Hunddagis

## Om projektet
Tassen är en webbplats för ett fiktivt hundpensionat och hunddagis. Webbplatsen gör det möjligt för besökare att läsa om tjänster, se öppettider, kontrollera vädret och boka tider för sina hundar.

## Funktioner
- Visar fem olika tjänster med beskrivningar och priser.
- Visar aktuellt datum och klockslag.
- Visar om hundpensionatet är öppet eller stängt.
- Visar öppettider för veckans alla dagar.
- Hämtar väderinformation från ett API.
- Användaren kan boka tider genom att skriva hundens namn och välja ett datum.
- Bokningar kan tas bort.
- Bokningar sparas i localStorage så att de finns kvar när sidan laddas om.
- Webbplatsen är responsiv och fungerar på både dator och mobil.

## Tekniker
- HTML – sidans struktur.
- CSS – design och responsiv layout med Flexbox, Grid och media queries.
- JavaScript – interaktiva funktioner, bokningar, klocka och väder.
- localStorage – sparar bokningar i webbläsaren.
- Fetch API – hämtar väderinformation.

## Så startar du webbplatsen
1. Öppna projektmappen.
2. Kontrollera att `index.html`, `index.css`, `index.js` och mappen `Images` finns.
3. Öppna `index.html` i en webbläsare.
4. Internet behövs för att hämta väderinformation från API:et.

## Lagring
Bokningarna sparas lokalt i webbläsaren med hjälp av localStorage. De skickas inte till någon server och är därför inte tillgängliga från andra webbläsare eller enheter.

## Reflektion
Under projektet har jag lärt mig hur HTML, CSS och JavaScript fungerar tillsammans. Jag har fått öva på att skapa en responsiv layout och använda JavaScript för att göra webbplatsen interaktiv. Jag har även lärt mig att spara data i localStorage och hämta information från ett API. En utmaning var att få layouten att fungera bra på olika skärmstorlekar.

## Buggar och felsökning
Ett problem under utvecklingen var att layouten ibland flyttades när jag lade till nytt innehåll. Jag arbetade med CSS för att förbättra placeringen av elementen. Jag kontrollerade också att HTML-elementens id:n stämde överens med JavaScript-koden. Genom att testa webbplatsen och justera koden kunde jag förbättra resultatet.

## Projektinformation
**Namn:** Tassen – Hundpensionat & Hunddagis  
**Språk:** HTML, CSS och JavaScript

## AI
Det enda jag använde AI till var när jag ville få min sökfunktion till mitt väderAPI att fungera. Själv lyckades jag att få fasta kordinater att fungera, men det blev en utmaning för mig att få till själva sökfunktionen att ändra kordinater.