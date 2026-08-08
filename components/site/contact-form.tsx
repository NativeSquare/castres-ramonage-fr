"use client"

import { site } from "@/lib/site"

import { useState, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// Formulaire de devis. Poste vers /api/lead (Resend, côté serveur) — le lead
// arrive par email. Pour ceux qui ne veulent / ne peuvent pas appeler.
export function ContactForm({
  communePlaceholder,
}: {
  communePlaceholder: string
}) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(
      new FormData(form).entries()
    ) as Record<string, string>

    if (!data.nom?.trim() || (!data.telephone?.trim() && !data.email?.trim())) {
      setStatus("error")
      setErrorMsg(
        "Indiquez au moins votre nom et un moyen de vous recontacter (téléphone ou email)."
      )
      return
    }

    setStatus("submitting")
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "Formulaire de contact" }),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
      setErrorMsg(
        "Une erreur est survenue. Réessayez, ou appelez-nous directement."
      )
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-6">
        <p className="font-medium text-brand-900">
          Votre demande a bien été envoyée ✅
        </p>
        <p className="mt-1 text-sm text-brand-800">
          On vous recontacte au plus vite. Pour une urgence, appelez-nous
          directement.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="nom">Nom</Label>
        <Input id="nom" name="nom" required autoComplete="name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="telephone">Téléphone</Label>
        <Input id="telephone" name="telephone" type="tel" autoComplete="tel" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="commune">Commune</Label>
        <Input id="commune" name="commune" placeholder={communePlaceholder} />
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="message">Votre demande</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder={site().copy.messagePlaceholder}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-11 bg-brand-700 px-6 text-base text-white hover:bg-brand-800"
        >
          {status === "submitting" ? "Envoi…" : "Envoyer ma demande"}
        </Button>
        <span className="text-xs text-muted-foreground">
          Un téléphone ou un email suffit pour qu&apos;on vous recontacte.
        </span>
      </div>
      {status === "error" && (
        <p className="text-sm text-destructive sm:col-span-2">{errorMsg}</p>
      )}
    </form>
  )
}
