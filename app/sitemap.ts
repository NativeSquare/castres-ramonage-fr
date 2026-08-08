import type { MetadataRoute } from "next"
import { site, getArticleSlugs, getServiceSlugs } from "@/lib/site"

// Les dates de la config sont écrites en français lisible ("5 juillet 2026")
// parce qu'elles sont AUSSI affichées à l'écran. Le sitemap a besoin d'une vraie
// Date : on convertit, et on renvoie undefined si la chaîne n'est pas exploitable.
const MOIS_FR: Record<string, number> = {
  janvier: 0, février: 1, fevrier: 1, mars: 2, avril: 3, mai: 4, juin: 5,
  juillet: 6, août: 7, aout: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11, decembre: 11,
}

function dateFr(valeur?: string): Date | undefined {
  if (!valeur) return undefined
  const m = valeur.trim().toLowerCase().match(/^(\d{1,2})(?:er)?\s+([a-zâûéè]+)\s+(\d{4})$/)
  if (!m) return undefined
  const mois = MOIS_FR[m[2]]
  if (mois === undefined) return undefined
  const d = new Date(Date.UTC(Number(m[3]), mois, Number(m[1])))
  return Number.isNaN(d.getTime()) ? undefined : d
}

export default function sitemap(): MetadataRoute.Sitemap {
  const city = site()
  const base = `https://${city.domain}`

  // ⚠️ `lastModified` n'est renseigné QUE si une date de mise à jour réelle est
  // déclarée en config. Jusqu'au 04/08/2026 le sitemap estampillait `new Date()`
  // sur TOUTES les URL à chaque build : chaque redéploiement annonçait à Google
  // que dix pages inchangées venaient d'être modifiées. Google est explicite —
  // un lastmod dans lequel il n'a pas confiance vaut moins que pas de lastmod du
  // tout, et il finit par ignorer le signal pour le site entier.
  // https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping
  const pages: { path: string; updated?: Date }[] = [
    { path: "" },
    { path: "/zone-intervention" },
    // /contact est en noindex depuis le 31/07 (voir app/contact/page.tsx) : un
    // sitemap qui déclare une page qu'on demande de ne pas indexer est un signal
    // contradictoire. Elle reste liée depuis la navigation, ça suffit à la découvrir.
    ...getServiceSlugs().map((s) => ({ path: `/${s}` })),
    // Page money « prix ville » : publiée seulement si le contenu est rédigé.
    ...(city.pricing ? [{ path: "/prix", updated: dateFr(city.pricing.updated) }] : []),
    // Hub de données national : publié uniquement sur le site d'origine (Pau)
    // Articles conseils : seuls ceux rédigés pour cette ville existent.
    ...getArticleSlugs().map((s) => ({
      path: `/conseils/${s}`,
      updated: dateFr((city.articles ?? []).find((a) => a.slug === s)?.updated),
    })),
  ]

  return pages.map(({ path, updated }) => ({
    url: `${base}${path}`,
    ...(updated ? { lastModified: updated } : {}),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }))
}
