import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { site, getArticle, getArticleSlugs } from "@/lib/site"
import { CallButton } from "@/components/site/call-button"
import { FaqSection } from "@/components/site/faq-section"
import { JsonLd } from "@/components/site/json-ld"
import { rich, richText } from "@/components/site/rich-text"
import { Container } from "@/components/site/container"

// Articles « conseils » (satellites SEO + pages GEO). Le CONTENU vit dans
// city.articles (config) — ici, uniquement la mécanique. Seuls les slugs
// présents dans le config existent (sinon 404).
type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const a = getArticle(slug)
  if (!a) return {}
  return {
    title: { absolute: a.metaTitle },
    description: a.metaDescription,
    alternates: { canonical: `/conseils/${a.slug}` },
    openGraph: {
      title: a.metaTitle,
      description: a.metaDescription,
      url: `/conseils/${a.slug}`,
      type: "article",
      locale: "fr_FR",
      images: ["/opengraph-image"],
    },
  }
}

function DataTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/60 text-left">
            {head.map((h) => (
              <th key={h} className="px-4 py-2.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b last:border-0">
              {r.map((cell, j) => (
                <td key={j} className={`px-4 py-2.5 ${j === 0 ? "font-medium" : ""}`}>
                  {rich(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default async function ConseilPage({ params }: Params) {
  const { slug } = await params
  const c = site()
  const a = getArticle(slug)
  if (!a) notFound()

  const url = `https://${c.domain}/conseils/${a.slug}`

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `https://${c.domain}/` },
      { "@type": "ListItem", position: 2, name: a.h1, item: url },
    ],
  }
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.h1,
    description: a.metaDescription,
    inLanguage: "fr-FR",
    mainEntityOfPage: url,
    author: { "@id": `https://${c.domain}/#business` },
    publisher: { "@id": `https://${c.domain}/#business` },
  }
  const itemListLd = a.itemList
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: a.itemList.name,
        itemListElement: a.itemList.items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          ...(item.url ? { url: item.url } : {}),
        })),
      }
    : null
  // ⚠️ Pas de FAQPage ici : <FaqSection> émet déjà le balisage de la FAQ affichée.
  // Cette page en construisait un second, identique (corrigé le 04/08/2026).

  return (
    <article className="py-10">
      <Container prose>
        {/* Fil d'Ariane */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-foreground">Conseils</span>
        </nav>

        <p className="mt-4 text-sm font-medium text-brand-700">
          {a.kicker} — mise à jour : {a.updated}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {a.h1}
        </h1>

        {/* Réponse immédiate */}
        <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground">
          {a.intro.map((para, i) => (
            <p key={i}>{rich(para)}</p>
          ))}
        </div>

        {/* L'essentiel */}
        {a.essentiel && a.essentiel.length > 0 && (
          <div className="mt-8 rounded-xl border bg-brand-50/60 p-6">
            <p className="font-semibold">L&apos;essentiel :</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              {a.essentiel.map((item, i) => (
                <li key={i}>{rich(item)}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tableaux */}
        {(a.tables ?? []).map((t, i) => (
          <section key={i}>
            <h2 className="mt-12 text-2xl font-bold tracking-tight">{t.heading}</h2>
            <DataTable head={t.head} rows={t.rows} />
            {t.note && (
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {richText(t.note)}
              </p>
            )}
          </section>
        ))}

        {/* Sections */}
        <div className="mt-12 space-y-10">
          {a.sections.map((sec, i) => (
            <section key={i}>
              <h2 className="text-2xl font-bold tracking-tight">{sec.heading}</h2>
              <div className="mt-3 space-y-4 leading-relaxed text-muted-foreground">
                {sec.body.map((p, j) => (
                  <p key={j}>{rich(p)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>

      {/* FAQ */}
      {a.faq && a.faq.length > 0 && <FaqSection items={a.faq} title="Vos questions" surtitre={c.copy.faqSurtitre} />}

      {/* CTA final */}
      <Container prose>
        <div className="mt-12 rounded-xl border bg-brand-50 p-6 text-center">
          <p className="font-medium">{a.cta}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <CallButton
              phoneDisplay={c.phoneDisplay}
              phoneHref={c.phoneHref}
              label={`Appeler — ${c.phoneDisplay}`}
            />
            <Link
              href="/#estimateur"
              className="inline-flex h-12 items-center rounded-lg border bg-background px-6 text-base font-medium hover:bg-muted"
            >
              {site().copy.ctaEstimer}
            </Link>
          </div>
        </div>
      </Container>

      <JsonLd data={breadcrumbLd} />
      <JsonLd data={articleLd} />
      {itemListLd && <JsonLd data={itemListLd} />}
    </article>
  )
}
