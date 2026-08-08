import type { SiteConfig } from "@/lib/types"
import { ramp } from "./brand"

// Castres — ramonage. Tarn, Occitanie.
// Les faits locaux et leurs sources sont dans docs/castres-local-facts.md :
// rien n'est écrit ici qui n'y soit pas marqué [VÉRIFIÉ].
//
// Signature éditoriale du site : LE VENT D'AUTAN. Castres compte jusqu'à 80-90
// jours d'autan par an, un vent de sud-est turbulent accéléré par le goulet de la
// vallée du Thoré. Aucune autre ville du portefeuille ne peut écrire ça, et aucun
// des deux ramoneurs classés ne l'exploite.
//
// Second axe : le DÉCRET du 20 juillet 2023, en vigueur depuis le 1er octobre 2023.
// Le concurrent n°2 emploie encore la formulation antérieure. Personne à Castres ne
// cite le délai de quinze jours ouvrés pour l'attestation.
export const config: SiteConfig = {
  niche: "ramonage",
  nicheDe: "de ramonage",
  nicheCap: "Ramonage",
  nicheMetier: "ramoneur",

  // Fourchettes construites sur les repères NATIONAUX publiés et sourcés
  // (§ 3 des faits locaux) : foyer ouvert 45-90 €, insert 55-130 €, granulés
  // 80-140 €, moyenne du secteur ≈ 85 € TTC. Aucun ramoneur castrais n'affiche
  // de tarif, il n'existe donc pas de référence locale à citer.
  estimator: {
    interventions: {
      "foyer-ouvert": { label: "Cheminée à foyer ouvert", base: [45, 90] },
      insert: { label: "Insert ou foyer fermé", base: [55, 130] },
      "poele-bois": { label: "Poêle à bois", base: [55, 115] },
      "poele-granules": { label: "Poêle à granulés", base: [80, 140] },
      chaudiere: { label: "Chaudière gaz ou fioul", base: [55, 110] },
    },
    sizes: {
      un: { label: "Un conduit", f: 1 },
      deux: { label: "Deux conduits", f: 1.7 },
      trois: { label: "Trois conduits ou plus", f: 2.3 },
      immeuble: { label: "Conduit collectif d'immeuble", f: 2.6 },
    },
    quantities: {
      castres: { label: "Castres et ses faubourgs", f: 1 },
      agglo: { label: "Jusqu'à 20 km (Saïx, Labruguière…)", f: 1.1 },
      tarn: { label: "Jusqu'à 40 km (Mazamet, Graulhet…)", f: 1.25 },
    },
    access: {
      "par-le-bas": { label: "Accessible par le foyer", f: 1 },
      toiture: { label: "Passage par la toiture", f: 1.2 },
      devoye: { label: "Conduit coudé ou dévoyé", f: 1.3 },
      encorbellement: { label: "Maison de centre ancien", f: 1.35 },
    },
    labels: {
      intervention: "Quel appareil",
      size: "Combien de conduits",
      quantity: "Où se trouve le logement",
      access: "L'accès au conduit",
    },
    disclaimer:
      "Ce qui fait vraiment varier la note, c'est le conduit, pas l'appareil. Un boisseau droit sur une maison de lotissement et un conduit dévoyé dans une maison à encorbellement du centre ne demandent ni le même temps ni le même matériel.",
  },

  slug: "castres",
  city: "Castres",
  inCity: "à Castres",
  dept: "Tarn",
  deptCode: "81",
  region: "Occitanie",
  domain: "castres-ramonage.fr",
  brand: "Castres Ramonage",

  brandColor: ramp.brand["600"],
  brandColorDark: ramp.brand["900"],
  theme: {
    brand: ramp.brand,
    radius: "1rem",
    font: "barlow",
    fontHeading: "archivo",
    accentIcon: "flame",
    variant: "devis",
    logo: { headerIcon: true, faviconStyle: "souche", wordmark: "serif" },
  },

  // Rien d'inventé : ni numéro, ni e-mail, ni SIRET, ni qualification. Le rendu
  // est conditionnel. Le numéro Twilio n'arrive qu'après les premiers clics
  // mesurés dans Search Console.
  phoneDisplay: "",
  phoneHref: "",
  email: "",
  postalCode: "81100",
  hours: "Demandes prises du lundi au samedi, de 8 h à 19 h",
  geo: { lat: 43.6047, lng: 2.2405 },

  hero: {
    image: "/hero-castres.jpg",
    imageAlt:
      "Les maisons sur l'Agout vues du pont Neuf, à Castres, avec leurs encorbellements de bois au-dessus de la rivière",
    imageCredit:
      "Héro : Didier Descouens, CC BY-SA 4.0, via Wikimedia Commons. Maisons sur l'Agout (seconde photo) : Krzysztof Golik, CC BY-SA 4.0, via Wikimedia Commons.",
    title: "Ramonage à Castres : le rendez-vous annuel qui vous couvre",
    subtitle:
      "Depuis le 1er octobre 2023, le ramonage se fait au moins tous les douze mois et l'attestation vous est remise dans les quinze jours ouvrés. On s'occupe du conduit, du certificat, et du rappel l'an prochain.",
    // Le sous-titre ci-dessus est écrit pour l'écran et fait 210 c. : trop long pour
    // une meta description. Version courte, réponse d'abord.
    metaDescription:
      "Ramonage de cheminée, d'insert, de poêle à bois ou à granulés à Castres et 40 km alentour. Attestation remise sous quinze jours ouvrés, comme le prévoit le décret de 2023.",
    points: [
      "Attestation remise dans le délai légal de quinze jours ouvrés",
      "Cheminée, insert, poêle à bois ou à granulés, chaudière",
      "Créneaux avant la saison de chauffe, quand c'est encore calme",
    ],
  },

  trust: [
    {
      title: "Le texte de 2023, appliqué à la lettre",
      body: "Le décret du 20 juillet 2023 fixe un ramonage au moins tous les douze mois et impose la remise d'une attestation dans les quinze jours ouvrés. Beaucoup de sites en sont restés à l'ancienne formulation des règlements sanitaires. Nous, on travaille sur le texte en vigueur.",
    },
    {
      title: "Un vrai ramonage, pas une bûche",
      body: "La loi définit le ramonage comme un nettoyage par action mécanique directe de la paroi du conduit, et interdit l'emploi du feu. Une bûche dite de ramonage ne remplit donc pas l'obligation, quoi qu'en dise l'emballage.",
    },
    {
      title: "L'autan, on sait ce qu'il fait aux conduits",
      body: "Castres compte jusqu'à quatre-vingts à quatre-vingt-dix jours de vent d'autan par an, avec des rafales qui dépassent la centaine de kilomètres-heure. Un conduit qui tire mal les jours d'autan, ce n'est pas un hasard, et ça se regarde.",
    },
    {
      title: "Les maisons du centre ancien ne se ramonent pas comme les autres",
      body: "Encorbellements au-dessus de l'Agout, toitures en tuile canal, conduits dévoyés dans des murs anciens : on prévoit le temps et le matériel avant de venir, pas en arrivant devant la porte.",
    },
  ],

  local: {
    geography:
      "Castres s'étend de part et d'autre de l'Agout, au pied de la Montagne Noire et des monts de Lacaune, à l'entrée de la vallée du Thoré.",
    climateRisk:
      "C'est le vent qui commande ici : l'autan s'engouffre dans le goulet formé par les deux massifs et souffle jusqu'à quatre-vingt-dix jours par an, en rafales très irrégulières.",
    intro: [
      "Castres est l'une des trois villes que l'on cite toujours quand on parle du vent d'autan, avec Toulouse et le Lauragais. C'est là qu'il est le plus fréquent et qu'il souffle le plus fort : jusqu'à quatre-vingts à quatre-vingt-dix jours par an, à trente ou quarante kilomètres-heure en moyenne, avec des rafales qui ont dépassé les cent vingt.",
      "Ce qui le rend particulier, ce n'est pas sa force mais sa turbulence. L'air venu de la Méditerranée est comprimé entre les Pyrénées et la Montagne Noire, puis accéléré une seconde fois dans la vallée du Thoré, entre les monts de Lacaune et le massif. Il arrive par bouffées irrégulières plutôt qu'en flux régulier.",
      "Un conduit de fumée fonctionne par différence de pression entre le foyer et la sortie en toiture. Un vent instable qui frappe la souche par le sud-est perturbe cet équilibre, et c'est souvent les jours d'autan qu'on remarque qu'un tirage est limite. Un conduit encrassé pardonne beaucoup moins dans ces conditions qu'un conduit propre. Le détail des prestations est sur [le ramonage de cheminée](/ramonage-cheminee), et l'obligation légale sur [cette page](/conseils/attestation-de-ramonage).",
    ],
    neighborhoods: [
      "Centre historique",
      "Villegoudou",
      "Bisséous",
      "Lameilhé",
      "Laden",
      "Aillot",
      "Lardaillé",
      "Gourjade",
      "La Gourjade",
      "Le Travet",
      "Saint-Hippolyte",
      "Les Salvages",
    ],
    towns: [
      "Saïx",
      "Labruguière",
      "Valdurenque",
      "Burlats",
      "Roquecourbe",
      "Lagarrigue",
      "Navès",
      "Soual",
      "Viviers-lès-Montagnes",
      "Noailhac",
      "Aiguefonde",
      "Aussillon",
      "Mazamet",
      "Payrin-Augmontel",
      "Lacrouzette",
      "Montredon-Labessonnié",
      "Lautrec",
      "Vielmur-sur-Agout",
      "Puylaurens",
      "Dourgne",
    ],
    blocks: [
      {
        heading: "Ce qu'on ramone dans le Tarn",
        items: [
          "Cheminée à foyer ouvert",
          "Insert et foyer fermé",
          "Poêle à bois",
          "Poêle à granulés",
          "Chaudière bois, gaz ou fioul",
          "Cuisinière et four à bois",
        ],
      },
      {
        heading: "Les conduits qui demandent du temps",
        items: [
          "Boisseau dévoyé dans un mur ancien",
          "Souche en toiture de tuile canal",
          "Maison à encorbellement du centre",
          "Conduit collectif d'immeuble",
          "Tubage inox de rénovation",
        ],
      },
    ],
    regulations: {
      national: [
        "Le décret n° 2023-641 du 20 juillet 2023, entré en vigueur le 1er octobre 2023, régit l'entretien des appareils de chauffage à combustion et le ramonage des conduits de fumée. Il reprend au niveau national des exigences qui figuraient jusque-là dans les règlements sanitaires départementaux.",
        "Le ramonage d'un appareil individuel se fait au moins tous les douze mois. Pour un conduit desservant un appareil collectif, c'est tous les six mois, dont une fois pendant la période de chauffe. Un appareil fonctionnant exclusivement au gaz et n'ayant jamais servi à un autre combustible peut s'en tenir à douze mois.",
        "Le code de la santé publique définit le ramonage comme le nettoyage, par action mécanique directe, de la paroi intérieure du conduit, afin d'en éliminer les suies et les dépôts. L'emploi du feu ou d'explosifs y est expressément interdit, et les souches et accessoires doivent être vérifiés puis remis en état si nécessaire.",
        "Chaque opération de ramonage ou d'entretien donne lieu à la remise d'une attestation, dans un délai de quinze jours ouvrés suivant l'achèvement de l'opération. Pour un appareil à combustible solide, le professionnel doit en outre délivrer des conseils sur l'installation, la qualité du combustible et l'intérêt éventuel d'un remplacement.",
      ],
      local: [
        "Le texte national fixe un minimum : les arrêtés préfectoraux peuvent imposer plusieurs ramonages par an, dont un pendant la période de chauffe. Avant de prendre rendez-vous, demandez ce qui s'applique à votre commune plutôt que de vous fier à un chiffre lu sur un site.",
        "Dans le centre ancien de Castres, entre les maisons à encorbellement sur l'Agout et les toitures en tuile canal, l'intervention se prépare : l'accès en toiture n'est pas toujours possible, et le travail se fait alors par le foyer, avec un matériel adapté au tracé du conduit.",
        "Les jours de fort autan, une intervention en toiture ne se fait pas. C'est une question de sécurité, et c'est aussi pour ça qu'on cale les rendez-vous à l'avance plutôt que dans l'urgence de la première semaine froide.",
      ],
    },
    season: [
      "La bonne période, c'est la fin de l'été et le début de l'automne, avant que le premier coup de froid ne déclenche l'appel de tout le monde en même temps. Le conduit a séché tout l'été, les créneaux sont libres, et l'attestation est en votre possession quand vous allumez.",
      "En plein hiver, la demande se concentre sur quelques semaines et les délais s'allongent. C'est aussi le moment où l'on découvre qu'un conduit tire mal, précisément quand on ne peut plus se passer de l'appareil.",
      "Le printemps a un intérêt qu'on oublie : ramoner après la saison de chauffe évite de laisser les suies et les condensats travailler la paroi pendant six mois. Sur un poêle à granulés, c'est même le meilleur moment pour un entretien complet.",
    ],
  },

  photoLocale: {
    src: "/maisons-agout-castres.jpg",
    alt: "Les maisons sur l'Agout à Castres, avec leurs souches de cheminée en terre cuite sur les toitures de tuile canal",
  },

  zone: {
    intro: [
      "On intervient à Castres et dans les communes qui l'entourent, jusqu'à une quarantaine de kilomètres. Trois directions, et ce ne sont pas les mêmes chantiers dans chacune.",
      "Vers l'amont de l'Agout d'abord, par Burlats, Roquecourbe et Lacrouzette, on entre dans le Sidobre. Le bâti y est en granit, les maisons sont isolées, souvent chauffées au bois parce que le combustible est à côté. Les conduits maçonnés y sont la règle et le tubage inox y est fréquent en rénovation.",
      "Vers le sud-est ensuite, le couloir du Thoré file vers Labruguière, Aiguefonde, Aussillon et Mazamet. C'est le second goulet du vent d'autan, celui qui resserre l'air entre les monts de Lacaune et la Montagne Noire. Les rafales y sont plus turbulentes qu'en ville, et c'est aussi le secteur où l'on voit le plus de tirages capricieux par vent de sud-est.",
      "Vers le nord enfin, par Lautrec, Vielmur-sur-Agout et Montredon-Labessonnié, le paysage s'ouvre sur des coteaux et des fermes dispersées. Les distances entre deux rendez-vous y sont plus longues, ce qui joue sur les créneaux disponibles plutôt que sur le prix.",
      "Dans les trois cas, la même préparation : on demande l'appareil, le nombre de conduits et l'accès en toiture avant de se déplacer. Les repères de prix sont sur [la page des tarifs](/prix), et ce que dit exactement le texte de 2023 est repris [ici](/conseils/attestation-de-ramonage).",
    ],
    missing:
      "Votre commune n'est pas citée ? Le sud du Tarn compte plus de villages que cette liste n'en tient, et on ne cite que ceux où l'on passe souvent. Donnez le nom, on répond franchement : si c'est trop loin pour un aller-retour dans la journée, on le dit plutôt que de faire monter le déplacement.",
    cta: "Dites-nous quel appareil et dans quelle commune, on vous rappelle avec une date et un prix.",
  },

  contactIntro:
    "Trois informations suffisent pour vous donner un prix : quel appareil, combien de conduits, et si la toiture est accessible. Si vous savez quand le dernier ramonage a été fait, ajoutez-le — au-delà de deux ou trois saisons sans passage, le travail n'est pas le même.",

  copy: {
    accroche: "Ramoneur dans le sud du Tarn",
    metierPluriel: "Ramoneurs",
    bandeauHeader: "Attestation sous quinze jours ouvrés · Castres et 40 km alentour",
    servicesResume: "ramonage de cheminée, d'insert, de poêle à bois ou à granulés",
    servicesIntro:
      "Du foyer ouvert de maison de campagne au poêle à granulés d'un pavillon récent, avec l'attestation qui va avec.",
    confianceTitre: "Pourquoi passer par nous plutôt que par une bûche de supermarché",
    ctaTitre: "Votre ramonage annuel est à faire ?",
    ctaSousTitre:
      "Donnez-nous l'appareil et la commune. Vous avez une date et un montant avant qu'on se déplace.",
    risqueTitre: "Ce que l'autan change au tirage",
    quandTitre: "Quand faire ramoner dans le Tarn",
    prixNote:
      "Aucun ramoneur castrais ne publie ses tarifs. Les repères ci-dessus sont nationaux et datés. Pour un montant ferme, il faut connaître l'appareil et le conduit.",
    prixSurtitre: "Repères publiés — relevé du",
    ctaEstimer: "Estimer mon ramonage",
    messagePlaceholder:
      "Appareil, nombre de conduits, commune, date du dernier ramonage si vous l'avez…",
    estimateurSurtitre: "Estimation gratuite",
    estimateurTitre: "Votre fourchette de prix par e-mail",
    estimateurIntro:
      "Quatre réponses sur votre {service} et vous recevez une estimation. Le prix ferme et la date viennent après un appel.",
    ctaTexte: "Recevoir mon estimation",
    consentement:
      "J'autorise {marque} à me recontacter au sujet de ce ramonage. La suppression de vos données peut être demandée à tout moment.",
    boutonEstimation: "Recevoir mon estimation par e-mail",
    faqSurtitre: "Les questions qui reviennent chaque automne",
    contactH1: "Prendre rendez-vous pour un ramonage à Castres",
    contactAppelTitre: "Nous joindre",
    contactEstimateurTitre: "Obtenir une fourchette tout de suite",
    contactEstimateurIntro:
      "Si vous voulez un ordre de grandeur avant de parler à quelqu'un, l'estimateur le calcule et vous l'envoie.",
    contactMessageTitre: "Décrire votre installation",
    contactMessageIntro:
      "Le type d'appareil et le nombre de conduits suffisent pour un premier chiffrage. L'accès en toiture affine le reste.",
  },

  contactDetail: [
    "Une chose à préciser dès le premier message : la date du dernier ramonage. Un conduit entretenu chaque année se nettoie vite. Un conduit laissé trois ou quatre saisons a souvent formé du bistre, ce goudron dur qui ne part pas au hérisson et qui relève d'une autre intervention.",
    "Si vous êtes locataire, sachez que le ramonage est en général à votre charge au titre de l'entretien courant, et que l'attestation vous sera demandée. Prenez le rendez-vous vous-même plutôt que d'attendre un accord qui ne viendra pas.",
  ],

  pricing: {
    updated: "4 août 2026",
    metaTitle: "Prix d'un ramonage à Castres : les repères 2026",
    metaDescription:
      "Aucun ramoneur castrais n'affiche ses tarifs. Les fourchettes nationales publiées et datées : 45 à 90 € pour un foyer ouvert, 80 à 140 € pour un poêle à granulés.",
    h1: "Prix d'un ramonage à Castres",
    intro: [
      "Les deux ramoneurs qui occupent les premières places sur « ramonage Castres » ne publient aucun tarif. Il n'existe donc pas de référence locale à citer, et cette page ne peut honnêtement donner que des repères nationaux, avec leur source et leur date.",
      "Les fourchettes ci-dessous ont été relevées le 4 août 2026 auprès de plusieurs éditeurs qui publient des barèmes. Elles situent un ordre de grandeur avant l'appel. Pour ce qui est facturé et pourquoi, voir [le ramonage de cheminée](/ramonage-cheminee) et [le ramonage de poêle à granulés](/ramonage-poele-a-granules).",
    ],
    essentiel: [
      "**Un ramonage courant se situe entre 50 et 120 € TTC**, pour une moyenne annoncée autour de 85 €.",
      "**Le poêle à granulés est le poste le plus cher**, 80 à 140 € TTC, parce que l'entretien y est plus long qu'un simple passage de hérisson.",
      "**Un second conduit ne double pas la facture** : le déplacement est déjà fait, seul le temps de travail s'ajoute.",
      "**Le bistre change de catégorie** : ce n'est plus un ramonage mais un débistrage, et ça se chiffre après diagnostic.",
    ],
    tables: [
      {
        heading: "Fourchettes publiées, par type d'appareil",
        note: "Relevé du 4 août 2026. Sources : habitatpresto.com, travaux.obat.fr, travaux.com, mesdepanneurs.fr, groupama.fr, ramonetou.fr. Ce sont des repères NATIONAUX publiés par des tiers, pas des prix castrais et pas les nôtres.",
        head: ["Appareil", "Fourchette publiée"],
        rows: [
          ["Cheminée au gaz", "40 à 60 €"],
          ["Cheminée à foyer ouvert", "40 à 90 € (moyenne annoncée ≈ 65 €)"],
          ["Cheminée au fioul", "55 à 85 €"],
          ["Insert ou foyer fermé", "50 à 130 €"],
          ["Poêle à granulés", "80 à 140 € (jusqu'à 220 € sur conduit complexe)"],
          ["Toutes prestations confondues", "50 à 120 € TTC, moyenne ≈ 85 €"],
        ],
      },
      {
        heading: "Ce qui fait bouger le montant",
        note: "Coefficients indicatifs appliqués par notre estimateur, tirés de l'écart de temps entre ces situations. Ils ne remplacent pas un devis.",
        head: ["Situation", "Effet sur le prix"],
        rows: [
          ["Un conduit, accès par le foyer", "prix de base"],
          ["Passage obligé par la toiture", "environ × 1,2"],
          ["Conduit coudé ou dévoyé", "environ × 1,3"],
          ["Maison à encorbellement du centre ancien", "environ × 1,35"],
          ["Deuxième conduit sur la même visite", "environ × 1,7 au total"],
          ["Conduit collectif d'immeuble", "environ × 2,6"],
        ],
      },
    ],
    factors: [
      {
        title: "L'appareil, mais surtout le conduit",
        body: "Un poêle à granulés se ramone et s'entretient : il y a un échangeur, un ventilateur, une vis d'alimentation. Une cheminée à foyer ouvert, c'est essentiellement le conduit. À prix affiché comparable, ce n'est pas le même travail ni la même durée.",
      },
      {
        title: "Le tracé",
        body: "Un boisseau droit se traite en une passe. Un conduit dévoyé, coudé pour contourner une poutre ou passer d'un mur à l'autre, demande de travailler en plusieurs points et parfois de démonter un raccordement. Dans les maisons anciennes du centre, c'est la règle plutôt que l'exception.",
      },
      {
        title: "Le temps écoulé depuis le dernier passage",
        body: "Un conduit ramoné chaque année se nettoie vite. Trois ou quatre saisons sans passage, et les suies se sont compactées, parfois vitrifiées en bistre. Le bistre ne relève plus du hérisson mais du débistrage, avec un outillage rotatif et un temps sans commune mesure.",
      },
      {
        title: "La date du rendez-vous",
        body: "Septembre et octobre sont calmes, novembre et décembre sont saturés. À prestation identique, le créneau se trouve plus facilement avant la saison de chauffe, et l'attestation est déjà chez vous quand vous allumez.",
      },
    ],
    local: {
      heading: "Pourquoi le centre ancien castrais coûte un peu plus cher",
      body: [
        "Les maisons du centre, notamment celles qui surplombent l'Agout avec leurs encorbellements de bois, ont des conduits maçonnés anciens, souvent dévoyés pour contourner la structure. Les toitures sont en tuile canal, à faible pente, et l'accès en toiture n'y est pas toujours praticable en sécurité.",
        "Quand la toiture est exclue, on travaille par le foyer, avec un matériel qui suit le tracé du conduit. C'est faisable, c'est simplement plus long, et il vaut mieux le savoir avant plutôt que de découvrir la difficulté une fois l'équipe sur place.",
        "S'y ajoute une contrainte propre à Castres : les jours de fort autan, on ne monte pas sur un toit. C'est une raison de plus de fixer le rendez-vous à l'avance, à une période où l'on peut décaler d'un jour sans que ça pose problème.",
      ],
    },
    faq: [
      {
        q: "Pourquoi ne donnez-vous pas un prix ferme sur cette page ?",
        a: "Parce qu'il dépendrait de l'appareil, du nombre de conduits, de l'accès et de la date du dernier passage. Un prix affiché sans ces éléments serait soit trop haut pour la moitié des cas, soit révisé sur place, ce qui est pire.",
      },
      {
        q: "Le ramonage est-il à la charge du locataire ou du propriétaire ?",
        a: "Il relève en général de l'entretien courant, donc du locataire, sauf clause contraire du bail. Le propriétaire reste tenu de la conformité de l'installation. En cas de doute, relisez le bail avant de prendre rendez-vous.",
      },
      {
        q: "Deux conduits dans la même maison, c'est deux fois le prix ?",
        a: "Non. Le déplacement et la mise en place ne se paient qu'une fois. Notre estimateur applique environ 1,7 pour deux conduits plutôt que 2, ce qui reflète le temps réel.",
      },
      {
        q: "Le débistrage, c'est combien ?",
        a: "Ça ne se chiffre pas d'avance. Le bistre est un dépôt goudronneux dur qui demande un outillage rotatif, et sa quantité ne se devine pas depuis le salon. Le montant est donné après diagnostic, avant de commencer.",
      },
    ],
  },

  services: [
    {
      slug: "ramonage-cheminee",
      name: "Ramonage de cheminée",
      navLabel: "Cheminée",
      tagline: "Foyer ouvert et foyer fermé",
      icon: "flame",
      metaTitle: "Ramonage de cheminée à Castres — prix et obligation",
      metaDescription:
        "Ramonage de cheminée à Castres, foyer ouvert ou insert : ce que le décret de 2023 impose, comment on procède, et ce que l'autan change au tirage.",
      h1: "Ramonage de cheminée à Castres",
      intro: [
        "La cheminée reste l'appareil le plus ramoné, et celui où l'écart entre deux interventions est le plus grand. Un foyer ouvert tire beaucoup d'air et encrasse relativement peu de suies sèches ; un foyer fermé brûle à plus basse température, avec un tirage réduit, et produit davantage de dépôts collants.",
        "Dans les deux cas, l'obligation est la même : au moins un ramonage tous les douze mois, avec attestation remise dans les quinze jours ouvrés. Le détail du texte est repris sur [notre page dédiée](/conseils/attestation-de-ramonage), et les repères de prix sur [la page tarifs](/prix).",
      ],
      sections: [
        {
          heading: "Comment se passe une intervention",
          body: [
            "On protège d'abord la pièce : bâche au sol, obturation du foyer, aspirateur à filtration en place. Le nettoyage se fait ensuite par action mécanique, hérisson adapté au diamètre et à la forme du conduit, depuis le foyer ou depuis la souche selon l'accès. La loi est explicite sur ce point : c'est la paroi intérieure qu'il faut nettoyer mécaniquement, et l'emploi du feu est interdit.",
            "Vient ensuite la vérification de la souche et des accessoires, que le texte impose également. Chapeau descellé, mortier délavé, grille manquante : ce sont des défauts qu'on ne voit pas depuis le salon et qui expliquent une bonne part des mauvais tirages.",
          ],
        },
        {
          heading: "Ce que l'autan fait à votre tirage",
          body: [
            "Un conduit fonctionne sur une différence de pression entre le foyer et la sortie en toiture. Un vent régulier n'est pas un problème : il crée même une dépression favorable. Un vent turbulent, en revanche, envoie des bouffées de surpression sur la souche et casse l'équilibre par intermittence.",
            "C'est exactement le régime de l'autan à Castres, où il souffle jusqu'à quatre-vingt-dix jours par an avec des rafales très irrégulières. Un conduit propre encaisse ; un conduit dont la section utile a été réduite par les dépôts encaisse beaucoup moins. Si vous constatez des refoulements surtout les jours de vent de sud-est, dites-le : ça oriente le diagnostic vers la souche.",
          ],
        },
        {
          heading: "Foyer ouvert ou insert, deux entretiens différents",
          body: [
            "Sur un foyer ouvert, l'essentiel du travail est dans le conduit. Le rendement est faible, l'air chaud part en toiture, et les dépôts sont plutôt secs et pulvérulents.",
            "Sur un insert, il faut en plus déposer et nettoyer le déflecteur, contrôler les joints de porte et la vitre, et vérifier le raccordement entre l'appareil et le conduit. Les dépôts y sont plus gras. C'est ce qui explique la différence de fourchette entre les deux, détaillée sur [la page des prix](/prix).",
          ],
        },
      ],
      faq: [
        {
          q: "Une bûche de ramonage suffit-elle à remplir l'obligation ?",
          a: "Non. Le code de la santé publique définit le ramonage comme un nettoyage par action mécanique directe de la paroi du conduit et interdit expressément l'emploi du feu. Une bûche ne produit donc pas d'attestation valable.",
        },
        {
          q: "Combien de temps dure un ramonage de cheminée ?",
          a: "Compter en général moins d'une heure pour un conduit droit régulièrement entretenu. Un conduit dévoyé, ou laissé plusieurs saisons, prend sensiblement plus de temps.",
        },
        {
          q: "Faut-il ramoner une cheminée dont on ne se sert pas ?",
          a: "Le texte prévoit qu'un appareil resté inutilisé sur la période n'a pas à être ramoné pendant ce temps, mais qu'un ramonage est obligatoire avant sa remise en service. Autrement dit, avant de rallumer après deux hivers d'arrêt.",
        },
      ],
    },
    {
      slug: "ramonage-poele-a-bois",
      name: "Ramonage de poêle à bois",
      navLabel: "Poêle à bois",
      tagline: "Conduit, raccordement et déflecteur",
      icon: "thermometer",
      metaTitle: "Ramonage de poêle à bois à Castres — tarifs et méthode",
      metaDescription:
        "Ramonage annuel de poêle à bois à Castres : conduit, raccordement, déflecteur et joints. Ce qui encrasse vite, et l'attestation remise sous quinze jours ouvrés.",
      h1: "Ramonage de poêle à bois à Castres",
      intro: [
        "Le poêle à bois a remplacé beaucoup de foyers ouverts dans le sud du Tarn, pour une bonne raison : il rend nettement plus de chaleur pour la même quantité de bois. La contrepartie est dans le conduit. Une combustion plus lente et plus fraîche laisse davantage de dépôts sur la paroi.",
        "L'obligation reste d'au moins un ramonage tous les douze mois. Si votre appareil brûle des granulés et non des bûches, l'entretien est différent : voir [le ramonage de poêle à granulés](/ramonage-poele-a-granules).",
      ],
      sections: [
        {
          heading: "Le raccordement compte autant que le conduit",
          body: [
            "Entre la buse du poêle et le conduit maçonné ou le tubage, il y a un raccordement, souvent en acier émaillé, parfois avec un ou deux coudes. C'est là que les dépôts s'accumulent en premier, parce que la température y chute et que la géométrie ralentit les fumées.",
            "Un ramonage sérieux passe donc par la dépose de ce raccordement, son nettoyage séparé et le contrôle de son état. Un élément percé ou fatigué se voit à ce moment-là, pas en regardant l'appareil de face.",
          ],
        },
        {
          heading: "Le bois, premier facteur d'encrassement",
          body: [
            "Un bois humide ne chauffe pas : une partie de l'énergie sert à évaporer l'eau qu'il contient. Cette vapeur se recondense plus haut dans le conduit et forme avec les imbrûlés le dépôt collant qui finit en bistre — et là, on change d'intervention, voir [le débistrage](/debistrage). Deux ans de séchage sous abri ventilé restent la référence, et le sud du Tarn ne manque ni de place ni de vent pour ça.",
            "Le décret de 2023 a d'ailleurs ajouté une obligation de conseil pour les appareils à combustible solide : le professionnel doit vous parler du combustible, de l'installation et de l'intérêt éventuel d'un remplacement. Ce n'est pas un argument commercial, c'est écrit dans le texte.",
          ],
        },
        {
          heading: "Ce qu'on vérifie en plus du conduit",
          body: [
            "Le déflecteur, cette plaque en partie haute du foyer qui allonge le trajet des fumées, se dépose et se nettoie. Il se déforme avec le temps et se remplace quand il est fissuré.",
            "Les joints de porte et de vitre se contrôlent à la main : un joint écrasé laisse entrer de l'air parasite, ce qui dérègle la combustion et encrasse la vitre en permanence. C'est une pièce d'usure, pas une panne.",
          ],
        },
      ],
      faq: [
        {
          q: "Mon poêle est récent, faut-il quand même le ramoner chaque année ?",
          a: "Oui. L'obligation porte sur le conduit, pas sur l'âge de l'appareil. Un poêle neuf sur un conduit ancien peut même encrasser plus vite si le tirage n'est pas adapté.",
        },
        {
          q: "La vitre noircit très vite, est-ce lié à l'encrassement du conduit ?",
          a: "Souvent, oui : les deux ont la même cause, une combustion trop froide ou un bois humide. C'est un signe à mentionner à la prise de rendez-vous, il oriente ce qu'on regarde.",
        },
        {
          q: "Peut-on ramoner un poêle en pleine saison de chauffe ?",
          a: "Oui, il faut simplement que l'appareil soit froid, donc éteint depuis la veille. C'est faisable, mais l'idéal reste avant les premières flambées.",
        },
      ],
    },
    {
      slug: "ramonage-poele-a-granules",
      name: "Ramonage de poêle à granulés",
      navLabel: "Granulés",
      tagline: "Ramonage et entretien complet",
      icon: "wind",
      metaTitle: "Ramonage de poêle à granulés à Castres — 80 à 140 €",
      metaDescription:
        "Poêle à granulés à Castres : ramonage du conduit et entretien de l'appareil, échangeur, extracteur et bougie. Ce que couvre la fourchette de 80 à 140 €.",
      h1: "Ramonage et entretien de poêle à granulés à Castres",
      intro: [
        "Le poêle à granulés est l'appareil le plus vendu de ces dernières années, et celui dont l'entretien est le plus mal compris. Beaucoup de propriétaires pensent qu'un vidage du creuset et un coup d'aspirateur suffisent. C'est le nettoyage d'usage, pas l'entretien annuel.",
        "Il y a deux opérations distinctes derrière un même rendez-vous : le ramonage du conduit, obligatoire au moins tous les douze mois, et l'entretien de l'appareil lui-même. C'est ce qui explique une fourchette plus haute que pour [un poêle à bûches](/ramonage-poele-a-bois) — le détail est sur [la page des prix](/prix).",
      ],
      sections: [
        {
          heading: "Ce qu'un granulés a de plus qu'un bûches",
          body: [
            "Un poêle à granulés est une machine. Il y a une vis sans fin qui amène le combustible, une bougie d'allumage, un extracteur de fumées, un ventilateur d'ambiance, des sondes, et un échangeur constitué de tubes que les fumées traversent. Chacun de ces éléments s'encrasse ou s'use.",
            "L'échangeur est le point critique. Une fine couche de cendres sur ses tubes suffit à faire chuter le rendement de plusieurs pour cent, et ça ne se voit pas sans démontage. C'est le premier poste de l'entretien annuel, et la principale raison de la différence de prix.",
          ],
        },
        {
          heading: "Le conduit d'un granulés s'encrasse autrement",
          body: [
            "Les fumées sortent à basse température et sont poussées par un extracteur, souvent dans un tubage de petit diamètre. Les dépôts y sont fins et pulvérulents plutôt qu'épais, mais ils s'accumulent vite dans les coudes, et une section réduite se ressent immédiatement sur le fonctionnement.",
            "Sur ces appareils, un défaut de tirage ne se traduit pas par un refoulement dans la pièce mais par une mise en sécurité : le poêle s'arrête et affiche un code. Beaucoup d'appels dits « de panne » se règlent par un entretien.",
          ],
        },
        {
          heading: "La qualité des granulés",
          body: [
            "Un granulé qui produit beaucoup de cendres encrasse plus vite le creuset et l'échangeur. Les certifications de qualité renseignent sur le taux de cendres et le pouvoir calorifique, et un sac vendu quelques euros de moins peut coûter davantage en encrassement.",
            "Le devoir de conseil introduit par le décret de 2023 porte précisément là-dessus pour les combustibles solides : le professionnel doit vous parler du combustible autant que de l'appareil.",
          ],
        },
      ],
      faq: [
        {
          q: "Je nettoie mon creuset toutes les semaines, est-ce suffisant ?",
          a: "C'est l'entretien d'usage, indispensable mais différent. Il ne touche ni à l'échangeur, ni à l'extracteur, ni au conduit, et il ne donne pas droit à l'attestation annuelle.",
        },
        {
          q: "Mon poêle se met en sécurité, faut-il un dépanneur ou un ramoneur ?",
          a: "Commencez par l'entretien. Une bonne partie des mises en sécurité vient d'un encrassement de l'échangeur ou du conduit, pas d'une pièce défectueuse. Si le défaut persiste après entretien, on cherche ailleurs.",
        },
        {
          q: "Quelle est la meilleure période pour l'entretien annuel ?",
          a: "La fin du printemps ou l'été, juste après la saison de chauffe : les cendres n'ont pas le temps de s'humidifier et de se compacter dans l'appareil pendant six mois.",
        },
      ],
    },
    {
      slug: "entretien-chaudiere",
      name: "Entretien de chaudière",
      navLabel: "Chaudière",
      tagline: "Gaz, fioul et bois",
      icon: "wrench",
      metaTitle: "Entretien de chaudière à Castres — obligation annuelle",
      metaDescription:
        "Entretien annuel de chaudière gaz, fioul ou bois à Castres, et ramonage du conduit. Ce que le décret de 2023 impose, et l'attestation sous quinze jours ouvrés.",
      h1: "Entretien de chaudière et ramonage du conduit à Castres",
      intro: [
        "Deux obligations se superposent sur une chaudière, et on les confond souvent. L'entretien de l'appareil, d'une part, à faire au moins tous les douze mois. Le ramonage du conduit de fumée, d'autre part, soumis à sa propre fréquence.",
        "Le décret du 20 juillet 2023 traite les deux dans le même texte, et impose pour chaque opération la remise d'une attestation sous quinze jours ouvrés. Le détail est sur [notre page réglementaire](/conseils/attestation-de-ramonage).",
      ],
      sections: [
        {
          heading: "La règle des six mois, et son exception",
          body: [
            "Pour un conduit desservant un appareil collectif, le ramonage se fait tous les six mois, dont une fois pendant la période de chauffe. C'est la situation des immeubles, traitée sur [notre page dédiée](/ramonage-copropriete).",
            "L'exception vaut la peine d'être connue : un appareil fonctionnant exclusivement au gaz, et n'ayant jamais servi à un autre combustible, peut s'en tenir à douze mois. La condition porte sur l'histoire de l'installation, pas seulement sur son état actuel.",
          ],
        },
        {
          heading: "Gaz et fioul, deux encrassements différents",
          body: [
            "Une chaudière gaz produit des fumées propres, et l'essentiel de l'entretien porte sur le corps de chauffe, le brûleur, les sécurités et le contrôle de combustion. Le conduit s'encrasse peu, d'où l'exception réglementaire.",
            "Une chaudière fioul dépose des suies dans le corps de chauffe et dans le conduit. Le nettoyage est plus salissant, le gicleur se remplace, et le réglage de combustion se contrôle à l'analyseur. C'est un travail plus long, et la fourchette de prix s'en ressent.",
          ],
        },
        {
          heading: "Ce que vous devez recevoir",
          body: [
            "Une attestation par opération, dans les quinze jours ouvrés. Elle vous sera demandée par votre assureur et, si vous louez, par votre propriétaire. Rangez-la : c'est la seule preuve que l'obligation a été tenue.",
            "Pour un appareil à combustible solide, s'ajoute le devoir de conseil du professionnel sur l'installation, le combustible et l'intérêt éventuel d'un remplacement. Une chaudière fioul ancienne mérite souvent cette conversation.",
          ],
        },
      ],
      faq: [
        {
          q: "L'entretien et le ramonage, est-ce le même rendez-vous ?",
          a: "Ils se font souvent dans la même visite, mais ce sont deux opérations distinctes avec chacune leur attestation. Vérifiez que vous recevez bien les deux documents.",
        },
        {
          q: "Ma chaudière gaz est sous contrat avec un installateur, dois-je faire ramoner en plus ?",
          a: "Ça dépend de ce que couvre le contrat. Beaucoup portent sur l'appareil seul et pas sur le conduit. Relisez-le, et posez la question précisément.",
        },
        {
          q: "Combien de temps garder les attestations ?",
          a: "Au moins jusqu'à la suivante, et raisonnablement quelques années. En cas de sinistre, c'est l'historique qui compte, pas seulement le dernier document.",
        },
      ],
    },
    {
      slug: "debistrage",
      name: "Débistrage",
      navLabel: "Débistrage",
      tagline: "Quand le hérisson ne suffit plus",
      icon: "brush",
      metaTitle: "Débistrage de conduit à Castres : quand et pourquoi",
      metaDescription:
        "Le bistre est un goudron dur qui ne part pas au ramonage classique. À Castres : comment le reconnaître, pourquoi il est dangereux, comment on l'enlève.",
      h1: "Débistrage de conduit de cheminée à Castres",
      intro: [
        "Le bistre n'est pas de la suie. C'est un dépôt goudronneux, dur, parfois vitrifié, qui se forme quand des fumées trop froides et chargées d'imbrûlés se condensent sur la paroi du conduit. Il s'accumule couche après couche, réduit la section utile, et il est hautement inflammable.",
        "Un hérisson glisse dessus sans l'entamer. C'est pour ça que le débistrage est une intervention distincte du [ramonage annuel](/ramonage-cheminee), avec un autre outillage et un autre temps de travail.",
      ],
      sections: [
        {
          heading: "Comment le reconnaître",
          body: [
            "À l'œil, c'est une croûte noire brillante, parfois boursouflée, qui adhère à la paroi au lieu de tomber en poudre. Au toucher, elle est dure et cassante. Elle apparaît d'abord dans les zones froides du conduit, donc en partie haute et dans les coudes.",
            "Les signes indirects : un tirage qui se dégrade d'une saison à l'autre, une odeur de goudron par temps humide, des coulures brunes sur la souche ou autour du raccordement. Si un ramoneur vous a déjà dit que ça ne partait pas, c'était probablement ça.",
          ],
        },
        {
          heading: "D'où il vient",
          body: [
            "Trois causes, presque toujours combinées. Du bois humide, qui libère de la vapeur d'eau et brûle mal. Un fonctionnement au ralenti prolongé, arrivée d'air fermée pour faire durer la flambée, qui abaisse la température des fumées. Un conduit surdimensionné ou mal isolé, où les fumées refroidissent avant d'atteindre la sortie.",
            "Autrement dit, ce n'est pas une fatalité mais le résultat d'un usage. Corriger la cause fait partie du travail, sinon le bistre revient. C'est aussi ce que vise le devoir de conseil introduit par le décret de 2023 pour les combustibles solides, détaillé sur [notre page réglementaire](/conseils/attestation-de-ramonage).",
          ],
        },
        {
          heading: "Comment on l'enlève",
          body: [
            "Mécaniquement, avec une tête rotative à chaînes ou à fléaux entraînée par un moteur, descendue dans le conduit. La couche est décollée par percussion, puis les résidus sont aspirés. C'est bruyant, poussiéreux, et ça demande de protéger sérieusement la pièce.",
            "Le montant ne peut pas être annoncé à l'avance : il dépend de l'épaisseur de la couche et de la longueur concernée, qu'on ne connaît qu'après avoir regardé le conduit. Le prix est donc donné après diagnostic, et avant de commencer.",
          ],
        },
      ],
      faq: [
        {
          q: "Le débistrage est-il obligatoire ?",
          a: "Le texte impose le ramonage, pas le débistrage. Mais un conduit bistré ne peut pas être correctement ramoné, et un professionnel qui le constate vous le signalera par écrit. C'est un point que votre assureur peut regarder après un sinistre.",
        },
        {
          q: "Un produit chimique peut-il remplacer le débistrage ?",
          a: "Certains produits ramollissent les dépôts et facilitent le travail mécanique qui suit. Aucun ne dispense de ce travail. Le code de la santé publique est clair : c'est l'action mécanique directe qui constitue le nettoyage.",
        },
        {
          q: "Combien de temps ça prend ?",
          a: "Nettement plus qu'un ramonage, et c'est très variable selon l'épaisseur. C'est une intervention qui se planifie sur une demi-journée, pas un passage rapide entre deux rendez-vous.",
        },
      ],
    },
    {
      slug: "ramonage-copropriete",
      name: "Ramonage en copropriété",
      navLabel: "Immeubles",
      tagline: "Conduits collectifs, deux fois par an",
      icon: "home",
      metaTitle: "Ramonage de conduit collectif à Castres — copropriétés",
      metaDescription:
        "Conduits collectifs à Castres : la règle des six mois, dont un ramonage en période de chauffe, l'exception pour le gaz, et l'organisation avec le syndic.",
      h1: "Ramonage de conduits collectifs à Castres",
      intro: [
        "Un conduit qui dessert un appareil collectif n'obéit pas à la même règle qu'un conduit individuel. Le ramonage y est dû tous les six mois, dont une fois pendant la période de chauffe. C'est une différence que beaucoup de conseils syndicaux découvrent tardivement.",
        "L'exception mérite d'être connue : un appareil fonctionnant exclusivement au gaz, et n'ayant jamais servi à un autre combustible, peut s'en tenir à douze mois. Le reste du cadre est repris sur [notre page réglementaire](/conseils/attestation-de-ramonage), et les repères de coût sur [la page des prix](/prix).",
      ],
      sections: [
        {
          heading: "Qui commande, qui paie",
          body: [
            "Un conduit collectif est une partie commune. L'intervention se commande donc par le syndic ou, dans une petite copropriété sans syndic professionnel, par le représentant désigné. Un occupant ne peut pas la commander seul, et n'a pas à en faire l'avance.",
            "Ce qui reste à la charge de chaque occupant, c'est son propre appareil et son raccordement jusqu'au conduit commun. La frontière se situe là, et c'est elle qu'il faut fixer par écrit avant l'intervention pour éviter les discussions après.",
          ],
        },
        {
          heading: "Organiser un passage dans plusieurs logements",
          body: [
            "La difficulté d'un conduit collectif n'est pas technique, elle est logistique : il faut accéder aux logements concernés dans un même créneau. Un affichage deux semaines avant, avec une plage horaire par étage, change tout au taux de présence.",
            "Prévoir un second passage pour les absents fait partie du travail. Un logement non fait, c'est une attestation incomplète pour la copropriété, donc un problème qui remonte à l'assemblée générale suivante.",
          ],
        },
        {
          heading: "Ce que la copropriété doit conserver",
          body: [
            "Une attestation par opération, remise dans les quinze jours ouvrés. Sur un conduit collectif à deux passages annuels, cela fait deux documents par an, à archiver avec les autres pièces d'entretien de l'immeuble.",
            "C'est ce dossier qui sera regardé si un sinistre survient. Un historique complet vaut mieux qu'un dernier document isolé, et il se constitue seulement si personne ne saute une échéance.",
          ],
        },
      ],
      faq: [
        {
          q: "Notre immeuble est au gaz, sommes-nous concernés par les six mois ?",
          a: "Pas nécessairement. Un appareil fonctionnant exclusivement au gaz et n'ayant jamais servi à un autre combustible peut s'en tenir à douze mois. La condition porte sur l'histoire de l'installation, qu'il faut pouvoir établir.",
        },
        {
          q: "Un copropriétaire peut-il refuser l'accès à son logement ?",
          a: "L'accès aux parties communes situées dans un lot ne se refuse pas sans motif, mais mieux vaut régler ça par l'information en amont que par le conflit. Un créneau proposé assez tôt suffit dans la grande majorité des cas.",
        },
        {
          q: "Intervenez-vous pour les petites copropriétés sans syndic professionnel ?",
          a: "Oui. Il faut simplement un interlocuteur unique qui commande l'intervention et reçoive les attestations pour l'ensemble.",
        },
      ],
    },
  ],

  articles: [
    {
      slug: "attestation-de-ramonage",
      updated: "4 août 2026",
      kicker: "Ce que dit le texte",
      metaTitle: "Attestation de ramonage : ce que la loi impose depuis 2023",
      metaDescription:
        "Depuis le 1er octobre 2023, chaque ramonage donne lieu à une attestation sous quinze jours ouvrés. Fréquences, définition légale, et pourquoi une bûche ne suffit pas.",
      h1: "Attestation de ramonage : ce que le décret de 2023 a changé",
      intro: [
        "Le **décret n° 2023-641 du 20 juillet 2023** est entré en vigueur le **1er octobre 2023**. Il a fait remonter au niveau national des règles qui vivaient jusque-là dans les règlements sanitaires départementaux, et il a ajouté une exigence que beaucoup de sites n'ont toujours pas intégrée : le délai de remise de l'attestation.",
        "Cette page reprend le texte, sans le commenter au-delà de ce qu'il dit. Les prestations correspondantes sont sur [le ramonage de cheminée](/ramonage-cheminee) et [l'entretien de chaudière](/entretien-chaudiere).",
      ],
      essentiel: [
        "**Entretien de l'appareil : au moins tous les douze mois.**",
        "**Ramonage d'un conduit individuel : au moins tous les douze mois.** Un arrêté préfectoral peut imposer davantage.",
        "**Conduit collectif : tous les six mois**, dont une fois en période de chauffe, sauf gaz exclusif depuis toujours.",
        "**Attestation remise dans les quinze jours ouvrés** suivant l'achèvement de l'opération.",
        "**Le ramonage est une action mécanique directe** sur la paroi. **L'emploi du feu est interdit.**",
      ],
      tables: [
        {
          heading: "Les fréquences, selon le cas",
          note: "Code de la santé publique, art. R1331-70 et R1331-71, dans leur rédaction issue du décret n° 2023-641 du 20 juillet 2023.",
          head: ["Situation", "Fréquence minimale"],
          rows: [
            ["Entretien de l'appareil", "tous les 12 mois"],
            ["Conduit desservant un appareil individuel", "tous les 12 mois"],
            ["Conduit desservant un appareil collectif", "tous les 6 mois, dont un en période de chauffe"],
            ["Appareil collectif au gaz exclusivement, depuis toujours", "tous les 12 mois"],
            ["Appareil resté inutilisé sur la période", "aucun, mais ramonage obligatoire avant remise en service"],
          ],
        },
      ],
      sections: [
        {
          heading: "La définition légale, et ce qu'elle exclut",
          body: [
            "Le texte définit le ramonage comme le nettoyage, par action mécanique directe, de la paroi intérieure du conduit de fumée, afin d'en éliminer les suies et dépôts. Il précise que l'emploi du feu ou d'explosifs est interdit, et que les souches et accessoires doivent être vérifiés puis remis en état si nécessaire.",
            "Trois mots font tout le travail : **action mécanique directe**. Une bûche dite de ramonage agit chimiquement, par combustion. Elle ne satisfait donc pas l'obligation, et ne peut pas donner lieu à l'attestation qui la matérialise. C'est développé plus bas.",
          ],
        },
        {
          heading: "L'attestation et son délai",
          body: [
            "« La réalisation de chaque opération de ramonage ou d'entretien donne lieu à la remise d'une attestation, dans un délai de quinze jours ouvrés. » Le délai court à compter de l'achèvement de l'opération.",
            "Ce document est la seule preuve que l'obligation a été tenue. Il vous sera demandé par votre assureur, et par votre propriétaire si vous êtes locataire. Il se range et se conserve, y compris les précédents : c'est l'historique qui compte après un sinistre, pas le dernier papier reçu.",
          ],
        },
        {
          heading: "Le devoir de conseil, la nouveauté qu'on oublie",
          body: [
            "Pour les foyers, appareils et conduits à combustibles solides, le professionnel doit désormais fournir des conseils : amélioration de l'installation, qualité du combustible utilisé, intérêt éventuel d'un remplacement du point de vue de l'efficacité énergétique et de la qualité de l'air.",
            "Ce n'est pas une formalité déguisée en argument de vente. C'est une obligation du texte, et c'est aussi ce qui distingue une intervention faite correctement d'un passage expédié en vingt minutes.",
          ],
        },
        {
          heading: "Ce que cette page ne vous dira pas",
          body: [
            "Le montant d'une éventuelle amende, et la position exacte que prendra votre assureur en cas de sinistre sans attestation. Ces deux points circulent partout avec des chiffres qui varient d'un site à l'autre, et nous ne les avons pas vérifiés sur une source officielle.",
            "De même pour l'existence d'un arrêté préfectoral tarnais imposant deux ramonages annuels : le texte national permet à un préfet de le faire, mais nous n'avons pas vérifié ce qui s'applique dans le Tarn. Posez la question à votre mairie plutôt que de vous fier à un chiffre lu en ligne, y compris ici.",
          ],
        },
      ],
      faq: [
        {
          q: "Une bûche de ramonage me dispense-t-elle du passage d'un professionnel ?",
          a: "Non. Le texte exige une action mécanique directe sur la paroi et interdit l'emploi du feu. Une bûche peut au mieux ramollir des dépôts avant un vrai ramonage, elle ne le remplace pas et ne produit aucune attestation.",
        },
        {
          q: "Sous quel délai dois-je recevoir mon attestation ?",
          a: "Quinze jours ouvrés à compter de l'achèvement de l'opération. Si vous ne l'avez pas reçue passé ce délai, réclamez-la : c'est le document qui matérialise l'obligation.",
        },
        {
          q: "Mon appareil est resté éteint toute l'année, dois-je ramoner ?",
          a: "Pas pendant la période de non-utilisation. En revanche, un ramonage est obligatoire avant la remise en service. Concrètement : avant de rallumer.",
        },
        {
          q: "Le ramonage est-il à ma charge si je suis locataire ?",
          a: "Il relève en général de l'entretien courant, donc du locataire, sauf clause contraire du bail. Le propriétaire reste responsable de la conformité de l'installation elle-même.",
        },
      ],
      cta: "Votre ramonage annuel est à programmer ? Dites-nous l'appareil et la commune, on vous propose une date.",
    },
    {
      slug: "buche-de-ramonage",
      updated: "4 août 2026",
      kicker: "L'idée reçue la plus coûteuse",
      metaTitle: "Bûche de ramonage : ce qu'elle fait, ce qu'elle ne fait pas",
      metaDescription:
        "La bûche de ramonage ne remplit pas l'obligation légale : le texte exige une action mécanique directe et interdit l'emploi du feu. Ce qu'elle apporte réellement.",
      h1: "La bûche de ramonage remplace-t-elle un ramoneur ?",
      intro: [
        "Réponse courte : **non**, et ce n'est pas une opinion de professionnel. Le code de la santé publique définit le ramonage comme un nettoyage **par action mécanique directe** de la paroi du conduit, et **interdit l'emploi du feu**. Une bûche agit par combustion.",
        "Ce qui suit explique ce qu'elle fait réellement, pourquoi elle se vend si bien, et dans quel cas elle a une utilité. Le cadre légal complet est sur [notre page sur l'attestation](/conseils/attestation-de-ramonage).",
      ],
      essentiel: [
        "**Elle ne produit aucune attestation** et ne satisfait donc pas l'obligation annuelle.",
        "**Le texte interdit explicitement l'emploi du feu** pour le nettoyage d'un conduit.",
        "**Elle peut assécher et fragiliser des dépôts**, ce qui facilite le ramonage mécanique qui suit.",
        "**Elle ne voit pas la souche** : la vérification des accessoires fait partie de l'obligation.",
      ],
      sections: [
        {
          heading: "Ce qu'elle fait vraiment",
          body: [
            "Une bûche de ramonage libère en brûlant des composés qui agissent sur les dépôts : ils les assèchent et les rendent plus friables. Sur un conduit modérément encrassé, une partie des suies peut se détacher et tomber dans le foyer.",
            "C'est utile, mais partiel. Ce qui se détache tombe ; ce qui adhère reste. Et rien de tout cela ne nettoie la paroi, ne mesure la section utile, ni ne regarde ce qui se passe en toiture.",
          ],
        },
        {
          heading: "Ce qu'elle ne fait pas",
          body: [
            "Elle ne retire pas le bistre, ce goudron dur qui se forme dans les conduits qui travaillent au ralenti — c'est le sujet du [débistrage](/debistrage). Elle ne contrôle pas l'état de la souche, du chapeau ni du raccordement, alors que le texte impose leur vérification. Et elle ne détecte évidemment aucune fissure.",
            "Surtout, elle ne produit pas d'attestation. Or c'est le document qui matérialise l'obligation, qui vous sera réclamé par votre assureur et, si vous louez, par votre propriétaire.",
          ],
        },
        {
          heading: "Alors pourquoi tout le monde en achète",
          body: [
            "Parce qu'elle coûte quelques euros contre plusieurs dizaines pour une intervention, qu'elle s'achète en même temps que les courses, et que l'emballage porte le mot ramonage. La confusion est dans le nom du produit plus que dans l'esprit de l'acheteur.",
            "Il y a un usage défendable : la passer une à deux semaines avant la venue du ramoneur, pour assécher les dépôts et faciliter le travail mécanique. Utilisée comme complément, elle a du sens. Utilisée comme substitut, elle laisse un conduit non contrôlé et un dossier d'assurance vide.",
          ],
        },
      ],
      faq: [
        {
          q: "Mon assurance accepte-t-elle une bûche comme preuve d'entretien ?",
          a: "Une bûche ne donne lieu à aucune attestation, il n'y a donc rien à produire. Ce que votre contrat exige précisément, seul votre assureur peut vous le dire — c'est une question à lui poser directement.",
        },
        {
          q: "Peut-on l'utiliser dans un poêle à granulés ?",
          a: "Ce n'est pas l'usage prévu de ces appareils, dont la chambre de combustion et l'alimentation sont conçues pour un seul combustible. Sur un granulés, l'entretien passe par le démontage, pas par un produit.",
        },
        {
          q: "À quelle fréquence peut-on en passer une ?",
          a: "Les fabricants indiquent leur propre rythme sur l'emballage. Quelle que soit la fréquence retenue, ça ne modifie pas l'obligation de ramonage mécanique au moins tous les douze mois.",
        },
      ],
      cta: "Plutôt qu'une bûche de plus, prenez la date : dites-nous l'appareil et la commune, on vous répond avec un créneau.",
    },
  ],

  faq: [
    {
      q: "À quelle fréquence faut-il faire ramoner à Castres ?",
      a: "Au moins tous les douze mois pour un conduit individuel, depuis le décret du 20 juillet 2023. Pour un conduit collectif, tous les six mois dont un en période de chauffe. Un arrêté préfectoral peut imposer davantage : demandez ce qui s'applique à votre commune.",
    },
    {
      q: "Quand vais-je recevoir mon attestation ?",
      a: "Dans les quinze jours ouvrés suivant l'intervention, comme le prévoit le texte. C'est le document que votre assureur peut vous demander, il se conserve.",
    },
    {
      q: "Une bûche de ramonage suffit-elle ?",
      a: "Non. La loi définit le ramonage comme une action mécanique directe sur la paroi du conduit et interdit l'emploi du feu. Une bûche peut faciliter le travail, elle ne le remplace pas.",
    },
    {
      q: "Quelle est la meilleure période pour prendre rendez-vous ?",
      a: "Septembre et octobre, avant que le premier coup de froid ne sature les agendas. Le conduit a séché tout l'été et vous avez l'attestation en main quand vous allumez.",
    },
    {
      q: "Le vent d'autan peut-il expliquer mon mauvais tirage ?",
      a: "Il peut le révéler. L'autan souffle jusqu'à quatre-vingt-dix jours par an ici, en rafales très irrégulières, ce qui perturbe l'équilibre de pression d'un conduit. Un conduit propre encaisse mieux qu'un conduit encrassé : si les refoulements arrivent surtout par vent de sud-est, signalez-le.",
    },
    {
      q: "Intervenez-vous en dehors de Castres ?",
      a: "Oui, jusqu'à une quarantaine de kilomètres : la vallée de l'Agout, le couloir du Thoré vers Mazamet, et le versant nord vers Lautrec et Montredon-Labessonnié. La liste est sur la page zone d'intervention.",
    },
  ],
}
