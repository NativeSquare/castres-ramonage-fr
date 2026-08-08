import Link from "next/link"
import { Phone, ArrowRight } from "lucide-react"
import { BrandLogo } from "@/components/site/brand-logo"
import { site } from "@/lib/site"
import { CallButton } from "@/components/site/call-button"
import { Container } from "@/components/site/container"

export function SiteHeader() {
  const city = site()

  // Variante « centre » (Brest) — barre claire, liens à gauche, LOGO CENTRÉ,
  // bouton pilule sombre à droite. Copie de la référence validée par Alexandre
  // le 29/07 (emerald-law-sprinkler). Pas de bandeau sombre au-dessus.
  if (city.theme.header === "centre") {
    return (
      <header className="sticky top-0 z-50 border-b border-brand-950/10 bg-brand-50/95 backdrop-blur supports-[backdrop-filter]:bg-brand-50/85">
        <Container className="grid grid-cols-[1fr_auto] items-center gap-4 py-3 lg:grid-cols-[1fr_auto_1fr]">
          <nav className="hidden items-center gap-6 text-sm font-medium text-brand-950/80 lg:flex">
            {city.services.slice(0, 4).map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="transition-colors hover:text-brand-700"
              >
                {s.navLabel}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="justify-self-start rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700 lg:justify-self-center"
          >
            <BrandLogo />
          </Link>

          <div className="flex items-center justify-end gap-5">
            <Link
              href="/contact"
              className="hidden text-sm font-medium text-brand-950/80 transition-colors hover:text-brand-700 sm:inline"
            >
              Contact
            </Link>
            <Link
              href="/#estimateur"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-brand-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-900"
            >
              Devis gratuit
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-brand-900/10 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      {/* Bandeau de réassurance + numéro visible en permanence */}
      <div className="bg-brand-800 text-brand-50">
        <Container className="flex items-center justify-between gap-2 py-2 text-xs">
          <span className="hidden sm:inline">
            {city.copy.bandeauHeader}
          </span>
          {city.phoneHref && (
            <a
              href={city.phoneHref}
              className="inline-flex items-center gap-1.5 font-medium tracking-wide hover:underline"
            >
              <Phone className="size-3.5" />
              {city.phoneDisplay}
            </a>
          )}
        </Container>
      </div>

      {/* Barre principale : marque, navigation services, bouton d'appel */}
      <Container className="flex items-center justify-between gap-4 py-3.5">
        {/* Logo texte + glyphe : TOUJOURS le même glyphe que le favicon
            (BrandMark) — règle « favicon et logo matchent » du 29/07. */}
        <Link
          href="/"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
        >
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {city.services.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="text-muted-foreground transition-colors hover:text-brand-800"
            >
              {s.navLabel}
            </Link>
          ))}
          {city.pricing && (
            <Link
              href="/prix"
              className="text-muted-foreground transition-colors hover:text-brand-800"
            >
              Prix
            </Link>
          )}
          <Link
            href="/contact"
            className="text-muted-foreground transition-colors hover:text-brand-800"
          >
            Contact
          </Link>
        </nav>

        <CallButton
          phoneDisplay={city.phoneDisplay}
          phoneHref={city.phoneHref}
          className="hidden sm:inline-flex"
        />
      </Container>
    </header>
  )
}
