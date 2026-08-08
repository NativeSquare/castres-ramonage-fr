import Link from "next/link"
import type { ComponentType } from "react"
import {
  TreeDeciduous,
  Axe,
  Shovel,
  Scissors,
  Sprout,
  Truck,
  Apple,
  Package,
  Boxes,
  Warehouse,
  Sofa,
  MoveVertical,
  Building2,
  Ship,
  GraduationCap,
  ShieldCheck,
  Wrench,
  Droplets,
  ShieldAlert,
  Stethoscope,
  Flame,
  Brush,
  House,
  Thermometer,
  Wind,
  ArrowRight,
} from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { site } from "@/lib/site"

// Catalogue partagé par toutes les niches : chaque site pioche dedans via
// `service.icon`. Le repli est volontairement neutre — un arbre par défaut
// mettrait un houppier sur les cartes d'un site de déménagement.
const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "tree-deciduous": TreeDeciduous,
  axe: Axe,
  shovel: Shovel,
  scissors: Scissors,
  sprout: Sprout,
  truck: Truck,
  apple: Apple,
  package: Package,
  boxes: Boxes,
  warehouse: Warehouse,
  sofa: Sofa,
  "move-vertical": MoveVertical,
  building: Building2,
  ship: Ship,
  "graduation-cap": GraduationCap,
  shield: ShieldCheck,
  wrench: Wrench,
  droplets: Droplets,
  "shield-alert": ShieldAlert,
  stethoscope: Stethoscope,
  flame: Flame,
  brush: Brush,
  home: House,
  thermometer: Thermometer,
  wind: Wind,
}

/** Rend une icône du catalogue partagé par son nom de config. Exporté pour que
 *  les layouts puissent afficher un pictogramme choisi par le SITE plutôt qu'une
 *  icône écrite en dur dans le gabarit — le template ne connaît aucun métier. */
export function ServiceIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = (name && ICONS[name]) || Package
  return <Icon className={className} />
}

export function ServicesGrid() {
  const city = site()
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {city.services.map((s) => {
        const Icon = ICONS[s.icon] ?? Package
        return (
          <Link
            key={s.slug}
            href={`/${s.slug}`}
            className="group rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            <Card className="relative h-full justify-between ring-brand-900/10 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:ring-brand-600/40">
              {/* Filet de couleur en tête de carte */}
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-600 transition-transform duration-200 group-hover:scale-x-100" />
              <CardHeader>
                <div className="flex size-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700 ring-1 ring-brand-600/10 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="mt-3 text-lg">{s.name}</CardTitle>
                <CardDescription className="leading-relaxed">{s.tagline}</CardDescription>
              </CardHeader>
              <CardContent className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                En savoir plus
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
