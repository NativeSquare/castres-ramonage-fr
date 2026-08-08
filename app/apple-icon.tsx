import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

// Apple touch icon généré par ville (iOS applique son propre masque d'angles).
// Mêmes glyphes que app/icon.tsx, à l'échelle 180 (facteur ~2,8).
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

const CLAIR = "#f8fafc"

export default function AppleIcon() {
  const c = site()
  const style = c.theme.logo.faviconStyle
  const fond = `linear-gradient(135deg, ${c.brandColor} 0%, ${c.brandColorDark} 100%)`

  if (style === "initial") {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: fond,
            color: "#fff",
            fontSize: 118,
            fontWeight: 800,
            fontFamily: "sans-serif",
          }}
        >
          {c.city[0]}
        </div>
      ),
      size
    )
  }

  if (style === "monogramme") {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: CLAIR,
            border: `14px solid ${c.brandColor}`,
            color: c.brandColor,
            fontSize: 100,
            fontWeight: 700,
            fontFamily: "sans-serif",
          }}
        >
          {c.city[0]}
        </div>
      ),
      size
    )
  }

  if (style === "feuille") {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: fond,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 48,
              top: 36,
              width: 84,
              height: 84,
              background: CLAIR,
              borderRadius: "0 85% 0 85%",
              transform: "rotate(-45deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 85,
              top: 112,
              width: 11,
              height: 37,
              borderRadius: 6,
              background: CLAIR,
              transform: "rotate(35deg)",
            }}
          />
        </div>
      ),
      size
    )
  }

  if (style === "arbre-vent") {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: fond,
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", left: 73, top: 39, width: 51, height: 51, borderRadius: 9999, background: CLAIR }} />
          <div style={{ position: "absolute", left: 107, top: 50, width: 39, height: 39, borderRadius: 9999, background: CLAIR }} />
          <div style={{ position: "absolute", left: 53, top: 56, width: 34, height: 34, borderRadius: 9999, background: CLAIR }} />
          <div
            style={{
              position: "absolute",
              left: 67,
              top: 79,
              width: 14,
              height: 67,
              borderRadius: 7,
              background: CLAIR,
              transform: "rotate(18deg)",
            }}
          />
          <div style={{ position: "absolute", left: 22, top: 67, width: 34, height: 8, borderRadius: 5, background: CLAIR, opacity: 0.7 }} />
          <div style={{ position: "absolute", left: 14, top: 93, width: 25, height: 8, borderRadius: 5, background: CLAIR, opacity: 0.45 }} />
        </div>
      ),
      size
    )
  }

  // Souche de cheminée et fumée (Castres) — même figure qu'app/icon.tsx, échelle 180.
  if (style === "souche") {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: fond,
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", left: 56, top: 96, width: 68, height: 56, background: CLAIR }} />
          <div style={{ position: "absolute", left: 42, top: 79, width: 96, height: 20, borderRadius: 6, background: CLAIR }} />
          <div
            style={{
              position: "absolute", left: 76, top: 39, width: 17, height: 28,
              borderRight: `11px solid ${CLAIR}`, borderTop: `11px solid ${CLAIR}`,
              borderTopRightRadius: 23, opacity: 0.8,
            }}
          />
          <div
            style={{
              position: "absolute", left: 107, top: 45, width: 14, height: 22,
              borderRight: `11px solid ${CLAIR}`, borderTop: `11px solid ${CLAIR}`,
              borderTopRightRadius: 20, opacity: 0.5,
            }}
          />
        </div>
      ),
      size
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: fond,
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 62, top: 34, width: 56, height: 56, borderRadius: 9999, background: "#ecfdf5" }} />
        <div style={{ position: "absolute", left: 43, top: 56, width: 45, height: 45, borderRadius: 9999, background: "#ecfdf5" }} />
        <div style={{ position: "absolute", left: 92, top: 56, width: 45, height: 45, borderRadius: 9999, background: "#ecfdf5" }} />
        <div style={{ position: "absolute", left: 83, top: 87, width: 14, height: 51, borderRadius: 7, background: "#ecfdf5" }} />
      </div>
    ),
    size
  )
}
