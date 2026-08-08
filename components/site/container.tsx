import { cn } from "@/lib/utils"

// Conteneur unique du site : MÊME padding horizontal (px-5 sm:px-6 lg:px-8) sur
// TOUTES les sections. Tout est centré (mx-auto) sur le même axe vertical.
// `prose` = colonne de lecture étroite (texte long), centrée elle aussi → sur une
// page "colonne unique" (service, contact, zone) tout s'aligne au centre.
export function Container({
  className,
  prose = false,
  ...props
}: React.ComponentProps<"div"> & { prose?: boolean }) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        prose ? "max-w-3xl" : "max-w-6xl",
        className
      )}
      {...props}
    />
  )
}
