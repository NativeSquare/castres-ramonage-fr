import type { Metadata } from "next"
import {
  Geist,
  Inter,
  Manrope,
  Barlow,
  Source_Sans_3,
  Rubik,
  Work_Sans,
  Oswald,
  Fraunces,
  Bricolage_Grotesque,
  Archivo,
} from "next/font/google"
import "./globals.css"
import { site } from "@/lib/site"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { BusinessJsonLd } from "@/components/site/business-jsonld"

// Les polices disponibles — chaque ville choisit la sienne (city.theme.font).
const geist = Geist({ variable: "--font-sans", subsets: ["latin"] })
const barlow = Barlow({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})
const rubik = Rubik({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const workSans = Work_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
const inter = Inter({ variable: "--font-sans", subsets: ["latin"] })
const manrope = Manrope({ variable: "--font-sans", subsets: ["latin"] })
// Archivo sert aussi de police de TITRAGE : deux instances, deux variables CSS.
const archivoCorps = Archivo({ variable: "--font-sans", subsets: ["latin"] })

const FONTS: Record<string, { variable: string }> = {
  geist,
  barlow,
  "source-sans": sourceSans,
  rubik,
  "work-sans": workSans,
  inter,
  manrope,
  archivo: archivoCorps,
}

// Polices de TITRAGE — la variable --font-titres n'existe que si la ville en a
// une ; sinon --font-heading (globals.css) retombe sur la police du corps.
const oswald = Oswald({
  variable: "--font-titres",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})
const fraunces = Fraunces({
  variable: "--font-titres",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})
const bricolage = Bricolage_Grotesque({
  variable: "--font-titres",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
})
const archivo = Archivo({
  variable: "--font-titres",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})
const FONTS_TITRES = { oswald, fraunces, bricolage, archivo } as const

const city = site()

// Thème injecté en variables CSS sur <html> : palette brand-* + radius.
// Chaque site a ses couleurs, sa police, ses angles — piloté par la config ville.
const themeVars = {
  "--radius": city.theme.radius,
  ...Object.fromEntries(
    Object.entries(city.theme.brand).map(([k, v]) => [`--brand-${k}`, v])
  ),
} as React.CSSProperties

export const metadata: Metadata = {
  metadataBase: new URL(`https://${city.domain}`),
  title: {
    default: `${city.brand} — ${city.copy.accroche} ${city.inCity} (${city.deptCode})`,
    template: `%s | ${city.brand}`,
  },
  // Le sous-titre du héro est écrit pour être LU, pas pour tenir en 175 caractères.
  // `hero.metaDescription` prime donc quand elle existe (ajoutée le 04/08/2026).
  description: city.hero.metaDescription ?? city.hero.subtitle,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${city.brand} — ${city.copy.accroche} ${city.inCity}`,
    description: city.hero.metaDescription ?? city.hero.subtitle,
    url: `https://${city.domain}`,
    locale: "fr_FR",
    type: "website",
  },
  // Pas de title/description figés ici : Next les dérive du title/description de
  // CHAQUE page (sinon les pages enfant héritent du Twitter de la home).
  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${(FONTS[city.theme.font] ?? FONTS.geist).variable} ${
        city.theme.fontHeading ? FONTS_TITRES[city.theme.fontHeading].variable : ""
      } h-full antialiased`}
      style={themeVars}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <BusinessJsonLd />
      </body>
    </html>
  )
}
