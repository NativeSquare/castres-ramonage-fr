import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

// Image Open Graph générée (1200×630), dynamique par ville.
// Sert d'aperçu au partage social (LinkedIn, WhatsApp, X…). Pas besoin de photo :
// une carte texte de marque suffit et reste cohérente avec le choix "site sans images".
const city = site()

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = `${city.brand} — ${city.copy.accroche} ${city.inCity}`

export default function OpengraphImage() {
  const c = site()
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: `linear-gradient(135deg, ${c.brandColor} 0%, ${c.brandColorDark} 100%)`,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, opacity: 0.85 }}>
          {c.dept} · {c.copy.metierPluriel}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 700,
            marginTop: 24,
            lineHeight: 1.1,
          }}
        >
          {c.copy.accroche} {c.inCity}
        </div>
        <div style={{ display: "flex", fontSize: 40, marginTop: 30 }}>
          Devis gratuit · {c.phoneDisplay}
        </div>
      </div>
    ),
    { ...size }
  )
}
