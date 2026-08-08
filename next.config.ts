import type { NextConfig } from "next";

// Un dossier de build PAR VILLE quand NEXT_BUILD_DIR est fourni.
//
// Pourquoi : Next 16 refuse deux `next dev` dans le même répertoire, et un
// build unique écrase le précédent. Avec un distDir par ville, on peut builder
// les cinq sites puis les servir simultanément sur cinq ports — c'est ce qui
// permet de COMPARER les designs avant toute mise en ligne (règle : exploration
// locale d'abord, Alexandre tranche, on déploie ensuite).
//
// Sans la variable, comportement standard (.next) : Vercel n'est pas impacté.
const nextConfig: NextConfig = {
  ...(process.env.NEXT_BUILD_DIR ? { distDir: process.env.NEXT_BUILD_DIR } : {}),
};

export default nextConfig;
