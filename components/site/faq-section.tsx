import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { JsonLd } from "@/components/site/json-ld"
import { Container } from "@/components/site/container"
import { HelpCircle } from "lucide-react"
import type { FAQItem } from "@/lib/types"

// FAQ visible + données structurées FAQPage.
// keepMounted garde les réponses dans le HTML (lisibles par Google même repliées).
export function FaqSection({
  items,
  title = "Questions fréquentes",
  surtitre,
}: {
  items: FAQItem[]
  title?: string
  surtitre: string
}) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  }

  return (
    <section className="py-16 sm:py-20">
      <Container prose>
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-700 uppercase">
            <HelpCircle className="size-4" />
            {surtitre}
          </p>
          <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
        </div>
        <Accordion className="mt-8 divide-y divide-brand-900/10 overflow-hidden rounded-xl border border-brand-900/10 bg-card">
          {items.map((it, i) => (
            <AccordionItem
              key={i}
              value={String(i)}
              className="px-5 not-last:border-b-0"
            >
              <AccordionTrigger className="py-4 text-base font-medium hover:no-underline hover:text-brand-800">
                {it.q}
              </AccordionTrigger>
              <AccordionContent keepMounted>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {it.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
      <JsonLd data={faqLd} />
    </section>
  )
}
