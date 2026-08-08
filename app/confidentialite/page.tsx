import type { Metadata } from "next"
import { site } from "@/lib/site"
import { Container } from "@/components/site/container"

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false },
}

// TODO : à faire valider (RGPD). Si enregistrement des appels via le numéro de
// suivi : information des deux parties, base légale, durée de conservation
// (voir playbook §1.3).
export default function ConfidentialitePage() {
  const city = site()
  return (
    <article className="py-12">
      <Container prose className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Politique de confidentialité
        </h1>

        <section className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">
            Données collectées
          </h2>
          <p>
            Lorsque vous nous contactez par téléphone ou via un formulaire, nous
            recueillons les informations nécessaires au traitement de votre
            demande de devis : nom, numéro de téléphone, adresse du chantier et
            nature des travaux. Ces données ne servent qu&apos;à vous recontacter.
          </p>
        </section>

        <section className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
            rectification et de suppression de vos données. Pour l&apos;exercer,
            contactez-nous par téléphone au {city.phoneDisplay}.
          </p>
        </section>
      </Container>
    </article>
  )
}
