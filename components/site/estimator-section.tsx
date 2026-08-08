import { Calculator } from "lucide-react"
import { site } from "@/lib/site"
import { Estimator } from "@/components/site/estimator"
import { Container } from "@/components/site/container"

// Section "lead magnet" : l'estimateur de prix dans un bandeau sombre qui
// ressort, réutilisable sur toutes les pages (accueil, services, zone…).
// La carte blanche de l'estimateur pop sur le fond brand-900 → vrai aimant.
export function EstimatorSection({
  title,
  subtitle,
}: {
  title?: string
  subtitle?: string
}) {
  const c = site()
  return (
    <section
      id="estimateur"
      className="relative isolate scroll-mt-20 overflow-hidden bg-brand-900 py-16 text-white sm:py-20"
    >
      {/* Texture organique subtile, sans image (perf) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.1] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]"
      />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-px bg-brand-300/30" />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-300/30 bg-brand-300/10 px-3 py-1 text-sm font-medium text-brand-50">
            <Calculator className="size-4" />
            {c.copy.estimateurSurtitre}
          </p>
          <h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {title ?? c.copy.estimateurTitre}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-brand-50/85">
            {subtitle ??
              c.copy.estimateurIntro.replace("{service}", "intervention")}
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl">
          <Estimator
            consentement={c.copy.consentement}
            boutonEnvoi={c.copy.boutonEstimation}
            phoneDisplay={c.phoneDisplay}
            phoneHref={c.phoneHref}
            brand={c.brand}
          />
        </div>
      </Container>
    </section>
  )
}
