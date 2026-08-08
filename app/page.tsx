import type { ComponentType } from "react"
import { site } from "@/lib/site"
import { HomeClassic } from "@/components/site/home-classic"
import { HomeChantier } from "@/components/site/home-chantier"
import { HomeEditorial } from "@/components/site/home-editorial"
import { HomeLocal } from "@/components/site/home-local"
import { HomeDevis } from "@/components/site/home-devis"

// La home est déclinée en VARIANTES de layout (city.theme.variant) : deux
// villes ne partagent pas la même structure de page — seule la mécanique
// (estimateur, FAQ, JSON-LD) est commune.
//
// Ajouter un layout = créer components/site/home-<nom>.tsx, l'inscrire ici,
// étendre le type `variant` dans lib/types.ts et passer `built: true` dans
// rank-factory/identities/palettes.mjs (sinon le design-lint refuse le build).
const LAYOUTS: Record<string, ComponentType> = {
  classic: HomeClassic,
  chantier: HomeChantier,
  editorial: HomeEditorial,
  local: HomeLocal,
  devis: HomeDevis,
}

export default function Home() {
  const city = site()
  const Layout = LAYOUTS[city.theme.variant] ?? HomeClassic
  return <Layout />
}
