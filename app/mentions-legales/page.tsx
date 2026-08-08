import type { Metadata } from "next"
import { site } from "@/lib/site"
import { Container } from "@/components/site/container"

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
}

// Éditeur = NS NATIVESQUARE (exploitant du site, identique pour tous les clones).
// Seuls le téléphone / la zone varient par ville (via site()).
export default function MentionsLegalesPage() {
  const city = site()
  return (
    <article className="py-12">
      <Container prose className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Mentions légales</h1>

        <section className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Éditeur du site</h2>
          <p>
            Le site {city.brand} est édité par <strong>NS NATIVESQUARE</strong>,
            société par actions simplifiée (SAS) au capital de 2&nbsp;€, immatriculée
            au RCS de Paris sous le numéro 995&nbsp;089&nbsp;851.
          </p>
          <ul className="list-none space-y-1">
            <li>Siège social : 60 rue François Ier, 75008 Paris</li>
            <li>SIRET (siège) : 995 089 851 00019</li>
            <li>N° TVA intracommunautaire : FR87 995 089 851</li>
            <li>Code APE : 6201Z (programmation informatique)</li>
            <li>Contact : {city.phoneDisplay}</li>
          </ul>
          <p>
            Zone d&apos;activité couverte par ce site : {city.city} et son
            agglomération ({city.dept}).
          </p>
        </section>

        <section className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">
            Directeur de la publication
          </h2>
          <p>Maxime Gey, en sa qualité de président de NS NATIVESQUARE.</p>
        </section>

        <section className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Hébergement</h2>
          <p>
            Site hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA
            91723, États-Unis.
          </p>
        </section>

        <section className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus de ce site est protégé. Toute
            reproduction sans autorisation est interdite.
          </p>
        </section>

        {city.hero.imageCredit && (
          <section className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">Crédits photo</h2>
            <p>{city.hero.imageCredit}</p>
          </section>
        )}
      </Container>
    </article>
  )
}
