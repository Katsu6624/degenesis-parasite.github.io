import { Potential } from '@/config/potentials/potential'
import { Origins, Skills } from '@/config/properties'
import { atLeastRank, atLeastRankLevel, eitherRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import { Apocalyptics } from '.'
import {
  Albatross,
  ApocalypticsRanks,
  Buzzard,
  Cuckoo,
  Owl,
  Phoenix,
  Raven
} from '../apocalyptics/ranks'

export const AllIn = new Potential(
  'allIn',
  Apocalyptics,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Sacrifice jusqu\'à (2×niveau) dés de Défense active → si défense réussit, la prochaine attaque obtient ce nombre en déclencheurs.']
)
export const CardOfDestiny = new Potential(
  'cardOfDestiny',
  Apocalyptics,
  [],
  [],
  [],
  [atLeastRankLevel(ApocalypticsRanks, 3)],
  undefined,
  Skills.faith,
  undefined,
  ['Prédire « où » et « qui » : si la situation exacte survient dans 10 jours → +niveau à tous jets CHA et PSY dans cette situation.']
)
export const CrowsNest = new Potential(
  'crowsNest',
  Apocalyptics,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['Pour la Nuée : dépenser (1) Égo par action → +1D par niveau à cette action.']
)
export const Mirror = new Potential(
  'mirror',
  Apocalyptics,
  [],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['Défense active avec ≥1 déclencheur active le Potentiel : +1 Défense passive par niveau vs cet ennemi. Peut copier et retourner ses Potentiels.']
)
export const BlackOmen = new Potential(
  'blackOmen',
  Apocalyptics,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Attaque mentale PSY+Dom +1D/niveau vs PSY+Foi : si victoire, malus permanent en dés = déclencheurs+1. Purification nécessaire pour le dissiper.']
)
export const ThousandWays = new Potential(
  'thousandWays',
  Apocalyptics,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Chaque déclencheur de Corps à corps inflige −1D à la Défense active adverse (max = niveau déclencheurs utilisables).']
)
export const FinalDestination = new Potential(
  'finalDestination',
  Apocalyptics,
  [],
  [],
  [],
  [eitherRank(atLeastRank(Raven), atLeastRank(Buzzard), atLeastRank(Albatross))],
  undefined,
  undefined,
  undefined,
  ['INS+Empathie +1D/niveau vs Défense mentale, (2) déclencheurs requis : cible perd (niveau) Égo + paralysie (niveau) rounds. +1D aux attaques mentales ultérieures contre elle.']
)
export const BadLuck = new Potential(
  'badLuck',
  Apocalyptics,
  [],
  [],
  [],
  [atLeastRank(Phoenix)],
  undefined,
  undefined,
  undefined,
  ['En présence du Phénix, les combattants ratant PSY+Volonté/Foi (4/5/6 selon niveau) obtiennent un échec critique dès que 1s = succès.']
)
export const AngelOfDeath = new Potential(
  'angelOfDeath',
  Apocalyptics,
  [],
  [],
  [],
  [atLeastRank(Owl)],
  Skills.focus,
  undefined,
  undefined,
  ['Attaques ciblées +1D par niveau. Si Égo dépensé pour Initiative et premier kill : récupère tous ces Égo.']
)
export const Mimicry = new Potential(
  'mimicry',
  Apocalyptics,
  [atLeastSkill(Skills.expression, 10), atLeastSkill(Skills.deception, 10)],
  [],
  [],
  [atLeastRank(Cuckoo)],
  undefined,
  undefined,
  undefined,
  ['Peut parfaitement imiter (niveau) Cultes distincts. +1 succès auto par niveau à PSY+Tromperie et PSY+Ruse pour ces imitations.']
)
export const Traffic = new Potential(
  'traffic',
  Apocalyptics,
  [],
  [],
  [atLeastOrigin(Origins.network, 4)],
  [],
  undefined,
  undefined,
  undefined,
  ['Peut échanger (1) Réseau contre (1) point dans n\'importe quel autre historique par niveau.']
)
export const FreeLikeABird = new Potential(
  'freeLikeABird',
  Apocalyptics,
  [],
  [],
  [],
  [atLeastRankLevel(ApocalypticsRanks, 2)],
  undefined,
  undefined,
  undefined,
  ['Peut changer de Rang pour un autre du même niveau sans remplir ses conditions, par niveau de Potentiel acquis.']
)
export const Climax = new Potential(
  'climax',
  Apocalyptics,
  [atLeastSkill(Skills.melee, 6), atLeastSkill(Skills.deception, 6)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Peut stocker jusqu\'à (2×niveau) dés bonus d\'Égo d\'Initiative pour des jets ultérieurs dans le même combat.']
)
export const HeavenOrHell = new Potential(
  'heavenOrHell',
  Apocalyptics,
  [],
  [],
  [],
  [],
  undefined,
  Skills.faith,
  undefined,
  ['Ajoute jusqu\'à (niveau) déclencheurs à n\'importe quel jet ; le MJ ajoute autant de 1 aux jets futurs du personnage.']
)
export const Corruption = new Potential(
  'corruption',
  Apocalyptics,
  [atLeastSkill(Skills.domination, 8), atLeastSkill(Skills.empathy, 8)],
  [],
  [],
  [atLeastRank(Raven)],
  undefined,
  undefined,
  undefined,
  ['INS+Empathie +1D/niveau vs Défense mentale : si résistance, réduit Égo max de la cible du nombre de déclencheurs. Si Égo → 0 : −1 PSY permanent.']
)

export const ApocalypticPotentials = [
  AllIn,
  CardOfDestiny,
  CrowsNest,
  Mirror,
  BlackOmen,
  ThousandWays,
  FinalDestination,
  BadLuck,
  AngelOfDeath,
  Mimicry,
  Traffic,
  FreeLikeABird,
  Climax,
  HeavenOrHell,
  Corruption
]
