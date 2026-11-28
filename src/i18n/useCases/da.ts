import type { UseCaseLocaleFile } from "../useCases";

// Dansk. App-ordene følger den danske app: "emne" (item), "opgave", "note",
// "dokument". Se src/i18n/useCases.ts for reglerne.
const da: UseCaseLocaleFile = {
  locale: "da",
  ui: {
    home: "Forside",
    useCases: "Anvendelser",
    trackHeading: "Det hører med i projektet",
    stepsHeading: "Sådan sætter du det op i Home Stories",
    faqHeading: "Ofte stillede spørgsmål",
    proNote:
      "Gratis på iPhone og iPad (iOS 17 eller nyere). Ingen konto, og appen virker offline. Pro er et valgfrit engangskøb, der giver grafen over budget mod faktisk forbrug, opgavepåmindelser, PDF-eksport, iCloud-synkronisering og projektdeling.",
    heroCta: "Hent Home Stories – gratis",
    footerHeading: "Start projektet i dag",
    footerBody:
      "Home Stories er et gratis renoveringsværktøj til iPhone og iPad. Budget, opgaver, billeder, noter og dokumenter ligger i ét projekt, på din egen enhed.",
    footerCta: "Hent Home Stories gratis i App Store",
    otherHeading: "Andre anvendelser",
    moreInEnglish: "Flere anvendelser (på engelsk)",
    readingHeading: "Læs videre (på engelsk)",
  },
  hub: {
    metaTitle: "Anvendelser: køkken, bad, hus og vedligehold | Home Stories",
    metaDescription:
      "Sådan bruger du Home Stories til et nyt køkken, et nyt bad, et håndværkertilbud, vedligeholdelse af huset og renovering sammen med din partner.",
    h1: ["Én app,", "hele huset"],
    intro:
      "Home Stories samler budget, opgaver, billeder, noter og dokumenter for et projekt ét sted. Et projekt kan være et køkken, et badeværelse, et hus, der trænger til en kærlig hånd, eller den lange liste af små reparationer. Vælg det, du står med.",
    imageAlt: "Arkitekttegninger på en krydsfinerplade over en bukk, med blyant, målestok og en kop kaffe",
    englishNote:
      "Loft, kælder, tilbygning, garage, have, udlejning og de øvrige anvendelser findes indtil videre kun på engelsk:",
    englishLink: "se alle anvendelser",
  },
  entries: [
    {
      slug: "kitchen-renovation",
      label: "Nyt køkken",
      h1: "Nyt køkken: hold styr på budgettet, håndværkerne og billederne",
      metaTitle: "Nyt køkken – app til budget og plan | Home Stories",
      metaDescription:
        "Hold styr på et nyt køkken på iPhone: budgettet, prisen på hvidevarer og bordplade, rækkefølgen for håndværkerne, tilbud og billeder før og efter.",
      imageAlt: "Et køkken med nye hvide skabe og stenbordplader, gulvet endnu ikke lagt færdigt",
      intro: [
        "Et nyt køkken er den renovering med flest poster: skabe, bordplade, hvidevarer, vask, armatur, fliser og lys, og så VVS'eren, elektrikeren og montøren. I Home Stories bliver hver af dem et emne med en pris, så den løbende sum altid er den rigtige.",
        "Rækkefølgen betyder lige så meget som pengene. Vand, afløb og el skal være på plads, før skabene kommer op, og bordpladen kan først måles op, når skabene står. Læg hvert trin ind som en opgave med en dato, så ser du, hvilken håndværker den næste venter på.",
        "Flytter du vask, opvaskemaskine eller komfur, er det arbejde for en autoriseret VVS-installatør og en autoriseret elinstallatør. Deres tilbud og fakturaer hører til i samme projekt.",
      ],
      track: [
        { title: "Hvert produkt med sin pris", body: "Tag et billede af vasken i butikken, eller del ovnen fra Safari. Pris, butik og en note kommer på emnet, og emnet lægges til summen." },
        { title: "Arbejdsløn for sig", body: "Før det, du betaler montøren og elektrikeren, som arbejdsløn. Så kan du se, om det var timerne eller materialerne, der løb fra budgettet." },
        { title: "Tilbud og bordpladeordre", body: "Køkkenfirmaets tilbud, ordren på bordpladen og følgesedlen gemmes som dokumenter i projektet." },
        { title: "Håndværkernes rækkefølge", body: "Nedrivning, VVS og el, spartel og maling, skabe, opmåling af bordplade, montering af bordplade, stænkplade, tilslutning til sidst. Én opgave hver." },
        { title: "Før og efter", body: "Fotografér det gamle køkken, før det bliver revet ned. Sammenligningen side om side til sidst er det billede, alle beder om at se." },
      ],
      steps: [
        "Opret et projekt, der hedder \"Køkken\", med en startdato og det samlede budget i kroner.",
        "Tilføj et emne for hvert skab, hver hvidevare, bordpladen og armaturet, efterhånden som I vælger dem.",
        "Læg håndværkernes rækkefølge ind som opgaver med deadlines.",
        "Registrér hver betaling som materialer, arbejdsløn eller håndværker.",
        "Tag billeder ved hvert trin. Tidslinjen bygger sig selv.",
      ],
      screenshotAlt: "Emnelisten i Home Stories: hvert produkt med sin pris, lagt sammen til projektets total",
      faq: [
        { q: "Kan jeg holde styr på budgettet til et nyt køkken på min iPhone?", a: "Ja. Opret et projekt med et budget, og tilføj hver hvidevare, hvert skab og hvert armatur som et emne med en pris. Home Stories holder den løbende sum. Det er gratis, virker offline og kræver ingen konto." },
        { q: "Kræver et nyt køkken byggetilladelse?", a: "At skifte et køkken ud kræver normalt ikke byggetilladelse. Skal en bærende væg fjernes for at åbne køkkenet op, så få en statiker til at regne på det, og spørg kommunen, før arbejdet går i gang. Gem beregningen og kommunens svar som dokumenter i projektet." },
        { q: "Kan jeg se, om køkkenet løber over budget?", a: "Den løbende sum er gratis og altid synlig. Grafen over budget mod faktisk forbrug, der viser overskridelsen, før den sker, er en del af det valgfri engangskøb Pro." },
      ],
      howToName: "Sådan sætter du et køkkenprojekt op i Home Stories",
    },
    {
      slug: "bathroom-remodel",
      label: "Nyt badeværelse",
      h1: "Nyt badeværelse: planlæg renoveringen fra nedrivning til sidste flise",
      metaTitle: "Renovering af badeværelse – plan og budget | Home Stories",
      metaDescription:
        "Planlæg et nyt badeværelse på iPhone og iPad: fliser, armaturer og arbejdsløn på ét budget, membran og tørretid som opgaver, og billeder af rørene.",
      imageAlt: "Et nyt hvidt badekar i et badeværelse under renovering, med blottede træstolper og kobberrør i væggen",
      intro: [
        "Et badeværelse er et lille rum med en lang rækkefølge. Nedrivning, VVS, gulvvarme, vådrumsmembran, tørretid, fliser og montering skal ske i den rigtige orden, og det meste af prisen er arbejde, du ikke kan se, når fliserne sidder.",
        "I Home Stories ligger fliser, armaturer og arbejdsløn på ét budget, og rækkefølgen ligger som opgaver. Den vigtigste vane er et billede af hvert rør og af membranen, før væggen lukkes. Det er det billede, du får brug for om fem år, eller den dag huset skal sælges.",
      ],
      track: [
        { title: "Det, der forsvinder bag fliserne", body: "Rørføringen, vådrumsmembranen, gulvafløbet og kablerne til gulvvarmen. Tag billederne samme dag, så ligger de på tidslinjen med dato." },
        { title: "Fliser i kvadratmeter", body: "Tilføj fliser, fliseklæb og fuge som emner. Skriv flisens navn og partinummer i noten, så du kan købe flere i samme nuance." },
        { title: "Armaturer og deres papirer", body: "Brusesæt, toilet og håndvask som emner, og manualer og garantibeviser som dokumenter." },
        { title: "Tørretid som en opgave", body: "Membranen og et nyt støbt gulv skal have tid til at tørre. En opgave med en dato forhindrer, at der bliver flisebelagt en dag for tidligt." },
        { title: "De autoriserede fag", body: "Vand, afløb og el i et badeværelse skal laves af autoriserede firmaer. Hold VVS'eren, elektrikeren og flisemureren hver for sig, så du kender prisen pr. fag." },
      ],
      steps: [
        "Opret et projekt \"Badeværelse\" med startdato og budget.",
        "Fotografér rummet, før nedrivningen begynder.",
        "Tilføj fliser, armaturer og materialer som emner med priser.",
        "Læg rækkefølgen ind som opgaver, med tørretiden som sin egen opgave.",
        "Fotografér rør, gulvafløb og membran, før væggene lukkes.",
      ],
      screenshotAlt: "Projektskærmen i Home Stories med billedtidslinjen og opgaver med registreret tid",
      faq: [
        { q: "Hvad skal jeg tage billeder af, når badeværelset bliver renoveret?", a: "Alt det, fliserne skjuler: rørføringen, vådrumsmembranen, gulvafløbet og kabler til gulvvarme og lys. Billederne er din dokumentation, hvis der senere opstår en utæthed." },
        { q: "Kan jeg gemme flisernes partinummer i appen?", a: "Ja. Tilføj fliserne som et emne, og skriv navn, farve og partinummer i noten. Du får brug for det, hvis en flise revner, og du skal købe nye, der passer." },
        { q: "Er Home Stories gratis til ét badeværelse?", a: "Ja. Projekter, emner, billeder, noter, dokumenter og opgaver er gratis uden begrænsning. Pro er et valgfrit engangskøb til grafen, påmindelser, PDF-eksport, iCloud-synkronisering og deling." },
      ],
      howToName: "Sådan sætter du et badeværelsesprojekt op i Home Stories",
    },
    {
      slug: "fixer-upper",
      label: "Håndværkertilbud",
      h1: "Har du købt et håndværkertilbud? Tag renoveringen ét projekt ad gangen",
      metaTitle: "Håndværkertilbud – planlæg renoveringen | Home Stories",
      metaDescription:
        "Planlæg renoveringen af et håndværkertilbud: billeder af hvert rum på dag ét, tilstandsrapportens K3- og K2-skader først og et budget for hvert rum.",
      imageAlt: "Et tomt rum i et ældre, nykøbt hus i morgenlys, med bare vægge og en enkelt flyttekasse",
      intro: [
        "Et håndværkertilbud er ikke én renovering. Det er mange små, fordelt over flere år, mens du bor i huset. Rækkefølgen er vigtig: tag, fugt, el og varme først, de pæne rum bagefter.",
        "Tilstandsrapporten fra købet er et godt sted at begynde. Skader markeret K3 og K2 hører til i det første projekt, K1 og K0 kan vente. I Home Stories får hvert arbejde sit eget projekt med eget budget og egne billeder.",
      ],
      track: [
        { title: "Billeder fra dag ét", body: "Fotografér hvert rum, før du pakker ud. Så kan du altid se, hvordan huset så ud, da du overtog det." },
        { title: "Tilstandsrapporten som tjekliste", body: "Gem tilstandsrapporten og elinstallationsrapporten som dokumenter, og gør hver K3- og K2-skade til en opgave." },
        { title: "Det, væggene gemmer", body: "Når en håndværker åbner en væg eller et gulv, så fotografér det, der er indenfor, og læg den nye udgift ind som et emne." },
        { title: "Flere års kvitteringer", body: "Hver reparation og forbedring med sin kvittering, i det projekt, den hører til. Det er rart at have, den dag huset skal sælges igen." },
      ],
      steps: [
        "Opret et projekt \"Dag ét\", og fotografér hvert rum.",
        "Gem tilstandsrapporten og elinstallationsrapporten som dokumenter.",
        "Opret et projekt \"Skal laves nu\" med K3- og K2-skaderne som opgaver.",
        "Opret et projekt for hvert rum, der kan vente.",
        "Læg hver overraskelse ind som et emne med et billede.",
      ],
      screenshotAlt: "Projektlisten i Home Stories, hvert projekt med sit eget budget",
      faq: [
        { q: "Hvor skal jeg starte med et håndværkertilbud?", a: "Med det, der er farligt eller lukker vand ind: taget, fugt, el og varme. I tilstandsrapporten er det typisk skaderne markeret K3 og K2. Det kosmetiske kommer bagefter." },
        { q: "Skal hvert rum have sit eget projekt?", a: "Ja, hvis rummene bliver lavet på forskellige tidspunkter. Så har hvert projekt sit eget budget, sine egne opgaver og sin egen billedtidslinje." },
        { q: "Kan jeg tage backup af flere års renovering?", a: "Ja. Lokale sikkerhedskopier og fuld dataeksport er gratis. iCloud-synkronisering (Pro) holder også projekterne på dine andre enheder." },
      ],
      howToName: "Sådan sætter du renoveringen af et håndværkertilbud op i Home Stories",
    },
    {
      slug: "home-repairs-and-maintenance",
      label: "Vedligeholdelse af huset",
      h1: "Før logbog over reparationer og vedligeholdelse af huset",
      metaTitle: "Vedligeholdelse af huset – logbog på iPhone | Home Stories",
      metaDescription:
        "Før logbog over hver reparation og hvert eftersyn i huset: hvad der blev lavet, af hvem, hvad det kostede, og hvornår det skal gøres igen.",
      imageAlt: "Indgangen til et pudset hus med en træstige op ad muren, en værktøjskasse og arbejdshandsker på trappen",
      intro: [
        "Hvert hus samler en lang liste af små jobs: en dryppende hane, tagrender, service på fyret eller varmepumpen, en dør, der binder. Hvert job er lille, men tilsammen er de en stor del af, hvad det koster at eje huset.",
        "Lav et vedligeholdelsesprojekt for huset i Home Stories, med hvert job som en opgave og hver udgift som et emne. Når noget går i stykker igen, kan du se, hvem der lavede det sidst, og hvad det kostede.",
      ],
      track: [
        { title: "Hvert job som en opgave", body: "Det, der skal laves, med en dato. Færdige opgaver bliver stående i logbogen." },
        { title: "Hvem lavede det", body: "En note med håndværkerens navn og telefonnummer, på det job, de lavede." },
        { title: "Det, der kommer igen", body: "Service på fyr eller varmepumpe, rensning af tagrender, test af røgalarmer. Opret en opgave for næste gang, når du afslutter denne." },
        { title: "Årets udgifter", body: "Hver reparation som et emne, så du har årets samlede beløb, når budgettet for næste år skal lægges." },
      ],
      steps: [
        "Opret et projekt \"Vedligeholdelse\" for huset.",
        "Tilføj hver reparation og hvert eftersyn som en opgave med en dato.",
        "Læg udgiften ind som et emne.",
        "Gem fakturaen som dokument og håndværkeren i en note.",
      ],
      screenshotAlt: "Opgavelisten i Home Stories med deadlines og registreret tid",
      faq: [
        { q: "Hvordan laver jeg en vedligeholdelsesplan for mit hus?", a: "Opret ét projekt for huset. Læg de faste eftersyn ind som opgaver med datoer, for eksempel fyret, tagrenderne og røgalarmerne, og hver reparation med sin pris som et emne. Fakturaen gemmes som dokument." },
        { q: "Kan appen minde mig om næste service?", a: "Opgaver med deadlines er gratis. Påmindelser om opgaverne er en del af det valgfri engangskøb Pro." },
        { q: "Kan jeg se, hvad der venter, uden at åbne appen?", a: "Ja. De gratis widgets til hjemmeskærmen viser budgetstatus, og hvad der står for tur." },
      ],
      howToName: "Sådan sætter du en vedligeholdelseslogbog op i Home Stories",
    },
    {
      slug: "renovating-with-a-partner",
      label: "Renovering sammen",
      h1: "Renovér sammen med din partner i ét delt projekt",
      metaTitle: "Renovering for par – delt projekt på iPhone | Home Stories",
      metaDescription:
        "Del et renoveringsprojekt med din partner eller familie (Pro): samme budget, opgaver, emner og billeder på jeres iPhones og iPads, holdt i takt via iCloud.",
      imageAlt: "En kvinde i et delvist renoveret rum, der kigger på sedler hængt op på den bare væg",
      intro: [
        "De fleste skænderier under en renovering handler om penge, ingen skrev ned, og beslutninger, den ene ikke kendte til. Et fælles overblik fjerner de fleste af dem.",
        "Med Pro kan du dele et projekt i Home Stories med din partner eller familie. I ser begge det samme budget og de samme opgaver, emner og billeder, og ændringer når den andens telefon via iCloud.",
      ],
      track: [
        { title: "Ét budget", body: "I lægger begge det ind, I betaler. Så er den løbende sum den rigtige, også når den ene lige har været i byggemarkedet." },
        { title: "Hvem gør hvad", body: "Opgaver med datoer, så listen er klar for jer begge, også til weekenden, hvor det meste bliver lavet." },
        { title: "Valgene samlet ét sted", body: "I deler begge produkter fra Safari ind i projektet: flisen, lampen, armaturet. Så træffer I beslutningen sammen, med prisen foran jer." },
        { title: "Jeres egen iCloud", body: "Deling foregår via iCloud. Der er ingen konto og ingen server fra os imellem." },
      ],
      steps: [
        "Opret projektet, og sæt budgettet sammen.",
        "Opgradér til Pro (ét køb, Familiedeling inkluderet).",
        "Del projektet med din partner.",
        "Læg hver især emner, betalinger og billeder ind undervejs.",
      ],
      screenshotAlt: "Opgavelisten i Home Stories med deadlines og registreret tid",
      faq: [
        { q: "Kan min partner og jeg bruge det samme renoveringsprojekt?", a: "Ja, med Pro. Projektdeling lader dig invitere en partner eller et familiemedlem, og alle ser de samme opgaver, emner og billeder via iCloud." },
        { q: "Skal vi begge købe Pro?", a: "Pro er ét køb med Familiedeling inkluderet, så de personer, der er i din Familiedeling-gruppe hos Apple, får det også." },
        { q: "Kræver deling en konto?", a: "Nej. Der er ingen Home Stories-konto. Deling og synkronisering foregår via jeres egen iCloud." },
      ],
      howToName: "Sådan deler du et renoveringsprojekt med din partner i Home Stories",
    },
  ],
};

export default da;
