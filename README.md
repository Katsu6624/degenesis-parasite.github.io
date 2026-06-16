# Parasite : Character Editor

🔗 **[Try it live](https://katsu6624.github.io/degenesis-parasite.github.io/)**

_Parasite_ is a character editor for **Katharsys & Artefacts**, the rule system used by the tabletop roleplaying game [Degenesis][degenesis]. Use it to create new characters, browse and edit those you previously made, preview their character sheet and inventory, export a printable/editable PDF, or share a character with your friends or GM via a link.

Available in **French, English and German**.

## Features

- Full character creation flow (Culture / Concept / Cult / Clan, attributes, skills, origins, Potentials, Legacies, ranks…)
- Three editor modes: Strict, Normal, and Expert (no limits, manual Dinars entry)
- Inventory management with PDF/PDF-A weapon, armor and equipment catalog
- Character sheet preview, printable & editable PDF export
- Share a character with a read-only link
- Characters are saved locally in your browser (no account, no server-side storage)
- Optional ambient background music

## Development

Working on this application requires the following:

- `nodejs` 18.x
- `npm`

In order to get to work, run:

```
npm install
```

You can run the tests with

```
npm run test:unit
```

and trigger a production build with

```
npm run build
```

## Running locally

The local development server may be started with

```
npm run dev
```

## Credits

- **Diskordanz** — developer who created the original codebase this project is built on ([Noret][diskordanz])
- **Miokido** — co-developer
- **Katsu** — developer, French translation

## Copyright notice

_Parasite_ is a community creation for the tabletop role playing game [Degenesis®][degenesis]. Degenesis® is a trademark of [SIXMOREVODKA® Studio GmbH][smv]. All rights reserved. This project is not affiliated with SIXMOREVODKA Studio GmbH.

_Parasite_ is a French fork of the _Noret_ project by [Diskordanz][diskordanz].

[degenesis]: https://degenesis.com
[smv]: https://www.sixmorevodka.com
[diskordanz]: https://github.com/diskordanz
