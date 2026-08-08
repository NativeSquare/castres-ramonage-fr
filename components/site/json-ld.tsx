// Injecte des données structurées (schema.org) dans la page.
// Sert pour LocalBusiness (accueil) et FAQPage — ce que Google lit pour
// les rich results et les AI Overviews (playbook §3.7).
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
