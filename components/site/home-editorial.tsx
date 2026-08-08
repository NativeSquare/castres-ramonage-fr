import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { site } from "@/lib/site"
import { CallButton } from "@/components/site/call-button"
import { FaqSection } from "@/components/site/faq-section"
import { Container } from "@/components/site/container"
import { EstimatorSection } from "@/components/site/estimator-section"

// Variante « editorial » — mise en page de magazine.
//
// Ce qui la distingue structurellement des autres layouts :
//  · pas de photo de héro du tout : un pavé typographique et un filet
//  · les services sont un SOMMAIRE numéroté façon table des matières
//  · le corps local est une colonne de lecture avec lettrine et un rail
//    latéral d'encadrés (essences, repères, communes)
//  · la zone d'intervention est du texte courant, pas des puces
//  · aucun aplat de couleur pleine largeur avant l'estimateur
//
// Conçue pour une ville où l'on veut un ton posé plutôt qu'un ton « dépannage ».

export function HomeEditorial() {
  const city = site()

  return (
    <>
      {/* HÉRO DE COUVERTURE — la photo d'abord, la manchette dessous */}
      <section className="border-b border-brand-950/15">
        {city.hero.image && (
          <figure className="relative">
            <div className="relative aspect-[21/9] w-full sm:aspect-[21/6]">
              <Image
                src={city.hero.image}
                alt={city.hero.imageAlt ?? `${city.nicheCap} ${city.inCity}`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {/* Hexa+alpha inline — voir le commentaire du héro de home-local :
                les modificateurs /opacité sur les couleurs brand-* compilent en
                color-mix, que la cible chrome≥90 rend 100 % opaque. */}
            <figcaption
              className="absolute inset-x-0 bottom-0 px-0 pt-12 pb-3 text-white"
              style={{
                background: `linear-gradient(to top, ${city.theme.brand["950"]}cc, transparent)`,
              }}
            >
              <Container className="flex items-baseline justify-between gap-4 text-xs">
                <span className="text-white/85">
                  Le Jardin public {city.inCity} — un patrimoine arboré plus que
                  centenaire, au cœur de notre zone d&apos;intervention.
                </span>
                <span
                  aria-hidden
                  className="hidden font-heading tracking-[0.22em] uppercase sm:inline"
                >
                  {city.deptCode}
                </span>
              </Container>
            </figcaption>
          </figure>
        )}
        <Container className="py-12 sm:py-16">
          <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-brand-700 uppercase">
            {city.city} · {city.dept} ({city.deptCode}) · {city.region}
          </p>
          <div aria-hidden className="mt-5 h-px w-full bg-brand-950/15" />

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h1 className="font-heading text-4xl leading-[1.08] font-bold tracking-[-0.02em] text-balance text-brand-950 sm:text-5xl">
                {city.hero.title}
              </h1>
              <p className="mt-6 border-l-2 border-brand-600 pl-5 text-lg leading-[1.7] text-brand-950/80">
                {city.hero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#estimateur"
                  className="inline-flex h-11 items-center gap-2 border border-brand-950 bg-brand-950 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  Demander une estimation
                  <ArrowUpRight className="size-4" />
                </Link>
                <CallButton
                  phoneDisplay={city.phoneDisplay}
                  phoneHref={city.phoneHref}
                  className="h-11 rounded-none border border-brand-950 bg-transparent px-6 text-[15px] text-brand-950 hover:bg-brand-50"
                />
              </div>
            </div>

            {/* SOMMAIRE — table des matières des prestations */}
            <nav
              aria-label="Nos prestations"
              className="lg:col-span-5 lg:border-l lg:border-brand-950/15 lg:pl-10"
            >
              <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-brand-700 uppercase">
                Au sommaire
              </p>
              <ol className="mt-5">
                {city.services.map((s, i) => (
                  <li key={s.slug} className="border-t border-brand-950/10 first:border-t-0">
                    <Link
                      href={`/${s.slug}`}
                      className="group flex items-baseline gap-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                    >
                      <span className="font-heading text-xs font-semibold text-brand-600 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-[15px] font-medium text-brand-950 underline decoration-brand-300 decoration-1 underline-offset-4 group-hover:decoration-brand-700">
                        {s.name} {city.inCity}
                      </span>
                      <ArrowUpRight className="size-3.5 shrink-0 self-center text-brand-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ol>
              <ul className="mt-6 space-y-1.5 border-t border-brand-950/10 pt-5">
                {city.hero.points.map((p) => (
                  <li key={p} className="text-sm leading-relaxed text-brand-950/70">
                    — {p}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>

      {/* CHAPÔ — la contrainte locale, en exergue */}
      <section className="border-b border-brand-950/15 bg-brand-50">
        <Container className="py-10">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-12">
            <p className="font-heading text-lg leading-[1.6] font-medium text-brand-950 text-balance">
              {city.local.geography}
            </p>
            <p className="text-[15px] leading-[1.75] text-brand-950/75">
              {city.local.climateRisk}
            </p>
          </div>
        </Container>
      </section>

      {/* ARTICLE — colonne de lecture + rail latéral d'encadrés */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                {site().nicheCap} {city.inCity}, en pratique
              </h2>
              <div className="mt-6 space-y-5 text-[17px] leading-[1.8] text-brand-950/80">
                {city.local.intro.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "first-letter:float-left first-letter:mt-1 first-letter:mr-2.5 first-letter:font-heading first-letter:text-[3.4rem] first-letter:leading-[0.82] first-letter:font-bold first-letter:text-brand-700"
                        : undefined
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              <h3 className="mt-12 font-heading text-xl font-bold tracking-tight">
                Ce que dit la loi
              </h3>
              <div className="mt-4 space-y-4 text-[15px] leading-[1.75] text-brand-950/70">
                {city.local.regulations.national.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <h3 className="mt-10 font-heading text-xl font-bold tracking-tight">
                Les règles propres à {city.city}
              </h3>
              <div className="mt-4 space-y-4 text-[15px] leading-[1.75] text-brand-950/70">
                {city.local.regulations.local.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <h3 className="mt-10 font-heading text-xl font-bold tracking-tight">
                Le calendrier des interventions
              </h3>
              <div className="mt-4 space-y-4 text-[15px] leading-[1.75] text-brand-950/70">
                {city.local.season.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* RAIL — encadrés secs, style « en marge » */}
            <aside className="space-y-8 lg:col-span-4">
              {city.photoLocale && (
                <figure className="border-t-2 border-brand-950 pt-4">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={city.photoLocale.src}
                      alt={city.photoLocale.alt}
                      fill
                      sizes="(min-width: 1024px) 360px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2.5 text-xs leading-relaxed text-brand-950/55">
                    {city.photoLocale.alt}.
                  </figcaption>
                </figure>
              )}
              <div className="border-t-2 border-brand-950 pt-4">
                <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-brand-700 uppercase">
                  {city.local.blocks[0]?.heading}
                </p>
                <p className="mt-3 text-sm leading-[1.8] text-brand-950/75">
                  {(city.local.blocks[0]?.items ?? []).join(" · ")}
                </p>
              </div>
              <div className="border-t-2 border-brand-950 pt-4">
                <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-brand-700 uppercase">
                  {city.local.blocks[1]?.heading}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-brand-950/75">
                  {(city.local.blocks[1]?.items ?? []).map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
              <div className="border-t-2 border-brand-950 pt-4">
                <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-brand-700 uppercase">
                  Quartiers desservis
                </p>
                <p className="mt-3 text-sm leading-[1.8] text-brand-950/75">
                  {city.local.neighborhoods.join(", ")}.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* CONFIANCE — série de brèves séparées par des filets */}
      <section className="border-y border-brand-950/15 bg-brand-50 py-14 sm:py-18">
        <Container>
          <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-brand-700 uppercase">
            Notre méthode
          </p>
          <div className="mt-8 grid gap-x-14 gap-y-9 sm:grid-cols-2">
            {city.trust.map((t, i) => (
              <div key={t.title}>
                <p className="font-heading text-xs font-semibold text-brand-600 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1.5 font-heading text-lg leading-snug font-bold text-brand-950 text-balance">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.75] text-brand-950/70">{t.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <EstimatorSection
        subtitle={city.copy.estimateurIntro.replace(
          "{service}",
          city.copy.servicesResume
        )}
      />

      {/* ZONE — texte courant, pas de puces */}
      <section className="py-14 sm:py-18">
        <Container prose>
          <p className="font-heading text-[11px] font-semibold tracking-[0.22em] text-brand-700 uppercase">
            Zone d&apos;intervention
          </p>
          <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-balance">
            Où nous nous déplaçons dans le {city.dept}
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-[1.8] text-brand-950/75">
            {city.zone.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p>
              Communes couvertes :{" "}
              <span className="text-brand-950">
                {[city.city, ...city.local.towns].join(", ")}.
              </span>{" "}
              <Link
                href="/zone-intervention"
                className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-700"
              >
                Voir le détail par commune
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <FaqSection items={city.faq} surtitre={city.copy.faqSurtitre} />

      {/* PIED D'ARTICLE — bandeau sobre */}
      <section className="border-t border-brand-950/15 bg-brand-950 text-white">
        <Container className="py-14 sm:py-18">
          <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto] sm:gap-12">
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                {city.copy.ctaTitre}
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-[1.75] text-white/70">
                {city.zone.cta}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#estimateur"
                className="inline-flex h-11 items-center gap-2 border border-white bg-white px-6 text-[15px] font-semibold text-brand-950 transition-colors hover:bg-brand-50"
              >
                Demander une estimation
                <ArrowUpRight className="size-4" />
              </Link>
              <CallButton
                phoneDisplay={city.phoneDisplay}
                phoneHref={city.phoneHref}
                className="h-11 rounded-none border border-white/40 bg-transparent px-6 text-[15px] hover:bg-white/10"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
