import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

// Favicon généré par ville — UN GLYPHE PAR SITE (city.theme.logo.faviconStyle),
// jamais le même pictogramme recoloré : dans une rangée d'onglets, un motif
// répété est l'empreinte de réseau la plus visible qui soit.
export const size = { width: 64, height: 64 }
export const contentType = "image/png"

const CLAIR = "#f8fafc"

export default function Icon() {
  const c = site()
  const style = c.theme.logo.faviconStyle

  // Lettre pleine page sur fond de marque (Nantes).
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
            background: c.brandColor,
            borderRadius: 10,
            color: "#fff",
            fontSize: 44,
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

  // Monogramme éditorial (Bordeaux) : fond clair, cadre épais, lettre de
  // marque. Volontairement l'inverse chromatique de « initial ».
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
            border: `6px solid ${c.brandColor}`,
            color: c.brandColor,
            fontSize: 38,
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

  // Feuille seule (Rennes) : carré à deux angles opposés très arrondis,
  // pivoté — la silhouette classique d'une feuille, avec son pétiole.
  if (style === "feuille") {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: c.brandColor,
            borderRadius: 32,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 17,
              top: 13,
              width: 30,
              height: 30,
              background: CLAIR,
              borderRadius: "0 85% 0 85%",
              transform: "rotate(-45deg)",
            }}
          />
          {/* pétiole */}
          <div
            style={{
              position: "absolute",
              left: 30,
              top: 40,
              width: 4,
              height: 13,
              borderRadius: 2,
              background: CLAIR,
              transform: "rotate(35deg)",
            }}
          />
        </div>
      ),
      size
    )
  }

  // Arbre penché par le vent (Brest) : houppier balayé sous le vent, tronc
  // oblique, deux traits de rafale côté au vent.
  if (style === "arbre-vent") {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: c.brandColor,
            borderRadius: 14,
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", left: 26, top: 14, width: 18, height: 18, borderRadius: 9999, background: CLAIR }} />
          <div style={{ position: "absolute", left: 38, top: 18, width: 14, height: 14, borderRadius: 9999, background: CLAIR }} />
          <div style={{ position: "absolute", left: 19, top: 20, width: 12, height: 12, borderRadius: 9999, background: CLAIR }} />
          {/* tronc penché */}
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 28,
              width: 5,
              height: 24,
              borderRadius: 2.5,
              background: CLAIR,
              transform: "rotate(18deg)",
            }}
          />
          {/* rafales */}
          <div style={{ position: "absolute", left: 8, top: 24, width: 12, height: 3, borderRadius: 2, background: CLAIR, opacity: 0.7 }} />
          <div style={{ position: "absolute", left: 5, top: 33, width: 9, height: 3, borderRadius: 2, background: CLAIR, opacity: 0.45 }} />
        </div>
      ),
      size
    )
  }

  // Souche de cheminée et fumée (Castres). Composé en div : le moteur de rendu
  // d'ImageResponse ne connaît pas les chemins SVG. Même figure que BrandMark.
  if (style === "souche") {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: c.brandColor,
            borderRadius: 16,
            position: "relative",
          }}
        >
          {/* corps du conduit */}
          <div style={{ position: "absolute", left: 20, top: 34, width: 24, height: 20, background: CLAIR }} />
          {/* chapeau débordant */}
          <div style={{ position: "absolute", left: 15, top: 28, width: 34, height: 7, borderRadius: 2, background: CLAIR }} />
          {/* deux volutes de fumée : quarts de cercle bordés, décalés */}
          <div
            style={{
              position: "absolute", left: 27, top: 14, width: 6, height: 10,
              borderRight: `4px solid ${CLAIR}`, borderTop: `4px solid ${CLAIR}`,
              borderTopRightRadius: 8, opacity: 0.8,
            }}
          />
          <div
            style={{
              position: "absolute", left: 38, top: 16, width: 5, height: 8,
              borderRight: `4px solid ${CLAIR}`, borderTop: `4px solid ${CLAIR}`,
              borderTopRightRadius: 7, opacity: 0.5,
            }}
          />
        </div>
      ),
      size
    )
  }

  // Arbre à houppier rond (Pau — le glyphe d'origine).
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: c.brandColor,
          borderRadius: 14,
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 22, top: 12, width: 20, height: 20, borderRadius: 9999, background: "#ecfdf5" }} />
        <div style={{ position: "absolute", left: 15, top: 20, width: 16, height: 16, borderRadius: 9999, background: "#ecfdf5" }} />
        <div style={{ position: "absolute", left: 33, top: 20, width: 16, height: 16, borderRadius: 9999, background: "#ecfdf5" }} />
        <div style={{ position: "absolute", left: 29.5, top: 31, width: 5, height: 18, borderRadius: 2.5, background: "#ecfdf5" }} />
      </div>
    ),
    size
  )
}
