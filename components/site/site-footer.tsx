import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { BrandLogo } from "@/components/site/brand-logo"
import { site } from "@/lib/site"
import { Container } from "@/components/site/container"

export function SiteFooter() {
  const city = site()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-brand-900/10 bg-brand-950 text-brand-50/80">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Coordonnées (NAP) */}
        <div>
          <BrandLogo sombre markClassName="size-8" />
          <ul className="mt-4 space-y-2.5 text-sm text-brand-50/70">
            {city.phoneHref && (
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-brand-400" />
                <a href={city.phoneHref} className="transition-colors hover:text-white">
                  {city.phoneDisplay}
                </a>
              </li>
            )}
            {city.email && (
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-brand-400" />
                <a href={`mailto:${city.email}`} className="transition-colors hover:text-white">
                  {city.email}
                </a>
              </li>
            )}
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-brand-400" />
              {city.city} ({city.deptCode})
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="size-4 shrink-0 text-brand-400" />
              {city.hours}
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <div className="font-heading font-semibold text-white">Nos services</div>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-50/70">
            {city.services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="transition-colors hover:text-white">
                  {s.name} {city.inCity}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Zone d'intervention */}
        <div>
          <div className="font-heading font-semibold text-white">Zone d'intervention</div>
          <ul className="mt-4 space-y-2 text-sm text-brand-50/70">
            {city.local.towns.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        {/* Légal */}
        <div>
          <div className="font-heading font-semibold text-white">Informations</div>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-50/70">
            <li>
              <Link href="/contact" className="transition-colors hover:text-white">
                Contact &amp; devis
              </Link>
            </li>
            <li>
              <Link href="/zone-intervention" className="transition-colors hover:text-white">
                Zone d&apos;intervention
              </Link>
            </li>
            {city.pricing && (
              <li>
                <Link href="/prix" className="transition-colors hover:text-white">
                  Prix &amp; tarifs {city.inCity}
                </Link>
              </li>
            )}
            <li>
              <Link href="/mentions-legales" className="transition-colors hover:text-white">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="transition-colors hover:text-white">
                Politique de confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-5 text-xs text-brand-50/55">
          © {year} {city.brand} — {city.nicheCap} {city.inCity} et dans le {city.dept}.
        </Container>
      </div>
    </footer>
  )
}
