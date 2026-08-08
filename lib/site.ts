import type { Article, Service, SiteConfig } from "@/lib/types"
import { config } from "@/site.config"

// 1 repo = 1 site : plus de sélection par variable d'environnement.
export function site(): SiteConfig {
  return config
}
export function getService(slug: string): Service | undefined {
  return site().services.find((s) => s.slug === slug)
}
export function getServiceSlugs(): string[] {
  return site().services.map((s) => s.slug)
}
export function getArticle(slug: string): Article | undefined {
  return (site().articles ?? []).find((a) => a.slug === slug)
}
export function getArticleSlugs(): string[] {
  return (site().articles ?? []).map((a) => a.slug)
}
