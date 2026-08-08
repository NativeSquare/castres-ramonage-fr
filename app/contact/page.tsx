import type { Metadata } from "next"
import { Phone, Clock, Calculator, Mail } from "lucide-react"
import { site } from "@/lib/site"
import { CallButton } from "@/components/site/call-button"
import { ContactForm } from "@/components/site/contact-form"
import { Estimator } from "@/components/site/estimator"
import { Container } from "@/components/site/container"

const city = site()

export const metadata: Metadata = {
  title: "Contact & devis gratuit",
  description: `Contactez ${city.brand} pour un devis gratuit ${site().nicheDe} ${city.inCity} et dans le ${city.dept}.`,
  alternates: { canonical: "/contact" },
  // noindex (31/07/2026). Cette page est presque entièrement des formulaires, et
  // c'était la SEULE à dépasser le seuil de duplication sur 9 des 10 couples du
  // portefeuille (8,0 à 11,5 % hors gabarit). Ce qui reste en commun, une fois
  // l'habillage retiré, ce sont les libellés de champs — « nom téléphone email
  // commune votre demande envoyer ma demande ». On ne peut pas les faire varier
  // par ville sans abîmer le formulaire, et cette page ne vise aucun mot-clé.
  // Elle reste accessible aux visiteurs et liée depuis la navigation.
  robots: { index: false },
  openGraph: {
    title: `Contact & devis gratuit — ${city.brand}`,
    description: `Devis gratuit ${site().nicheDe} ${city.inCity} et dans le ${city.dept}.`,
    url: "/contact",
    type: "website",
    locale: "fr_FR",
    images: ["/opengraph-image"],
  },
}

export default function ContactPage() {
  const c = site()
  const communePlaceholder = `${[c.city, ...c.local.towns].slice(0, 3).join(", ")}…`

  return (
    <article className="py-12">
      <Container prose>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {c.copy.contactH1}
        </h1>
        {/* Prose UNIQUE par ville — vit dans la config (règle template/config). */}
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {c.contactIntro}
        </p>

        {/* Contenu local propre à la ville : sans lui, cette page n'est que du
            gabarit et se recoupe avec celle des autres sites du portefeuille. */}
        <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
          {c.contactDetail.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Appel direct — le canal prioritaire */}
        <div className="mt-8 rounded-xl border border-brand-900/10 bg-brand-50 p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-brand-800">
            <Phone className="size-4" />
            {c.copy.contactAppelTitre}
          </div>
          <div className="mt-3">
            <CallButton
              phoneDisplay={c.phoneDisplay}
              phoneHref={c.phoneHref}
              label={`Appeler — ${c.phoneDisplay}`}
            />
          </div>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4" />
            {c.hours}
          </p>
        </div>

        {/* Estimateur de prix */}
        <h2 className="mt-14 flex items-center gap-2 font-heading text-2xl font-semibold tracking-tight">
          <Calculator className="size-5 text-brand-700" />
          {c.copy.contactEstimateurTitre}
        </h2>
        <p className="mt-2 text-muted-foreground">{c.copy.contactEstimateurIntro}</p>
        <div className="mt-6">
          <Estimator
            consentement={c.copy.consentement}
            boutonEnvoi={c.copy.boutonEstimation}
            phoneDisplay={c.phoneDisplay}
            phoneHref={c.phoneHref}
            brand={c.brand}
          />
        </div>

        {/* Formulaire message */}
        <h2 className="mt-14 flex items-center gap-2 font-heading text-2xl font-semibold tracking-tight">
          <Mail className="size-5 text-brand-700" />
          {c.copy.contactMessageTitre}
        </h2>
        <p className="mt-2 text-muted-foreground">{c.copy.contactMessageIntro}</p>
        <div className="mt-6">
          <ContactForm communePlaceholder={communePlaceholder} />
        </div>
      </Container>
    </article>
  )
}
