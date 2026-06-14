import { Potential } from '@/config/potentials/potential'
import { Origins, Skills } from '@/config/properties'
import { atLeastRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import { Judges } from '.'
import { Advocate, Executioner, Protector } from './ranks'

export const FiatLux = new Potential(
  'fiatLux',
  Judges,
  [],
  [],
  [atLeastOrigin(Origins.renown, 4)],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à la Défense mentale et aux jets de détection de tromperie face aux criminels et Apocalyptiques.']
)
export const LynchLaw = new Potential(
  'lynchLaw',
  Judges,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à CHA+Commandement pour déchaîner une foule contre des délinquants.']
)
export const HammerBlow = new Potential(
  'hammerBlow',
  Judges,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Le nombre de déclencheurs requis pour activer la propriété Choc est réduit de (1) par niveau.']
)
export const JanusFace = new Potential(
  'janusFace',
  Judges,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Réussir INS+Empathie vs PSY+Volonté/Foi ennemi → +1D par niveau à toutes les attaques et défenses contre cet ennemi pour le reste du combat.']
)
export const Stampede = new Potential(
  'stampede',
  Judges,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Charge en 1 round entier : PHY+Force + (niveau) dés → ennemi à terre pendant (1) round.']
)
export const SteelThunder = new Potential(
  'steelThunder',
  Judges,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Marteau+mousquet simultanés : −4D maniement atténué de 1D par niveau. Si attaque réussit : déclencheurs comptent doubles pour les dégâts. Défense passive −1 au round suivant.']
)
export const DuraLex = new Potential(
  'duraLex',
  Judges,
  [],
  [],
  [],
  [atLeastRank(Protector)],
  Skills.primal,
  undefined,
  undefined,
  ['En infériorité numérique : récupère (1) Égo par round par adversaire surnuméraire (maximum = niveau).']
)
export const Tremor = new Potential(
  'tremor',
  Judges,
  [],
  [],
  [atLeastOrigin(Origins.renown, 4)],
  [],
  undefined,
  undefined,
  undefined,
  ['Criminels du Protectorat/Borca/Europe : Défense mentale (Renommée) ou le Juge ajoute sa Renommée à sa Défense passive pour le reste du combat.']
)
export const JusticeForAll = new Potential(
  'justiceForAll',
  Judges,
  [],
  [],
  [],
  [atLeastRank(Protector)],
  undefined,
  undefined,
  undefined,
  ['Chaque fois qu\'un allié tombe : +1 Égo et +1 Défense passive par niveau jusqu\'à la fin du combat.']
)
export const BlazeOfGlory = new Potential(
  'blazeOfGlory',
  Judges,
  [atLeastSkill(Skills.toughness, 8)],
  [],
  [],
  [atLeastRank(Executioner)],
  undefined,
  undefined,
  undefined,
  ['Accepter jusqu\'à (niveau) dégâts supplémentaires → prochain jet PHY+Corps à corps réussi ajoute ces dégâts en Mortel ignorant l\'armure.']
)
export const Crackdown = new Potential(
  'crackdown',
  Judges,
  [atLeastSkill(Skills.empathy, 6)],
  [],
  [],
  [atLeastRank(Protector)],
  undefined,
  undefined,
  undefined,
  ['Peut utiliser le résultat d\'Initiative d\'un autre Juge avec Répression au round 1 (niveau 1), 2 (niveau 2), ou 3 (niveau 3).']
)
export const TiltShift = new Potential(
  'tiltShift',
  Judges,
  [atLeastSkill(Skills.empathy, 8)],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['Jet combiné INS+Empathie + PSY+Ruse +1D par niveau vs Défense mentale du criminel pour profiler et localiser.']
)
export const Undertaker = new Potential(
  'undertaker',
  Judges,
  [atLeastSkill(Skills.melee, 8)],
  [],
  [],
  [atLeastRank(Protector)],
  Skills.primal,
  undefined,
  undefined,
  ['Feinte : augmente propriété Choc = niveau. Si attaque réussit : propriété Terrifiant et dégâts augmentés = niveau.']
)
export const Heritage = new Potential(
  'heritage',
  Judges,
  [],
  [],
  [],
  [atLeastRank(Advocate)],
  undefined,
  undefined,
  undefined,
  ['+1 dans un historique par niveau acquis. Dans Justitienne/Protectorat/Europe : historiques ne peuvent pas descendre sous (3).']
)
export const HailOfLead = new Potential(
  'hailOfLead',
  Judges,
  [atLeastSkill(Skills.dexterity, 8)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à l\'Initiative avec arme à chargement par la bouche. (2)/(1)/0 déclencheurs pour recharger en 1 action selon niveau.']
)

export const JudgePotentials = [
  FiatLux,
  LynchLaw,
  HammerBlow,
  JanusFace,
  Stampede,
  SteelThunder,
  DuraLex,
  Tremor,
  JusticeForAll,
  BlazeOfGlory,
  Crackdown,
  TiltShift,
  Undertaker,
  Heritage,
  HailOfLead
]
