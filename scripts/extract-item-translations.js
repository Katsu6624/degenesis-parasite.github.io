const fs = require('fs');
const content = fs.readFileSync('src/config/items/index.ts', 'utf8');
const lines = content.split('\n');

const translations = {};

for (const line of lines) {
  const idMatch = line.match(/id: '([^']+)'/);
  if (!idMatch) continue;
  const id = idMatch[1];
  const entry = {};

  // Match string fields, handling escaped single quotes
  function extractField(fieldName) {
    const re = new RegExp(fieldName + ": '((?:[^'\\\\]|\\\\.)*)'");
    const m = line.match(re);
    return m ? m[1] : null;
  }

  const name = extractField('name');
  const properties = extractField('properties');
  const description = extractField('description');
  const caliber = extractField('caliber');
  const magazine = extractField('magazine');

  if (name) entry.name = name;
  if (properties) entry.properties = properties;
  if (description) entry.description = description;
  if (caliber) entry.caliber = caliber;
  if (magazine) entry.magazine = magazine;

  translations[id] = entry;
}

console.log('Items found:', Object.keys(translations).length);

// Generate the TypeScript file
let output = `import type { ItemTranslation } from '../types'\n\n`;
output += `export const itemTranslationsEn: Record<string, ItemTranslation> = {\n`;

for (const [id, entry] of Object.entries(translations)) {
  output += `  '${id}': {\n`;
  for (const [key, val] of Object.entries(entry)) {
    const escaped = val.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
    output += `    ${key}: \`${escaped}\`,\n`;
  }
  output += `  },\n`;
}

output += `}\n`;

fs.mkdirSync('src/config/items/i18n', { recursive: true });
fs.writeFileSync('src/config/items/i18n/en.ts', output, 'utf8');
console.log('Written to src/config/items/i18n/en.ts');
