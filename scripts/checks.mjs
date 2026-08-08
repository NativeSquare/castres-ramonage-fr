// Porte unique avant tout build. Bloquante et déterministe : elle enchaîne les
// quatre contrôles et s'arrête au premier échec. Branchée en `prebuild`, donc un
// site non conforme ne PEUT PAS partir en production.
//
//   1. seo-lint      (local)   — structure des pages : titles, liens, FAQ, placeholders
//   2. antispam-lint (factory) — passé du domaine, tunnel, destination réelle, faux avis
//   3. design-lint   (factory) — unicité visuelle dans le portefeuille
//   4. portfolio-dup (factory) — contenu recyclé d'un autre site du portefeuille
//
// Usage : node scripts/checks.mjs [--write-fingerprint] [--skip-network]
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const FACTORY = resolve(ROOT, '..', 'rank-factory');

const args = process.argv.slice(2);
const WRITE = args.includes('--write-fingerprint');
const SKIP_NET = args.includes('--skip-network');

const CONFIG = join(ROOT, 'site.config.ts');
if (!existsSync(CONFIG)) {
  console.error('✗ site.config.ts absent — 1 repo = 1 site, la config est à la racine.');
  process.exit(1);
}
const domain = (readFileSync(CONFIG, 'utf8').match(/domain:\s*"([^"]+)"/) || [])[1];
if (!domain) { console.error('✗ champ `domain` introuvable dans site.config.ts'); process.exit(1); }
// rank-factory absent : c'est le cas NORMAL sur le serveur de build Vercel, qui ne
// clone que le dépôt du site. Bloquer là revenait à rendre le modèle « 1 repo par
// site » indéployable — trou trouvé le 31/07/2026, au premier build de
// demenageur-a-caen.fr. Les trois contrôles inter-sites n'ont de toute façon rien à
// comparer sans le socle : ils sont sautés, bruyamment, jamais en silence.
// La porte qui compte reste locale : `npm run checks` avant de pousser.
const SEUL = !existsSync(FACTORY);
if (SEUL) {
  console.warn(`⚠ rank-factory introuvable à ${FACTORY}`);
  console.warn('  Les 3 contrôles inter-sites (antispam, design, duplication) sont SAUTÉS.');
  console.warn('  Attendu sur un serveur de build ; en local, cloner NativeSquare/rank-factory à côté.');
}

const etapes = [
  ['seo-lint (structure des pages)', [join(ROOT, 'scripts', 'seo-lint.mjs')]],
  ...(SEUL ? [] : [
    ['antispam-lint (politiques Google)', [join(FACTORY, 'lint', 'antispam-lint.mjs'), domain, CONFIG, ...(SKIP_NET ? ['--offline'] : [])]],
    ['design-lint (unicité visuelle)', [join(FACTORY, 'lint', 'design-lint.mjs'), domain]],
    ['portfolio-dup (contenu unique)', [join(FACTORY, 'lint', 'portfolio-dup.mjs'), domain, CONFIG, ...(WRITE ? ['--write'] : [])]],
  ]),
];

console.log(`\n── Contrôles bloquants — ${domain} ──\n`);
for (const [i, [nom, argv]] of etapes.entries()) {
  console.log(`[${i + 1}/${etapes.length}] ${nom}`);
  const r = spawnSync('node', argv, { stdio: 'inherit', cwd: ROOT });
  if (r.status !== 0) {
    console.error(`\n✗ BUILD REFUSÉ — échec sur : ${nom}\n`);
    process.exit(1);
  }
  console.log('');
}
console.log(`✓ ${domain} : les ${etapes.length} contrôles passent, build autorisé.\n`);
