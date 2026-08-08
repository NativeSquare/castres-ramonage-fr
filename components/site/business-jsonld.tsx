import { site } from "@/lib/site"
import { JsonLd } from "@/components/site/json-ld"

// Nœud LocalBusiness rendu sur TOUTES les pages (via le layout racine) avec un
// @id stable. Ça permet aux schémas Service des pages métier de référencer le
// prestataire par @id sans nœud orphelin, et donne à chaque page (zone, contact…)
// le graphe local NAP/areaServed.
export function BusinessJsonLd() {
  const city = site()

  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `https://${city.domain}/#business`,
    name: city.brand,
    description: city.hero.subtitle,
    url: `https://${city.domain}`,
    ...(city.phoneDisplay ? { telephone: city.phoneDisplay } : {}),
    ...(city.email ? { email: city.email } : {}),
    priceRange: "€€",
    areaServed: [city.city, ...city.local.towns].map((t) => ({
      "@type": "City",
      name: t,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: city.city,
      postalCode: city.postalCode,
      addressRegion: city.deptCode,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.geo.lat,
      longitude: city.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "19:00",
    },
  }

  return <JsonLd data={data} />
}
