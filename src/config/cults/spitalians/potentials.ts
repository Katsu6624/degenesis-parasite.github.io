import { Potential } from '@/config/potentials/potential'
import { Skills } from '@/config/properties'
import { atLeastRank, eitherRank } from '@/config/ranks/ranks'
import { atLeastSkill } from '@/config/requirements'
import { Spitalians } from '.'
import { FieldMedic, Hippocrat, Orderly, Preservist, Surgeon } from './ranks'

export const Splaying = new Potential(
  'splaying',
  Spitalians,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Technique active : (2) déclencheurs → +1 Défense passive et +1D maniement pour le round ; cumulable jusqu\'au niveau de Potentiel.']
)
export const Phalanx = new Potential(
  'phalanx',
  Spitalians,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['En défense avec alliés équipés d\'armes d\'hast : +1D Défense active par allié et par niveau. (2) déclencheurs → la défense compte comme une attaque.']
)
export const Preservalis = new Potential(
  'preservalis',
  Spitalians,
  [],
  [],
  [],
  [atLeastRank(Preservist)],
  undefined,
  undefined,
  undefined,
  ['Attaque combinée : réussir à l\'épée puis tirer à bout portant en ignorant l\'armure (−3D/−2D/−1D maniement selon niveau).']
)
export const LastBastion = new Potential(
  'lastBastion',
  Spitalians,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Contre les Psychonautes : obtient automatiquement (niveau) déclencheurs sur chaque attaque.']
)
export const KranzlersTeaching = new Potential(
  'kranzlersTeaching',
  Spitalians,
  [],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['Immunisé contre l\'influence des Psychonautes pendant (niveau) rounds de combat.']
)
export const TheLastFarewell = new Potential(
  'theLastFarewell',
  Spitalians,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['Dernier survivant : +1D par niveau aux attaques et défenses pendant 6 rounds ; +1 Défense passive et +1 dégâts par niveau.']
)
export const Polaris = new Potential(
  'polaris',
  Spitalians,
  [atLeastSkill(Skills.leadership, 8), atLeastSkill(Skills.cunning, 8)],
  [],
  [],
  [atLeastRank(Preservist)],
  undefined,
  undefined,
  undefined,
  ['Les Spitaliers alliés récupèrent 1d6 Égo à chaque fin de mission ou kill ennemi commun. Utilisable 1 fois/jour/niveau.']
)
export const WillToSurvive = new Potential(
  'willToSurvive',
  Spitalians,
  [atLeastSkill(Skills.willpower, 10)],
  [],
  [],
  [atLeastRank(Preservist)],
  undefined,
  undefined,
  undefined,
  ['En danger de mort : réussir PSY+Volonté (4) → Égo doublé (peut dépasser le max) pour 3 rounds par niveau ; insensible aux malus de Traumatismes.']
)
export const TunnelVision = new Potential(
  'tunnelVision',
  Spitalians,
  [atLeastSkill(Skills.medicine, 6)],
  [],
  [],
  [eitherRank(atLeastRank(FieldMedic), atLeastRank(Surgeon))],
  Skills.focus,
  undefined,
  undefined,
  ['+1D par niveau à la Défense mentale contre manipulation psychique ; récupère (1) Égo par déclencheur (max = niveau).']
)
export const Oathspeaker = new Potential(
  'oathspeaker',
  Spitalians,
  [atLeastSkill(Skills.domination, 8), atLeastSkill(Skills.cunning, 6)],
  [],
  [],
  [atLeastRank(Hippocrat)],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à tous les jets PSY pour interrogatoire ; bonus doublé contre victimes incarcérées ; cumulé par heure consécutive.']
)
export const Caregiver = new Potential(
  'caregiver',
  Spitalians,
  [atLeastSkill(Skills.medicine, 6)],
  [],
  [],
  [atLeastRank(Orderly)],
  undefined,
  undefined,
  undefined,
  ['+1 déclencheur par niveau aux jets INT+Médecine pour soigner des Blessures superficielles.']
)
export const RodOfAsclepius = new Potential(
  'rodOfAsclepius',
  Spitalians,
  [atLeastSkill(Skills.medicine, 8), atLeastSkill(Skills.empathy, 6)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Durée chirurgie réduite : 6h/3h/1h30 selon niveau. Peut sacrifier (1) Trauma max permanent pour +1 déclencheur/niveau au jet.']
)
export const OldSchool = new Potential(
  'oldSchool',
  Spitalians,
  [atLeastSkill(Skills.primal, 6)],
  [],
  [],
  [atLeastRank(Preservist)],
  undefined,
  undefined,
  undefined,
  ['Maximum de Traumatismes = PHY+PSY ou PSY×2 (meilleur des deux) +1 par niveau (peut dépasser 12).']
)
export const RaiseDead = new Potential(
  'raiseDead',
  Spitalians,
  [atLeastSkill(Skills.medicine, 10), atLeastSkill(Skills.reaction, 8)],
  [],
  [],
  [eitherRank(atLeastRank(FieldMedic), atLeastRank(Surgeon))],
  undefined,
  undefined,
  undefined,
  ['Peut ranimer un mort en 3 rounds par niveau (max 9 rounds au niveau 3) via une action complexe INT+Médecine (10).']
)
export const HumanitysBurden = new Potential(
  'humanitysBurden',
  Spitalians,
  [atLeastSkill(Skills.toughness, 9), atLeastSkill(Skills.stamina, 9)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1 succès automatique par niveau à tous les jets visant à éviter une contamination (toxines, germes, spores).']
)

export const SpitalianPotentials = [
  Splaying,
  Phalanx,
  Preservalis,
  LastBastion,
  KranzlersTeaching,
  TheLastFarewell,
  Polaris,
  WillToSurvive,
  TunnelVision,
  Oathspeaker,
  Caregiver,
  RodOfAsclepius,
  OldSchool,
  RaiseDead,
  HumanitysBurden
]
