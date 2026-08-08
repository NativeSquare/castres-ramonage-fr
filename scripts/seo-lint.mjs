// Linter SEO — encode la doctrine de la KB en règles qui CASSENT le build.
// Lancé en prebuild : une page qui viole la doctrine ne peut pas partir en prod.
// Doctrine complète : docs/plan-contenu-pau.md (sources : KB bibliotheque-seo).
import { readFileSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const CONFIG_FILE = join(ROOT, "site.config.ts")

const MAX_TITLE = 65 // au-delà : tronqué dans la SERP (KB V002/P026)
const MIN_CONTEXT_LINKS = 2 // liens [texte](/page) dans le corps (KB P039/P050)
const MIN_FAQ = 2 // la FAQ aspire la longue traîne (KB V067/V084)

let errors = 0
let warnings = 0
let checked = 0

function err(file, svc, msg) {
  console.error(`  ✗ [${file}] ${svc}: ${msg}`)
  errors++
}
function warn(file, svc, msg) {
  console.warn(`  ! [${file}] ${svc}: ${msg}`)
  warnings++
}

// 1 repo = 1 site : un seul fichier de config à contrôler.
const files = ["site.config.ts"]

for (const file of files) {
  const src = readFileSync(CONFIG_FILE, "utf-8")

  // Découpe grossière par service : chaque bloc commence à `slug: "..."`.
  const blocks = src.split(/(?=slug:\s*")/g).slice(1)

  for (const block of blocks) {
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1] ?? "?"

    // Le bloc d'en-tête ville (slug + domain + brand…) n'est pas un service.
    if (/domain:\s*"/.test(block.split(/(?=slug:\s*")/g)[0] ?? block) && /domain:\s*"/.test(block)) {
      continue
    }

    checked++
    const metaTitle = block.match(/metaTitle:\s*"([^"]+)"/)?.[1]
    if (!metaTitle) {
      err(file, slug, "metaTitle manquant")
    } else if (metaTitle.length > MAX_TITLE) {
      err(file, slug, `metaTitle trop long (${metaTitle.length} > ${MAX_TITLE} caractères) : "${metaTitle}"`)
    }

    const metaDesc = block.match(/metaDescription:\s*\n?\s*"([^"]+)"/)?.[1]
    if (metaDesc && (metaDesc.length < 80 || metaDesc.length > 175)) {
      warn(file, slug, `metaDescription hors zone 80-175 caractères (${metaDesc.length})`)
    }

    // Liens contextuels markdown dans intro/sections (pas la FAQ).
    const faqStart = block.search(/faq:\s*\[/)
    const bodyPart = faqStart > -1 ? block.slice(0, faqStart) : block
    const links = (bodyPart.match(/\]\(\//g) ?? []).length
    if (links < MIN_CONTEXT_LINKS) {
      err(
        file,
        slug,
        `${links} lien(s) contextuel(s) dans le contenu — minimum ${MIN_CONTEXT_LINKS} (doctrine maillage KB P039 : les liens viennent du CORPS du texte)`
      )
    }

    const faqCount = (block.match(/q:\s*"/g) ?? []).length
    if (faqCount < MIN_FAQ) {
      err(file, slug, `${faqCount} question(s) FAQ — minimum ${MIN_FAQ}`)
    }
  }

  if (blocks.length === 0) {
    warn(file, "-", "aucun bloc service détecté (fichier ignoré ?)")
  }
}

// ── Anti-placeholder / données inventées (règle "ne rien inventer") ──────
const PLACEHOLDER_PATTERNS = [
  [/\b0\d([ .]00){4}\b/, "numéro de téléphone placeholder (00 00 00…)"],
  [/lorem ipsum/i, "lorem ipsum"],
  [/\bTODO\b/, "TODO laissé dans le contenu"],
  [/@example\./i, "email @example"],
]
for (const file of files) {
  const src = readFileSync(CONFIG_FILE, "utf-8")
  for (const [re, label] of PLACEHOLDER_PATTERNS) {
    if (re.test(src)) err(file, "-", `placeholder détecté : ${label}`)
  }
}

// AggregateRating/review : interdits partout sans avis réels (spam policy Google).
const SRC_DIRS = ["app", "components"]
function walkTsx(dir) {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...walkTsx(p))
    else if (e.name.endsWith(".tsx") || e.name.endsWith(".ts")) out.push(p)
  }
  return out
}
for (const d of SRC_DIRS) {
  for (const p of walkTsx(join(ROOT, d))) {
    const src = readFileSync(p, "utf-8")
    if (/AggregateRating|"review"|aggregateRating/.test(src)) {
      err(p.slice(ROOT.length + 1), "-", "AggregateRating/review dans le code — interdit sans avis réels")
    }
  }
}

// ── Anti-doorway : pas de page par commune ───────────────────────────────
// Une route ou un slug qui contient le nom d'une commune de la zone = le
// pattern exact des pages satellites que Google sanctionne.
const normalize = (s) =>
  s.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "")
const allTowns = new Set()
for (const file of files) {
  const src = readFileSync(CONFIG_FILE, "utf-8")
  const townsBlock = src.match(/towns:\s*\[([^\]]*)\]/s)?.[1] ?? ""
  for (const m of townsBlock.matchAll(/"([^"]+)"/g)) {
    const t = normalize(m[1])
    if (t.length >= 4) allTowns.add(t) // "gan"/"lons" trop courts = trop de faux positifs, couverts par la revue humaine
  }
}
const routeDirs = readdirSync(join(ROOT, "app"), { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
const allSlugs = []
for (const file of files) {
  const src = readFileSync(CONFIG_FILE, "utf-8")
  for (const m of src.matchAll(/slug:\s*"([^"]+)"/g)) allSlugs.push([file, m[1]])
}
for (const town of allTowns) {
  const re = new RegExp(`(^|-)${town}(-|$)`)
  for (const dir of routeDirs) {
    if (re.test(normalize(dir))) err("app/" + dir, "-", `route par commune détectée (« ${town} ») — pattern doorway interdit`)
  }
  for (const [file, slug] of allSlugs) {
    if (re.test(normalize(slug))) err(file, slug, `slug par commune (« ${town} ») — pattern doorway interdit`)
  }
}

// ── Pas de référence croisée entre nos sites (footprint réseau) ──────────
const domains = files.map((f) => [
  f,
  readFileSync(CONFIG_FILE, "utf-8").match(/domain:\s*"([^"]+)"/)?.[1],
])
for (const [file, _] of domains) {
  const src = readFileSync(CONFIG_FILE, "utf-8")
  for (const [otherFile, otherDomain] of domains) {
    if (otherFile !== file && otherDomain && src.includes(otherDomain)) {
      err(file, "-", `référence au domaine d'un autre site du portefeuille (${otherDomain})`)
    }
  }
}

// ── Zéro prose dans le template (template = mécanique, config = contenu) ─
// Un <p> de plus de 100 caractères de texte fixe dans app/ ou components/
// serait dupliqué à l'identique sur tous les sites qui partagent le fichier.
const PROSE_WHITELIST = new Set([
  "app/mentions-legales/page.tsx", // boilerplate légal obligatoire (LCEN)
  "app/confidentialite/page.tsx", // boilerplate légal (RGPD)
  "app/chiffres-elagage/page.tsx", // hub de données servi par UNE seule ville
  "components/site/estimator.tsx", // libellés fonctionnels du formulaire
  "components/site/contact-form.tsx", // messages de validation
])
for (const d of SRC_DIRS) {
  for (const p of walkTsx(join(ROOT, d))) {
    const rel = p.slice(ROOT.length + 1).replaceAll("\\", "/")
    if (PROSE_WHITELIST.has(rel)) continue
    const src = readFileSync(p, "utf-8")
    for (const m of src.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)) {
      const text = m[1]
        .replace(/\{[^}]*\}/g, "•") // les interpolations {city.x} ne comptent pas
        .replace(/<[^>]+>/g, " ")
        .replace(/&[a-z]+;/g, "'")
        .replace(/\s+/g, " ")
        .trim()
      const fixedLetters = text.replace(/[^A-Za-zÀ-ÿ ]/g, "")
      if (fixedLetters.length > 100) {
        err(rel, "-", `prose figée dans le template (${fixedLetters.length} c.) : « ${text.slice(0, 70)}… » — à déplacer dans la config ville`)
      }
    }
  }
}

// ── Similarité : déplacée dans rank-factory/lint/portfolio-dup.mjs ──────
// En 1 repo par site il n'y a plus de voisin à comparer localement : la
// comparaison se fait contre les empreintes de TOUT le portefeuille.


// ── Similarité PAGE PAR PAGE (le contrôle qui manquait) ──────────────────
// Ajouté le 29/07/2026. Le check ci-dessus moyenne sur TOUT le fichier ville :
// les longues pages (élagage, abattage) diluent les courtes. Mesuré ce jour-là
// sur le HTML rendu : /evacuation-dechets-verts partageait 21 % de son CORPS
// entre Brest et Rennes, /dessouchage 12 %, alors que le total de chaque
// fichier ressortait à 7,8 % — vert.
//
// Google n'indexe pas des fichiers de configuration, il indexe des PAGES.
// C'est donc la page qui doit être sous le seuil, pas la moyenne.
function shinglesDeTexte(txt) {
  const words = txt
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
  const set = new Set()
  for (let i = 0; i + 5 <= words.length; i++) set.add(words.slice(i, i + 5).join(" "))
  return set
}

// Découpe un fichier ville en blocs par slug de service : tout ce qui est écrit
// entre `slug: "x"` et le `slug:` suivant appartient à la page x.
function pagesDuFichier(src) {
  const pages = new Map()
  const bornes = [...src.matchAll(/^\s*slug:\s*"([a-z0-9-]+)"/gm)]
  // Le DERNIER service ne court pas jusqu'à la fin du fichier : il s'arrête à
  // la FAQ de site (`  faq: [`, indentée à deux espaces). Sans cette borne il
  // l'avalait — or elle est commune à toutes les villes par nature, ce qui
  // produisait un faux positif de ~10 % constaté le 29/07/2026.
  const finServices = (() => {
    const m = /^  faq: \[/m.exec(src)
    return m ? m.index : src.length
  })()
  for (let i = 0; i < bornes.length; i++) {
    const debut = bornes[i].index
    const fin = i + 1 < bornes.length ? bornes[i + 1].index : finServices
    const bloc = src.slice(debut, fin)
    const texte = [...bloc.matchAll(/"((?:[^"\\]|\\.)*)"/g)]
      .map((m) => m[1])
      .filter((s) => s.length > 30)
      .join(" ")
    if (texte.length > 200) pages.set(bornes[i][1], shinglesDeTexte(texte))
  }
  return pages
}

const parVille = files.map((f) => ({
  file: f,
  pages: pagesDuFichier(readFileSync(CONFIG_FILE, "utf-8")),
}))

// Un slug donné n'existe pas partout (chaque ville a son jeu de prestations) :
// on ne compare que les villes qui publient réellement la même page.
const tousLesSlugs = new Set(parVille.flatMap((v) => [...v.pages.keys()]))
let pagesComparees = 0
for (const slug of [...tousLesSlugs].sort()) {
  const qui = parVille.filter((v) => v.pages.has(slug))
  if (qui.length < 2) continue
  for (let i = 0; i < qui.length; i++) {
    for (let j = i + 1; j < qui.length; j++) {
      const A = qui[i].pages.get(slug)
      const B = qui[j].pages.get(slug)
      let common = 0
      const examples = []
      for (const s of B) if (A.has(s)) { common++; if (examples.length < 4) examples.push(s) }
      const overlap = common / Math.max(1, Math.min(A.size, B.size))
      pagesComparees++
      if (overlap > MAX_OVERLAP) {
        errors++
        console.error(
          `  ✗ [page /${slug}] ${qui[i].file} <-> ${qui[j].file} : ${(100 * overlap).toFixed(1)} % ` +
            `(max ${MAX_OVERLAP * 100} %) — c'est CETTE page que Google compare, pas la moyenne du site.`
        )
        for (const e of examples) console.error(`      « ${e} »`)
      }
    }
  }
}
console.log(`  ✓ [pages] ${pagesComparees} paire(s) de pages homonymes comparées`)

console.log(
  `\nseo-lint : ${files.length} fichier(s) ville, ${checked} page(s) service vérifiée(s), ${errors} erreur(s), ${warnings} avertissement(s)`
)
if (checked === 0) {
  console.error("seo-lint : aucun service vérifié — le parseur est probablement cassé, on bloque par précaution.")
  process.exit(1)
}
if (errors > 0) {
  console.error(
    "Build bloqué : corrige les erreurs ci-dessus (doctrine : docs/plan-contenu-pau.md)."
  )
  process.exit(1)
}
