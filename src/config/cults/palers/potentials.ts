import { Potential } from '@/config/potentials/potential'
import { Origins, Skills } from '@/config/properties'
import { atLeastRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import { Palers } from '.'
import { Cyclops, Demagogue, Halo } from './ranks'

export const Nightmare = new Potential(
  'nightmare',
  Palers,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Depuis l\'obscurité : AGI+Furtivité +1D/niveau vs INS+Perception → si victoire, prochaine attaque imparable en Défense active + (niveau) déclencheurs supplémentaires.']
)
export const Lament = new Potential(
  'lament',
  Palers,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['INS+Pulsions +1D/niveau → difficulté de Défense mentale pour tous les combattants ; échec : immobilisé ≥ 1 round (+1 round par tranche de 3 déclencheurs). Alliés aussi affectés.']
)
export const Alias = new Potential(
  'alias',
  Palers,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à PSY+Tromperie pour dissimuler sa vraie nature.']
)
export const MidnightSun = new Potential(
  'midnightSun',
  Palers,
  [],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['Tous les malus dus à de mauvaises conditions visuelles, à la cécité ou à l\'obscurité sont réduits de 1D par niveau.']
)
export const Chosen = new Potential(
  'chosen',
  Palers,
  [],
  [],
  [],
  [atLeastRank(Halo)],
  undefined,
  undefined,
  undefined,
  ['À chaque nouveau niveau de Potentiel : +niveau aux historiques Autorité et Secrets.']
)
export const Suggestor = new Potential(
  'suggestor',
  Palers,
  [],
  [],
  [],
  [atLeastRank(Demagogue)],
  undefined,
  undefined,
  undefined,
  ['Après AGI+Furtivité réussi : CHA+Négociation +2D par niveau vs Défense mentale pour imposer une opinion à la cible.']
)
export const SparklingFire = new Potential(
  'sparklingFire',
  Palers,
  [atLeastSkill(Skills.focus, 8), atLeastSkill(Skills.orienteering, 10)],
  [],
  [],
  [atLeastRank(Halo)],
  undefined,
  undefined,
  undefined,
  ['(1) succès automatique par niveau à INS+Orientation pour localiser précisément une technologie inconnue.']
)
export const Memeticon = new Potential(
  'memeticon',
  Palers,
  [atLeastSkill(Skills.empathy, 6)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['(1) déclencheur par niveau à INS+Empathie pour détecter manipulations mémétiques. (1) déclencheur par niveau à la Défense mentale contre influence mémétique subconsciente.']
)
export const Negator = new Potential(
  'negator',
  Palers,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['Annule 3 points de dégâts électriques par niveau de Potentiel.']
)
export const Fluoride = new Potential(
  'fluoride',
  Palers,
  [atLeastSkill(Skills.mobility, 8)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1 Défense passive et +1D Défense active par niveau. Si la tête passe par une fissure, tout le corps peut suivre : +1 succès auto par niveau à AGI+Mobilité.']
)
export const Pandaemonium = new Potential(
  'pandaemonium',
  Palers,
  [atLeastSkill(Skills.engineering, 8)],
  [],
  [],
  [atLeastRank(Cyclops)],
  undefined,
  undefined,
  undefined,
  ['(1) déclencheur par niveau à INT+Technologie lors d\'une attaque contre de l\'électronique Tech V ou inférieure.']
)
export const Tripwire = new Potential(
  'tripwire',
  Palers,
  [],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['+1D par niveau à la Défense active. Contre-attaque = attaque ciblée sans augmentation de difficulté.']
)
export const Xenos = new Potential(
  'xenos',
  Palers,
  [atLeastSkill(Skills.legends, 6)],
  [],
  [atLeastOrigin(Origins.secrets, 4)],
  [],
  undefined,
  undefined,
  undefined,
  ['Peut infiltrer (1) Culte par niveau. +1D par niveau à PSY+Domination et PSY+Tromperie en se faisant passer pour un membre de ces Cultes.']
)
export const VaultFighter = new Potential(
  'vaultFighter',
  Palers,
  [atLeastSkill(Skills.mobility, 6)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['En espace confiné : tous les malus d\'exiguïté annulés. +2×niveau à la Défense passive et +2D par niveau à la Défense active.']
)
export const Masterplan = new Potential(
  'masterplan',
  Palers,
  [atLeastSkill(Skills.cunning, 6)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Après (3) rounds d\'observation : PSY+Ruse (2) +1D/niveau pour modifier les conditions du terrain, ou (difficulté 4) pour mettre fin immédiatement au combat.']
)

export const PalerPotentials = [
  Nightmare,
  Lament,
  Alias,
  MidnightSun,
  Chosen,
  Suggestor,
  SparklingFire,
  Memeticon,
  Negator,
  Fluoride,
  Pandaemonium,
  Tripwire,
  Xenos,
  VaultFighter,
  Masterplan
]
