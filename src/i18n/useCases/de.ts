import type { UseCaseLocaleFile } from "../useCases";

// Deutsch, in der Du-Form wie im App Store. App-Begriffe wie in der deutschen
// App: "Element", "Aufgabe", "Notiz", "Dokument". Regeln: src/i18n/useCases.ts.
const de: UseCaseLocaleFile = {
  locale: "de",
  ui: {
    home: "Start",
    useCases: "Anwendungen",
    trackHeading: "Was ins Projekt gehört",
    stepsHeading: "So richtest du es in Home Stories ein",
    faqHeading: "Häufige Fragen",
    proNote:
      "Kostenlos für iPhone und iPad (iOS 17 oder neuer). Kein Konto, funktioniert offline. Pro ist ein optionaler Einmalkauf für das Diagramm Budget gegen Ist, Aufgabenerinnerungen, PDF-Export, iCloud-Sync und Projektfreigabe.",
    heroCta: "Home Stories laden – kostenlos",
    footerHeading: "Leg das Projekt heute an",
    footerBody:
      "Home Stories ist ein kostenloser Renovierungs-Tracker für iPhone und iPad. Budget, Aufgaben, Fotos, Notizen und Dokumente liegen in einem Projekt, auf deinem Gerät.",
    footerCta: "Home Stories kostenlos im App Store laden",
    otherHeading: "Weitere Anwendungen",
    moreInEnglish: "Mehr Anwendungen (auf Englisch)",
    readingHeading: "Weiterlesen (auf Englisch)",
  },
  hub: {
    metaTitle: "Anwendungen: Küche, Bad, Altbau, Haus | Home Stories",
    metaDescription:
      "So nutzt du Home Stories für die Küchenrenovierung, die Badsanierung, ein Sanierungsobjekt, die Instandhaltung des Hauses und die Renovierung zu zweit.",
    h1: ["Eine App,", "jedes Projekt"],
    intro:
      "Home Stories hält Budget, Aufgaben, Fotos, Notizen und Dokumente eines Projekts an einem Ort. Ein Projekt kann die Küche sein, das Bad, ein Altbau, den du Raum für Raum sanierst, oder die lange Liste kleiner Reparaturen. Such dir aus, was bei dir ansteht.",
    imageAlt: "Bauzeichnungen auf einer Sperrholzplatte über einem Bock, mit Bleistift, Maßstab und einer Tasse Kaffee",
    englishNote:
      "Dachausbau, Keller, Anbau, Garage, Garten, Vermietung und die übrigen Anwendungen gibt es bisher nur auf Englisch:",
    englishLink: "alle Anwendungen ansehen",
  },
  entries: [
    {
      slug: "kitchen-renovation",
      label: "Küchenrenovierung",
      h1: "Küchenrenovierung planen: Budget, Handwerker und Fotos in einer App",
      metaTitle: "Küchenrenovierung planen – App für iPhone | Home Stories",
      metaDescription:
        "Plane die neue Küche auf dem iPhone: Budget, Preise für Geräte und Arbeitsplatte, die Reihenfolge der Gewerke, Angebote und Fotos vorher und nachher.",
      imageAlt: "Eine Küche mit neuen weißen Schränken und Arbeitsplatten aus Stein, der Boden noch nicht fertig",
      intro: [
        "Eine neue Küche hat mehr Einzelposten als jede andere Renovierung: Schränke, Arbeitsplatte, Geräte, Spüle, Armatur, Fliesen, Licht, dazu Installateur, Elektriker und Küchenmonteur. In Home Stories wird jeder Posten ein Element mit Preis, und die laufende Summe stimmt immer.",
        "Die Reihenfolge zählt so viel wie das Geld. Wasser, Abwasser und Strom müssen liegen, bevor die Schränke kommen, und das Aufmaß für die Arbeitsplatte geht erst, wenn die Schränke stehen. Leg jeden Schritt als Aufgabe mit Datum an, dann siehst du, auf welches Gewerk der nächste wartet.",
        "Den Herdanschluss und neue Stromkreise macht ein Elektriker. Sein Angebot und seine Rechnung gehören ins selbe Projekt.",
      ],
      track: [
        { title: "Jedes Produkt mit Preis", body: "Fotografiere die Spüle im Küchenstudio oder teile den Backofen aus Safari. Preis, Händler und eine Notiz landen am Element, das Element in der Summe." },
        { title: "Arbeitslohn getrennt vom Material", body: "Trag ein, was Monteur und Elektriker kosten, als Arbeit. Für die Steuerermäßigung für Handwerkerleistungen (§ 35a EStG) zählen nur die Arbeitskosten, nicht das Material, und nur mit Rechnung und Überweisung." },
        { title: "Angebot und Planung", body: "Das Angebot vom Küchenstudio, die Küchenplanung und den Lieferschein legst du als Dokumente im Projekt ab." },
        { title: "Die Reihenfolge der Gewerke", body: "Ausbau, Rohinstallation Wasser und Strom, Putz und Malern, Schränke, Aufmaß Arbeitsplatte, Montage Arbeitsplatte, Nischenrückwand, Anschlüsse. Je eine Aufgabe." },
        { title: "Vorher und nachher", body: "Fotografiere die alte Küche vor dem Ausbau. Der Vergleich nebeneinander am Ende ist das Bild, nach dem alle fragen." },
      ],
      steps: [
        "Leg ein Projekt \"Küche\" an, mit Startdatum und Gesamtbudget in Euro.",
        "Füg für jede Schrankzeile, jedes Gerät, die Arbeitsplatte und die Armatur ein Element hinzu, sobald du dich entschieden hast.",
        "Trag die Reihenfolge der Gewerke als Aufgaben mit Fälligkeitsdatum ein.",
        "Erfasse jede Zahlung als Material, Arbeit oder Handwerker.",
        "Mach in jeder Phase Fotos. Die Zeitleiste baut sich von selbst.",
      ],
      screenshotAlt: "Elementliste in Home Stories: jedes Produkt mit Preis, zusammengerechnet zur Projektsumme",
      faq: [
        { q: "Kann ich das Budget für eine neue Küche auf dem iPhone planen?", a: "Ja. Leg ein Projekt mit Budget an und füg jedes Gerät, jeden Schrank und jede Armatur als Element mit Preis hinzu. Home Stories führt die laufende Summe. Die App ist kostenlos, funktioniert offline und braucht kein Konto." },
        { q: "Kann ich die Handwerkerkosten für die Steuer getrennt halten?", a: "Ja. Erfasse Zahlungen als Material, Arbeit oder Handwerker und leg die Rechnung als Dokument dazu. Was davon steuerlich absetzbar ist, klärst du mit deinem Steuerberater oder dem Finanzamt." },
        { q: "Sehe ich, wenn die Küche über das Budget läuft?", a: "Die laufende Summe ist kostenlos und immer sichtbar. Das Diagramm Budget gegen Ist, das die Überschreitung kommen zeigt, gehört zum optionalen Einmalkauf Pro." },
      ],
      howToName: "So richtest du ein Küchenprojekt in Home Stories ein",
    },
    {
      slug: "bathroom-remodel",
      label: "Badsanierung",
      h1: "Badsanierung planen und festhalten, vom Ausbau bis zur letzten Fliese",
      metaTitle: "Badsanierung planen – Budget und Ablauf | Home Stories",
      metaDescription:
        "Plane die Badsanierung auf iPhone und iPad: Fliesen, Sanitär und Arbeitslohn in einem Budget, Abdichtung und Trockenzeit als Aufgaben, Fotos der Leitungen.",
      imageAlt: "Eine neue weiße Badewanne in einem Bad im Umbau, mit offenen Holzständern und Kupferrohren in der Wand",
      intro: [
        "Ein Bad ist ein kleiner Raum mit einem langen Ablauf. Ausbau, Sanitärinstallation, Estrich, Abdichtung, Trockenzeit, Fliesen und Endmontage müssen in dieser Reihenfolge passieren, und der größte Teil der Kosten ist Arbeit, die man nach dem Fliesen nicht mehr sieht.",
        "Home Stories hält Fliesen, Sanitärobjekte und Arbeitslohn in einem Budget und den Ablauf als Aufgaben. Die wichtigste Gewohnheit: ein Foto von jeder Leitung und von der Abdichtung, bevor die Wand zugeht. Dieses Foto brauchst du in fünf Jahren.",
      ],
      track: [
        { title: "Fotos von dem, was hinter die Fliesen kommt", body: "Leitungsführung, Abdichtung, Bodenablauf, Fußbodenheizung. Am selben Tag fotografiert, liegen sie mit Datum auf der Zeitleiste." },
        { title: "Fliesen nach Quadratmeter", body: "Fliesen, Fliesenkleber und Fugenmörtel als Elemente. Notier Serie, Farbe und Chargennummer, damit Nachkauf passt." },
        { title: "Sanitärobjekte und ihre Unterlagen", body: "Dusche, WC und Waschtisch als Elemente, Montageanleitungen und Garantiekarten als Dokumente." },
        { title: "Trockenzeit als Aufgabe", body: "Estrich und Abdichtung brauchen Zeit. Eine Aufgabe mit Datum, etwa für die CM-Messung, verhindert, dass der Fliesenleger einen Tag zu früh anfängt." },
        { title: "Installateur und Fliesenleger getrennt", body: "Erfass die Zahlungen je Gewerk als Arbeit oder Handwerker, dann ist klar, was jedes Gewerk am Ende gekostet hat." },
      ],
      steps: [
        "Leg ein Projekt \"Bad\" mit Startdatum und Budget an.",
        "Fotografiere das Bad, bevor der Ausbau beginnt.",
        "Füg Fliesen, Sanitärobjekte und Material als Elemente mit Preis hinzu.",
        "Trag den Ablauf als Aufgaben ein, die Trockenzeit als eigene Aufgabe.",
        "Fotografiere Leitungen und Abdichtung, bevor die Wände geschlossen werden.",
      ],
      screenshotAlt: "Projektansicht in Home Stories mit Foto-Zeitleiste und Aufgaben mit erfasster Zeit",
      faq: [
        { q: "Was sollte ich bei der Badsanierung fotografieren?", a: "Alles, was die Fliesen verdecken: Wasser- und Abwasserleitungen, die Abdichtung, den Bodenablauf und Kabel in der Nähe der Dusche. Diese Fotos sind dein Nachweis, wenn später ein Wasserschaden auftaucht." },
        { q: "Kann ich die Chargennummer der Fliesen in der App speichern?", a: "Ja. Leg die Fliesen als Element an und schreib Serie, Farbe und Chargennummer in die Notiz. Du brauchst sie, wenn eine Fliese springt und du nachkaufen musst." },
        { q: "Ist Home Stories für eine einzelne Badsanierung kostenlos?", a: "Ja. Projekte, Elemente, Fotos, Notizen, Dokumente und Aufgaben sind kostenlos und unbegrenzt. Pro ist ein optionaler Einmalkauf für Diagramm, Erinnerungen, PDF-Export, iCloud-Sync und Freigabe." },
      ],
      howToName: "So richtest du eine Badsanierung in Home Stories ein",
    },
    {
      slug: "fixer-upper",
      label: "Altbau sanieren",
      h1: "Ein Sanierungsobjekt gekauft? Saniere den Altbau Projekt für Projekt",
      metaTitle: "Altbau sanieren – Schritt für Schritt planen | Home Stories",
      metaDescription:
        "Saniere einen Altbau, während du darin wohnst: Fotos jedes Raums am ersten Tag, erst Dach, Feuchtigkeit und Heizung, dann ein Budget für jeden Raum.",
      imageAlt: "Ein leerer Raum in einem frisch gekauften älteren Haus im Morgenlicht, mit kahlen Wänden und einem einzelnen Umzugskarton",
      intro: [
        "Ein Sanierungsobjekt ist nicht eine Renovierung, sondern viele kleine über mehrere Jahre, während du dort wohnst. Die Reihenfolge entscheidet: Dach, Feuchtigkeit, Elektrik und Heizung zuerst, die schönen Räume später.",
        "In Home Stories wird jede Baustelle ein eigenes Projekt, mit eigenem Budget und eigenen Fotos. Eine Fotodokumentation des ganzen Hauses am ersten Tag ist die Grundlage für alles Weitere.",
        "Hast du vor dem Kauf einen Bausachverständigen durchs Haus geführt, ist sein Gutachten die erste Liste für das Projekt \"Muss jetzt\". Gutachten, Energieausweis und Angebote liegen als Dokumente im Projekt.",
      ],
      track: [
        { title: "Der Zustand am ersten Tag", body: "Fotografiere jeden Raum, bevor du auspackst. So siehst du immer, in welchem Zustand du das Haus übernommen hast." },
        { title: "Muss jetzt und kann warten", body: "Ein Projekt für das Dringende, eigene Projekte für die Räume, die warten können." },
        { title: "Was in den Wänden steckt", body: "Wenn ein Handwerker eine Wand oder den Boden öffnet, fotografiere, was drin ist, und trag die neuen Kosten als Element ein." },
        { title: "Belege über Jahre", body: "Jede Reparatur und jede Verbesserung mit Beleg, im Projekt, zu dem sie gehört." },
      ],
      steps: [
        "Leg ein Projekt \"Erster Tag\" an und fotografiere jeden Raum.",
        "Leg ein Projekt \"Muss jetzt\" an, für Dach, Feuchtigkeit, Elektrik und Heizung.",
        "Leg für jeden Raum, der warten kann, ein eigenes Projekt an.",
        "Trag jede Überraschung als Element mit Foto ein.",
      ],
      screenshotAlt: "Projektliste in Home Stories, jedes Projekt mit eigenem Budget",
      faq: [
        { q: "Womit fange ich bei einem Altbau an?", a: "Mit allem, was gefährlich ist oder Wasser hereinlässt: Dach, Feuchtigkeit, Elektrik, Heizung. Die Optik kommt danach." },
        { q: "Sollte jeder Raum ein eigenes Projekt bekommen?", a: "Ja, wenn die Räume zu verschiedenen Zeiten drankommen. Dann hat jedes Projekt sein eigenes Budget, eigene Aufgaben und eine eigene Foto-Zeitleiste." },
        { q: "Kann ich die Unterlagen aus mehreren Jahren sichern?", a: "Ja. Lokale Backups und der vollständige Datenexport sind kostenlos. iCloud-Sync (Pro) hält die Projekte zusätzlich auf deinen anderen Geräten." },
      ],
      howToName: "So richtest du die Sanierung eines Altbaus in Home Stories ein",
    },
    {
      slug: "home-repairs-and-maintenance",
      label: "Instandhaltung",
      h1: "Reparaturen und Wartung am Haus in einem Wartungsheft festhalten",
      metaTitle: "Wartungsplan fürs Haus – App für iPhone | Home Stories",
      metaDescription:
        "Halte jede Reparatur und Wartung am Haus fest: was gemacht wurde, von wem, was es gekostet hat und wann es wieder fällig ist. Mit Fotos und Rechnungen.",
      imageAlt: "Der Eingang eines verputzten Hauses mit einer Holzleiter an der Wand, einem Werkzeugkasten und Arbeitshandschuhen auf der Treppe",
      intro: [
        "Jedes Haus sammelt eine lange Liste kleiner Aufgaben: ein tropfender Hahn, die Dachrinne, die Heizungswartung, eine Tür, die klemmt. Jede einzelne ist klein, zusammen machen sie einen großen Teil dessen aus, was ein Haus im Jahr kostet.",
        "In Home Stories legst du ein Instandhaltungsprojekt für das Haus an, jede Reparatur als Aufgabe, jede Ausgabe als Element. Wenn etwas wieder kaputtgeht, weißt du, wer es beim letzten Mal repariert hat und was es gekostet hat.",
      ],
      track: [
        { title: "Jede Arbeit als Aufgabe", body: "Was zu tun ist, mit Datum. Erledigte Aufgaben bleiben im Verlauf." },
        { title: "Wer es gemacht hat", body: "Eine Notiz mit Name und Nummer des Handwerkers, an der Arbeit, die er gemacht hat." },
        { title: "Was wiederkommt", body: "Heizungswartung, Dachrinne reinigen, Rauchmelder prüfen. Wenn du eine erledigst, leg gleich die nächste als Aufgabe an. Den Termin des Schornsteinfegers trägst du einfach mit ein." },
        { title: "Kosten übers Jahr", body: "Jede Reparatur als Element, mit dem Arbeitslohn getrennt vom Material. So hast du die Jahressumme und die Rechnungen beisammen, wenn die Steuererklärung ansteht." },
      ],
      steps: [
        "Leg ein Projekt \"Instandhaltung\" für das Haus an.",
        "Füg jede Reparatur und jede Wartung als Aufgabe mit Datum hinzu.",
        "Erfasse die Kosten als Element.",
        "Leg die Rechnung als Dokument ab und den Handwerker in einer Notiz.",
      ],
      screenshotAlt: "Aufgabenliste in Home Stories mit Fälligkeitsdaten und erfasster Zeit",
      faq: [
        { q: "Wie führe ich ein Wartungsheft für mein Haus?", a: "Leg ein Projekt für das Haus an. Jede Arbeit wird eine Aufgabe, ihre Kosten ein Element und die Rechnung ein Dokument. Home Stories hält alles auf deinem iPhone oder iPad." },
        { q: "Erinnert mich die App an die nächste Wartung?", a: "Aufgaben mit Fälligkeitsdatum sind kostenlos. Erinnerungen an diese Aufgaben gehören zum optionalen Einmalkauf Pro." },
        { q: "Sehe ich, was als Nächstes fällig ist, ohne die App zu öffnen?", a: "Ja. Die kostenlosen Widgets für den Home-Bildschirm zeigen den Budgetfortschritt und die nächsten Schritte." },
      ],
      howToName: "So richtest du ein Wartungsheft für dein Haus in Home Stories ein",
    },
    {
      slug: "renovating-with-a-partner",
      label: "Zu zweit renovieren",
      h1: "Zu zweit renovieren, aus einem gemeinsamen Projekt",
      metaTitle: "Gemeinsam renovieren – App für Paare | Home Stories",
      metaDescription:
        "Teile ein Renovierungsprojekt mit Partner oder Familie (Pro): dasselbe Budget, dieselben Aufgaben, Elemente und Fotos auf jedem iPhone und iPad, über iCloud.",
      imageAlt: "Eine Frau in einem halb renovierten Zimmer, die auf Zettel an der kahlen Wand schaut",
      intro: [
        "Der meiste Streit beim Renovieren dreht sich um Geld, das niemand aufgeschrieben hat, und um Entscheidungen, von denen einer nichts wusste. Ein gemeinsamer Stand räumt das meiste davon ab.",
        "Mit Pro teilst du ein Projekt in Home Stories mit deinem Partner oder deiner Familie. Ihr seht dasselbe Budget, dieselben Aufgaben, Elemente und Fotos, und Änderungen kommen über iCloud auf dem anderen Telefon an.",
      ],
      track: [
        { title: "Ein Budget", body: "Ihr tragt beide ein, was ihr bezahlt. Die laufende Summe stimmt, auch nach dem Samstag im Baumarkt." },
        { title: "Wer was macht", body: "Aufgaben mit Datum, damit die Liste für euch beide klar ist." },
        { title: "Entscheidungen an einem Ort", body: "Ihr teilt beide Produkte aus Safari ins Projekt und entscheidet gemeinsam, mit dem Preis vor Augen." },
        { title: "Euer eigenes iCloud", body: "Das Teilen läuft über iCloud. Es gibt kein Konto und keinen Server von uns dazwischen." },
      ],
      steps: [
        "Legt das Projekt an und setzt das Budget gemeinsam fest.",
        "Upgrade auf Pro (ein Kauf, Familienfreigabe inklusive).",
        "Teil das Projekt mit deinem Partner.",
        "Jeder trägt unterwegs Elemente, Zahlungen und Fotos ein.",
      ],
      screenshotAlt: "Aufgabenliste in Home Stories mit Fälligkeitsdaten und erfasster Zeit",
      faq: [
        { q: "Können mein Partner und ich dasselbe Renovierungsprojekt nutzen?", a: "Ja, mit Pro. Über die Projektfreigabe lädst du Partner oder Familie ein, und alle sehen über iCloud dieselben Aufgaben, Elemente und Fotos." },
        { q: "Müssen wir Pro beide kaufen?", a: "Pro ist ein einziger Kauf mit Familienfreigabe, also bekommen es auch die Personen in deiner Apple-Familienfreigabe." },
        { q: "Braucht das Teilen ein Konto?", a: "Nein. Es gibt kein Home-Stories-Konto. Teilen und Synchronisieren laufen über euer eigenes iCloud." },
      ],
      howToName: "So teilst du ein Renovierungsprojekt in Home Stories mit deinem Partner",
    },
  ],
};

export default de;
