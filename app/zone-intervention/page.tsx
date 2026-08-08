import type { Metadata } from "next"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { site } from "@/lib/site"
import { CallButton } from "@/components/site/call-button"
import { Container } from "@/components/site/container"

const city = site()

export const metadata: Metadata = {
  title: "Zone d'intervention",
  description: `${city.nicheCap} ${city.inCity} et dans l'agglomération : ${city.local.towns
    .slice(0, 6)
    .join(", ")} et les communes du ${city.dept}.`,
  alternates: { canonical: "/zone-intervention" },
  openGraph: {
    title: `Zone d'intervention — ${city.city} et agglomération`,
    description: `${city.nicheCap} ${city.inCity} et dans les communes du ${city.dept}.`,
    url: "/zone-intervention",
    type: "website",
    locale: "fr_FR",
    images: ["/opengraph-image"],
  },
}

export default function ZonePage() {
  const c = site()
  const communes = [c.city, ...c.local.towns]

  return (
    <>
    <article className="py-12">
      <Container prose>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Zone d&apos;intervention — {c.city} et agglomération
      </h1>

      {/* Prose UNIQUE par ville — vit dans city.zone (jamais de texte figé ici). */}
      <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground">
        {c.zone.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <p>{c.zone.missing}</p>
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">
        Communes desservies
      </h2>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {communes.map((t) => (
          <li
            key={t}
            className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm"
          >
            <MapPin className="size-4 shrink-0 text-brand-700" />
            {t}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">
        Quartiers de {c.city}
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {c.local.neighborhoods.map((n) => (
          <span key={n} className="rounded-lg bg-muted px-3 py-1.5 text-sm">
            {n}
          </span>
        ))}
      </div>

      <div className="mt-12 rounded-xl border bg-brand-50 p-6 text-center">
        <p className="font-medium">{c.zone.cta}</p>
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
            Estimer mon devis
          </Link>
        </div>
      </div>
      </Container>
    </article>
    </>
  )
}
