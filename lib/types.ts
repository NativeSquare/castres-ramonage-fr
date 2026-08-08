// Le modèle de données d'UN site "métier + ville". 1 repo = 1 site = 1 SiteConfig.
// Le contenu est UNIQUE (jamais un copier-coller avec la ville échangée) : c'est la
// règle qui protège du scaled content abuse, vérifiée par rank-factory/lint/portfolio-dup.

export type FAQItem = { q: string; a: string }

export type ServiceSection = {
  heading: string
  body: string[] // un paragraphe par entrée
}

export type Service = {
  slug: string // "elagage", "abattage"...
  name: string // "Élagage"
  navLabel: string // libellé court (nav, cartes)
  tagline: string // une ligne pour la carte service
  icon: string // nom d'icône lucide
  /** Photo de la page service — optionnelle, rendu conditionnel. Licence libre
   *  vérifiée, jamais la photo d'un autre site du portefeuille, alt honnête. */
  image?: string
  imageAlt?: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string[] // paragraphes d'ouverture
  sections: ServiceSection[]
  faq: FAQItem[]
}

export type TrustPoint = { title: string; body: string }

// Articles « conseils » (/conseils/<slug>) — satellites SEO et pages GEO.
// La PROSE vit ici (règle template = mécanique, config = contenu). Seuls les
// slugs présents dans city.articles existent (sinon 404). Ordre de rendu
// fixe : intro → essentiel → tables → sections → faq → CTA.
export type Article = {
  slug: string // "meilleurs-elagueurs-pau"
  updated: string // date affichée + dateModified JSON-LD (ex. "5 juillet 2026")
  kicker: string // ligne au-dessus du H1 (ex. "Comparatif local")
  metaTitle: string // ≤ 65 c., mot-clé + année
  metaDescription: string // réponse d'abord, CTA ensuite (80-175 c.)
  h1: string
  intro: string[] // réponse immédiate — liens [txt](/page) et **gras** markdown
  essentiel?: string[] // bloc "L'essentiel" en puces
  tables?: { heading: string; note?: string; head: string[]; rows: string[][] }[]
  sections: ServiceSection[]
  faq?: FAQItem[]
  // Comparatif GEO : ItemList JSON-LD (position = ordre du tableau).
  // `url` UNIQUEMENT si le concurrent a un site réel vérifié.
  itemList?: { name: string; items: { name: string; url?: string }[] }
  cta: string // accroche du bloc devis final
}

export type SiteConfig = {
  /** Le métier en toutes lettres — "élagage", "débouchage de canalisation". */
  niche: string
  /** Le métier avec l'élision correcte : "d'élagage", "de débouchage". Le template
   *  ne sait pas élider tout seul, donc la forme juste est portée par la config. */
  nicheDe: string
  /** Le métier avec une capitale, pour les débuts de phrase : "L'élagage", "Le débouchage". */
  nicheCap: string
  /** L'artisan : "élagueur", "déménageur", "plombier". */
  nicheMetier: string
  /** Barème de l'estimateur — propre au métier (aucun prix en dur dans le template).
   *  Les LIBELLÉS aussi : un site de déménagement demande « type de logement »,
   *  pas « taille des arbres ». Sans ça, deux niches partagent le même formulaire,
   *  ce qui est à la fois absurde et une source de duplication mesurée (le menu
   *  déroulant pesait 94 des 102 séquences communes relevées le 31/07/2026). */
  estimator?: {
    interventions: Record<string, { label: string; base: [number, number] }>
    sizes?: Record<string, { label: string; f: number }>
    quantities?: Record<string, { label: string; f: number }>
    access?: Record<string, { label: string; f: number }>
    /** Intitulés des quatre listes déroulantes. */
    labels?: { intervention?: string; size?: string; quantity?: string; access?: string }
    /** Ce qui fait varier le prix réel — phrase affichée après l'envoi. */
    disclaimer?: string
  }
  slug: string // "pau"
  city: string // "Pau"
  inCity: string // "à Pau"
  dept: string // "Pyrénées-Atlantiques"
  deptCode: string // "64"
  region: string // "Nouvelle-Aquitaine"
  domain: string // "elagage-pau.fr"
  brand: string // "Élagage Pau"
  brandColor: string // couleur de fond du favicon/apple-icon — UNIQUE par ville
  brandColorDark: string // dégradé foncé assorti (apple-icon, OG, voile du héro)

  // Thème visuel du site — UNIQUE par ville (anti copié-collé visuel).
  // La palette "brand" remplace partout les classes emerald-* du template.
  theme: {
    brand: {
      "50": string
      "100": string
      "200": string
      "300": string
      "400": string
      "500": string
      "600": string
      "700": string
      "800": string
      "900": string
      "950": string
    }
    radius: string // pilote TOUTE l'échelle rounded-* (ex "0.625rem")
    // Police du site. Le catalogue de référence vit dans
    // rank-factory/identities/palettes.mjs (FONTS) — garder les deux alignés.
    font: string // police, prise dans le catalogue rank-factory/identities
    // Police de TITRAGE, distincte du corps de texte. Optionnelle : sans elle,
    // les titres reprennent la police du corps (comportement d'origine, Pau et
    // Nantes inchangés). C'est un levier d'identité majeur — deux sites avec la
    // même paire corps+titrage se ressemblent, quels que soient les contenus.
    fontHeading?: "oswald" | "fraunces" | "bricolage" | "archivo"
    // Variante du header. « centre » = barre claire, liens à gauche, logo
    // centré, bouton pilule sombre à droite (référence emerald du 29/07).
    // Absent = header classique (logo à gauche, bandeau de réassurance).
    header?: "classique" | "centre"
    // Pictogramme du badge d'accroche du héro, pris dans le catalogue partagé
    // (voir ICONS dans components/site/services-grid.tsx). Optionnel : sans lui,
    // le layout affiche une coche neutre. Il ne doit JAMAIS être écrit en dur
    // dans un layout — c'était une feuille jusqu'au 04/08/2026, ce qui mettait
    // du feuillage sur un site de débouchage.
    accentIcon?: string
    // Layout de la home : STRUCTURE de page, pas habillage. Deux villes ne
    // partagent jamais la même combinaison palette + layout. Un layout = un
    // fichier components/site/home-<variant>.tsx, déclaré `built: true` dans
    // rank-factory/identities/palettes.mjs.
    variant: string // layout de la home, pris dans le catalogue rank-factory/identities
    logo: {
      headerIcon: boolean // pictogramme à côté du nom dans le header
      // Glyphe du favicon — UN PAR SITE, jamais réutilisé (le même pictogramme
      // recoloré est une empreinte de réseau visible dans chaque onglet) :
      //  tree = arbre à houppier rond · initial = lettre pleine page ·
      //  arbre-vent = arbre penché par le vent · monogramme = lettre encadrée
      //  sur fond clair · feuille = feuille seule
      // RÈGLE (29/07) : le header affiche LE MÊME glyphe via BrandMark
      // (components/site/brand-logo.tsx) — favicon et logo matchent toujours.
      faviconStyle: string // glyphe du catalogue — voir components/site/brand-logo.tsx
      // Composition du logo texte (BrandLogo) : inline = glyphe + nom sur une
      // ligne · empile = amorce espacée au-dessus de la ville en capitales de
      // titrage · serif = ville en grande ligne, métier en petites capitales.
      wordmark?: "inline" | "empile" | "serif"
    }
  }
  phoneDisplay: string // "05 59 00 00 00"
  phoneHref: string // "tel:+33559000000"
  email: string
  postalCode: string
  hours: string // texte libre des horaires
  geo: { lat: number; lng: number } // coordonnées de la ville (JSON-LD LocalBusiness)

  hero: {
    // Photo de couverture UNIQUE par ville (ex. "/hero-pau.jpg"). OPTIONNELLE :
    // les layouts « local », « devis » et « editorial » sont conçus sans photo
    // de héro (carte de zone, formulaire, ou pavé typographique à la place).
    // Ne jamais réutiliser la photo d'une autre ville pour combler un trou :
    // une même image sur deux sites est un signal de réseau immédiat.
    image?: string
    // Alt du héro — OBLIGATOIREMENT propre à la ville quand une photo est
    // posée. Ne jamais laisser un alt générique dans le layout : il finit par
    // décrire une photo qu'il ne connaît pas.
    imageAlt?: string
    imageCredit?: string // crédit licence si requis (CC BY…) — affiché en mentions légales
    title: string
    subtitle: string
    // Meta description de la PAGE D'ACCUEIL. Optionnelle : sans elle, c'est
    // `subtitle` qui sert, et un sous-titre écrit pour être lu à l'écran dépasse
    // presque toujours les 175 caractères utiles (251 c. mesurés le 04/08/2026
    // sur Liège). Écrire ici une version de 80 à 175 c., réponse d'abord.
    metaDescription?: string
    points: string[] // 3-4 puces de réassurance
  }

  trust: TrustPoint[] // bloc "pourquoi nous faire confiance"

  // ⚠️ ANTI-DUPLICATION — À LIRE AVANT DE CLONER.
  // C'est CE bloc qui rend chaque site unique aux yeux de Google. Pour chaque
  // nouvelle ville, TOUT `local` doit être RÉÉCRIT (jamais copier-coller-renommer).
  // Cible : ≥ 55-65 % du texte du site réellement différent d'une ville à l'autre.
  // Règle : au moins un point de `trust[]` doit aussi citer un élément local,
  // et `geography` / `climateRisk` / `landmarks` / `regulations.local` sont
  // OBLIGATOIREMENT propres à la ville (sinon le clone devient une page satellite).
  local: {
    geography: string // 1 phrase : relief, cours d'eau, climat dominant — force l'ancrage local
    climateRisk: string // 1 phrase : la contrainte climatique n°1 pour les arbres (vent, gel, sécheresse…)
    intro: string[]
    neighborhoods: string[] // quartiers de la ville
    towns: string[] // communes de la zone d'intervention
    /** Blocs de repères locaux, titrés par le site lui-même : « Les arbres de la
     *  région », « Le réseau d'assainissement », « Le bâti ancien »… Génériques
     *  exprès — le template ne doit connaître aucun métier, et des titres propres
     *  à chaque site font aussi de la différenciation. 1 à 3 blocs. */
    blocks: { heading: string; items: string[] }[]
    regulations: {
      national: string[] // cadre national (Code civil…) — paraphrasable, NE compte PAS comme unique
      local: string[] // règles propres à la ville (PLU, EBC, arrêtés) — OBLIGATOIREMENT spécifique
    }
    season: string[] // saisonnalité propre à la région
  }

  // Page zone-intervention : la PROSE vit ici, pas dans le template.
  // Règle machine : template = mécanique, config = contenu. Toute phrase
  // rédigée dans un fichier de app/ serait dupliquée entre les villes.
  zone: {
    intro: string[] // 2-3 paragraphes UNIQUES par ville
    missing: string // ligne "votre commune n'est pas listée ?" — reformulée par ville
    cta: string // accroche du bloc devis en bas de page
  }

  contactIntro: string // chapeau de la page contact — UNIQUE par ville

  // Formulations d'interface — UNIQUES PAR VILLE. Elles paraissent anodines mais
  // elles sont répétées sur TOUTES les pages : mesuré le 29/07/2026, l'estimateur,
  // le bloc d'appel et la mention de consentement représentaient à eux seuls 20 à
  // 26 % de recouvrement entre nantes-elagage.fr et elagage-pau.fr sur le corps
  // des pages services. Le contenu éditorial, lui, ne se recoupait pas.
  // `{service}` et `{marque}` sont remplacés au rendu.
  copy: {
    /** Suffixe du <title> par défaut et de l'image OG : « Déménageur professionnel ». */
    accroche: string
    /** Le métier au pluriel, en surtitre : « Élagueurs-grimpeurs », « Déménageurs ». */
    metierPluriel: string
    /** Bandeau de réassurance du header — une ligne. */
    bandeauHeader: string
    /** Résumé des prestations, injecté à la place de {service} dans estimateurIntro. */
    servicesResume: string
    /** Chapô du bloc « nos services » de la home. */
    servicesIntro: string
    /** Titre du bloc de réassurance. */
    confianceTitre: string
    /** Accroche et sous-titre du bloc devis de bas de page. */
    ctaTitre: string
    ctaSousTitre: string
    /** Titres de deux blocs de layouts (local, devis) — laisser vide si non utilisés. */
    risqueTitre: string
    quandTitre: string
    /** Bandeau de bas de page de /prix — phrase complète, appel au devis compris. */
    prixNote: string
    /** Surtitre de /prix, avant la date de mise à jour. */
    prixSurtitre: string
    /** Libellé du bouton qui renvoie vers l'estimateur. */
    ctaEstimer: string
    /** Invite du champ « Votre demande » du formulaire de contact. */
    messagePlaceholder: string
    estimateurSurtitre: string
    estimateurTitre: string
    estimateurIntro: string // contient {service}
    ctaTexte: string
    consentement: string // contient {marque}
    boutonEstimation: string
    faqSurtitre: string
    // Titres et chapôs de la page /contact. Mesuré le 29/07/2026 sur le HTML
    // rendu : cette page était à 30 % de recouvrement entre les cinq sites,
    // parce qu'elle ne contient presque QUE du gabarit. Elle est indexable,
    // donc c'était l'empreinte de réseau la plus lisible du portefeuille.
    contactH1: string
    contactAppelTitre: string
    contactEstimateurTitre: string
    contactEstimateurIntro: string
    contactMessageTitre: string
    contactMessageIntro: string
  }

  // Deux paragraphes UNIQUES par ville sur la page /contact : de quoi lui donner
  // du contenu propre en plus des formulaires. Ne pas y recopier `zone.intro`
  // (ce serait dupliquer avec /zone-intervention du même site).
  contactDetail: string[]

  // Seconde photo du site (section locale de la home). Même règle que le héro :
  // UNIQUE par ville, licence libre vérifiée, crédit dans hero.imageCredit,
  // et un alt honnête — si la photo n'a pas été prise dans la ville, l'alt ne
  // doit pas prétendre le contraire (règle « ne rien inventer »).
  photoLocale?: { src: string; alt: string }

  // Page money /prix — la PROSE vit ici (règle template = mécanique, config =
  // contenu). Optionnel : une ville sans `pricing` renvoie un 404 sur /prix
  // (la route n'est publiée que pour les villes dont le contenu est rédigé).
  // Les fourchettes sont des données NATIONALES sourcées (mêmes que
  pricing?: {
    updated: string // date de mise à jour affichée + JSON-LD (ex. "4 juillet 2026")
    metaTitle: string // ≤ 65 c., mot-clé + année
    metaDescription: string // réponse d'abord, CTA ensuite (80-175 c.)
    h1: string
    intro: string[] // 1-2 paragraphes d'ouverture (réponse immédiate)
    essentiel: string[] // puces "L'essentiel" ; **gras** rendu sur les phrases-réponses
    tables: {
      heading: string
      note?: string // source / précision sous le tableau (liens markdown OK)
      head: string[]
      rows: string[][]
    }[]
    factors: { title: string; body: string }[] // "ce qui fait le prix ICI" — local
    local: { heading: string; body: string[] } // contexte hyper-local (climat, essences, PLU)
    faq: FAQItem[]
  }

  // Articles /conseils/<slug> — optionnel : seuls les slugs listés ici
  // existent pour cette ville (les autres renvoient un 404).
  articles?: Article[]

  services: Service[]
  faq: FAQItem[] // FAQ de la page d'accueil
}
