import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  const city = site()
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `https://${city.domain}/sitemap.xml`,
  }
}
