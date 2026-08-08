import { Resend } from "resend"
import { site } from "@/lib/site"

// Route serveur qui reçoit un lead (formulaire de contact OU estimateur) et
// envoie le(s) email(s) via Resend. La clé API reste 100% côté serveur.
//   - Estimateur : 2 emails -> 1 au PROSPECT (son estimation, HTML) + 1 à
//     l'entreprise (notif de lead). L'estimation n'est JAMAIS affichée sur le
//     site : c'est ce qui pousse le prospect à laisser son vrai email.
//   - Formulaire de contact : 1 email à l'entreprise.
// Config via variables d'env : RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL.

function esc(s: string) {
  return s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string
  )
}

// Email d'estimation envoyé au prospect. HTML "bulletproof" : tables + styles
// inline + polices web-safe, compatible Gmail / Outlook / Apple Mail / mobiles.
function estimateHtml(o: {
  city: ReturnType<typeof site>
  low: number
  high: number
  intervention?: string
  taille?: string
  quantite?: string
  acces?: string
}) {
  const { city, low, high } = o
  const rows = (
    [
      [site().estimator?.labels?.intervention ?? "Intervention", o.intervention],
      [site().estimator?.labels?.size ?? "Taille", o.taille],
      [site().estimator?.labels?.quantity ?? "Nombre", o.quantite],
      [site().estimator?.labels?.access ?? "Accès", o.acces],
    ] as [string, string | undefined][]
  )
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 0;color:#64748b;font-size:14px;font-family:Arial,Helvetica,sans-serif;">${esc(
          k
        )}</td><td align="right" style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">${esc(
          v as string
        )}</td></tr>`
    )
    .join("")

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;">
<tr><td style="background:#047857;padding:22px 32px;font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;color:#ffffff;">${esc(
    city.brand
  )}</td></tr>
<tr><td style="padding:30px 32px 0;font-family:Arial,Helvetica,sans-serif;">
<h1 style="margin:0;font-size:21px;line-height:1.3;color:#0f172a;">Votre estimation${
    o.intervention ? " pour " + esc(o.intervention.toLowerCase()) : ""
  } ${esc(city.inCity)}</h1>
<p style="margin:10px 0 0;font-size:14px;line-height:1.5;color:#475569;">Merci pour votre demande. Voici une première fourchette de prix indicative pour votre projet :</p>
</td></tr>
<tr><td style="padding:18px 32px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:10px;"><tr><td align="center" style="padding:22px;font-family:Arial,Helvetica,sans-serif;">
<div style="font-size:12px;color:#047857;font-weight:bold;text-transform:uppercase;letter-spacing:.5px;">Fourchette estimative</div>
<div style="font-size:34px;font-weight:bold;color:#064e3b;padding-top:6px;">${Math.round(
    low
  )} &ndash; ${Math.round(high)} &euro;</div>
</td></tr></table>
</td></tr>
${
  rows
    ? `<tr><td style="padding:22px 32px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>`
    : ""
}
<tr><td style="padding:22px 32px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;"><tr><td style="padding:14px 16px;font-size:13px;line-height:1.55;color:#92400e;font-family:Arial,Helvetica,sans-serif;">
<strong>Important :</strong> ceci est une estimation indicative, basée sur des fourchettes moyennes. Le <strong>devis définitif &mdash; gratuit et sans engagement &mdash;</strong> est établi après un échange téléphonique ou une visite, car le prix réel dépend des contraintes du chantier. ${site().estimator?.disclaimer ?? ""}
</td></tr></table>
</td></tr>
<tr><td align="center" style="padding:26px 32px 6px;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" style="background:#047857;border-radius:8px;">
<a href="${esc(
    city.phoneHref
  )}" style="display:inline-block;padding:14px 26px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:#ffffff;text-decoration:none;">Obtenir mon devis précis &mdash; ${esc(
    city.phoneDisplay
  )}</a>
</td></tr></table>
</td></tr>
<tr><td align="center" style="padding:8px 32px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#475569;">ou répondez simplement à cet email.</td></tr>
<tr><td style="padding:26px 32px 30px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#94a3b8;line-height:1.5;">
${esc(city.brand)} &mdash; ${site().nicheDe.replace(/^d./, "")} ${esc(
    city.inCity
  )} et dans le ${esc(city.dept)}.<br>
Vous recevez cet email car vous avez demandé une estimation sur ${esc(city.domain)}.
</td></tr>
</table>
</td></tr></table>
</body></html>`
}

export async function POST(req: Request) {
  let data: Record<string, string>
  try {
    data = await req.json()
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 })
  }

  const nom = (data.nom || "").trim()
  const email = (data.email || "").trim()
  const telephone = (data.telephone || "").trim()
  const commune = (data.commune || "").trim()
  const message = (data.message || "").trim()
  const source = (data.source || "Formulaire").trim()

  // Nom + au moins un moyen de recontact.
  if (!nom || (!email && !telephone)) {
    return Response.json({ ok: false, error: "missing_fields" }, { status: 422 })
  }

  const key = process.env.RESEND_API_KEY
  const to = process.env.LEAD_TO_EMAIL
  const from = process.env.LEAD_FROM_EMAIL || `${site().brand} <onboarding@resend.dev>`
  if (!key || !to) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 })
  }

  const city = site()
  const isEstimator = source === "Estimateur en ligne"
  const low = Number(data.estimateLow)
  const high = Number(data.estimateHigh)
  const hasEstimate =
    isEstimator && !!email && Number.isFinite(low) && Number.isFinite(high) && high > 0

  const resend = new Resend(key)

  // 1) Notification entreprise (toujours) — texte simple.
  const subject = `Nouveau lead ${city.brand} — ${commune || city.city}`
  const body = [
    `Source : ${source}`,
    `Nom : ${nom}`,
    telephone && `Téléphone : ${telephone}`,
    email && `Email : ${email}`,
    commune && `Commune : ${commune}`,
    hasEstimate &&
      `Estimation envoyée au prospect : ${Math.round(low)} – ${Math.round(high)} €`,
    "",
    message || "(pas de message)",
  ]
    .filter(Boolean)
    .join("\n")

  let businessError: unknown = null
  try {
    const r = await resend.emails.send({ from, to, replyTo: email || undefined, subject, text: body })
    businessError = r.error
  } catch (e) {
    businessError = e
    console.error("[lead] business send exception:", e)
  }

  // 2) Email d'estimation au PROSPECT (estimateur uniquement).
  let prospectError: unknown = null
  if (hasEstimate) {
    try {
      const r = await resend.emails.send({
        from,
        to: email,
        replyTo: to,
        subject: `Votre estimation${
          data.interventionLabel ? " pour " + data.interventionLabel.toLowerCase() : ""
        } ${city.inCity}`,
        html: estimateHtml({
          city,
          low,
          high,
          intervention: data.interventionLabel,
          taille: data.tailleLabel,
          quantite: data.quantiteLabel,
          acces: data.accesLabel,
        }),
      })
      prospectError = r.error
    } catch (e) {
      prospectError = e
      console.error("[lead] prospect send exception:", e)
    }
  }

  // Email critique : pour l'estimateur c'est celui du prospect (sinon il n'a
  // rien reçu) ; pour le formulaire c'est la notif entreprise.
  const criticalError = isEstimator
    ? hasEstimate
      ? prospectError
      : businessError
    : businessError

  if (criticalError) {
    console.error("[lead] critical send error:", JSON.stringify(criticalError))
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 })
  }
  return Response.json({ ok: true })
}
