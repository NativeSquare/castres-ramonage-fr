"use client"

import { site } from "@/lib/site"

import { useState, type FormEvent } from "react"
import { Phone, MailCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// Estimateur de prix — lead magnet. L'estimation n'est PAS affichée à l'écran :
// elle est envoyée UNIQUEMENT par email (c'est ce qui pousse le prospect à
// laisser son vrai email). À la soumission, /api/lead envoie 2 mails : un au
// prospect (son estimation) + un à l'entreprise (notif de lead).
// Barème ET libellés propres au métier : ils vivent dans site.config.ts, jamais ici
// (sinon tous les sites du portefeuille afficheraient le même formulaire — duplication
// mécanique, et un site de déménagement demanderait la taille des arbres).
const EST = site().estimator
const INTERVENTIONS: Record<string, { label: string; base: [number, number] }> =
  EST?.interventions ?? {}
const SIZES: Record<string, { label: string; f: number }> = EST?.sizes ?? {}
const QTYS: Record<string, { label: string; f: number }> = EST?.quantities ?? {}
const ACCESS: Record<string, { label: string; f: number }> = EST?.access ?? {}
const L = {
  intervention: EST?.labels?.intervention ?? "Type d'intervention",
  size: EST?.labels?.size ?? "Taille",
  quantity: EST?.labels?.quantity ?? "Nombre",
  access: EST?.labels?.access ?? "Accès",
}

const round10 = (n: number) => Math.round(n / 10) * 10
const selectCls =
  "h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"

export function Estimator({
  phoneDisplay,
  phoneHref,
  brand,
  consentement,
  boutonEnvoi,
}: {
  phoneDisplay: string
  phoneHref: string
  brand: string
  // Formulations propres à la ville : identiques d'un site à l'autre, elles
  // pèsent lourd dans le recouvrement mesuré sur le HTML rendu (29/07/2026).
  consentement: string
  boutonEnvoi: string
}) {
  const [submitting, setSubmitting] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [error, setError] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    if (!d.intervention) return setError("Choisissez un type d'intervention.")
    // L'email est obligatoire : c'est par là que part l'estimation.
    if (!d.email?.trim())
      return setError("Indiquez votre email — c'est là qu'on vous envoie votre estimation.")
    // Le téléphone est obligatoire : c'est par là que le devis se conclut.
    if (!d.telephone?.trim())
      return setError("Indiquez votre téléphone pour qu'on puisse vous rappeler.")
    if (!d.consent)
      return setError("Merci de cocher l'autorisation d'être recontacté.")
    setError("")

    const it = INTERVENTIONS[d.intervention]
    const sf = SIZES[d.taille]?.f ?? 1
    const qf = QTYS[d.quantite]?.f ?? 1
    const af = ACCESS[d.acces]?.f ?? 1
    const low = round10(it.base[0] * sf * qf * af)
    const high = round10(it.base[1] * sf * qf * af)

    const recap = `ESTIMATEUR — ${it.label} · taille ${SIZES[d.taille]?.label ?? "?"} · nombre ${QTYS[d.quantite]?.label ?? "?"} · accès ${ACCESS[d.acces]?.label ?? "?"}`

    setSubmitting(true)
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: (d.nom || "").trim() || "Lead estimateur",
          email: d.email,
          telephone: d.telephone,
          message: recap,
          source: "Estimateur en ligne",
          estimateLow: low,
          estimateHigh: high,
          interventionLabel: it.label,
          tailleLabel: SIZES[d.taille]?.label ?? "",
          quantiteLabel: QTYS[d.quantite]?.label ?? "",
          accesLabel: ACCESS[d.acces]?.label ?? "",
        }),
      })
      if (!res.ok) throw new Error()
      setSentTo(d.email.trim())
    } catch {
      setError(
        "Une erreur est survenue, votre estimation n'a pas pu être envoyée. Réessayez, ou appelez-nous directement."
      )
    } finally {
      setSubmitting(false)
    }
  }

  // Écran de confirmation — pas de prix affiché, l'estimation est dans le mail.
  if (sentTo) {
    return (
      <div className="rounded-2xl border border-brand-900/10 bg-card p-6 text-center text-foreground">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <MailCheck className="size-6" />
        </div>
        <p className="mt-4 font-heading text-lg font-bold text-brand-900">
          Votre estimation a été envoyée à l&apos;adresse email indiquée
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Vérifiez votre boîte de réception (et vos spams).
        </p>
        <p className="mx-auto mt-4 max-w-md rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
          ⚠️ Ceci est une <strong>simple estimation</strong>, basée sur des fourchettes
          moyennes. <strong>Le devis définitif — gratuit et sans engagement — est établi
          après un échange téléphonique ou une visite</strong>, car le prix réel dépend des
          contraintes du chantier. {EST?.disclaimer ?? ""}
        </p>
        {phoneHref && (
          <>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
              Pour aller plus vite vers un devis précis, appelez-nous&nbsp;:
            </p>
            <a
              href={phoneHref}
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-brand-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              <Phone className="size-4" />
              {phoneDisplay}
            </a>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-brand-900/10 bg-card p-6 text-foreground">
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="intervention">{L.intervention}</Label>
          <select id="intervention" name="intervention" className={selectCls} defaultValue="">
            <option value="" disabled>
              Choisir…
            </option>
            {Object.entries(INTERVENTIONS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="taille">{L.size}</Label>
          <select id="taille" name="taille" className={selectCls} defaultValue={Object.keys(SIZES)[0] ?? ""}>
            {Object.entries(SIZES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="quantite">{L.quantity}</Label>
          <select id="quantite" name="quantite" className={selectCls} defaultValue={Object.keys(QTYS)[0] ?? ""}>
            {Object.entries(QTYS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="acces">{L.access}</Label>
          <select id="acces" name="acces" className={selectCls} defaultValue={Object.keys(ACCESS)[0] ?? ""}>
            {Object.entries(ACCESS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="est-email">
            Email <span className="text-brand-700">*</span>
          </Label>
          <Input
            id="est-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="vous@email.fr"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="est-tel">
            Téléphone <span className="text-brand-700">*</span>
          </Label>
          <Input
            id="est-tel"
            name="telephone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="06 12 34 56 78"
          />
        </div>

        <label className="flex items-start gap-2.5 text-sm text-muted-foreground sm:col-span-2">
          <input
            type="checkbox"
            name="consent"
            value="oui"
            className="mt-0.5 size-4 shrink-0 accent-brand-700"
          />
          <span>
            {consentement.replace("{marque}", brand)}
          </span>
        </label>

        <div className="sm:col-span-2">
          <Button
            type="submit"
            disabled={submitting}
            className="h-11 bg-brand-700 px-6 text-base text-white hover:bg-brand-800"
          >
            {submitting ? "Envoi…" : boutonEnvoi}
          </Button>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Votre estimation vous est envoyée par email. Le devis définitif &mdash;
            gratuit et sans engagement &mdash; est donné après un appel ou une visite.
          </p>
        </div>
        {error && <p className="text-sm text-destructive sm:col-span-2">{error}</p>}
      </form>
    </div>
  )
}
