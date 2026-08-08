import Link from "next/link"
import type { ReactNode } from "react"

// Rend les liens markdown [texte](/chemin) présents dans les textes du config
// ville. Liens internes (href commençant par "/") → <Link> ; externes → <a>.
// Le maillage interne contextuel se fait donc directement dans lib/cities/*.ts.
const MD_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g

export function richText(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  MD_LINK.lastIndex = 0

  while ((match = MD_LINK.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    const [, label, href] = match
    if (href.startsWith("/")) {
      nodes.push(
        <Link
          key={`${href}-${match.index}`}
          href={href}
          className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900"
        >
          {label}
        </Link>
      )
    } else {
      nodes.push(
        <a
          key={`${href}-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener"
          className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900"
        >
          {label}
        </a>
      )
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }
  return nodes
}

// Rend **gras** + liens markdown [texte](/chemin) dans une même chaîne.
export function rich(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i}>{part}</strong>
    ) : (
      <span key={i}>{richText(part)}</span>
    )
  )
}
