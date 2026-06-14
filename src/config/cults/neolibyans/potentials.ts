import { Potential } from '@/config/potentials/potential'
import { Origins, Skills } from '@/config/properties'
import { atLeastRank, atLeastRankLevel } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Neolibyans } from '.'
import { GreatHunter, Merchant, NeolibyanRanks } from './ranks'

export const LionsShare = new Potential(
  'lionsShare',
  Neolibyans,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Pendant une négociation commerciale : obtient automatiquement (niveau) déclencheurs.']
)
export const Marksman = new Potential(
  'marksman',
  Neolibyans,
  [],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['Viser 1 round complet puis tirer : obtient (niveau) déclencheurs automatiquement au jet d\'attaque.']
)
export const NineLives = new Potential(
  'nineLives',
  Neolibyans,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Quand la vie est menacée : +1D par niveau au jet salutaire, mais coûte (1) Égo par action.']
)
export const Inspiration = new Potential(
  'inspiration',
  Neolibyans,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Réussite extraordinaire (3+ déclencheurs) + (1) Égo → alliés gagnent +1D par niveau à leur prochaine action similaire.']
)
export const AtEyeLevel = new Potential(
  'atEyeLevel',
  Neolibyans,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Lors d\'une discussion avec un non-Néolibyen : +1D par niveau à tous les jets CHA, mais −3D à tous les jets PSY.']
)
export const WheelOfFortune = new Potential(
  'wheelOfFortune',
  Neolibyans,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Avant un jet : renoncer à jusqu\'à (2×niveau) dés. Si succès → (1) déclencheur par paire de dés non lancés pour la prochaine attaque.']
)
export const CrownOfCreation = new Potential(
  'crownOfCreation',
  Neolibyans,
  [atLeastSkill(Skills.leadership, 12)],
  [],
  [atLeastOrigin(Origins.renown, 6)],
  [atLeastRankLevel(NeolibyanRanks, 5)],
  undefined,
  undefined,
  undefined,
  ['Si Renommée ≥ 6/5/4 (selon niveau) : les autres historiques ne peuvent pas baisser involontairement.']
)
export const SilverTongue = new Potential(
  'silverTongue',
  Neolibyans,
  [atLeastSkill(Skills.conduct, 8), atLeastSkill(Skills.science, 6)],
  [],
  [],
  [atLeastRank(Merchant)],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à PSY et CHA lors d\'une première rencontre. (3) déclencheurs → +1 Renommée/mois. Parle 3×niveau dialectes étrangers.']
)
export const TipOfTheScale = new Potential(
  'tipOfTheScale',
  Neolibyans,
  [atLeastSkill(Skills.cunning, 10)],
  [],
  [],
  [],
  undefined,
  Skills.faith,
  undefined,
  ['Dépenser (3/2/1) Égo avant un jet pour le rendre relançable ; relancer coûte (3/4/5) Égo supplémentaires selon niveau.']
)
export const HeirOfTheLibyan = new Potential(
  'heirOfTheLibyan',
  Neolibyans,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+2×niveau à l\'Autorité tant que la lignée est prouvée (ne peut pas baisser). +1 déclencheur/niveau aux jets PSY/CHA dans les négociations du Culte.']
)
export const Duelist = new Potential(
  'duelist',
  Neolibyans,
  [],
  [],
  [],
  [atLeastRank(GreatHunter)],
  Skills.focus,
  undefined,
  undefined,
  ['En duel (1 vs 1) : +1D par niveau à tous les jets. Si un tiers intervient : −1D par niveau à tous les jets.']
)
export const BankersTrust = new Potential(
  'bankersTrust',
  Neolibyans,
  [],
  [],
  [atLeastOrigin(Origins.authority, 3), atLeastOrigin(Origins.renown, 3)],
  [atLeastRank(Merchant)],
  undefined,
  undefined,
  undefined,
  ['+1 déclencheur par niveau aux jets PSY/CHA pour les négociations avec la Banque. Chaque déclencheur réduit le taux d\'intérêt de 10%.']
)
export const DiamondInTheSand = new Potential(
  'diamondInTheSand',
  Neolibyans,
  [either(atLeastSkill(Skills.faith, 10), atLeastSkill(Skills.willpower, 10))],
  [],
  [atLeastOrigin(Origins.renown, 6)],
  [],
  undefined,
  undefined,
  undefined,
  ['Peut stocker jusqu\'à (2×niveau) déclencheurs de jets précédents et les dépenser tous en une fois avant un jet futur.']
)
export const Conqueror = new Potential(
  'conqueror',
  Neolibyans,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['Si le combat peut apporter des ressources : +1 Égo/niveau au début. Effort long terme : +1 Égo/jour + (1) Blessure guérie par niveau ; −1D/niveau à INT.']
)
export const EcstasyOfGold = new Potential(
  'ecstasyOfGold',
  Neolibyans,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1 succès automatique par accord précédemment conclu avec ce partenaire (maximum = niveau) à tous jets CHA/PSY pour un nouvel accord.']
)

export const NeolibyanPotentials = [
  LionsShare,
  Marksman,
  NineLives,
  Inspiration,
  AtEyeLevel,
  WheelOfFortune,
  CrownOfCreation,
  SilverTongue,
  TipOfTheScale,
  HeirOfTheLibyan,
  Duelist,
  BankersTrust,
  DiamondInTheSand,
  Conqueror,
  EcstasyOfGold
]
