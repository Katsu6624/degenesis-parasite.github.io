import { Potential } from '@/config/potentials/potential'
import { Skills } from '@/config/properties'
import { atLeastRank, eitherRank } from '@/config/ranks/ranks'
import { atLeastSkill } from '@/config/requirements'
import { Jehammedans } from '.'
import { Arianoi, Delilah, Iconide, Isaaki, Oracle as OracleRank, Shepherd } from './ranks'

export const IreOfJehammed = new Potential(
  'ireOfJehammed',
  Jehammedans,
  [],
  [],
  [],
  [],
  undefined,
  Skills.faith,
  undefined,
  ['Après (10) attaques ennemies cumulées : +1D par niveau à tous les jets d\'attaque ; chaque attaque réussie rapporte (1) Égo.']
)
export const FleeceOfAries = new Potential(
  'fleeceOfAries',
  Jehammedans,
  [],
  [],
  [],
  [atLeastRank(Arianoi)],
  undefined,
  undefined,
  undefined,
  ['Rituel (15 min) : toutes les compétences CHA tombent à (0) mais peut dépenser (niveau) Égo supplémentaires pendant (1) heure.']
)
export const CallOfJehammed = new Potential(
  'callOfJehammed',
  Jehammedans,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['(1) round + CHA+Art +1D/niveau : annule manipulations psychiques ennemies ; déclencheurs ajoutés à Défense mentale du groupe (−1D par round).']
)
export const IconidesCurse = new Potential(
  'iconidesCurse',
  Jehammedans,
  [],
  [],
  [],
  [eitherRank(atLeastRank(Iconide), atLeastRank(OracleRank))],
  undefined,
  undefined,
  undefined,
  ['Attaque mentale de groupe : PSY+Foi/Volonté +1D/niveau → si échec : −1D par déclencheur à tous les jets ; malus réduit de 1D par round.']
)
export const IconidesBlessing = new Potential(
  'iconidesBlessing',
  Jehammedans,
  [],
  [],
  [],
  [eitherRank(atLeastRank(Iconide), atLeastRank(OracleRank))],
  undefined,
  undefined,
  undefined,
  ['Toutes les icônes fabriquées ce jour : leur effet gagne +1D par niveau.']
)
export const Oracle = new Potential(
  'oracle',
  Jehammedans,
  [],
  [],
  [],
  [atLeastRank(OracleRank)],
  undefined,
  undefined,
  undefined,
  ['Prophétie quotidienne : si la situation prédite se réalise dans le mois → +1D par niveau à l\'action correspondante.']
)
export const Compassion = new Potential(
  'compassion',
  Jehammedans,
  [atLeastSkill(Skills.faith, 10)],
  [],
  [],
  [eitherRank(atLeastRank(Iconide), atLeastRank(OracleRank))],
  undefined,
  undefined,
  undefined,
  ['Tout attaquant de l\'Icônide doit réussir Défense mentale (4+niveau−1) ou perdre (2×niveau) Égo.']
)
export const ThroesOfTheWolf = new Potential(
  'throesOfTheWolf',
  Jehammedans,
  [atLeastSkill(Skills.faith, 10)],
  [],
  [],
  [atLeastRank(Arianoi)],
  Skills.primal,
  undefined,
  undefined,
  ['(1) Égo → si première attaque inflige des dégâts : utiliser ces Égo comme dés supplémentaires pour une seconde attaque. (1) fois/combat/niveau.']
)
export const BrothersKeeper = new Potential(
  'brothersKeeper',
  Jehammedans,
  [atLeastSkill(Skills.faith, 10)],
  [],
  [],
  [atLeastRank(Shepherd)],
  undefined,
  undefined,
  undefined,
  ['Transfère jusqu\'à (2×niveau) points d\'Égo à un allié en une seule action.']
)
export const BlackSheep = new Potential(
  'blackSheep',
  Jehammedans,
  [],
  [],
  [],
  [atLeastRank(Delilah)],
  undefined,
  undefined,
  undefined,
  ['+1 déclencheur par niveau à la Défense mentale contre toute influence. Peut partager ce bonus à un allié pour (1) Égo. (3) Égo + INS+Empathie (4) : guérit (1) PSY perdu.']
)
export const WealAndWoe = new Potential(
  'wealAndWoe',
  Jehammedans,
  [],
  [],
  [],
  [],
  undefined,
  Skills.faith,
  undefined,
  ['Activation même à 0 Égo : restauration complète de l\'Égo contre −1 Trauma max permanent ; ignore malus Trauma pendant (niveau) rounds ; +1D/niveau à Initiative.']
)
export const Sacrifice = new Potential(
  'sacrifice',
  Jehammedans,
  [],
  [],
  [],
  [atLeastRank(Isaaki)],
  undefined,
  undefined,
  undefined,
  ['+1 Défense passive et +1 armure par niveau. +1 déclencheur par niveau à Défense mentale.']
)
export const RamsOffspring = new Potential(
  'ramsOffspring',
  Jehammedans,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à PSY et CHA au sein du Culte. Alliés et Autorité augmentent pour atteindre au moins (niveau) par niveau acquis et ne peuvent plus baisser.']
)
export const Fatalist = new Potential(
  'fatalist',
  Jehammedans,
  [],
  [],
  [],
  [],
  undefined,
  Skills.faith,
  undefined,
  ['(4/3/2) rounds de prière puis jet combiné PSY+Foi + compétence +1D/niveau.']
)
export const DivineIntervention = new Potential(
  'divineIntervention',
  Jehammedans,
  [],
  [],
  [],
  [],
  undefined,
  Skills.faith,
  undefined,
  ['PSY+Foi +1D/niveau vs Défense mentale : les ennemis ratés comptent leurs 2 comme des 1 ; +1 Égo/niveau par échec critique ennemi.']
)

export const JehammedanPotentials = [
  IreOfJehammed,
  FleeceOfAries,
  CallOfJehammed,
  IconidesCurse,
  IconidesBlessing,
  Oracle,
  Compassion,
  ThroesOfTheWolf,
  BrothersKeeper,
  BlackSheep,
  WealAndWoe,
  Sacrifice,
  RamsOffspring,
  Fatalist,
  DivineIntervention
]
