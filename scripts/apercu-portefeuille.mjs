// Construit puis sert TOUTES les villes du portefeuille en même temps, une par port.
//
// But : pouvoir ouvrir les cinq sites côte à côte dans le navigateur et juger la
// variété des designs AVANT toute mise en ligne. Aucun déploiement, aucun réseau
// sortant — que du localhost.
//
// Usage :
//   node scripts/apercu-portefeuille.mjs              build + serve toutes les villes
//   node scripts/apercu-portefeuille.mjs --sans-build  serve seulement (builds déjà faits)
//   node scripts/apercu-portefeuille.mjs brest rennes  se limite à ces villes
import { spawn, spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const NEXT = join(RACINE, 'node_modules', 'next', 'dist', 'bin', 'next');

// Doit rester aligné sur lib/cities/index.ts et sur .claude/launch.json.
const PORTS = { pau: 3001, nantes: 3002, brest: 3003, bordeaux: 3004, rennes: 3005 };

const argv = process.argv.slice(2);
const SANS_BUILD = argv.includes('--sans-build');
const demandees = argv.filter(a => !a.startsWith('--'));
const VILLES = demandees.length ? demandees : Object.keys(PORTS);

for (const v of VILLES) {
  if (!PORTS[v]) {
    console.error(`✗ ville inconnue : ${v} (connues : ${Object.keys(PORTS).join(', ')})`);
    process.exit(1);
  }
}

const env = v => ({ ...process.env, NEXT_PUBLIC_CITY: v, NEXT_BUILD_DIR: `.next-${v}` });

if (!SANS_BUILD) {
  for (const v of VILLES) {
    process.stdout.write(`⏳ build ${v}… `);
    const r = spawnSync(process.execPath, [NEXT, 'build', RACINE], {
      cwd: RACINE, env: env(v), stdio: ['ignore', 'pipe', 'pipe'],
    });
    if (r.status !== 0) {
      console.log('✗');
      process.stdout.write(String(r.stdout ?? '') + String(r.stderr ?? ''));
      process.exit(1);
    }
    console.log('✓');
  }
}

const enfants = [];
for (const v of VILLES) {
  enfants.push(spawn(process.execPath, [NEXT, 'start', RACINE, '-p', String(PORTS[v])], {
    cwd: RACINE, env: env(v), stdio: 'ignore',
  }));
}

console.log('\nPortefeuille servi en local :');
for (const v of VILLES) console.log(`  ${v.padEnd(9)} http://localhost:${PORTS[v]}`);
console.log('\nCtrl-C pour tout arrêter.');

const stop = () => { for (const e of enfants) e.kill(); process.exit(0); };
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
