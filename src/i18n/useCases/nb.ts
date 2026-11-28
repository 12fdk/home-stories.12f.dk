import type { UseCaseLocaleFile } from "../useCases";

// Norsk bokmål. Ordene i appen følger den norske appen: "gjenstand",
// "oppgave", "notat", "dokument". Regler: src/i18n/useCases.ts.
const nb: UseCaseLocaleFile = {
  locale: "nb",
  ui: {
    home: "Forside",
    useCases: "Bruksområder",
    trackHeading: "Dette holder du styr på i prosjektet",
    stepsHeading: "Slik setter du det opp i Home Stories",
    faqHeading: "Vanlige spørsmål",
    proNote:
      "Gratis på iPhone og iPad (iOS 17 eller nyere). Ingen konto, fungerer offline. Pro er et valgfritt engangskjøp for diagrammet budsjett mot faktisk, oppgavepåminnelser, PDF-eksport, iCloud-synkronisering og prosjektdeling.",
    heroCta: "Last ned Home Stories – gratis",
    footerHeading: "Start prosjektet i dag",
    footerBody:
      "Home Stories er en gratis oppussingsapp for iPhone og iPad. Budsjett, oppgaver, bilder, notater og dokumenter i ett prosjekt, på din egen enhet.",
    footerCta: "Last ned Home Stories gratis i App Store",
    otherHeading: "Andre bruksområder",
    moreInEnglish: "Flere bruksområder (på engelsk)",
    readingHeading: "Les mer (på engelsk)",
  },
  hub: {
    metaTitle: "Bruksområder: kjøkken, bad, oppussingsobjekt | Home Stories",
    metaDescription:
      "Slik bruker du Home Stories til nytt kjøkken, nytt bad, et oppussingsobjekt, vedlikehold av boligen og oppussing sammen med partneren din.",
    h1: ["Én app,", "hele huset"],
    intro:
      "Home Stories samler budsjett, oppgaver, bilder, notater og dokumenter for et prosjekt på ett sted. Et prosjekt kan være kjøkkenet, badet, et oppussingsobjekt du tar rom for rom, eller den lange listen med små reparasjoner. Velg det du står foran.",
    imageAlt: "Arkitekttegninger spredt på en kryssfinerplate over en bukk, med blyant, målestokk og en kopp kaffe",
    englishNote:
      "Loft, kjeller, tilbygg, garasje, hage, utleie og de andre bruksområdene finnes foreløpig bare på engelsk:",
    englishLink: "se alle bruksområder",
  },
  entries: [
    {
      slug: "kitchen-renovation",
      label: "Nytt kjøkken",
      h1: "Nytt kjøkken: hold styr på budsjettet, håndverkerne og bildene",
      metaTitle: "Nytt kjøkken – app for budsjett og plan | Home Stories",
      metaDescription:
        "Hold styr på kjøkkenoppussingen på iPhone: budsjettet, prisen på hvitevarer og benkeplate, rekkefølgen for håndverkerne, tilbud og bilder før og etter.",
      imageAlt: "Et kjøkken med nye hvite skap og benkeplater i stein, gulvet ennå ikke ferdig",
      intro: [
        "Kjøkkenet er oppussingen med flest poster: skap, benkeplate, hvitevarer, vask, blandebatteri, fliser og lys, pluss rørleggeren, elektrikeren og montøren. I Home Stories blir hver av dem en gjenstand med en pris, så den løpende summen alltid er den riktige.",
        "Rekkefølgen betyr like mye som pengene. Vann, avløp og strøm må være på plass før skapene kommer opp, og benkeplaten kan først måles når skapene står. Legg inn hvert steg som en oppgave med dato, så ser du hvilken håndverker det neste steget venter på.",
        "Det elektriske skal gjøres av en registrert elektroinstallatør, som leverer samsvarserklæring når jobben er ferdig. Den hører hjemme i prosjektet sammen med tilbudet og fakturaen.",
      ],
      track: [
        { title: "Hvert produkt med sin pris", body: "Ta bilde av vasken i butikken, eller del stekeovnen fra Safari. Pris, butikk og et notat havner på gjenstanden, og gjenstanden legges til summen." },
        { title: "Arbeid holdt for seg", body: "Før det du betaler montøren og elektrikeren som arbeid. Da ser du om det var timene eller materialene som spiste budsjettet." },
        { title: "Tilbud og bestilling av benkeplate", body: "Kjøkkenleverandørens tilbud, bestillingen av benkeplaten og pakkseddelen lagrer du som dokumenter i prosjektet." },
        { title: "Rekkefølgen for håndverkerne", body: "Riving, rør og elektrisk, sparkling og maling, skap, oppmåling av benkeplate, montering av benkeplate, flis over benken, tilkobling. Én oppgave hver." },
        { title: "Før og etter", body: "Ta bilder av det gamle kjøkkenet før det rives. Sammenligningen side om side til slutt er bildet alle vil se." },
      ],
      steps: [
        "Opprett et prosjekt som heter \"Kjøkken\", med startdato og hele budsjettet i kroner.",
        "Legg til en gjenstand for hvert skap, hver hvitevare, benkeplaten og blandebatteriet når dere velger dem.",
        "Legg inn rekkefølgen for håndverkerne som oppgaver med frist.",
        "Registrer hver betaling som materialer, arbeid eller entreprenør.",
        "Ta bilder i hver fase. Tidslinjen bygger seg selv.",
      ],
      screenshotAlt: "Gjenstandslisten i Home Stories: hvert produkt med sin pris, lagt sammen til prosjektets total",
      faq: [
        { q: "Kan jeg holde styr på budsjettet for et nytt kjøkken på iPhone?", a: "Ja. Opprett et prosjekt med et budsjett, og legg til hver hvitevare, hvert skap og hvert blandebatteri som en gjenstand med pris. Home Stories holder den løpende summen. Appen er gratis, fungerer offline og krever ingen konto." },
        { q: "Må jeg søke kommunen for å bytte kjøkken?", a: "Å bytte ut et kjøkken krever vanligvis ingen søknad. Skal en bærende vegg fjernes for å åpne opp kjøkkenet, må du få en fagperson til å vurdere konstruksjonen og sjekke med kommunen om tiltaket er søknadspliktig før dere begynner. Lagre svaret som dokument i prosjektet." },
        { q: "Ser jeg det hvis kjøkkenet går over budsjett?", a: "Den løpende summen er gratis og alltid synlig. Diagrammet budsjett mot faktisk, som viser overskridelsen før den kommer, er en del av det valgfrie engangskjøpet Pro." },
      ],
      howToName: "Slik setter du opp et kjøkkenprosjekt i Home Stories",
    },
    {
      slug: "bathroom-remodel",
      label: "Nytt bad",
      h1: "Pusse opp badet: planlegg fra riving til siste flis",
      metaTitle: "Pusse opp bad – plan og budsjett | Home Stories",
      metaDescription:
        "Planlegg baderomsoppussingen på iPhone og iPad: fliser, sanitærutstyr og arbeid i ett budsjett, membran og tørketid som oppgaver, og bilder av rørene.",
      imageAlt: "Et nytt hvitt badekar på et bad under oppussing, med åpne trestendere og kobberrør i veggen",
      intro: [
        "Et bad er et lite rom med en lang rekkefølge. Riving, rørlegging, varmekabler, membran, tørketid, flislegging og montering må skje i riktig rekkefølge, og det meste av prisen er arbeid du ikke ser når flisene er oppe.",
        "Home Stories holder fliser, sanitærutstyr og arbeid i ett budsjett og rekkefølgen som oppgaver. Den viktigste vanen: et bilde av hvert rør og av membranen før veggen lukkes. Det er det bildet du trenger om fem år, eller den dagen boligen skal selges.",
      ],
      track: [
        { title: "Bilder av det som forsvinner bak flisene", body: "Rørføringen, membranen, sluket og varmekablene. Ta dem samme dag, så ligger de på tidslinjen med dato." },
        { title: "Fliser per kvadratmeter", body: "Fliser, flislim og fugemasse som gjenstander. Skriv ned navn, farge og partinummer, så du kan kjøpe flere som passer." },
        { title: "Sanitærutstyr og papirene", body: "Dusj, toalett og servant som gjenstander, bruksanvisninger og garantibevis som dokumenter." },
        { title: "Tørketid som en oppgave", body: "Membranen og et nytt støpt gulv trenger tid. En oppgave med dato hindrer at flisleggeren begynner en dag for tidlig." },
        { title: "Dokumentasjon fra fagfolkene", body: "Be om dokumentasjon på membran og rørarbeid, og samsvarserklæringen fra elektrikeren. Lagre alt som dokumenter, og hold rørlegger og flislegger hver for seg i budsjettet." },
      ],
      steps: [
        "Opprett et prosjekt \"Bad\" med startdato og budsjett.",
        "Ta bilder av rommet før rivingen begynner.",
        "Legg til fliser, sanitærutstyr og materialer som gjenstander med pris.",
        "Legg inn rekkefølgen som oppgaver, med tørketiden som egen oppgave.",
        "Ta bilder av rørene, sluket og membranen før veggene lukkes.",
      ],
      screenshotAlt: "Prosjektskjermen i Home Stories med bildetidslinjen og oppgaver med registrert tid",
      faq: [
        { q: "Hva bør jeg ta bilder av når badet pusses opp?", a: "Alt flisene skal dekke: vann- og avløpsrør, membranen, sluket og elektrisk nær dusjen. Bildene er dokumentasjonen din hvis det senere blir en lekkasje." },
        { q: "Kan jeg lagre partinummeret på flisene i appen?", a: "Ja. Legg til flisene som en gjenstand, og skriv navn, farge og partinummer i notatet. Du trenger det hvis en flis sprekker og du må kjøpe nye." },
        { q: "Er Home Stories gratis for ett bad?", a: "Ja. Prosjekter, gjenstander, bilder, notater, dokumenter og oppgaver er gratis uten begrensning. Pro er et valgfritt engangskjøp for diagrammet, påminnelser, PDF-eksport, iCloud-synkronisering og deling." },
      ],
      howToName: "Slik setter du opp en baderomsoppussing i Home Stories",
    },
    {
      slug: "fixer-upper",
      label: "Oppussingsobjekt",
      h1: "Kjøpt et oppussingsobjekt? Ta oppussingen ett prosjekt om gangen",
      metaTitle: "Oppussingsobjekt – planlegg rom for rom | Home Stories",
      metaDescription:
        "Pusse opp et oppussingsobjekt mens du bor der: bilder av hvert rom første dag, TG3 og TG2 fra tilstandsrapporten først, og et budsjett for hvert rom.",
      imageAlt: "Et tomt rom i et nykjøpt eldre hus i morgenlys, med nakne vegger og én flytteeske",
      intro: [
        "Et oppussingsobjekt er ikke én oppussing. Det er mange små, fordelt over flere år, mens du bor der. Rekkefølgen er viktig: lekkasjer, sikkerhet og varme først, de fine rommene etterpå.",
        "Tilstandsrapporten fra kjøpet er et godt sted å begynne. Det som har fått TG3 og TG2, hører hjemme i det første prosjektet; TG1 og TG0 kan vente. I Home Stories får hver jobb sitt eget prosjekt, med eget budsjett og egne bilder.",
      ],
      track: [
        { title: "Bilder fra første dag", body: "Ta bilder av hvert rom før du pakker ut. Da ser du alltid hvilken stand boligen var i da du overtok den." },
        { title: "Tilstandsrapporten som sjekkliste", body: "Lagre tilstandsrapporten som dokument, og gjør hvert punkt med TG3 og TG2 til en oppgave." },
        { title: "Det veggene skjuler", body: "Når en håndverker åpner en vegg eller et gulv, ta bilde av det som er inni, og legg den nye kostnaden inn som en gjenstand." },
        { title: "Flere års kvitteringer", body: "Hver reparasjon og forbedring med kvitteringen, i prosjektet der den hører hjemme. Greit å ha den dagen boligen skal selges igjen." },
      ],
      steps: [
        "Opprett et prosjekt \"Første dag\", og ta bilder av hvert rom.",
        "Lagre tilstandsrapporten som dokument.",
        "Opprett et prosjekt \"Må gjøres nå\" med punktene som har TG3 og TG2.",
        "Opprett et prosjekt per rom for det som kan vente.",
        "Legg inn hver overraskelse som en gjenstand med bilde.",
      ],
      screenshotAlt: "Prosjektlisten i Home Stories, hvert prosjekt med sitt eget budsjett",
      faq: [
        { q: "Hvor begynner jeg med et oppussingsobjekt?", a: "Med det som er farlig eller slipper inn vann: lekkasjer, elektrisk anlegg, varme og taket. I tilstandsrapporten er det ofte punktene med TG3 og TG2. Det kosmetiske kommer etterpå." },
        { q: "Bør hvert rom ha sitt eget prosjekt?", a: "Ja, hvis rommene tas på ulike tidspunkter. Da har hvert prosjekt sitt eget budsjett, sine egne oppgaver og sin egen bildetidslinje." },
        { q: "Kan jeg ta sikkerhetskopi av flere års oppussing?", a: "Ja. Lokale sikkerhetskopier og full dataeksport er gratis. iCloud-synkronisering (Pro) holder også prosjektene på de andre enhetene dine." },
      ],
      howToName: "Slik setter du opp oppussingen av et oppussingsobjekt i Home Stories",
    },
    {
      slug: "home-repairs-and-maintenance",
      label: "Vedlikehold av boligen",
      h1: "Før logg over reparasjoner og vedlikehold av boligen",
      metaTitle: "Vedlikeholdsplan for boligen – app for iPhone | Home Stories",
      metaDescription:
        "Før logg over hver reparasjon og hvert vedlikehold i boligen: hva som ble gjort, av hvem, hva det kostet og når det skal gjøres igjen.",
      imageAlt: "Inngangen til et pusset hus med en trestige mot veggen, en verktøykasse og arbeidshansker på trappen",
      intro: [
        "Hver bolig samler en lang liste med små jobber: en dryppende kran, takrennene, service på varmepumpen, en dør som henger seg opp. Hver jobb er liten, men til sammen er de en stor del av hva boligen koster å eie.",
        "Lag et vedlikeholdsprosjekt for boligen i Home Stories, med hver jobb som en oppgave og hver utgift som en gjenstand. Når noe går i stykker igjen, ser du hvem som fikset det sist, og hva det kostet.",
      ],
      track: [
        { title: "Hver jobb som en oppgave", body: "Det som skal gjøres, med en dato. Fullførte oppgaver blir stående i loggen." },
        { title: "Hvem som gjorde det", body: "Et notat med håndverkerens navn og nummer, på jobben de gjorde." },
        { title: "Det som kommer igjen", body: "Service på varmepumpen, rens av takrenner, test av røykvarslere. Legg inn neste gang som en oppgave når du huker av denne. Feiing og tilsyn fra kommunen kan stå i samme logg." },
        { title: "Årets utgifter", body: "Hver reparasjon som en gjenstand, så du har årets sum når budsjettet for neste år skal legges." },
      ],
      steps: [
        "Opprett et prosjekt \"Vedlikehold\" for boligen.",
        "Legg til hver reparasjon og hver service som en oppgave med dato.",
        "Registrer kostnaden som en gjenstand.",
        "Lagre fakturaen som dokument og håndverkeren i et notat.",
      ],
      screenshotAlt: "Oppgavelisten i Home Stories med frister og registrert tid",
      faq: [
        { q: "Hvordan lager jeg en vedlikeholdsplan for boligen?", a: "Opprett ett prosjekt for boligen. Legg inn det faste vedlikeholdet som oppgaver med dato, for eksempel varmepumpen, takrennene og røykvarslerne, og hver reparasjon med prisen som en gjenstand. Fakturaen lagres som dokument." },
        { q: "Kan appen minne meg på neste service?", a: "Oppgaver med frist er gratis. Påminnelser for oppgavene er en del av det valgfrie engangskjøpet Pro." },
        { q: "Kan jeg se hva som er neste uten å åpne appen?", a: "Ja. De gratis widgetene på hjemskjermen viser budsjettfremdriften og hva som er neste." },
      ],
      howToName: "Slik setter du opp en vedlikeholdslogg for boligen i Home Stories",
    },
    {
      slug: "renovating-with-a-partner",
      label: "Pusse opp sammen",
      h1: "Pusse opp sammen med partneren din i ett delt prosjekt",
      metaTitle: "Pusse opp sammen – delt prosjekt for par | Home Stories",
      metaDescription:
        "Del et oppussingsprosjekt med partneren eller familien (Pro): samme budsjett, oppgaver, gjenstander og bilder på hver iPhone og iPad, i synk via iCloud.",
      imageAlt: "En kvinne i et halvveis oppusset rom som ser på lapper festet på den nakne veggen",
      intro: [
        "De fleste kranglene under en oppussing handler om penger ingen skrev ned, og beslutninger den ene ikke visste om. En felles oversikt fjerner de fleste av dem.",
        "Med Pro deler du et prosjekt i Home Stories med partneren eller familien. Dere ser det samme budsjettet, de samme oppgavene, gjenstandene og bildene, og endringer når den andres telefon via iCloud.",
      ],
      track: [
        { title: "Ett budsjett", body: "Dere legger begge inn det dere betaler. Den løpende summen stemmer, også etter en lørdag på byggevarehuset." },
        { title: "Hvem gjør hva", body: "Oppgaver med dato, så listen er tydelig for dere begge." },
        { title: "Valgene på ett sted", body: "Dere deler begge produkter fra Safari inn i prosjektet og bestemmer sammen, med prisen foran dere." },
        { title: "Deres egen iCloud", body: "Delingen går via iCloud. Det finnes ingen konto og ingen server fra oss imellom." },
      ],
      steps: [
        "Opprett prosjektet, og sett budsjettet sammen.",
        "Oppgrader til Pro (ett kjøp, Familiedeling inkludert).",
        "Del prosjektet med partneren din.",
        "Legg inn gjenstander, betalinger og bilder hver for dere underveis.",
      ],
      screenshotAlt: "Oppgavelisten i Home Stories med frister og registrert tid",
      faq: [
        { q: "Kan partneren min og jeg bruke det samme oppussingsprosjektet?", a: "Ja, med Pro. Med prosjektdeling inviterer du en partner eller et familiemedlem, og alle ser de samme oppgavene, gjenstandene og bildene via iCloud." },
        { q: "Må vi begge kjøpe Pro?", a: "Pro er ett kjøp med Familiedeling inkludert, så de som er med i familiegruppen din hos Apple, får det også." },
        { q: "Trenger man en konto for å dele?", a: "Nei. Det finnes ingen Home Stories-konto. Deling og synkronisering går via deres egen iCloud." },
      ],
      howToName: "Slik deler du et oppussingsprosjekt med partneren din i Home Stories",
    },
  ],
};

export default nb;
