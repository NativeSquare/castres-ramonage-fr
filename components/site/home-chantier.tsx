import Image from "next/image"
import Link from "next/link"
import { Check, ShieldCheck, MapPin, ArrowRight } from "lucide-react"
import { site } from "@/lib/site"
import { CallButton } from "@/components/site/call-button"
import { FaqSection } from "@/components/site/faq-section"
import { Container } from "@/components/site/container"
import { EstimatorSection } from "@/components/site/estimator-section"

// Variante de home "chantier" : hero en 2 colonnes sur fond clair (photo
// encadrée, pas de plein écran), bande de réassurance sombre, services en
// liste numérotée, bloc confiance en bande foncée, ordre des sections propre.
// Structurellement différente de la variante "classic" — c'est le but :
// deux villes ne doivent pas avoir la même page à la couleur près.

// Liseré "rubalise" discret, aux couleurs du site.
const stripe = {
  backgroundImage:
    "repeating-linear-gradient(135deg, var(--brand-500) 0 10px, var(--brand-950) 10px 20px)",
}

export function HomeChantier() {
  const city = site()

  return (
    <>
      {/* HÉRO — 2 colonnes : texte sur fond clair, photo encadrée à droite */}
      <section className="border-b-4 border-brand-950 bg-brand-50">
        <Container className="grid items-center gap-10 py-14 sm:py-18 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-2.5 w-14 shrink-0" style={stripe} />
              <p className="text-[13px] font-semibold tracking-widest text-brand-800 uppercase">
                {city.copy.metierPluriel} · {city.dept}
              </p>
            </div>
            <h1 className="mt-5 font-heading text-4xl leading-[1.05] font-bold tracking-tight text-balance text-brand-950 uppercase sm:text-5xl">
              {city.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-950/75">
              {city.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#estimateur"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-brand-600 px-6 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
              >
                Estimer mon devis
                <ArrowRight className="size-4" />
              </Link>
              <CallButton
                phoneDisplay={city.phoneDisplay}
                phoneHref={city.phoneHref}
                className="bg-brand-950 hover:bg-brand-900"
              />
            </div>
            <ul className="mt-9 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {city.hero.points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2.5 text-sm font-medium text-brand-950/85"
                >
                  <Check className="size-4 shrink-0 text-brand-600" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {city.hero.image && (
            <div className="relative max-lg:hidden">
              {/* Cadre décalé couleur de marque derrière la photo */}
              <div aria-hidden className="absolute -right-3 -bottom-3 h-full w-full bg-brand-600" />
              <div className="relative aspect-[4/3] overflow-hidden border-4 border-brand-950">
                <Image
                  src={city.hero.image}
                  alt={city.hero.imageAlt ?? `${city.nicheCap} ${city.inCity}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* SERVICES — liste numérotée, alignée à gauche */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-2.5 w-14 shrink-0" style={stripe} />
            <p className="text-[13px] font-semibold tracking-widest text-brand-800 uppercase">
              Nos prestations
            </p>
          </div>
          <h2 className="mt-4 max-w-2xl font-heading text-2xl font-bold tracking-tight text-balance uppercase sm:text-3xl">
            Nos services {site().nicheDe} {city.inCity}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            {city.copy.servicesIntro}
          </p>

          <div className="mt-8 grid gap-x-12 border-b-2 border-brand-950/10 lg:grid-cols-2">
            {city.services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="group flex items-baseline gap-5 border-t-2 border-brand-950/10 py-5 transition-colors hover:bg-brand-50/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
              >
                <span className="font-heading text-2xl font-bold text-brand-600 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="font-heading text-lg font-semibold text-foreground group-hover:text-brand-800">
                    {s.name} {city.inCity}
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                    {s.tagline}
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 self-center text-brand-600 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ESTIMATEUR — placé tôt : le devis d'abord */}
      <EstimatorSection
        subtitle={city.copy.estimateurIntro.replace("{service}", city.copy.servicesResume)}
      />

      {/* CONFIANCE — bande sombre */}
      <section className="bg-brand-950 py-16 text-white sm:py-20">
        <Container>
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-2.5 w-14 shrink-0" style={stripe} />
            <p className="text-[13px] font-semibold tracking-widest text-brand-300 uppercase">
              La confiance d&apos;un artisan
            </p>
          </div>
          <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight uppercase sm:text-3xl">
            {city.copy.confianceTitre}
          </h2>
          <div className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {city.trust.map((t) => (
              <div key={t.title} className="border-l-2 border-brand-500/60 pl-5">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="size-5 shrink-0 text-brand-400" />
                  <h3 className="font-heading text-lg font-semibold">{t.title}</h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-white/70">{t.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CONTEXTE LOCAL — contenu unique */}
      <section className="py-16 sm:py-20">
        <Container prose>
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-2.5 w-14 shrink-0" style={stripe} />
            <p className="text-[13px] font-semibold tracking-widest text-brand-800 uppercase">
              Ancrés en {city.region}
            </p>
          </div>
          <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-balance uppercase sm:text-3xl">
            {site().nicheCap} {city.inCity}, en {city.region}
          </h2>

          <div className="mt-6 border-l-4 border-brand-600 bg-brand-50 p-5 text-sm leading-relaxed">
            <p className="font-medium text-brand-950">{city.local.geography}</p>
            <p className="mt-2 text-brand-900">{city.local.climateRisk}</p>
          </div>

          <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {city.local.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {city.local.blocks.map((bloc) => (
            <div key={bloc.heading}>
              <h3 className="mt-12 font-heading text-lg font-bold tracking-wide uppercase">{bloc.heading}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {bloc.items.map((it) => (
                  <span
                key={it}
                className="border border-brand-950/15 bg-white px-2.5 py-1 text-sm font-medium text-brand-950"
              >
                {it}
              </span>
                ))}
              </div>
            </div>
          ))}

          <h3 className="mt-12 font-heading text-lg font-bold tracking-wide uppercase">
            Ce que dit la loi
          </h3>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {city.local.regulations.national.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <h3 className="mt-8 font-heading text-lg font-bold tracking-wide uppercase">
            Les règles {city.inCity}
          </h3>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {city.local.regulations.local.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <h3 className="mt-12 font-heading text-lg font-bold tracking-wide uppercase">
            Quand intervenir
          </h3>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {city.local.season.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* ZONE D'INTERVENTION — bande claire, chips sombres */}
      <section className="border-y-2 border-brand-950/10 bg-brand-50 py-16 sm:py-20">
        <Container>
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-2.5 w-14 shrink-0" style={stripe} />
            <p className="text-[13px] font-semibold tracking-widest text-brand-800 uppercase">
              Où nous intervenons
            </p>
          </div>
          <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight uppercase sm:text-3xl">
            Notre zone d&apos;intervention
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Nous intervenons {city.inCity} et dans tout le {city.dept} :
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {[city.city, ...city.local.towns].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 bg-brand-950 px-3 py-1.5 text-sm font-medium text-white"
              >
                <MapPin className="size-3.5 text-brand-400" />
                {t}
              </span>
            ))}
          </div>
          <div className="mt-7">
            <Link
              href="/zone-intervention"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              Voir toute la zone d&apos;intervention
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <FaqSection items={city.faq} surtitre={city.copy.faqSurtitre} />

      {/* CTA FINAL — liseré rubalise + fond de marque */}
      <section className="relative bg-brand-800 text-white">
        <div aria-hidden className="h-2.5 w-full" style={stripe} />
        <Container className="py-18 text-center sm:py-22">
          <h2 className="mx-auto max-w-2xl font-heading text-2xl font-bold tracking-tight text-balance uppercase sm:text-3xl">
            {city.copy.ctaTitre}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/85">
            {city.copy.ctaSousTitre}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#estimateur"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 text-base font-semibold text-brand-900 shadow-lg transition-colors hover:bg-brand-50"
            >
              Estimer mon devis
              <ArrowRight className="size-4" />
            </Link>
            <CallButton
              phoneDisplay={city.phoneDisplay}
              phoneHref={city.phoneHref}
              label={city.phoneDisplay ? `Appeler — ${city.phoneDisplay}` : undefined}
              className="bg-brand-950 hover:bg-brand-900"
            />
          </div>
        </Container>
      </section>
    </>
  )
}
