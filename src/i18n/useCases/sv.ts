import type { UseCaseLocaleFile } from "../useCases";

// Svenska. Appens ord följer den svenska appen: "objekt", "uppgift",
// "anteckning", "dokument". Regler: src/i18n/useCases.ts.
const sv: UseCaseLocaleFile = {
  locale: "sv",
  ui: {
    home: "Start",
    useCases: "Användningsområden",
    trackHeading: "Det här håller du koll på i projektet",
    stepsHeading: "Så lägger du upp det i Home Stories",
    faqHeading: "Vanliga frågor",
    proNote:
      "Gratis på iPhone och iPad (iOS 17 eller senare). Inget konto, fungerar offline. Pro är ett valfritt engångsköp för diagrammet budget mot faktiskt, uppgiftspåminnelser, PDF-export, iCloud-synk och projektdelning.",
    heroCta: "Hämta Home Stories – gratis",
    footerHeading: "Starta projektet i dag",
    footerBody:
      "Home Stories är en gratis renoveringsapp för iPhone och iPad. Budget, uppgifter, foton, anteckningar och dokument i ett projekt, på din egen enhet.",
    footerCta: "Hämta Home Stories gratis i App Store",
    otherHeading: "Fler användningsområden",
    moreInEnglish: "Fler användningsområden (på engelska)",
    readingHeading: "Läs mer (på engelska)",
  },
  hub: {
    metaTitle: "Användningsområden: kök, badrum, hus | Home Stories",
    metaDescription:
      "Så använder du Home Stories för en köksrenovering, en badrumsrenovering, ett renoveringsobjekt, underhållet av huset och renoveringen ihop med din partner.",
    h1: ["En app,", "hela huset"],
    intro:
      "Home Stories samlar budget, uppgifter, foton, anteckningar och dokument för ett projekt på ett ställe. Ett projekt kan vara köket, badrummet, ett renoveringsobjekt du tar rum för rum, eller den långa listan med små reparationer. Välj det du har framför dig.",
    imageAlt: "Ritningar utspridda på en plywoodskiva över en bock, med en penna, en skalstock och en kopp kaffe",
    englishNote:
      "Vind, källare, tillbyggnad, garage, trädgård, uthyrning och de andra användningsområdena finns än så länge bara på engelska:",
    englishLink: "se alla användningsområden",
  },
  entries: [
    {
      slug: "kitchen-renovation",
      label: "Köksrenovering",
      h1: "Köksrenovering: håll koll på budgeten, hantverkarna och bilderna",
      metaTitle: "Köksrenovering – app för budget och planering | Home Stories",
      metaDescription:
        "Håll koll på köksrenoveringen i iPhone: budgeten, priset på vitvaror och bänkskiva, ordningen för hantverkarna, offerter och bilder före och efter.",
      imageAlt: "Ett kök med nya vita skåp och bänkskivor i sten, golvet ännu inte färdigt",
      intro: [
        "Köket är den renovering som har flest poster: skåp, bänkskiva, vitvaror, diskho, blandare, kakel och belysning, plus rörmokaren, elektrikern och köksmontören. I Home Stories blir var och en ett objekt med ett pris, så att totalsumman alltid är den riktiga.",
        "Ordningen är lika viktig som pengarna. Vatten, avlopp och el ska vara klart innan skåpen kommer upp, och bänkskivan kan mätas först när skåpen står. Lägg in varje steg som en uppgift med datum, så ser du vilken hantverkare nästa steg väntar på.",
        "Elinstallationer får bara göras av ett registrerat elinstallationsföretag. Deras offert och faktura hör hemma i samma projekt.",
      ],
      track: [
        { title: "Varje produkt med sitt pris", body: "Fota diskhon i butiken eller dela ugnen från Safari. Pris, butik och en anteckning hamnar på objektet, och objektet läggs till summan." },
        { title: "Arbete skilt från material", body: "Registrera det du betalar montören och elektrikern som arbete. ROT-avdraget gäller bara arbetskostnaden, så det lönar sig att hålla isär dem." },
        { title: "Offert och beställning av bänkskiva", body: "Köksfirmans offert, beställningen av bänkskivan och följesedeln sparar du som dokument i projektet." },
        { title: "Hantverkarnas ordning", body: "Rivning, rör och el, spackel och målning, skåp, mätning av bänkskiva, montering av bänkskiva, stänkskydd, inkoppling. En uppgift var." },
        { title: "Före och efter", body: "Fota det gamla köket innan det rivs. Jämförelsen sida vid sida till sist är bilden alla vill se." },
      ],
      steps: [
        "Skapa ett projekt som heter \"Kök\", med startdatum och hela budgeten i kronor.",
        "Lägg till ett objekt för varje skåp, vitvara, bänkskivan och blandaren när ni väljer dem.",
        "Lägg in hantverkarnas ordning som uppgifter med deadline.",
        "Registrera varje betalning som material, arbete eller hantverkare.",
        "Ta bilder i varje skede. Fotohistoriken byggs upp av sig själv.",
      ],
      screenshotAlt: "Objektlistan i Home Stories: varje produkt med sitt pris, sammanräknat till projektets totalsumma",
      faq: [
        { q: "Kan jag hålla koll på budgeten för ett nytt kök i min iPhone?", a: "Ja. Skapa ett projekt med en budget och lägg till varje vitvara, skåp och blandare som ett objekt med ett pris. Home Stories håller totalsumman. Appen är gratis, fungerar offline och kräver inget konto." },
        { q: "Kan jag se hur stor del som är arbetskostnad inför ROT-avdraget?", a: "Ja. Registrera betalningarna som material, arbete eller hantverkare och spara fakturan som dokument. Hur mycket avdrag du får avgör Skatteverket, men underlaget har du samlat." },
        { q: "Kan jag se om köket drar över budget?", a: "Totalsumman är gratis och syns alltid. Diagrammet budget mot faktiskt, som visar överskridningen i god tid, ingår i det valfria engångsköpet Pro." },
      ],
      howToName: "Så lägger du upp en köksrenovering i Home Stories",
    },
    {
      slug: "bathroom-remodel",
      label: "Badrumsrenovering",
      h1: "Badrumsrenovering: planera från rivning till sista plattan",
      metaTitle: "Badrumsrenovering – planering och budget | Home Stories",
      metaDescription:
        "Planera badrumsrenoveringen i iPhone och iPad: kakel, porslin och arbete i en budget, tätskikt och torktid som uppgifter, och bilder på rören.",
      imageAlt: "Ett nytt vitt badkar i ett badrum under renovering, med blottade träreglar och kopparrör i väggen",
      intro: [
        "Ett badrum är ett litet rum med en lång ordning. Rivning, rördragning, golvvärme, tätskikt, torktid, plattsättning och montering ska ske i rätt ordning, och det mesta av kostnaden är arbete du inte ser när kaklet sitter uppe.",
        "Home Stories håller kakel, porslin och arbete i en budget och ordningen som uppgifter. Den viktigaste vanan: ett foto av varje rör och av tätskiktet innan väggen stängs. Det är den bilden du behöver om fem år.",
      ],
      track: [
        { title: "Bilder på det som göms bakom kaklet", body: "Rördragningen, tätskiktet, golvbrunnen och golvvärmen. Ta dem samma dag, så ligger de i fotohistoriken med datum." },
        { title: "Kakel per kvadratmeter", body: "Kakel, fix och fog som objekt. Skriv upp namn, färg och batchnummer, så att du kan köpa fler som matchar." },
        { title: "Porslin och papper", body: "Dusch, toalett och tvättställ som objekt, manualer och garantibevis som dokument." },
        { title: "Torktid som en uppgift", body: "Tätskiktet och en ny gjuten golvyta behöver tid. En uppgift med datum hindrar plattsättaren från att börja en dag för tidigt." },
        { title: "Behöriga hantverkare och intygen", body: "Anlita företag som arbetar enligt branschreglerna för våtrum, och spara våtrumsintyget som dokument. Rörmokare och plattsättare hålls isär i budgeten." },
      ],
      steps: [
        "Skapa ett projekt \"Badrum\" med startdatum och budget.",
        "Fota rummet innan rivningen börjar.",
        "Lägg till kakel, porslin och material som objekt med priser.",
        "Lägg in ordningen som uppgifter, med torktiden som en egen uppgift.",
        "Fota rören, golvbrunnen och tätskiktet innan väggarna stängs.",
      ],
      screenshotAlt: "Projektvyn i Home Stories med fotohistoriken och uppgifter med registrerad tid",
      faq: [
        { q: "Vad ska jag fota under en badrumsrenovering?", a: "Allt som kaklet kommer att dölja: vatten- och avloppsrören, tätskiktet, golvbrunnen och el nära duschen. Bilderna är din dokumentation om det blir en vattenskada senare." },
        { q: "Kan jag spara kaklets batchnummer i appen?", a: "Ja. Lägg till kaklet som ett objekt och skriv namn, färg och batchnummer i anteckningen. Du behöver det om en platta spricker och du ska köpa fler." },
        { q: "Är Home Stories gratis för ett enda badrum?", a: "Ja. Projekt, objekt, foton, anteckningar, dokument och uppgifter är gratis utan begränsning. Pro är ett valfritt engångsköp för diagrammet, påminnelser, PDF-export, iCloud-synk och delning." },
      ],
      howToName: "Så lägger du upp en badrumsrenovering i Home Stories",
    },
    {
      slug: "fixer-upper",
      label: "Renoveringsobjekt",
      h1: "Köpt ett renoveringsobjekt? Ta renoveringen ett projekt i taget",
      metaTitle: "Renoveringsobjekt – planera rum för rum | Home Stories",
      metaDescription:
        "Renovera ett renoveringsobjekt medan du bor där: bilder på varje rum dag ett, tak, fukt och värme först, sedan en budget för varje rum.",
      imageAlt: "Ett tomt rum i ett nyköpt äldre hus i morgonljus, med kala väggar och en ensam flyttkartong",
      intro: [
        "Ett renoveringsobjekt är inte en renovering. Det är många små, utspridda över flera år, medan du bor i huset. Ordningen spelar roll: läckor, säkerhet och värme först, de fina rummen sedan.",
        "Besiktningsprotokollet från köpet är en bra början: det som står där som brådskande hör hemma i det första projektet. I Home Stories får varje jobb ett eget projekt, med egen budget och egna foton.",
      ],
      track: [
        { title: "Utgångsläget dag ett", body: "Fota varje rum innan du packar upp. Då ser du alltid i vilket skick du tog över huset, och har bilder med datum om du senare hittar något du tror är ett dolt fel." },
        { title: "Måste nu och kan vänta", body: "Ett projekt för det brådskande, egna projekt för rummen som kan vänta." },
        { title: "Det väggarna döljer", body: "När en hantverkare öppnar en vägg eller ett golv, fota det som finns där och lägg in den nya kostnaden som ett objekt." },
        { title: "Flera års kvitton", body: "Varje reparation och förbättring med sitt kvitto, i projektet där den hör hemma. Bra att ha den dag huset ska säljas." },
      ],
      steps: [
        "Skapa ett projekt \"Dag ett\" och fota varje rum.",
        "Spara besiktningsprotokollet som dokument.",
        "Skapa ett projekt \"Måste nu\" för tak, fukt, el och värme.",
        "Skapa ett projekt per rum för det som kan vänta.",
        "Lägg in varje överraskning som ett objekt med ett foto.",
      ],
      screenshotAlt: "Projektlistan i Home Stories, varje projekt med sin egen budget",
      faq: [
        { q: "Var börjar jag med ett renoveringsobjekt?", a: "Med det som är farligt eller släpper in vatten: läckor, el, värme och taket. Det kosmetiska kommer efteråt." },
        { q: "Ska varje rum ha ett eget projekt?", a: "Ja, om rummen görs vid olika tillfällen. Då har varje projekt sin egen budget, sina egna uppgifter och sin egen fotohistorik." },
        { q: "Kan jag säkerhetskopiera flera års renovering?", a: "Ja. Lokala säkerhetskopior och fullständig dataexport är gratis. iCloud-synk (Pro) håller dessutom projekten på dina andra enheter." },
      ],
      howToName: "Så lägger du upp renoveringen av ett renoveringsobjekt i Home Stories",
    },
    {
      slug: "home-repairs-and-maintenance",
      label: "Underhåll av huset",
      h1: "För logg över reparationer och underhåll av huset",
      metaTitle: "Underhållsplan för villan – app för iPhone | Home Stories",
      metaDescription:
        "För logg över varje reparation och service i huset: vad som gjordes, av vem, vad det kostade och när det ska göras igen. Med foton och fakturor.",
      imageAlt: "Entrén till ett putsat hus med en trästege mot väggen, en verktygslåda och arbetshandskar på trappan",
      intro: [
        "Varje hus samlar en lång lista med små jobb: en droppande kran, hängrännorna, service på värmepumpen, en dörr som kärvar. Varje jobb är litet, men tillsammans är de en stor del av vad huset kostar att äga.",
        "Gör ett underhållsprojekt för huset i Home Stories, med varje jobb som en uppgift och varje kostnad som ett objekt. När något går sönder igen ser du vem som lagade det förra gången och vad det kostade.",
      ],
      track: [
        { title: "Varje jobb som en uppgift", body: "Det som ska göras, med ett datum. Avklarade uppgifter ligger kvar i loggen." },
        { title: "Vem som gjorde det", body: "En anteckning med hantverkarens namn och nummer, på jobbet de gjorde." },
        { title: "Det som återkommer", body: "Service på värmepumpen, rensning av hängrännor, test av brandvarnare. Lägg in nästa tillfälle som en uppgift när du bockar av det här. Sotningen och brandskyddskontrollen bokar kommunen, men datumet kan stå i samma logg." },
        { title: "Årets kostnader", body: "Varje reparation som ett objekt, så att årets summa finns när du lägger budgeten för nästa år." },
      ],
      steps: [
        "Skapa ett projekt \"Underhåll\" för huset.",
        "Lägg till varje reparation och service som en uppgift med datum.",
        "Registrera kostnaden som ett objekt.",
        "Spara fakturan som dokument och hantverkaren i en anteckning.",
      ],
      screenshotAlt: "Uppgiftslistan i Home Stories med deadlines och registrerad tid",
      faq: [
        { q: "Hur gör jag en underhållsplan för mitt hus?", a: "Skapa ett projekt för huset. Lägg in det återkommande underhållet som uppgifter med datum, till exempel värmepumpen, hängrännorna och brandvarnarna, och varje reparation med sitt pris som ett objekt. Fakturan sparas som dokument." },
        { q: "Kan appen påminna mig om nästa service?", a: "Uppgifter med deadline är gratis. Påminnelser för uppgifterna ingår i det valfria engångsköpet Pro." },
        { q: "Kan jag se vad som är näst på tur utan att öppna appen?", a: "Ja. De kostnadsfria hemskärmswidgetarna visar budgetförloppet och vad som är näst på tur." },
      ],
      howToName: "Så lägger du upp en underhållslogg för huset i Home Stories",
    },
    {
      slug: "renovating-with-a-partner",
      label: "Renovera tillsammans",
      h1: "Renovera med din partner i ett delat projekt",
      metaTitle: "Renovera tillsammans – delat projekt för par | Home Stories",
      metaDescription:
        "Dela ett renoveringsprojekt med din partner eller familj (Pro): samma budget, uppgifter, objekt och foton i varje iPhone och iPad, i synk via iCloud.",
      imageAlt: "En kvinna i ett halvrenoverat rum som tittar på lappar uppsatta på den kala väggen",
      intro: [
        "De flesta bråk under en renovering handlar om pengar som ingen skrev upp och beslut som den ena inte kände till. En gemensam överblick tar bort de flesta av dem.",
        "Med Pro delar du ett projekt i Home Stories med din partner eller familj. Ni ser samma budget, samma uppgifter, objekt och foton, och ändringar når den andras telefon via iCloud.",
      ],
      track: [
        { title: "En budget", body: "Ni lägger båda in det ni betalar. Totalsumman stämmer, även efter en lördag på bygghandeln." },
        { title: "Vem gör vad", body: "Uppgifter med datum, så att listan är tydlig för er båda." },
        { title: "Valen på ett ställe", body: "Ni delar båda produkter från Safari till projektet och bestämmer tillsammans, med priset framför er." },
        { title: "Er egen iCloud", body: "Delningen går via iCloud. Det finns inget konto och ingen server från oss emellan." },
      ],
      steps: [
        "Skapa projektet och sätt budgeten tillsammans.",
        "Uppgradera till Pro (ett köp, Familjedelning ingår).",
        "Dela projektet med din partner.",
        "Lägg var för sig in objekt, betalningar och foton allt eftersom.",
      ],
      screenshotAlt: "Uppgiftslistan i Home Stories med deadlines och registrerad tid",
      faq: [
        { q: "Kan jag och min partner använda samma renoveringsprojekt?", a: "Ja, med Pro. Med projektdelning bjuder du in en partner eller en familjemedlem, och alla ser samma uppgifter, objekt och foton via iCloud." },
        { q: "Måste vi båda köpa Pro?", a: "Pro är ett enda köp med Familjedelning, så de som är med i din familjegrupp hos Apple får det också." },
        { q: "Behövs ett konto för att dela?", a: "Nej. Det finns inget Home Stories-konto. Delning och synk går via er egen iCloud." },
      ],
      howToName: "Så delar du ett renoveringsprojekt med din partner i Home Stories",
    },
  ],
};

export default sv;
