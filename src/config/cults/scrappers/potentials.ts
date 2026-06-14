import { Potential } from '@/config/potentials/potential'
import { Origins, Skills } from '@/config/properties'
import { atLeastRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Scrappers } from '.'
import { Badger, CaveBear } from './ranks'

export const TheMob = new Potential(
  'theMob',
  Scrappers,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à CHA+Commandement pour mobiliser les masses contre un autre Culte.']
)
export const Rat = new Potential(
  'rat',
  Scrappers,
  [atLeastSkill(Skills.cunning, 6)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à tous les jets visant à couvrir ses méfaits.']
)
export const ToughDog = new Potential(
  'toughDog',
  Scrappers,
  [atLeastSkill(Skills.toughness, 6)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Obtient l\'armure additionnelle Carapace avec une valeur égale au niveau de Potentiel.']
)
export const Nitro = new Potential(
  'nitro',
  Scrappers,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['Premier round de combat : +1D par niveau à tous les jets d\'attaque.']
)
export const TrufflePig = new Potential(
  'trufflePig',
  Scrappers,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à INS+Perception pour détecter des artefacts ou des pièges.']
)
export const Darwin = new Potential(
  'darwin',
  Scrappers,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['En situation désespérée : +1D par niveau à la compétence salvatrice. Si survie : +1 Renommée (max 4).']
)
export const HourOfTheBastard = new Potential(
  'hourOfTheBastard',
  Scrappers,
  [
    atLeastSkill(Skills.survival, 10),
    either(atLeastSkill(Skills.faith, 8), atLeastSkill(Skills.willpower, 8))
  ],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Contre la némésis : récupère (1) Égo par round ; peut dépenser (1) Égo pour soigner (1) Blessure superficielle par niveau.']
)
export const ArtifactSense = new Potential(
  'artifactSense',
  Scrappers,
  [atLeastSkill(Skills.artifactLore, 8), atLeastSkill(Skills.primal, 8)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+niveau déclencheurs automatiques à INT+Connaissance des artefacts et INT+Technologie pour activation, évaluation ou réparation d\'artefact.']
)
export const Ravenous = new Potential(
  'ravenous',
  Scrappers,
  [],
  [],
  [],
  [atLeastRank(CaveBear)],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à INS+Orientation et INS+Survie pour pister le voleur. Ignore les malus de Traumatismes tant que le trésor n\'est pas récupéré.']
)
export const Payback = new Potential(
  'payback',
  Scrappers,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['Chaque Traumatisme reçu au combat stocke (1) déclencheur pour les attaques suivantes (maximum = niveau).']
)
export const Atlas = new Potential(
  'atlas',
  Scrappers,
  [atLeastSkill(Skills.force, 8), atLeastSkill(Skills.stamina, 8)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Niveau de charrette +niveau. +1D par niveau à PHY+Vigueur. Malus d\'encombrement réduit de (niveau) au combat.']
)
export const Junker = new Potential(
  'junker',
  Scrappers,
  [atLeastSkill(Skills.crafting, 8), atLeastSkill(Skills.engineering, 8)],
  [],
  [],
  [atLeastRank(Badger)],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à AGI+Artisanat et INT+Technologie pour améliorer équipement. Emplacements supplémentaires coûtent (9/8/7)×nombre selon niveau.']
)
export const Glyph = new Potential(
  'glyph',
  Scrappers,
  [atLeastSkill(Skills.legends, 6)],
  [],
  [atLeastOrigin(Origins.secrets, 3)],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à INT+Légendes pour lire les runes. +1 succès auto par niveau pour éviter un danger signalé par une rune.']
)
export const OneLastBullet = new Potential(
  'oneLastBullet',
  Scrappers,
  [
    atLeastSkill(Skills.projectiles, 8),
    atLeastSkill(Skills.cunning, 6),
    atLeastSkill(Skills.reaction, 8)
  ],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Avec la dernière balle : +2 déclencheurs par niveau au jet AGI+Armes à projectiles. Une fois par bataille.']
)
export const Mongrel = new Potential(
  'mongrel',
  Scrappers,
  [],
  [],
  [atLeastOrigin(Origins.renown, 3), atLeastOrigin(Origins.network, 3)],
  [],
  undefined,
  undefined,
  undefined,
  ['Sacrifier (1) point d\'historique pour +1D au jet ; si échec : historique −1. Minimum 0/1/2 selon niveau.']
)

export const ScrapperPotentials = [
  TheMob,
  Rat,
  ToughDog,
  Nitro,
  TrufflePig,
  Darwin,
  HourOfTheBastard,
  ArtifactSense,
  Ravenous,
  Payback,
  Atlas,
  Junker,
  Glyph,
  OneLastBullet,
  Mongrel
]
