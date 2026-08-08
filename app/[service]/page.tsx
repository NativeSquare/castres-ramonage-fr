import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { site, getService, getServiceSlugs } from "@/lib/site"
import { CallButton } from "@/components/site/call-button"
import { FaqSection } from "@/components/site/faq-section"
import { richText } from "@/components/site/rich-text"
import { JsonLd } from "@/components/site/json-ld"
import { Container } from "@/components/site/container"
import { EstimatorSection } from "@/components/site/estimator-section"

type Params = { params: Promise<{ service: string }> }

export function generateStaticParams() {
  return getServiceSlugs().map((service) => ({ service }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { service } = await params
  const svc = getService(service)
  if (!svc) return {}
  return {
    title: { absolute: svc.metaTitle },
    description: svc.metaDescription,
    alternates: { canonical: `/${svc.slug}` },
    openGraph: {
      title: svc.metaTitle,
      description: svc.metaDescription,
      url: `/${svc.slug}`,
      type: "website",
      locale: "fr_FR",
      images: ["/opengraph-image"],
    },
  }
}

export default async function ServicePage({ params }: Params) {
  const { service } = await params
  const city = site()
  const svc = getService(service)
  if (!svc) notFound()

  const others = city.services.filter((s) => s.slug !== svc.slug)

  // On coupe le contenu en deux pour glisser l'estimateur AU MILIEU de la page.
  const mid = Math.ceil(svc.sections.length / 2)
  const sectionsTop = svc.sections.slice(0, mid)
  const sectionsBottom = svc.sections.slice(mid)

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: `https://${city.domain}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: svc.name,
        item: `https://${city.domain}/${svc.slug}`,
      },
    ],
  }

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: svc.name,
    name: svc.h1,
    description: svc.metaDescription,
    areaServed: [city.city, ...city.local.towns].map((t) => ({
      "@type": "City",
      name: t,
    })),
    provider: { "@id": `https://${city.domain}/#business` },
    url: `https://${city.domain}/${svc.slug}`,
  }

  return (
    <>
      <article className="py-10">
        <Container prose>
          {/* Fil d'Ariane */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Accueil
            </Link>
            <ChevronRight className="size-4" />
            <span className="text-foreground">{svc.name}</span>
          </nav>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {svc.h1}
          </h1>

          {/* Photo d'illustration — seulement si la config du service en fournit une */}
          {svc.image && (
            <div className="mt-6 aspect-[16/9] overflow-hidden rounded-xl border border-brand-900/10 bg-brand-50">
              <Image
                src={svc.image}
                alt={svc.imageAlt ?? `${svc.name} ${city.inCity}`}
                width={1200}
                height={675}
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {svc.intro.map((p, i) => (
              <p key={i}>{richText(p)}</p>
            ))}
          </div>

          {/* CTA haut : appel + devis en ligne */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <CallButton
              phoneDisplay={city.phoneDisplay}
              phoneHref={city.phoneHref}
              label={`Devis gratuit — ${city.phoneDisplay}`}
            />
            <Link
              href="#estimateur"
              className="inline-flex h-12 items-center rounded-lg border border-brand-700/30 px-6 text-base font-medium text-brand-800 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              Estimer mon devis
            </Link>
          </div>

          {/* Sections de contenu — 1re moitié */}
          <div className="mt-10 space-y-10">
            {sectionsTop.map((sec, i) => (
              <section key={i}>
                <h2 className="text-xl font-semibold tracking-tight">
                  {sec.heading}
                </h2>
                <div className="mt-3 space-y-4 leading-relaxed text-muted-foreground">
                  {sec.body.map((p, j) => (
                    <p key={j}>{richText(p)}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </article>

      {/* ESTIMATEUR — lead magnet, glissé AU MILIEU du contenu */}
      <EstimatorSection
        title={`Estimez le prix de votre ${svc.name.toLowerCase()} ${city.inCity}`}
        subtitle={city.copy.estimateurIntro.replace("{service}", svc.name.toLowerCase())}
      />

      {/* Sections de contenu — 2de moitié */}
      {sectionsBottom.length > 0 && (
        <article className="py-10">
          <Container prose>
            <div className="space-y-10">
              {sectionsBottom.map((sec, i) => (
                <section key={i}>
                  <h2 className="text-xl font-semibold tracking-tight">
                    {sec.heading}
                  </h2>
                  <div className="mt-3 space-y-4 leading-relaxed text-muted-foreground">
                    {sec.body.map((p, j) => (
                      <p key={j}>{richText(p)}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Container>
        </article>
      )}

      {/* FAQ du service */}
      {svc.faq.length > 0 && (
        <FaqSection surtitre={city.copy.faqSurtitre} items={svc.faq} title={`${svc.name} ${city.inCity} : vos questions`} />
      )}

      {/* Maillage interne : nos autres services */}
      <section className="py-4">
        <Container prose>
          <h2 className="text-lg font-semibold">Nos autres services {city.inCity}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="rounded-lg border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-brand-600/40 hover:text-foreground"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="mt-10 bg-brand-700 text-white">
        <Container className="py-14 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Besoin d&apos;un devis pour {svc.name.toLowerCase()} {city.inCity} ?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-brand-50">
            {city.copy.ctaTexte}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <CallButton
              phoneDisplay={city.phoneDisplay}
              phoneHref={city.phoneHref}
              label={`Appeler — ${city.phoneDisplay}`}
              className="bg-white text-brand-800 hover:bg-brand-50"
            />
            <Link
              href="#estimateur"
              className="inline-flex h-12 items-center rounded-lg border border-white/40 bg-brand-800 px-6 text-base font-medium text-white transition-colors hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Estimer mon devis
            </Link>
          </div>
        </Container>
      </section>

      <JsonLd data={breadcrumbLd} />
      <JsonLd data={serviceLd} />
    </>
  )
}
