import type { UseCaseLocaleFile } from "../useCases";

// Nederlands, met "je" zoals in de App Store. App-termen volgen de Nederlandse
// app: "item", "taak", "notitie", "document". Regels: src/i18n/useCases.ts.
const nl: UseCaseLocaleFile = {
  locale: "nl",
  ui: {
    home: "Home",
    useCases: "Toepassingen",
    trackHeading: "Wat je in het project bijhoudt",
    stepsHeading: "Zo zet je het op in Home Stories",
    faqHeading: "Veelgestelde vragen",
    proNote:
      "Gratis op iPhone en iPad (iOS 17 of nieuwer). Geen account, werkt offline. Pro is een optionele eenmalige aankoop voor de grafiek budget versus werkelijk, taakherinneringen, PDF-export, iCloud-synchronisatie en project delen.",
    heroCta: "Download Home Stories – gratis",
    footerHeading: "Begin vandaag aan het project",
    footerBody:
      "Home Stories is een gratis verbouwingstracker voor iPhone en iPad. Budget, taken, foto's, notities en documenten staan in één project, op je eigen apparaat.",
    footerCta: "Download Home Stories gratis in de App Store",
    otherHeading: "Andere toepassingen",
    moreInEnglish: "Meer toepassingen (in het Engels)",
    readingHeading: "Verder lezen (in het Engels)",
  },
  hub: {
    metaTitle: "Toepassingen: keuken, badkamer, kluswoning | Home Stories",
    metaDescription:
      "Zo gebruik je Home Stories voor een nieuwe keuken, een badkamerverbouwing, een kluswoning, onderhoud aan je huis en verbouwen met je partner.",
    h1: ["Eén app,", "elke klus"],
    intro:
      "Home Stories houdt het budget, de taken, foto's, notities en documenten van een project op één plek. Een project kan een keuken zijn, een badkamer, een kluswoning die je kamer voor kamer opknapt, of de lange lijst met kleine reparaties. Kies de klus die jij hebt.",
    imageAlt: "Bouwtekeningen op een multiplex plaat over een schraag, met een potlood, een schaallat en een kop koffie",
    englishNote:
      "Zolder, kelder, uitbouw, garage, tuin, verhuur en de andere toepassingen zijn voorlopig alleen in het Engels beschikbaar:",
    englishLink: "bekijk alle toepassingen",
  },
  entries: [
    {
      slug: "kitchen-renovation",
      label: "Nieuwe keuken",
      h1: "Nieuwe keuken: houd het budget, de vakmensen en de foto's bij",
      metaTitle: "Keuken verbouwen – budget en planning | Home Stories",
      metaDescription:
        "Houd je keukenverbouwing bij op je iPhone: het budget, de prijs van apparatuur en werkblad, de volgorde van de vakmensen, offertes en voor-en-na-foto's.",
      imageAlt: "Een keuken met nieuwe witte kasten en een stenen werkblad, de vloer nog niet af",
      intro: [
        "Een keuken is de verbouwing met de meeste losse posten: kasten, werkblad, apparatuur, spoelbak, kraan, tegels en verlichting, plus de loodgieter, de elektricien en de keukenmonteur. In Home Stories wordt elk ervan een item met een prijs, zodat het lopende totaal altijd klopt.",
        "De volgorde telt net zo zwaar als het geld. Water, afvoer en stroom moeten klaar zijn voordat de kasten komen, en het werkblad kan pas worden ingemeten als de kasten staan. Zet elke stap als taak met een datum in het project, dan zie je op welke vakman de volgende wacht.",
        "Kies je voor inductie, vraag de elektricien dan of je groepenkast een extra groep nodig heeft. Zijn offerte hoort in hetzelfde project.",
      ],
      track: [
        { title: "Elk product met zijn prijs", body: "Maak een foto van de spoelbak in de showroom of deel de oven vanuit Safari. Prijs, winkel en een notitie komen op het item, en het item telt mee in het totaal." },
        { title: "Arbeid los van materiaal", body: "Boek wat je de monteur en de elektricien betaalt als arbeid. Dan zie je of de montage goedkoop was en het materiaal het budget opat." },
        { title: "Offerte en werkbladbestelling", body: "De offerte van de keukenzaak, de werkbladbestelling en de pakbon bewaar je als documenten in het project." },
        { title: "De volgorde van de vakmensen", body: "Slopen, leidingwerk en elektra, stucen en schilderen, kasten, werkblad inmeten, werkblad plaatsen, achterwand, aansluiten. Eén taak per stap." },
        { title: "Voor en na", body: "Fotografeer de oude keuken voordat hij eruit gaat. De vergelijking naast elkaar aan het eind is de foto waar iedereen om vraagt." },
      ],
      steps: [
        "Maak een project \"Keuken\" aan, met een startdatum en het totale budget in euro.",
        "Voeg een item toe voor elke kastenwand, elk apparaat, het werkblad en de kraan zodra je ze kiest.",
        "Zet de volgorde van de vakmensen erin als taken met een deadline.",
        "Leg elke betaling vast als materiaal, arbeid of aannemer.",
        "Maak bij elke fase foto's. De tijdlijn bouwt zichzelf op.",
      ],
      screenshotAlt: "Itemlijst in Home Stories: elk product met zijn prijs, opgeteld tot het projecttotaal",
      faq: [
        { q: "Kan ik het budget van een nieuwe keuken op mijn iPhone bijhouden?", a: "Ja. Maak een project met een budget en voeg elk apparaat, elke kast en elke kraan toe als item met een prijs. Home Stories houdt het lopende totaal bij. De app is gratis, werkt offline en heeft geen account nodig." },
        { q: "Heb ik een vergunning nodig voor een nieuwe keuken?", a: "Voor het vervangen van een keuken meestal niet. Wil je een draagmuur weghalen om de keuken open te maken, laat dan een constructeur rekenen en vraag bij je gemeente na of je een melding of vergunning nodig hebt. Bewaar de berekening en het antwoord als documenten in het project." },
        { q: "Zie ik het als de keuken over budget gaat?", a: "Het lopende totaal is gratis en altijd zichtbaar. De grafiek budget versus werkelijk, die de overschrijding laat aankomen, hoort bij de optionele eenmalige Pro-upgrade." },
      ],
      howToName: "Zo zet je een keukenproject op in Home Stories",
    },
    {
      slug: "bathroom-remodel",
      label: "Badkamer verbouwen",
      h1: "Badkamer verbouwen: plan het van slopen tot de laatste tegel",
      metaTitle: "Badkamer verbouwen – planning en budget | Home Stories",
      metaDescription:
        "Plan je badkamerverbouwing op iPhone en iPad: tegels, sanitair en arbeid op één budget, waterdichting en droogtijd als taken, en foto's van de leidingen.",
      imageAlt: "Een nieuw wit bad in een badkamer die wordt verbouwd, met open houten stijlen en koperen leidingen in de muur",
      intro: [
        "Een badkamer is een kleine ruimte met een lange volgorde. Slopen, leidingwerk, dekvloer, waterdichting, droogtijd, tegelen en afmonteren moeten in die volgorde gebeuren, en het grootste deel van de kosten is werk dat je niet meer ziet als de tegels erop zitten.",
        "Home Stories houdt de tegels, het sanitair en de arbeid op één budget en de volgorde als taken. De belangrijkste gewoonte: een foto van elke leiding en van de waterdichting voordat de muur dichtgaat. Die foto heb je over vijf jaar nodig.",
      ],
      track: [
        { title: "Foto's van wat achter de tegels verdwijnt", body: "Leidingen, waterdichting, de afvoerput, vloerverwarming. Maak ze op de dag zelf, dan staan ze met datum op de tijdlijn." },
        { title: "Tegels per vierkante meter", body: "Tegels, tegellijm en voegmiddel als items. Noteer naam, kleur en partijnummer, zodat bijkopen straks klopt." },
        { title: "Sanitair en de papieren", body: "Douche, toilet en wastafel als items, handleidingen en garantiebewijzen als documenten." },
        { title: "Droogtijd als taak", body: "De dekvloer en de waterdichting moeten drogen. Een taak met een datum voorkomt dat de tegelzetter een dag te vroeg begint." },
        { title: "Loodgieter en tegelzetter apart", body: "Leg de betalingen per vakman vast als arbeid of aannemer, dan weet je aan het eind wat elk vak heeft gekost." },
      ],
      steps: [
        "Maak een project \"Badkamer\" aan met een startdatum en een budget.",
        "Fotografeer de badkamer voordat het slopen begint.",
        "Voeg tegels, sanitair en materiaal toe als items met prijzen.",
        "Zet de volgorde erin als taken, met de droogtijd als eigen taak.",
        "Fotografeer de leidingen en de waterdichting voordat de muren dichtgaan.",
      ],
      screenshotAlt: "Projectscherm in Home Stories met de fototijdlijn en taken met geregistreerde tijd",
      faq: [
        { q: "Wat moet ik fotograferen tijdens een badkamerverbouwing?", a: "Alles wat de tegels gaan bedekken: de water- en afvoerleidingen, de waterdichting, de afvoerput en elektra in de buurt van de douche. Die foto's zijn je bewijs als er later een lekkage komt." },
        { q: "Kan ik het partijnummer van de tegels in de app bewaren?", a: "Ja. Voeg de tegels toe als item en zet naam, kleur en partijnummer in de notitie. Je hebt het nodig als er een tegel barst en je moet bijkopen." },
        { q: "Is Home Stories gratis voor één badkamer?", a: "Ja. Projecten, items, foto's, notities, documenten en taken zijn gratis en onbeperkt. Pro is een optionele eenmalige aankoop voor de grafiek, herinneringen, PDF-export, iCloud-synchronisatie en delen." },
      ],
      howToName: "Zo zet je een badkamerverbouwing op in Home Stories",
    },
    {
      slug: "fixer-upper",
      label: "Kluswoning",
      h1: "Een kluswoning gekocht? Knap hem op, project voor project",
      metaTitle: "Kluswoning opknappen – plan per kamer | Home Stories",
      metaDescription:
        "Knap een kluswoning op terwijl je erin woont: foto's van elke kamer op dag één, eerst dak, vocht en verwarming, daarna een budget per kamer.",
      imageAlt: "Een lege kamer in een net gekocht ouder huis in ochtendlicht, met kale muren en één verhuisdoos",
      intro: [
        "Een kluswoning is niet één verbouwing. Het zijn er veel kleine, verspreid over een paar jaar, terwijl je er woont. De volgorde telt: lekkages, veiligheid en verwarming eerst, de mooie kamers later.",
        "Het rapport van de bouwkundige keuring is een goed begin: de gebreken die daarin als urgent staan, horen in het eerste project. In Home Stories krijgt elke klus een eigen project, met een eigen budget en eigen foto's.",
        "Is het huis van vóór 1994, dan kan er asbest in zitten. Laat dat onderzoeken voordat er gesloopt wordt, en bewaar het rapport in het project.",
      ],
      track: [
        { title: "De nulmeting op dag één", body: "Fotografeer elke kamer voordat je uitpakt. Zo zie je altijd in welke staat je het huis hebt gekocht." },
        { title: "Moet nu en kan wachten", body: "Eén project voor het dringende werk, aparte projecten voor de kamers die kunnen wachten." },
        { title: "Wat er in de muren zit", body: "Als een vakman een muur of vloer openmaakt, fotografeer wat erin zit en voeg de nieuwe kosten toe als item." },
        { title: "Jaren aan bonnetjes", body: "Elke reparatie en verbetering met de bon erbij, in het project waar hij hoort. Handig als je het huis ooit weer verkoopt." },
      ],
      steps: [
        "Maak een project \"Dag één\" aan en fotografeer elke kamer.",
        "Bewaar het keuringsrapport als document.",
        "Maak een project \"Moet nu\" voor dak, vocht, elektra en verwarming.",
        "Maak een project per kamer voor het werk dat kan wachten.",
        "Voeg elke verrassing toe als item met een foto.",
      ],
      screenshotAlt: "Projectenlijst in Home Stories, elk project met zijn eigen budget",
      faq: [
        { q: "Waar begin ik met een kluswoning?", a: "Met wat onveilig is of water binnenlaat: lekkages, elektra, verwarming, het dak. Cosmetisch werk komt daarna." },
        { q: "Moet elke kamer een eigen project krijgen?", a: "Ja, als de kamers op verschillende momenten aan de beurt zijn. Elk project heeft dan zijn eigen budget, taken en fototijdlijn." },
        { q: "Kan ik jaren aan verbouwingsgegevens back-uppen?", a: "Ja. Lokale back-ups en een volledige gegevensexport zijn gratis. iCloud-synchronisatie (Pro) houdt de projecten ook op je andere apparaten." },
      ],
      howToName: "Zo zet je het opknappen van een kluswoning op in Home Stories",
    },
    {
      slug: "home-repairs-and-maintenance",
      label: "Onderhoud aan huis",
      h1: "Houd een logboek bij van reparaties en onderhoud aan je huis",
      metaTitle: "Onderhoud aan huis bijhouden – app | Home Stories",
      metaDescription:
        "Houd elke reparatie en onderhoudsbeurt aan je huis bij: wat er is gedaan, door wie, wat het kostte en wanneer het weer moet. Met foto's en facturen.",
      imageAlt: "De voordeur van een gestuct huis met een houten ladder tegen de muur, een gereedschapskist en werkhandschoenen op de stoep",
      intro: [
        "Elk huis verzamelt een lange lijst kleine klussen: een druppende kraan, de dakgoot, het onderhoud van de cv-ketel, een deur die klemt. Elke klus is klein, maar samen zijn ze een groot deel van wat een huis per jaar kost.",
        "In Home Stories maak je een onderhoudsproject voor het huis, met elke reparatie als taak en elke uitgave als item. Gaat er iets opnieuw kapot, dan zie je wie het de vorige keer deed en wat hij rekende.",
      ],
      track: [
        { title: "Elke klus als taak", body: "Wat er moet gebeuren, met een datum. Afgeronde klussen blijven in het logboek staan." },
        { title: "Wie het deed", body: "Een notitie met de naam en het nummer van de vakman, bij de klus die hij deed." },
        { title: "Wat terugkomt", body: "Cv-ketel laten onderhouden, dakgoot schoonmaken, rookmelders testen. Maak een taak voor de volgende keer zodra je deze afrondt." },
        { title: "Kosten over het jaar", body: "Elke reparatie als item, zodat je het jaartotaal hebt als je het onderhoudsbudget voor volgend jaar maakt." },
      ],
      steps: [
        "Maak een project \"Onderhoud\" aan voor het huis.",
        "Voeg elke reparatie of onderhoudsbeurt toe als taak met een datum.",
        "Leg de kosten vast als item.",
        "Bewaar de factuur als document en de vakman in een notitie.",
      ],
      screenshotAlt: "Takenlijst in Home Stories met deadlines en geregistreerde tijd",
      faq: [
        { q: "Hoe maak ik een onderhoudsplan voor mijn huis?", a: "Maak één project voor het huis. Zet het vaste onderhoud erin als taken met een datum, zoals de cv-ketel, de dakgoten en de rookmelders, en elke reparatie met zijn prijs als item. De factuur bewaar je als document." },
        { q: "Kan de app me herinneren aan de volgende onderhoudsbeurt?", a: "Taken met een deadline zijn gratis. Herinneringen voor die taken horen bij de optionele eenmalige Pro-upgrade." },
        { q: "Kan ik zien wat er als volgende komt zonder de app te openen?", a: "Ja. De gratis widgets op het beginscherm tonen de budgetvoortgang en wat er als volgende komt." },
      ],
      howToName: "Zo zet je een onderhoudslogboek voor je huis op in Home Stories",
    },
    {
      slug: "renovating-with-a-partner",
      label: "Samen verbouwen",
      h1: "Samen met je partner verbouwen vanuit één gedeeld project",
      metaTitle: "Samen verbouwen – app voor stellen | Home Stories",
      metaDescription:
        "Deel een verbouwingsproject met je partner of gezin (Pro): hetzelfde budget, dezelfde taken, items en foto's op elke iPhone en iPad, gelijk via iCloud.",
      imageAlt: "Een vrouw in een half verbouwde kamer die kijkt naar briefjes op de kale muur",
      intro: [
        "De meeste ruzies tijdens een verbouwing gaan over geld dat niemand opschreef en beslissingen waar de ander niets van wist. Een gedeeld overzicht haalt de meeste weg.",
        "Met Pro deel je een project in Home Stories met je partner of gezin. Jullie zien hetzelfde budget, dezelfde taken, items en foto's, en wijzigingen komen via iCloud op de telefoon van de ander.",
      ],
      track: [
        { title: "Eén budget", body: "Jullie zetten allebei in wat je betaalt. Het lopende totaal klopt, ook na een zaterdag bij de bouwmarkt." },
        { title: "Wie doet wat", body: "Taken met een datum, zodat de lijst voor jullie allebei duidelijk is." },
        { title: "Keuzes op één plek", body: "Jullie delen allebei producten vanuit Safari naar het project en beslissen samen, met de prijs ernaast." },
        { title: "Jullie eigen iCloud", body: "Delen loopt via iCloud. Er is geen account en geen server van ons tussen." },
      ],
      steps: [
        "Maak het project aan en stel samen het budget vast.",
        "Upgrade naar Pro (één aankoop, Delen met gezin inbegrepen).",
        "Deel het project met je partner.",
        "Voeg ieder onderweg items, betalingen en foto's toe.",
      ],
      screenshotAlt: "Takenlijst in Home Stories met deadlines en geregistreerde tijd",
      faq: [
        { q: "Kunnen mijn partner en ik hetzelfde verbouwingsproject gebruiken?", a: "Ja, met Pro. Met project delen nodig je een partner of familielid uit, en iedereen ziet via iCloud dezelfde taken, items en foto's." },
        { q: "Moeten we allebei Pro kopen?", a: "Pro is één aankoop met Delen met gezin, dus de mensen in je Apple-gezinsgroep krijgen het ook." },
        { q: "Heb je voor delen een account nodig?", a: "Nee. Er is geen Home Stories-account. Delen en synchroniseren lopen via jullie eigen iCloud." },
      ],
      howToName: "Zo deel je een verbouwingsproject met je partner in Home Stories",
    },
  ],
};

export default nl;
