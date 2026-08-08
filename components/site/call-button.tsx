import { Phone } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Le bouton d'action central du site : un lien tel: vers le numéro de suivi.
// Couleur de marque pour ressortir. C'est le seul vrai call-to-action (playbook §4.2).
export function CallButton({
  phoneDisplay,
  phoneHref,
  label,
  showNumber = true,
  className,
}: {
  phoneDisplay: string
  phoneHref: string
  label?: string
  showNumber?: boolean
  className?: string
}) {
  // Pas de numéro renseigné (site pas encore raccordé au standard) : pas de bouton.
  if (!phoneHref) return null
  return (
    <a
      href={phoneHref}
      className={cn(
        buttonVariants({ variant: "default" }),
        "h-12 gap-2 rounded-lg bg-brand-700 px-6 text-base font-semibold text-white hover:bg-brand-800",
        className
      )}
    >
      <Phone className="size-5" />
      {label ?? (showNumber ? phoneDisplay : "Appeler")}
    </a>
  )
}
