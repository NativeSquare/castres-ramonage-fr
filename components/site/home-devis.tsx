import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Calculator } from "lucide-react"
import { site } from "@/lib/site"
import { ServiceIcon } from "@/components/site/services-grid"
import { CallButton } from "@/components/site/call-button"
import { FaqSection } from "@/components/site/faq-section"
import { Container } from "@/components/site/container"
import { Estimator } from "@/components/site/estimator"

// Variante « devis » — le formulaire EST le héro.
//
// Ce qui la distingue structurellement des autres layouts :
//  · l'estimateur est au-dessus du pli, en colonne droite du héro : il n'y a
//    pas de section estimateur plus bas dans la page (les autres layouts la
//    placent au milieu)
//  · le contenu éditorial passe entièrement sous le pli
//  · les services sont des cartes très arrondies en grille de trois
//  · le contexte local est présenté en blocs alternés gauche/droite
//  · aucune photo, aucun schéma : formes pleines et couleur uniquement
//
// L'ancre #estimateur vit donc sur la section de héro (les autres pages y
// renvoient via /#estimateur).

// Le catalogue d'icônes vit dans services-grid.tsx et NULLE PART AILLEURS.
// Ce fichier en tenait une copie de neuf entrées, avec un ARBRE en repli : sur un
// site de ramonage ou de débouchage, un service dont l'icône n'était pas dans
// cette liste courte affichait un feuillage. Corrigé le 04/08/2026.

export function HomeDevis() {
  const city = site()

  return (
    <>
      {/* HÉRO = FORMULAIRE. L'ancre #estimateur est ici, pas plus bas. */}
      <section
        id="estimateur"
        className="relative isolate scroll-mt-20 overflow-hidden bg-brand-900 text-white"
      >
        {/* Photo en fond, très assombrie : le formulaire reste la vedette */}
        {city.hero.image && (
          <Image
            src={city.hero.image}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
        )}
        {/* Voile en diagonale : opaque sur le texte (gauche), la photo respire
            derrière la carte du formulaire (droite) — elle est opaque. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(105deg, ${city.brandColorDark}fa 0%, ${city.brandColorDark}e6 45%, ${city.brandColorDark}59 100%)`,
          }}
        />
        <div
          aria-hidden
          className="absolute -top-32 -right-24 -z-10 size-96 rounded-full bg-brand-700/30 blur-3xl"
        />
        <Container className="grid items-center gap-12 py-14 sm:py-18 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-brand-100">
              <Calculator className="size-4" />
              {city.copy.estimateurSurtitre}
            </p>
            <h1 className="mt-5 font-heading text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl">
              {city.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              {city.hero.subtitle}
            </p>
            <ul className="mt-8 space-y-2.5">
              {city.hero.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] text-white/85">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500/25">
                    <Check className="size-3.5 text-brand-200" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CallButton
                phoneDisplay={city.phoneDisplay}
                phoneHref={city.phoneHref}
                label={city.phoneDisplay ? `Appeler — ${city.phoneDisplay}` : undefined}
                className="bg-white text-brand-900 hover:bg-brand-50"
              />
            </div>
          </div>

          <div>
            <div className="rounded-3xl bg-white/10 p-2 ring-1 ring-white/15 backdrop-blur-sm">
              <Estimator
                consentement={city.copy.consentement}
                boutonEnvoi={city.copy.boutonEstimation}
                phoneDisplay={city.phoneDisplay}
                phoneHref={city.phoneHref}
                brand={city.brand}
              />
            </div>
            <p className="mt-3 px-2 text-center text-sm leading-relaxed text-white/60">
              {city.copy.estimateurIntro.replace(
                "{service}",
                city.copy.servicesResume
              )}
            </p>
          </div>
        </Container>
      </section>

      {/* RÉASSURANCE — bande fine sous le formulaire */}
      <section className="border-b bg-brand-50">
        <Container className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {city.trust.map((t) => (
            <div key={t.title}>
              <h2 className="font-heading text-sm leading-snug font-semibold text-brand-900 text-balance">
                {t.title}
              </h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-brand-950/60">
                {t.body}
              </p>
            </div>
          ))}
        </Container>
      </section>

      {/* SERVICES — cartes très arrondies, grille de trois */}
      <section className="py-14 sm:py-18">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              Ce que nous faisons {city.inCity}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {city.copy.servicesIntro}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {city.services.map((s) => {
              return (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="group flex flex-col rounded-3xl bg-brand-50 p-6 transition-colors hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-sm">
                    <ServiceIcon name={s.icon} className="size-5" />
                  </span>
                  <span className="mt-4 font-heading text-lg font-semibold text-brand-950">
                    {s.name}
                  </span>
                  <span className="mt-1.5 flex-1 text-sm leading-relaxed text-brand-950/65">
                    {s.tagline}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    En savoir plus
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      {/* LOCAL — blocs alternés gauche / droite */}
      <section className="border-y bg-brand-50 py-14 sm:py-18">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                {city.local.blocks[0]?.heading ?? city.city}
              </h2>
              {city.photoLocale && (
                <figure className="mt-4 overflow-hidden rounded-2xl shadow-sm">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={city.photoLocale.src}
                      alt={city.photoLocale.alt}
                      fill
                      sizes="(min-width: 1024px) 520px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              )}
              <p className="mt-4 rounded-2xl bg-white p-5 text-[15px] leading-relaxed text-brand-950/80 shadow-sm">
                {city.local.geography}
              </p>
              <p className="mt-3 rounded-2xl bg-brand-900 p-5 text-[15px] leading-relaxed text-white/85">
                {city.local.climateRisk}
              </p>
            </div>
            <div className="space-y-4 text-[15px] leading-relaxed text-brand-950/75">
              {city.local.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="flex flex-wrap gap-2 pt-2">
                {(city.local.blocks[0]?.items ?? []).map((sp) => (
                  <span
                    key={sp}
                    className="rounded-full bg-white px-3 py-1 text-sm text-brand-900 shadow-sm"
                  >
                    {sp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:order-2">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                {city.copy.quandTitre}
              </h2>
              <div className="mt-4 space-y-3">
                {(city.local.blocks[1]?.items ?? []).map((l) => (
                  <p
                    key={l}
                    className="rounded-2xl bg-white px-4 py-2.5 text-sm font-medium text-brand-900 shadow-sm"
                  >
                    {l}
                  </p>
                ))}
              </div>
            </div>
            <div className="space-y-4 text-[15px] leading-relaxed text-brand-950/75 lg:order-1">
              {[...city.local.regulations.national, ...city.local.regulations.local].map(
                (p, i) => (
                  <p key={i}>{p}</p>
                )
              )}
            </div>
          </div>

          <div className="mt-14">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              {city.copy.quandTitre}
            </h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {city.local.season.map((p, i) => (
                <p
                  key={i}
                  className="rounded-2xl bg-white p-5 text-[15px] leading-relaxed text-brand-950/75 shadow-sm"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ZONE */}
      <section className="py-14 sm:py-18">
        <Container>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            Notre zone d&apos;intervention dans le {city.dept}
          </h2>
          <div className="mt-4 max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {city.zone.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {[city.city, ...city.local.towns].map((t) => (
              <span
                key={t}
                className="rounded-full bg-brand-100 px-3.5 py-1.5 text-sm font-medium text-brand-900"
              >
                {t}
              </span>
            ))}
          </div>
          <Link
            href="/zone-intervention"
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
          >
            Voir toute la zone d&apos;intervention
            <ArrowRight className="size-4" />
          </Link>
        </Container>
      </section>

      <FaqSection items={city.faq} surtitre={city.copy.faqSurtitre} />

      {/* CTA FINAL — renvoie en haut, vers le formulaire */}
      <section className="bg-brand-900 text-white">
        <Container className="py-16 text-center sm:py-20">
          <h2 className="mx-auto max-w-2xl font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {city.zone.cta}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
            {city.copy.ctaTexte}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#estimateur"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-brand-900 transition-colors hover:bg-brand-50"
            >
              Remplir l&apos;estimateur
              <ArrowRight className="size-4" />
            </Link>
            <CallButton
              phoneDisplay={city.phoneDisplay}
              phoneHref={city.phoneHref}
              label={city.phoneDisplay ? `Appeler — ${city.phoneDisplay}` : undefined}
              className="rounded-full border border-white/25 bg-transparent px-7 hover:bg-white/10"
            />
          </div>
        </Container>
      </section>
    </>
  )
}
