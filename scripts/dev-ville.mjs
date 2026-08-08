// Lance `next dev` sur UNE ville du portefeuille, sur son propre port.
//
// Pourquoi : NEXT_PUBLIC_CITY sélectionne le site servi, mais .claude/launch.json
// ne sait pas passer de variable d'environnement. Ce script fait l'intermédiaire,
// pour qu'on puisse ouvrir plusieurs villes côte à côte et comparer les designs
// AVANT toute mise en ligne (règle : exploration locale d'abord).
//
// Usage :  node scripts/dev-ville.mjs <ville> [port]
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');

// Ports par défaut, un par ville. La variable d'environnement PORT (posée par
// le lanceur de preview, autoPort) prime : elle évite tout conflit avec les
// serveurs `next start` de l'aperçu portefeuille qui occupent 3001-3005.
const PORTS = { pau: 3001, nantes: 3002, brest: 3003, bordeaux: 3004, rennes: 3005 };

const VILLE = process.argv[2];
const PORT = process.env.PORT ?? process.argv[3] ?? PORTS[VILLE];

if (!VILLE || !PORT) {
  console.error(`usage : node scripts/dev-ville.mjs <ville> [port]`);
  console.error(`villes connues : ${Object.keys(PORTS).join(', ')}`);
  process.exit(1);
}

console.log(`▶ ${VILLE} sur http://localhost:${PORT}`);

spawn(
  process.execPath,
  [join(RACINE, 'node_modules', 'next', 'dist', 'bin', 'next'), 'dev', RACINE, '-p', String(PORT)],
  { cwd: RACINE, stdio: 'inherit', env: { ...process.env, NEXT_PUBLIC_CITY: VILLE } }
).on('exit', code => process.exit(code ?? 0));
