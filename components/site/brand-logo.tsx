import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

// LE système de marque du site. Une seule source de vérité pour le glyphe :
// BrandMark dessine EXACTEMENT la même figure que le favicon (app/icon.tsx) —
// c'est la règle « le favicon et le logo doivent matcher » (Alexandre, 29/07).
// BrandLogo assemble le glyphe + un VRAI logo texte, composé dans la police de
// titrage du site — pas un simple nom en gras.

export function BrandMark({ className }: { className?: string }) {
  const c = site()
  const style = c.theme.logo.faviconStyle

  // Lettre pleine sur fond de marque (Nantes).
  if (style === "initial") {
    return (
      <svg viewBox="0 0 64 64" className={cn("shrink-0", className)} aria-hidden>
        <rect width="64" height="64" rx="10" fill={c.brandColor} />
        <text
          x="32"
          y="46"
          textAnchor="middle"
          fontSize="40"
          fontWeight="800"
          fontFamily="inherit"
          fill="#fff"
        >
          {c.city[0]}
        </text>
      </svg>
    )
  }

  // Monogramme encadré sur fond clair (Bordeaux).
  if (style === "monogramme") {
    return (
      <svg viewBox="0 0 64 64" className={cn("shrink-0", className)} aria-hidden>
        <rect width="64" height="64" fill="#f8fafc" />
        <rect x="3" y="3" width="58" height="58" fill="none" stroke={c.brandColor} strokeWidth="6" />
        <text
          x="32"
          y="45"
          textAnchor="middle"
          fontSize="34"
          fontWeight="700"
          fontFamily="inherit"
          fill={c.brandColor}
        >
          {c.city[0]}
        </text>
      </svg>
    )
  }

  // Feuille seule (Rennes).
  if (style === "feuille") {
    return (
      <svg viewBox="0 0 64 64" className={cn("shrink-0", className)} aria-hidden>
        <rect width="64" height="64" rx="32" fill={c.brandColor} />
        <path
          d="M18 40 C18 26 27 17 41 17 C41 31 32 40 18 40 Z"
          fill="#f8fafc"
        />
        <path
          d="M18 40 L14 50"
          stroke="#f8fafc"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  // Arbre penché par le vent (Brest).
  if (style === "arbre-vent") {
    return (
      <svg viewBox="0 0 64 64" className={cn("shrink-0", className)} aria-hidden>
        <rect width="64" height="64" rx="14" fill={c.brandColor} />
        <circle cx="35" cy="23" r="9" fill="#f8fafc" />
        <circle cx="45" cy="25" r="7" fill="#f8fafc" />
        <circle cx="25" cy="26" r="6" fill="#f8fafc" />
        <rect x="24" y="28" width="5" height="24" rx="2.5" fill="#f8fafc" transform="rotate(18 26.5 40)" />
        <rect x="8" y="24" width="12" height="3" rx="1.5" fill="#f8fafc" opacity="0.7" />
        <rect x="5" y="33" width="9" height="3" rx="1.5" fill="#f8fafc" opacity="0.45" />
      </svg>
    )
  }

  // Souche de cheminée et fumée (Castres). Créé le 04/08/2026 : le catalogue
  // n'offrait que des glyphes d'arbre, de lettre ou de conduite, et recolorer un
  // pictogramme déjà pris est l'empreinte de réseau la plus lisible qui soit.
  if (style === "souche") {
    return (
      <svg viewBox="0 0 64 64" className={cn("shrink-0", className)} aria-hidden>
        <rect width="64" height="64" rx="16" fill={c.brandColor} />
        {/* la souche : corps du conduit + chapeau débordant */}
        <rect x="20" y="34" width="24" height="20" fill="#f8fafc" />
        <rect x="15" y="28" width="34" height="7" rx="2" fill="#f8fafc" />
        {/* deux volutes de fumée, décalées */}
        <path d="M27 24 C27 19 33 19 33 14" fill="none" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        <path d="M38 24 C38 20 43 20 43 16" fill="none" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      </svg>
    )
  }

  // Arbre à houppier rond (Pau — le glyphe d'origine du portefeuille).
  return (
    <svg viewBox="0 0 64 64" className={cn("shrink-0", className)} aria-hidden>
      <rect width="64" height="64" rx="14" fill={c.brandColor} />
      <circle cx="32" cy="22" r="10" fill="#ecfdf5" />
      <circle cx="23" cy="28" r="8" fill="#ecfdf5" />
      <circle cx="41" cy="28" r="8" fill="#ecfdf5" />
      <rect x="29.5" y="31" width="5" height="18" rx="2.5" fill="#ecfdf5" />
    </svg>
  )
}

// Le logo texte. `sombre` inverse les couleurs pour les fonds foncés (footer).
export function BrandLogo({
  sombre = false,
  markClassName = "size-9",
}: {
  sombre?: boolean
  markClassName?: string
}) {
  const c = site()
  const wordmark = c.theme.logo.wordmark ?? "inline"

  // Logo empilé (Brest) : « ÉLAGAGE » en amorce espacée, la ville en gros
  // caractères de titrage — composition d'affiche, pas une ligne de texte.
  if (wordmark === "empile") {
    const [premier, ...reste] = c.brand.split(" ")
    return (
      <span className="flex items-center gap-2.5">
        <BrandMark className={markClassName} />
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-heading text-[10px] font-semibold tracking-[0.34em] uppercase",
              sombre ? "text-white/60" : "text-brand-700"
            )}
          >
            {premier}
          </span>
          <span
            className={cn(
              "mt-0.5 font-heading text-lg font-bold tracking-wide uppercase",
              sombre ? "text-white" : "text-brand-950"
            )}
          >
            {reste.join(" ")}
          </span>
        </span>
      </span>
    )
  }

  // Logo deux lignes serif (Bordeaux) : la ville en grande italique de
  // titrage, le métier en dessous en petites capitales espacées.
  if (wordmark === "serif") {
    const [premier, ...reste] = c.brand.split(" ")
    return (
      <span className="flex items-center gap-3">
        <BrandMark className={markClassName} />
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-heading text-lg font-bold tracking-tight",
              sombre ? "text-white" : "text-brand-950"
            )}
          >
            {reste.join(" ")}
          </span>
          <span
            className={cn(
              "mt-1 text-[10px] font-semibold tracking-[0.3em] uppercase",
              sombre ? "text-white/60" : "text-brand-700"
            )}
          >
            {premier}
          </span>
        </span>
      </span>
    )
  }

  // Logo en ligne : glyphe + nom dans la police de titrage du site.
  return (
    <span className="flex items-center gap-2.5">
      <BrandMark className={markClassName} />
      <span
        className={cn(
          "font-heading text-[16px] leading-tight font-bold tracking-tight",
          sombre ? "text-white" : "text-brand-950"
        )}
      >
        {c.brand}
      </span>
    </span>
  )
}
