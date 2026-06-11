import { readFileSync, writeFileSync } from 'fs';

const FILES = [
  'src/config/messages/potentials.ts',
  'src/config/messages/ranks.ts',
  'src/config/messages/legacies.ts',
  'src/config/messages/culturesConceptsCults.ts',
  'src/config/messages/properties.ts',
];

// Section headers to bold and separate with double <br/>
const HEADERS = ['CONDITION', 'EFFET', 'RÈGLES', 'ÉQUIPEMENT', 'BONUS', 'HÉRITAGE', 'INCONVÉNIENT', 'ACTION', 'RÉACTION', 'COMBINAISON', 'SPÉCIALITÉ'];

// Stat abbreviations (standalone word boundary)
const STATS = ['PHY', 'AGI', 'CHA', 'INT', 'PSY', 'INS'];

// Historiques (uppercase, as they appear in rank/condition lines)
const HISTORIQUES = ['ALLIÉS', 'RENOMMÉE', 'SECRETS', 'AUTORITÉ', 'RESSOURCES', 'RÉSEAU', 'FOI', 'VOLONTÉ', 'CONCENTRATION', 'PULSIONS'];

function transformDescription(desc) {
  // Skip already-formatted descriptions
  if (desc.includes('<b>')) return desc;

  let s = desc;

  // 1. Section headers: normalize breaks then bold + double-break before each
  // First, normalize any existing multiple <br/> sequences before headers
  for (const h of HEADERS) {
    s = s.replace(new RegExp(`(<br/>)+(?=${h} :)`, 'g'), '<br/>');
  }
  for (const h of HEADERS) {
    // After a <br/>
    s = s.replace(new RegExp(`<br/>(${h} :)`, 'g'), `<br/><br/><b>${h}</b> :`);
    // At string start
    s = s.replace(new RegExp(`^(${h}) :`, ''), `<b>${h}</b> :`);
  }

  // 2. Stat+skill combos: PHY+Force, INS+Dressage, etc.
  s = s.replace(/\b(PHY|AGI|CHA|INT|PSY|INS)\+([A-Za-zÀ-ž]+)/g, '<b>$1+$2</b>');

  // 3. Standalone stat abbreviations (followed by space, +, or end)
  for (const stat of STATS) {
    s = s.replace(new RegExp(`\\b${stat}\\b(?!\\+)`, 'g'), `<b>${stat}</b>`);
  }

  // 4. Dice modifiers: +1D, -2D, +3D (uppercase D, no digit after)
  s = s.replace(/([+-]\d+D)\b/g, '<b>$1</b>');

  // 5. Trigger notation: (2) déclencheurs, (1) déclencheur
  s = s.replace(/\((\d+)\) (déclencheurs?)/g, '<b>($1) $2</b>');

  // 6. Uppercase historiques as game stats
  for (const h of HISTORIQUES) {
    s = s.replace(new RegExp(`\\b${h}\\b`, 'g'), `<b>${h}</b>`);
  }

  return s;
}

// Extract and replace all Description template literals
function processFile(filePath) {
  let source = readFileSync(filePath, 'utf8');
  let count = 0;

  // Match: key: `...content...`
  source = source.replace(/(\w+Description:\s*`)([^`]+)(`)/g, (match, prefix, content, suffix) => {
    const transformed = transformDescription(content);
    if (transformed !== content) count++;
    return prefix + transformed + suffix;
  });

  writeFileSync(filePath, source, 'utf8');
  console.log(`${filePath}: ${count} descriptions formatted`);
}

for (const file of FILES) {
  processFile(file);
}
