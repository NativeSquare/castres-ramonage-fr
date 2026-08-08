import Image from "next/image"
import Link from "next/link"
import {
  BadgeCheck,
  ShieldCheck,
  CalendarDays,
  ArrowUpRight,
  ArrowRight,
  MapPin,
} from "lucide-react"
import { site } from "@/lib/site"
import { ServiceIcon } from "@/components/site/services-grid"
import { CallButton } from "@/components/site/call-button"
import { FaqSection } from "@/components/site/faq-section"
import { Container } from "@/components/site/container"
import { EstimatorSection } from "@/components/site/estimator-section"

// Variante « local » — l'ancrage géographique passe devant tout le reste.
//
// Ce qui la distingue structurellement des autres layouts :
//  · héro photo plein écran façon affiche : repères sobres en haut, phrase en
//    bas de casse en bas à gauche, pilule + badges à droite (référence emerald
//    validée le 29/07)
//  · les communes sont listées en colonnes façon annuaire, pas en puces
//  · le contexte local est présenté en FICHE (liste de définitions) + photo
//  · les services sont des lignes larges avec icône à gauche
//
// (Un « schéma de zone » SVG a existé ici une journée, supprimé le 29/07 :
// ses positions ne correspondaient à aucune géographie réelle.)

// Catalogue d'icônes : services-grid.tsx, source unique (voir home-devis.tsx).

export function HomeLocal() {
  const city = site()

  return (
    <>
      {/* HÉRO — photo plein écran, kickers en coins, titre d'affiche en bas.
          Composition inspirée de la référence validée par Alexandre le 29/07
          (emerald-law-sprinkler) : la photo EST le héro, le texte s'y ancre. */}
      <section className="relative isolate flex min-h-[86vh] flex-col overflow-hidden bg-brand-950 text-white">
        {city.hero.image && (
          <Image
            src={city.hero.image}
            // Alt venu de la config : le layout ne sait pas ce que la photo
            // montre, seule la ville le sait (leçon du 29/07 — le héro
            // précédent était une côte anglaise décrite comme bretonne).
            alt={city.hero.imageAlt ?? `${city.nicheCap} ${city.inCity}`}
            fill
            priority
            sizes="100vw"
            // Cadrage légèrement haut : garder les houppiers, laisser le sol
            // partir sous le dégradé sombre du bas.
            className="-z-20 object-cover object-[50%_38%]"
          />
        )}
        {/* Assombrissement léger global + ancrage sombre du bas de page.
            ⚠️ Hexa+alpha inline, PAS de modificateur Tailwind (brand-950/30) :
            sur nos couleurs en variables CSS, la cible navigateurs (chrome≥90)
            fait retomber color-mix sur la couleur PLEINE — voile 100 % opaque,
            photo invisible. Diagnostiqué le 29/07 sur ce héro même. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: `${city.theme.brand["950"]}26` }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-3/5"
          style={{
            background: `linear-gradient(to top, ${city.theme.brand["950"]}f0 0%, ${city.theme.brand["950"]}73 55%, transparent 100%)`,
          }}
        />

        {/* Deux repères sobres en haut de photo — pas de slogan, pas de « // » */}
        <Container className="flex items-start justify-between gap-6 pt-7 text-[11px] font-semibold tracking-[0.18em] uppercase">
          <p className="text-white/90">{city.copy.metierPluriel} · {city.dept}</p>
          <p className="inline-flex items-center gap-1.5 text-white/90 max-sm:hidden">
            <MapPin className="size-3.5" />
            {city.city} et sa métropole
          </p>
        </Container>

        {/* Bas de héro : phrase d'affiche en bas de casse à gauche (registre de
            la référence : grotesque large, interlignage serré, point final),
            paragraphe + pilule + badges à icônes à droite. */}
        <Container className="mt-auto grid items-end gap-10 pt-28 pb-10 lg:grid-cols-12 lg:gap-12">
          <h1 className="font-heading text-5xl leading-[1.02] font-semibold tracking-[-0.025em] text-balance text-brand-50 sm:text-7xl lg:col-span-8 lg:text-[5.2rem]">
            {city.hero.title}
          </h1>
          <div className="pb-1.5 lg:col-span-4">
            <p className="max-w-md text-[15px] leading-relaxed text-white/85">
              {city.hero.subtitle}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="#estimateur"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-500 px-6 text-xs font-bold tracking-[0.14em] text-brand-950 uppercase transition-colors hover:bg-brand-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
              >
                Estimer mon devis
                <ArrowUpRight className="size-4" />
              </Link>
              <CallButton
                phoneDisplay={city.phoneDisplay}
                phoneHref={city.phoneHref}
                className="h-11 rounded-full border border-white/30 bg-white/10 text-sm backdrop-blur-sm hover:bg-white/20"
              />
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {city.hero.points.slice(0, 3).map((p, i) => {
                const Icone = [BadgeCheck, ShieldCheck, CalendarDays][i] ?? BadgeCheck
                return (
                  <li
                    key={p}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/90 uppercase backdrop-blur-sm"
                  >
                    <Icone className="size-3.5 text-brand-300" />
                    {p}
                  </li>
                )
              })}
            </ul>
          </div>
        </Container>
      </section>

      {/* COMMUNES — annuaire simple en colonnes. (Le « schéma de zone » SVG a
          été supprimé le 29/07 : ses positions ne correspondaient à aucune
          géographie réelle — Landerneau plein ouest… Un dessin faux est pire
          que pas de dessin.) */}
      <section className="border-b bg-brand-50 py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-heading text-xl font-bold tracking-tight text-brand-950 sm:text-2xl">
              Les communes que nous desservons
            </h2>
            <Link
              href="/zone-intervention"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-800 hover:underline"
            >
              Détail par commune
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-5 grid gap-x-8 gap-y-1.5 text-[15px] text-brand-950/80 sm:grid-cols-3 lg:grid-cols-4">
            {[city.city, ...city.local.towns].map((t) => (
              <li key={t} className="border-b border-brand-950/8 py-1.5">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-brand-950/60">
            {city.zone.missing}
          </p>
        </Container>
      </section>

      {/* SERVICES — lignes larges, icône à gauche */}
      <section className="py-14 sm:py-18">
        <Container>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            Nos interventions {city.inCity}
          </h2>
          <div className="mt-8 grid gap-3 lg:grid-cols-2">
            {city.services.map((s) => {
              return (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="group flex items-start gap-4 rounded-xl border border-brand-950/10 bg-card p-5 transition-colors hover:border-brand-500 hover:bg-brand-50/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <ServiceIcon name={s.icon} className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="font-heading text-base font-semibold text-brand-950">
                      {s.name} {city.inCity}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {s.tagline}
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 self-center text-brand-600 transition-transform group-hover:translate-x-1" />
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      {/* FICHE TERRAIN — liste de définitions + photo locale */}
      <section className="border-y bg-brand-50 py-14 sm:py-18">
        <Container>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-balance uppercase sm:text-3xl">
            Le terrain {city.inCity}
          </h2>
          {city.photoLocale && (
            <figure className="relative mt-8 overflow-hidden rounded-xl">
              <div className="relative aspect-[21/8] w-full">
                <Image
                  src={city.photoLocale.src}
                  alt={city.photoLocale.alt}
                  fill
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption
                className="absolute inset-x-0 bottom-0 px-5 pt-10 pb-3 text-sm font-medium text-white"
                style={{
                  background: `linear-gradient(to top, ${city.theme.brand["950"]}d9, transparent)`,
                }}
              >
                {city.photoLocale.alt}
              </figcaption>
            </figure>
          )}
          <dl className="mt-8 grid gap-x-12 gap-y-7 lg:grid-cols-2">
            <div>
              <dt className="font-heading text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase">
                Relief et climat
              </dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-brand-950/80">
                {city.local.geography}
              </dd>
            </div>
            <div>
              <dt className="font-heading text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase">
                {city.copy.risqueTitre}
              </dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-brand-950/80">
                {city.local.climateRisk}
              </dd>
            </div>
            <div>
              <dt className="font-heading text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase">
                {city.local.blocks[0]?.heading}
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {(city.local.blocks[0]?.items ?? []).map((sp) => (
                  <span
                    key={sp}
                    className="rounded-md bg-white px-2 py-0.5 text-sm text-brand-950/80 ring-1 ring-brand-950/10"
                  >
                    {sp}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-heading text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase">
                {city.local.blocks[1]?.heading}
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {(city.local.blocks[1]?.items ?? []).map((l) => (
                  <span
                    key={l}
                    className="rounded-md bg-white px-2 py-0.5 text-sm text-brand-950/80 ring-1 ring-brand-950/10"
                  >
                    {l}
                  </span>
                ))}
              </dd>
            </div>
            <div className="lg:col-span-2">
              <dt className="font-heading text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase">
                Quartiers
              </dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-brand-950/80">
                {city.local.neighborhoods.join(" · ")}
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      <EstimatorSection
        subtitle={city.copy.estimateurIntro.replace(
          "{service}",
          city.copy.servicesResume
        )}
      />

      {/* CONFIANCE + RÈGLES + SAISON — colonne de lecture */}
      <section className="py-14 sm:py-18">
        <Container prose>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            Travailler {city.inCity} : ce que ça implique
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {city.local.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 space-y-5">
            {city.trust.map((t) => (
              <div key={t.title} className="rounded-xl bg-brand-50 p-5">
                <h3 className="font-heading text-base font-semibold text-brand-950">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-950/70">{t.body}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-12 font-heading text-xl font-bold tracking-tight">
            Le cadre réglementaire
          </h3>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {[...city.local.regulations.national, ...city.local.regulations.local].map(
              (p, i) => (
                <p key={i}>{p}</p>
              )
            )}
          </div>

          <h3 className="mt-10 font-heading text-xl font-bold tracking-tight">
            À quel moment de l&apos;année intervenir
          </h3>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {city.local.season.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <FaqSection items={city.faq} surtitre={city.copy.faqSurtitre} />

      {/* CTA FINAL */}
      <section className="bg-brand-950 text-white">
        <Container className="py-16 text-center sm:py-20">
          <h2 className="mx-auto max-w-2xl font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {city.copy.ctaTitre}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
            {city.zone.cta}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#estimateur"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-brand-500 px-6 text-base font-semibold text-brand-950 transition-colors hover:bg-brand-400"
            >
              Estimer mon devis
              <ArrowRight className="size-4" />
            </Link>
            <CallButton
              phoneDisplay={city.phoneDisplay}
              phoneHref={city.phoneHref}
              label={city.phoneDisplay ? `Appeler — ${city.phoneDisplay}` : undefined}
              className="border border-white/25 bg-transparent hover:bg-white/10"
            />
          </div>
        </Container>
      </section>
    </>
  )
}
