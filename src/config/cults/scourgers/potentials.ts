import { Potential } from '@/config/potentials/potential'
import { Skills } from '@/config/properties'
import { atLeastRank } from '@/config/ranks/ranks'
import { atLeastSkill, either } from '@/config/requirements'
import { Scourgers } from '.'
import { Chaga, Damu, Dumisai, Kifo, Moyo } from './ranks'

export const TheLionsRevenge = new Potential(
  'theLionsRevenge',
  Scourgers,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['Quand touché par une attaque corps à corps avec arme ≤ à la sienne : l\'attaquant subit des dégâts égaux (max = niveau). Seule armure Renforcée les réduit.']
)
export const ElderBood = new Potential(
  'elderBood',
  Scourgers,
  [atLeastSkill(Skills.faith, 8)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Rituel (15 min) de préparation au combat : ajoute (niveau) à la Défense mentale.']
)
export const TrialOfTheHero = new Potential(
  'trialOfTheHero',
  Scourgers,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à l\'Initiative contre des ennemis supérieurs en force ou technologie.']
)
export const HyenasLaughter = new Potential(
  'hyenasLaughter',
  Scourgers,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à l\'attaque ou à la défense au début du premier round de combat.']
)
export const WildDogRun = new Potential(
  'wildDogRun',
  Scourgers,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Récupère (niveau) points d\'Égo par round pendant la poursuite d\'un ennemi qui fuit à pied.']
)
export const SimbasPrey = new Potential(
  'simbasPrey',
  Scourgers,
  [],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['Choisir un ennemi cible : +niveau à la Défense passive contre tous les autres adversaires.']
)
export const Bloodhound = new Potential(
  'bloodhound',
  Scourgers,
  [atLeastSkill(Skills.domination, 8), atLeastSkill(Skills.primal, 8)],
  [],
  [],
  [atLeastRank(Dumisai)],
  undefined,
  undefined,
  undefined,
  ['Dépenser (1) Égo + (1)/round pour maintenir : alliés gagnent +1D par niveau à l\'Initiative.']
)
export const LastBite = new Potential(
  'lastBite',
  Scourgers,
  [
    atLeastSkill(Skills.toughness, 10),
    either(atLeastSkill(Skills.faith, 10), atLeastSkill(Skills.willpower, 10))
  ],
  [],
  [],
  [atLeastRank(Dumisai)],
  undefined,
  undefined,
  undefined,
  ['À la mort (Traumatismes max atteints) : immobile (1) round puis retour au combat pour (niveau) rounds avec toute la réserve d\'Égo.']
)
export const UltimateFoe = new Potential(
  'ultimateFoe',
  Scourgers,
  [],
  [],
  [],
  [atLeastRank(Kifo)],
  undefined,
  undefined,
  undefined,
  ['Contre d\'anciens Fléaux : +1 déclencheur par niveau à l\'Initiative. Peut échanger Double défi contre Ennemi ultime gratuitement.']
)
export const CrackTheScourge = new Potential(
  'crackTheScourge',
  Scourgers,
  [atLeastSkill(Skills.domination, 8)],
  [],
  [],
  [atLeastRank(Damu)],
  undefined,
  undefined,
  undefined,
  ['Frapper un membre d\'un groupe avec le fustigateur : jet combiné PSY+Dom + PHY+Corps +1D/niveau → membres du groupe −1D/déclencheur à leur Défense mentale.']
)
export const PrideOfAfrica = new Potential(
  'prideOfAfrica',
  Scourgers,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à PSY et CHA lors de toute interaction avec des Cultes ou clans afrikains.']
)
export const TwinChallenge = new Potential(
  'twinChallenge',
  Scourgers,
  [],
  [],
  [],
  [atLeastRank(Moyo)],
  undefined,
  undefined,
  undefined,
  ['+2D par niveau à tous les jets nécessaires pour accomplir les 8 épreuves traditionnelles du Moyo.']
)
export const GrimReaper = new Potential(
  'grimReaper',
  Scourgers,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['Chaque kill au combat stocke (1) déclencheur utilisable pour des jets d\'attaque (maximum = 2×niveau).']
)
export const Howl = new Potential(
  'howl',
  Scourgers,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['Avant la mêlée : jet combiné PSY+Dom + CHA+Arts vs Défense mentale → si victoire, l\'ennemi réduit ses Égo dépensables à l\'Initiative de (niveau). Une fois par combat.']
)
export const VesselOfTheSpirit = new Potential(
  'vesselOfTheSpirit',
  Scourgers,
  [atLeastSkill(Skills.faith, 8)],
  [],
  [],
  [atLeastRank(Chaga)],
  Skills.focus,
  undefined,
  undefined,
  ['3 rounds d\'invocation + PSY+Foi (3) : bénit un Fléau pour remplacer une compétence par PSY+Foi. Peut être utilisé (niveau) fois.']
)

export const ScourgerPotentials = [
  TheLionsRevenge,
  ElderBood,
  TrialOfTheHero,
  HyenasLaughter,
  WildDogRun,
  SimbasPrey,
  Bloodhound,
  LastBite,
  UltimateFoe,
  CrackTheScourge,
  PrideOfAfrica,
  TwinChallenge,
  GrimReaper,
  Howl,
  VesselOfTheSpirit
]
