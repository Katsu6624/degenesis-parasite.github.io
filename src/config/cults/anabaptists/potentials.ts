import { Anabaptists } from '.'
import { Potential } from '../../potentials/potential'
import { Skills } from '../../properties'
import { atLeastRank, eitherRank } from '../../ranks/ranks'
import { atLeastSkill, either } from '../../requirements'
import { Acheron, Elysian, Furor, Sublime } from './ranks'

export const Zealot = new Potential(
  'zealot',
  Anabaptists,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Le malus de Traumatisme est réduit de (1) par niveau de Potentiel.']
)
export const KillingJoke = new Potential(
  'killingJoke',
  Anabaptists,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Attaque −5D+niveau dés : si réussit → ennemi inconscient et perd tous ses Égo ; si rate → désarmé (1) round.']
)
export const Pneuma = new Potential(
  'pneuma',
  Anabaptists,
  [],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['Si ≥ (6−niveau) dégâts infligés en une seule attaque : récupère immédiatement (1) Égo.']
)
export const RealmOfEmanations = new Potential(
  'realmOfEmanations',
  Anabaptists,
  [atLeastSkill(Skills.faith, 8)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Contre un phénomène psychonautique avec ≥1 déclencheur : lance (niveau) dés supplémentaires et ajoute le résultat le plus élevé comme succès à la Défense mentale.']
)
export const Torchbearer = new Potential(
  'torchbearer',
  Anabaptists,
  [],
  [],
  [],
  [eitherRank(atLeastRank(Elysian), atLeastRank(Furor))],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à INS+Perception pour repérer Psychonautes, Léperos et champs de spores.']
)
export const FishermansBlood = new Potential(
  'fishermansBlood',
  Anabaptists,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['Si blessures > 50% (Blessures + Traumatismes) : rage jusqu\'à fin du combat — aucune limite d\'Égo max mais Défense active impossible. Niveau unique.']
)
export const Unleashed = new Potential(
  'unleashed',
  Anabaptists,
  [],
  [],
  [],
  [atLeastRank(Furor)],
  Skills.primal,
  undefined,
  undefined,
  ['(3) Égo → double les déclencheurs d\'une attaque PHY+Corps à corps. Utilisable (niveau) fois par jour.']
)
export const Innocence = new Potential(
  'innocence',
  Anabaptists,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Attaque mentale INS+Empathie +1D/niveau : si réussit → ennemi −(déclencheurs+1) dés aux actions de combat physique contre lui jusqu\'à fin de scène (annulé si le personnage attaque).']
)
export const BlackRiver = new Potential(
  'blackRiver',
  Anabaptists,
  [atLeastSkill(Skills.domination, 8)],
  [],
  [],
  [atLeastRank(Acheron)],
  undefined,
  undefined,
  undefined,
  ['PSY+Dom +1D/niveau vs Défense mentale : si échec → cible −1D par déclencheur à tous ses jets au prochain round.']
)
export const SouthOfEden = new Potential(
  'southOfEden',
  Anabaptists,
  [atLeastSkill(Skills.melee, 8), atLeastSkill(Skills.deception, 8)],
  [],
  [],
  [atLeastRank(Sublime)],
  undefined,
  undefined,
  undefined,
  ['Feinte PSY+Tromperie vs INS+Perception → si succès : PHY+Corps à corps +1D/niveau (diff. +4, Terrifiant (2), Choc (4DC), tous dégâts Mortels).']
)
export const GodsGrace = new Potential(
  'godsGrace',
  Anabaptists,
  [],
  [],
  [],
  [atLeastRank(Elysian)],
  undefined,
  Skills.faith,
  undefined,
  ['Jet combiné PSY+Foi + INT+Médecine +1D/niveau pour soigner. Peut choisir de soigner Égo au lieu de Blessures superficielles.']
)
export const DeathKnell = new Potential(
  'deathKnell',
  Anabaptists,
  [
    atLeastSkill(Skills.toughness, 10),
    either(atLeastSkill(Skills.faith, 10), atLeastSkill(Skills.willpower, 10))
  ],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['À Traumatismes max : sacrifier (1) attribut (max permanent réduit) pour effacer (1) Traumatisme par niveau.']
)
export const RottenApple = new Potential(
  'rottenApple',
  Anabaptists,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['INS+Empathie +1D/niveau vs Défense mentale pour détecter les mensonges. Jet combiné Empathie+Pulsions avec ≥2 déclencheurs révèle la nature (Léperos/faux-bourdon → porteur Amorce/Infiltré → brûlé/Dormeur).']
)
export const ParadiseLost = new Potential(
  'paradiseLost',
  Anabaptists,
  [],
  [],
  [],
  [],
  undefined,
  Skills.faith,
  undefined,
  ['1 fois/jour/niveau : dépenser (1) Égo avant un jet → les 5 comptent comme déclencheurs supplémentaires mais les 2 comptent comme des 1.']
)
export const DemiurgesBane = new Potential(
  'demiurgesBane',
  Anabaptists,
  [],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['Par tranche de (3/2/1) dégâts infligés à un Psychonaute (selon niveau) : il perd également (1) point de Sporulation.']
)

export const AnabaptistPotentials = [
  Zealot,
  KillingJoke,
  Pneuma,
  RealmOfEmanations,
  Torchbearer,
  FishermansBlood,
  Unleashed,
  Innocence,
  BlackRiver,
  SouthOfEden,
  GodsGrace,
  DeathKnell,
  RottenApple,
  ParadiseLost,
  DemiurgesBane
]
