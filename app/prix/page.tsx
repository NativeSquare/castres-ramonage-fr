import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { site } from "@/lib/site"
import { CallButton } from "@/components/site/call-button"
import { FaqSection } from "@/components/site/faq-section"
import { JsonLd } from "@/components/site/json-ld"
import { rich, richText } from "@/components/site/rich-text"
import { Container } from "@/components/site/container"

// Page money « prix ville ». Le CONTENU vit dans city.pricing (config) —
// ici, uniquement la mécanique. Une ville sans `pricing` renvoie un 404
// (la route n'est publiée que là où le contenu local est rédigé).
const city = site()
const p = city.pricing

export const metadata: Metadata = p
  ? {
      title: { absolute: p.metaTitle },
      description: p.metaDescription,
      alternates: { canonical: "/prix" },
      openGraph: {
        title: p.metaTitle,
        description: p.metaDescription,
        url: "/prix",
        type: "article",
        locale: "fr_FR",
        images: ["/opengraph-image"],
      },
    }
  : {}

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
                <td key={j} className={`px-4 py-2.5 ${j > 0 ? "font-medium" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PrixPage() {
  const c = site()
  const pr = c.pricing
  if (!pr) notFound()

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `https://${c.domain}/` },
      { "@type": "ListItem", position: 2, name: "Prix", item: `https://${c.domain}/prix` },
    ],
  }
  // ⚠️ Pas de FAQPage ici. Le composant <FaqSection> émet déjà le balisage de la
  // FAQ qu'il affiche : cette page en construisait un SECOND, identique, et le HTML
  // rendu portait donc deux blocs FAQPage strictement égaux (constaté le
  // 04/08/2026). Un seul nœud par page, et c'est celui qui accompagne le contenu
  // visible. Même correctif sur /conseils/[slug].

  return (
    <article className="py-10">
      <Container prose>
        {/* Fil d'Ariane */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-foreground">Prix</span>
        </nav>

        <p className="mt-4 text-sm font-medium text-brand-700">
          {city.copy.prixSurtitre} {pr.updated}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {pr.h1}
        </h1>

        {/* Réponse immédiate */}
        <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground">
          {pr.intro.map((para, i) => (
            <p key={i}>{richText(para)}</p>
          ))}
        </div>

        {/* CTA haut */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <CallButton
            phoneDisplay={c.phoneDisplay}
            phoneHref={c.phoneHref}
            label={`Devis gratuit — ${c.phoneDisplay}`}
          />
          <Link
            href="/#estimateur"
            className="inline-flex h-12 items-center rounded-lg border border-brand-700/30 px-6 text-base font-medium text-brand-800 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            {site().copy.ctaEstimer}
          </Link>
        </div>

        {/* L'essentiel */}
        <div className="mt-8 rounded-xl border bg-brand-50/60 p-6">
          <p className="font-semibold">L&apos;essentiel :</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {pr.essentiel.map((item, i) => (
              <li key={i}>{rich(item)}</li>
            ))}
          </ul>
        </div>

        {/* Tableaux de prix */}
        {pr.tables.map((t, i) => (
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

        {/* Ce qui fait le prix ICI (local) */}
        <h2 className="mt-14 text-2xl font-bold tracking-tight">
          Ce qui fait le prix {c.inCity}
        </h2>
        <div className="mt-4 space-y-6">
          {pr.factors.map((f, i) => (
            <div key={i}>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1.5 leading-relaxed text-muted-foreground">
                {richText(f.body)}
              </p>
            </div>
          ))}
        </div>

        {/* Contexte hyper-local */}
        <h2 className="mt-14 text-2xl font-bold tracking-tight">{pr.local.heading}</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
          {pr.local.body.map((para, i) => (
            <p key={i}>{richText(para)}</p>
          ))}
        </div>
      </Container>

      {/* FAQ */}
      <FaqSection surtitre={c.copy.faqSurtitre} items={pr.faq} title={`Prix ${site().nicheDe} ${c.inCity} : vos questions`} />

      {/* CTA final */}
      <Container prose>
        <div className="mt-12 rounded-xl border bg-brand-50 p-6 text-center">
          <p className="font-medium">
            {city.copy.prixNote}
          </p>
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
    </article>
  )
}
