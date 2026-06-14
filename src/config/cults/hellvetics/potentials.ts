import { Potential } from '@/config/potentials/potential'
import { Skills } from '@/config/properties'
import { atLeastRank, atLeastRankLevel } from '@/config/ranks/ranks'
import { atLeastSkill, either } from '@/config/requirements'
import { Hellvetics } from '.'
import { HellveticRanks, Sapper, Sentinel as SentinelRank } from './ranks'

export const Assault = new Potential(
  'assault',
  Hellvetics,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Si (2) déclencheurs à l\'attaque au premier round : tous les alliés qui attaquent après gagnent +1D par niveau.']
)
export const ForcedMarch = new Potential(
  'forcedMarch',
  Hellvetics,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['L\'encombrement du harnais est réduit de (1) par niveau de Potentiel.']
)
export const ShieldWall = new Potential(
  'shieldWall',
  Hellvetics,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Intercepte une attaque visant un allié : PSY+Réactivité (4) mêlée / (6) distance, +1D par niveau. Peut contre-attaquer avec la baïonnette du défricheur.']
)
export const Infiltration = new Potential(
  'infiltration',
  Hellvetics,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1 Réseau par niveau. +1D par niveau à tous les jets CHA et PSY pour tromper.']
)
export const Discipline = new Potential(
  'discipline',
  Hellvetics,
  [],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['Peut convertir jusqu\'à (niveau) déclencheurs en points d\'Égo sur chaque jet d\'attaque ou Défense active.']
)
export const Morale = new Potential(
  'morale',
  Hellvetics,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1 à la Défense mentale par niveau lorsqu\'en infériorité numérique.']
)
export const Recovery = new Potential(
  'recovery',
  Hellvetics,
  [atLeastSkill(Skills.reaction, 8)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Avec bouclier des tunnels en retraite : +1 Défense passive et +1D Défense active par niveau. Peut étendre à 1 allié/niveau en sacrifiant toutes ses actions.']
)
export const HeavyDuty = new Potential(
  'heavyDuty',
  Hellvetics,
  [atLeastSkill(Skills.navigation, 8), atLeastSkill(Skills.reaction, 8)],
  [],
  [],
  [atLeastRank(SentinelRank)],
  undefined,
  undefined,
  undefined,
  ['+1 succès auto par niveau à tous les jets PHY en harnais ultrarésistant. Malus corps à corps : −1D au niveau 2, annulé au niveau 3.']
)
export const AlpineSoul = new Potential(
  'alpineSoul',
  Hellvetics,
  [atLeastSkill(Skills.athletics, 6), atLeastSkill(Skills.stamina, 6)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Dégâts de chute réduits de (1) par niveau. En montagne : +1D par niveau à PHY+Vigueur et PHY+Athlétisme.']
)
export const Demolitions = new Potential(
  'demolitions',
  Hellvetics,
  [atLeastSkill(Skills.crafting, 6), atLeastSkill(Skills.science, 6)],
  [],
  [],
  [atLeastRank(Sapper)],
  undefined,
  undefined,
  undefined,
  ['Jet combiné AGI+Artisanat + INT+Science pour augmenter dégâts explosifs (+1/succès, +2/déclencheur). +1D par niveau pour désamorcer.']
)
export const Austerity = new Potential(
  'austerity',
  Hellvetics,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['1 fois/mois/niveau : utiliser Renommée à la place de Ressources pour demander un équipement à la Forteresse alpine. Perte (1) Renommée si l\'équipement est perdu.']
)
export const Sentinel = new Potential(
  'sentinel',
  Hellvetics,
  [atLeastSkill(Skills.projectiles, 8), atLeastSkill(Skills.perception, 8)],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['Mise en joue : dépenser 1 Égo/round → +2D au tir suivant. Maximum de dés = 2× niveau. Annulé si distrait.']
)
export const HellveticHonor = new Potential(
  'hellveticHonor',
  Hellvetics,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Après +1 Ressources suite à une mission : peut aussi +1 Autorité, Renommée ou Alliés. Cap 3/4/5 selon niveau.']
)
export const NoMansLand = new Potential(
  'noMansLand',
  Hellvetics,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à INS+Survie et INS+Orientation hors Régions territoriales. +1 Réseau par niveau de Potentiel acquis.']
)
export const DogOfWar = new Potential(
  'dogOfWar',
  Hellvetics,
  [
    atLeastSkill(Skills.toughness, 10),
    atLeastSkill(Skills.stamina, 10),
    either(atLeastSkill(Skills.faith, 10), atLeastSkill(Skills.willpower, 10))
  ],
  [],
  [],
  [atLeastRankLevel(HellveticRanks, 4)],
  undefined,
  undefined,
  undefined,
  ['Sacrifier 10 XP non dépensés pour effacer immédiatement (1) Traumatisme par niveau.']
)

export const HellveticPotentials = [
  Assault,
  ForcedMarch,
  ShieldWall,
  Infiltration,
  Discipline,
  Morale,
  Recovery,
  HeavyDuty,
  AlpineSoul,
  Demolitions,
  Austerity,
  Sentinel,
  HellveticHonor,
  NoMansLand,
  DogOfWar
]
