import { Potential } from '@/config/potentials/potential'
import { Skills } from '@/config/properties'
import { atLeastSkill, either } from '@/config/requirements'
import { Anubians } from '.'

export const SekhmetsSlumber = new Potential(
  'sekhmetsSlumber',
  Anubians,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Entre dans un coma indiscernable de la mort pendant (4−niveau) jours. Se réveille sain. Cumulable avec Pitié d\'Anubis.']
)
export const NavelOfNefertem = new Potential(
  'navelOfNefertem',
  Anubians,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Résistance à la Vorace et à la catalyse : difficulté réduite de (1) par niveau.']
)
export const EyeOfHorus = new Potential(
  'eyeOfHorus',
  Anubians,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Sent les perturbations de l\'Onde à 100m/1km/10km selon niveau. +1 déclencheur par niveau contre Psychonautes, bêtes des spores et Léperos.']
)
export const MercyOfAnubis = new Potential(
  'mercyOfAnubis',
  Anubians,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Après mort par Traumatismes : combat pendant (1) round par niveau avant de succomber réellement. Armes gagnent la propriété Terrifiant (2×niveau).']
)
export const AmmitsFeast = new Potential(
  'ammitsFeast',
  Anubians,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['(2) déclencheurs → frénésie : +1D attaque et +1 dégâts par niveau et par round ; désactive Défense active. Réactiver chaque round : (2) déclencheurs + 1 Blessure dès round 2.']
)
export const GazeOfTheFate = new Potential(
  'gazeOfTheFate',
  Anubians,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['1 fois/mois : vision de l\'avenir selon niveau (secondes/minutes/heures) → +2D par niveau à l\'action entrevue.']
)
export const AncestralStare = new Potential(
  'ancestralStare',
  Anubians,
  [atLeastSkill(Skills.perception, 10)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['1 fois/jour : INS+Perception (6−niveau) pour recevoir un présage cryptique sur un événement futur.']
)
export const EmbraceOfApophis = new Potential(
  'embraceOfApophis',
  Anubians,
  [atLeastSkill(Skills.brawl, 6)],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['+1 Défense passive par niveau. Attaques ciblées à difficulté (+4−niveau) : Étourdissement (4) et Régularité (2DC) pour coups, Étourdissement (6) et Enchevêtrement (4) pour prises.']
)
export const TheDarkestHeart = new Potential(
  'theDarkestHeart',
  Anubians,
  [],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['(3) Égo + (3) rounds méditation → immunité aux influences Psychonautes pendant (niveau) rounds, puis +1 succès auto par niveau à Défense mentale pour le reste de la scène.']
)
export const ChillOfDeath = new Potential(
  'chillOfDeath',
  Anubians,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['Chaque Traumatisme reçu au combat : +1 dégâts à toutes les attaques Lutte et Corps à corps suivantes (maximum = niveau).']
)
export const Afterlife = new Potential(
  'afterlife',
  Anubians,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['1 fois/mois/niveau : entrer dans Sommeil de Sekhmet avec ≥1 Trauma → gagner XP = valeur de Concentration ou Pulsions.']
)
export const SoulDrain = new Potential(
  'soulDrain',
  Anubians,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Concentration : (1) Blessure → (1) Égo. Pulsions : (1) Égo → (1) Blessure guérie. Maximum (2×niveau) échanges par jour.']
)
export const CoilsOfSet = new Potential(
  'coilsOfSet',
  Anubians,
  [atLeastSkill(Skills.brawl, 6), atLeastSkill(Skills.perception, 6)],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['Coup ciblé PHY+Lutte (+4−niveau difficulté) → cible −1D par niveau à attaques et défenses pendant (niveau) rounds ; mouvement réduit.']
)
export const SobeksPatience = new Potential(
  'sobeksPatience',
  Anubians,
  [],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['Chaque round sans dépenser d\'Égo en Initiative : +1 au maximum d\'Égo dépensable au prochain round. Délai maximum = niveau de Potentiel.']
)
export const FortitudeOfOsiris = new Potential(
  'fortitudeOfOsiris',
  Anubians,
  [
    atLeastSkill(Skills.toughness, 8),
    either(atLeastSkill(Skills.faith, 8), atLeastSkill(Skills.willpower, 8))
  ],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['Peut retarder douleur et dégâts subis de (1) round par niveau (max 3), y compris les malus de Traumatismes.']
)

export const AnubianPotentials = [
  SekhmetsSlumber,
  NavelOfNefertem,
  EyeOfHorus,
  MercyOfAnubis,
  AmmitsFeast,
  GazeOfTheFate,
  AncestralStare,
  EmbraceOfApophis,
  TheDarkestHeart,
  ChillOfDeath,
  Afterlife,
  SoulDrain,
  CoilsOfSet,
  SobeksPatience,
  FortitudeOfOsiris
]
