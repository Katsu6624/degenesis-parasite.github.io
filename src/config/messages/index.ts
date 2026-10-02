import { culturesConceptsCults } from "./culturesConceptsCults";
import { messages } from "./messages";
import { sheet } from "./sheet";
import { properties } from "./properties";
import { ranks } from "./ranks";
import { potentials } from "./potentials";
import { clanNames } from "./clans/names";
import { clanRanks } from "./clans/ranks";
import { legacies } from "./legacies";
import { inventory } from "./inventory";
import { other } from "./other";
import { cultRelationships } from "./cultRelationships"
import { community } from "./community";
import { folders } from "./folders";
import { backup } from "./backup";

export default {
  de: {
    messages: messages.de,
    ...properties.de,
    culturesConceptsCults: culturesConceptsCults.de,
    ranks: { ...ranks.de, ...clanRanks.de },
    sheet: sheet.de,
    potentials: potentials.de,
    clans: clanNames.de,
    legacies: legacies.de,
    inventory: inventory.de,
    other: other.de,
    cultRelationships: cultRelationships.de,
    community: community.de,
    folders: folders.de,
    backup: backup.de,
  },
  en: {
    messages: messages.en,
    ...properties.en,
    culturesConceptsCults: culturesConceptsCults.en,
    ranks: { ...ranks.en, ...clanRanks.en },
    sheet: sheet.en,
    potentials: potentials.en,
    clans: clanNames.en,
    legacies: legacies.en,
    inventory: inventory.en,
    other: other.en,
    cultRelationships: cultRelationships.en,
    community: community.en,
    folders: folders.en,
    backup: backup.en,
  },
  fr: {
    messages: messages.fr,
    ...properties.fr,
    culturesConceptsCults: culturesConceptsCults.fr,
    ranks: { ...ranks.fr, ...clanRanks.fr },
    sheet: sheet.fr,
    potentials: potentials.fr,
    clans: clanNames.fr,
    legacies: legacies.fr,
    inventory: inventory.fr,
    other: other.fr,
    cultRelationships: cultRelationships.fr,
    community: community.fr,
    folders: folders.fr,
    backup: backup.fr,
  }
}
