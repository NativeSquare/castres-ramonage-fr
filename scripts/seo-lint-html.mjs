// Linter SEO sur le HTML RENDU (.next/server/app) — lancé en postbuild.
// Complète seo-lint.mjs (source) : ici on vérifie ce que Google verra
// réellement. Toute violation CASSE le build (local comme Vercel).
import { readFileSync, readdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
// Doit suivre NEXT_BUILD_DIR, comme next.config.ts. Sans ça, un build local d'une
// ville dans .next-<ville> faisait relire à ce linter le .next d'une AUTRE ville :
// 31 erreurs « H1 sans le nom de la ville » sur un build parfaitement sain.
// Sur Vercel la variable est absente et distDir vaut .next — comportement inchangé.
const APP = join(ROOT, process.env.NEXT_BUILD_DIR || ".next", "server", "app")
const CONFIG_FILE = join(ROOT, "site.config.ts")

if (!existsSync(APP)) {
  console.error("seo-lint:html — aucun build trouvé (.next/server/app). Lancer après `next build`.")
  process.exit(1)
}

// Ville du build courant (même mécanique que l'app).
const slug = readFileSync(CONFIG_FILE, "utf-8").match(/slug:\s*"([^"]+)"/)?.[1] ?? "site"
const citySrc = readFileSync(CONFIG_FILE, "utf-8")
const cityName = citySrc.match(/city:\s*"([^"]+)"/)?.[1] ?? ""
const domain = citySrc.match(/domain:\s*"([^"]+)"/)?.[1] ?? ""

// Les autres domaines du portefeuille (aucun lien croisé toléré).
const REGISTRE = join(ROOT, "..", "rank-factory", "registry", "sites.json")
const otherDomains = existsSync(REGISTRE)
  ? JSON.parse(readFileSync(REGISTRE, "utf-8")).sites
      .map((s) => s.domain)
      .filter((d) => d && d !== domain)
  : []

let errors = 0
const err = (p, m) => {
  console.error(`  ✗ [${p}] ${m}`)
  errors++
}

// Pages autorisées à ne PAS être indexées. Le H1 avec la ville reste exigé
// partout où il a un sens : /contact en garde un, ce sont les pages légales qui
// n'en ont pas besoin — d'où les deux ensembles séparés plus bas.
//
// /contact ajouté le 31/07/2026 : hors gabarit, ce qu'elle partage avec les autres
// sites du portefeuille, ce sont les libellés de champs du formulaire (8 à 11,5 %
// sur 9 couples sur 10). Impossible à faire varier par ville sans abîmer le
// formulaire, et la page ne vise aucun mot-clé. Voir app/contact/page.tsx.
const NOINDEX_OK = new Set(["mentions-legales.html", "confidentialite.html", "contact.html"])
// Pages légales : ni mot-clé ville en H1, ni indexation requises.
const LEGAL = new Set(["mentions-legales.html", "confidentialite.html"])
// Pages à portée NATIONALE assumée (linkable assets) : H1 sans ville, normal.
//
// Tout ce qui vit sous `conseils/` en fait partie par convention. Un guide du type
// « attestation de ramonage » ou « branches du voisin » répond à une question qui ne
// se pose pas différemment à Castres et à Liège : lui imposer la ville en H1
// produirait un titre faux. Ce qui reste exigé sur ces pages : title unique et ≤ 65
// caractères, description dans la zone utile, canonical sur le bon domaine, un seul
// H1, un seul FAQPage, aucun lien cassé.
//
// Conséquence assumée : un article de conseils ne vise PAS la requête locale. Si un
// jour on veut en faire une page locale, il faut la sortir de `conseils/`.
const NATIONAL = new Set(["chiffres-elagage.html"])
const estNational = (f) => NATIONAL.has(f) || f.startsWith("conseils/")

// Parcours RÉCURSIF de .next/server/app.
//
// Défaut trouvé le 05/08/2026 sur le monorepo d'élagage, présent à l'identique ici :
// ce linter ne lisait que la RACINE du dossier. Les articles de `/conseils/` — trois
// par site — n'étaient contrôlés par rien : ni longueur de title, ni description, ni
// H1, ni JSON-LD, ni lien cassé. Tout sous-dossier de routes est désormais parcouru.
//
// Les pages techniques Next (_not-found, _global-error…) ne sont pas du contenu, et
// `[slug]` et consorts sont des gabarits, pas des pages rendues.
function htmlRecursif(dir, prefixe = "") {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (e.name.startsWith("_") || e.name.startsWith("[")) continue
      out.push(...htmlRecursif(join(dir, e.name), `${prefixe}${e.name}/`))
    } else if (e.name.endsWith(".html") && !e.name.startsWith("_")) {
      out.push(`${prefixe}${e.name}`)
    }
  }
  return out
}
const htmlFiles = htmlRecursif(APP)
const pages = []
for (const f of htmlFiles) {
  const html = readFileSync(join(APP, f), "utf-8")
  // Pages volontairement 404 sur cette ville (ex. hub /chiffres-elagage hors Pau).
  if (html.includes("NEXT_HTTP_ERROR_FALLBACK;404")) continue
  pages.push([f, html])
}
if (pages.length === 0) {
  console.error("seo-lint:html — aucune page à vérifier, build suspect.")
  process.exit(1)
}

// Le sitemap rendu, pour croiser avec les noindex. Absent = on ne croise pas.
const SITEMAP = join(APP, "sitemap.xml.body")
const sitemap = existsSync(SITEMAP) ? readFileSync(SITEMAP, "utf-8") : null

const titles = new Map()
for (const [f, html] of pages) {
  // 1 seul H1, contenant la ville (hors pages légales).
  const h1s = html.match(/<h1[\s>]/g) ?? []
  if (h1s.length !== 1) {
    err(f, `${h1s.length} balise(s) H1 — il en faut exactement 1`)
  } else if (!LEGAL.has(f) && !estNational(f)) {
    const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "").replace(/<[^>]+>/g, " ")
    if (cityName && !h1.toLowerCase().includes(cityName.toLowerCase())) {
      err(f, `H1 sans le nom de la ville (${cityName}) : « ${h1.replace(/\s+/g, " ").trim().slice(0, 70)} »`)
    }
  }

  // Title présent et UNIQUE sur le site (une intention = une page).
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? ""
  if (!title) err(f, "balise <title> manquante")
  else if (titles.has(title)) err(f, `title identique à ${titles.get(title)} : « ${title} »`)
  else titles.set(title, f)

  // Canonical présent et sur NOTRE domaine.
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  if (!canon) err(f, "canonical manquant")
  else if (!canon.startsWith(`https://${domain}`)) err(f, `canonical hors domaine : ${canon}`)

  // Pas de noindex accidentel, et pas de page indexable absente du sitemap :
  // les deux doivent rester cohérents, sinon on déclare à Google une page qu'on
  // lui demande de ne pas indexer.
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html)
  if (noindex && !NOINDEX_OK.has(f)) err(f, "meta robots noindex sur une page indexable")
  if (noindex && sitemap && sitemap.includes(`/${f.replace(/\.html$/, "")}`)) {
    err(f, "page en noindex mais déclarée dans le sitemap — signal contradictoire")
  }

  // Longueur du <title> et de la meta description, sur le RENDU.
  //
  // Angle mort trouvé le 04/08/2026 : `seo-lint.mjs` contrôle les `metaTitle` et
  // `metaDescription` écrits dans site.config.ts, donc les services et les
  // articles. Il ne voit PAS ce que le gabarit compose lui-même — le title de la
  // page d'accueil, assemblé à partir de `brand`, `copy.accroche`, `city` et
  // `deptCode`, ni sa description, qui reprenait `hero.subtitle` en entier. Sur
  // Liège : 68 caractères de title et 240 de description, sans qu'aucun contrôle
  // ne bronche. C'est ici qu'il faut mesurer, parce qu'ici c'est le HTML final.
  //
  // Les entités HTML sont décodées avant de compter : `&#x27;` occupe six
  // caractères dans la source et un seul à l'écran. Sans ça le linter produit des
  // faux positifs sur toute page contenant des apostrophes — c'est-à-dire toutes.
  const decode = (s) =>
    s
      .replace(/&#x27;|&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#x2F;/g, "/")
      .replace(/&nbsp;/g, " ")

  const titre = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "")
  if (!titre) err(f, "title manquant")
  else if (titre.length > 65) err(f, `title de ${titre.length} caractères (max 65) : « ${titre} »`)

  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "")
  if (!desc) err(f, "meta description manquante")
  else if (desc.length < 80 || desc.length > 175) {
    err(f, `meta description de ${desc.length} caractères (zone utile 80-175) : « ${desc.slice(0, 90)}… »`)
  }

  // JSON-LD : parsable, jamais d'AggregateRating/review sans avis réels, et un
  // seul nœud FAQPage par page. Le doublon vient d'une page qui construit son
  // propre balisage alors que <FaqSection> en émet déjà un pour la FAQ affichée —
  // c'était le cas de /prix et /conseils/[slug] jusqu'au 04/08/2026.
  let nbFaq = 0
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let parsed
    try {
      parsed = JSON.parse(m[1])
    } catch {
      err(f, "JSON-LD invalide (ne parse pas)")
      continue
    }
    const s = JSON.stringify(parsed)
    if (/AggregateRating|"review"/i.test(s)) {
      err(f, "JSON-LD avec AggregateRating/review — interdit sans avis réels")
    }
    nbFaq += (s.match(/"@type":"FAQPage"/g) ?? []).length
  }
  if (nbFaq > 1) err(f, `${nbFaq} nœuds FAQPage sur la même page — un seul est attendu`)

  // Aucune référence à un autre site du portefeuille.
  for (const d of otherDomains) {
    if (html.includes(d)) err(f, `référence à un autre site du portefeuille : ${d}`)
  }

  // Aucun lien interne cassé.
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1]
    if (
      href === "/" ||
      href.startsWith("/_next") ||
      href.startsWith("/icon") ||
      href.startsWith("/apple-icon") ||
      href.startsWith("/opengraph") ||
      href.startsWith("/api/")
    )
      continue
    const target = href.replace(/\/$/, "").slice(1) + ".html"
    if (!existsSync(join(APP, target))) err(f, `lien interne cassé : ${href}`)
    else if (readFileSync(join(APP, target), "utf-8").includes("NEXT_HTTP_ERROR_FALLBACK;404")) {
      err(f, `lien interne vers une page 404 sur cette ville : ${href}`)
    }
  }
}

console.log(
  `\nseo-lint:html [${slug}] : ${pages.length} page(s) rendues vérifiées, ${errors} erreur(s)`
)
if (errors > 0) {
  console.error("Build bloqué : le HTML rendu viole la doctrine (voir erreurs ci-dessus).")
  process.exit(1)
}
