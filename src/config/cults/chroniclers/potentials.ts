import { Potential } from '@/config/potentials/potential'
import { Origins, Skills } from '@/config/properties'
import { atLeastRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import { Chroniclers } from '.'
import { Paradigma, Shutter } from './ranks'

export const DeadEnd = new Potential(
  'deadEnd',
  Chroniclers,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Si la cible n\'a aucune issue : +niveau aux jets d\'attaque et Défense active et passive.']
)
export const Multiply = new Potential(
  'multiply',
  Chroniclers,
  [atLeastSkill(Skills.deception, 6)],
  [],
  [],
  [atLeastRank(Shutter)],
  undefined,
  undefined,
  undefined,
  ['Possède (niveau) fausses identités ; +1D par niveau à PSY+Tromperie pour les maintenir.']
)
export const BackDoor = new Potential(
  'backDoor',
  Chroniclers,
  [atLeastSkill(Skills.deception, 6)],
  [],
  [],
  [atLeastRank(Shutter)],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à PSY+Ruse ou PSY+Tromperie pour se déguiser et s\'infiltrer incognito.']
)
export const Download = new Potential(
  'download',
  Chroniclers,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D et +1 déclencheur par niveau à PSY+Domination pour interrogatoire sur victime ligotée.']
)
export const Upload = new Potential(
  'upload',
  Chroniclers,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Obtient automatiquement (niveau) déclencheurs à tous les jets d\'influence CHA/PSY (Domination, Commandement, Séduction…).']
)
export const Tesla = new Potential(
  'tesla',
  Chroniclers,
  [],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['+1 déclencheur par niveau à AGI+Mobilité en attaque électrique ; +1D par niveau à la Défense passive.']
)
export const Nova = new Potential(
  'nova',
  Chroniclers,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['Déclenche tous les modules de défense simultanément via INT+Technologie (5−niveau). Si ≥2 ennemis au contact, les alliés ne sont pas affectés.']
)
export const FractalMemory = new Potential(
  'fractalMemory',
  Chroniclers,
  [],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['+niveau déclencheurs automatiques à chaque jet d\'INT. Actif en permanence.']
)
export const SituationalAnalysis = new Potential(
  'situationalAnalysis',
  Chroniclers,
  [atLeastSkill(Skills.focus, 10), atLeastSkill(Skills.cunning, 8)],
  [],
  [],
  [atLeastRank(Paradigma)],
  undefined,
  undefined,
  undefined,
  ['Avant combat : PSY+Ruse (3) → Défense passive +1 par déclencheur pour 3 rounds par niveau. Peut prolonger en dépensant 1 Égo/round.']
)
export const NervousBreakdown = new Potential(
  'nervousBreakdown',
  Chroniclers,
  [atLeastSkill(Skills.medicine, 6), atLeastSkill(Skills.science, 6)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['La propriété Étourdissement de toute arme électrique est augmentée de (1) par niveau.']
)
export const MindOfTheMachine = new Potential(
  'mindOfTheMachine',
  Chroniclers,
  [atLeastSkill(Skills.willpower, 8)],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['+1D par niveau à la Défense mentale contre manipulation émotionnelle ; +1 succès auto par niveau à INT+Concentration pour supprimer ses sentiments.']
)
export const Y2K = new Potential(
  'y2k',
  Chroniclers,
  [atLeastSkill(Skills.artifactLore, 8), atLeastSkill(Skills.engineering, 8)],
  [],
  [],
  [],
  undefined,
  undefined,
  undefined,
  ['Pirater de l\'électronique : nécessite 4 déclencheurs, réduit de 1 par niveau au-delà du premier pour accomplir l\'action en 1 round.']
)
export const ChildOfTheStream = new Potential(
  'childOfTheStream',
  Chroniclers,
  [atLeastSkill(Skills.artifactLore, 10)],
  [],
  [atLeastOrigin(Origins.secrets, 4)],
  [],
  undefined,
  undefined,
  undefined,
  ['+1D par niveau à tous les jets INT ; −1D par niveau à tous les jets CHA. Tous les 10 déclencheurs INT collectés : +1 point d\'XP.']
)
export const Defragment = new Potential(
  'defragment',
  Chroniclers,
  [atLeastSkill(Skills.science, 8)],
  [],
  [],
  [],
  Skills.focus,
  undefined,
  undefined,
  ['+1D par niveau pour résoudre mystères, puzzles ou équations. 1 fois/mois/niveau : INT+Science (4) pour un indice d\'énigme non résolue.']
)
export const WhiteNoise = new Potential(
  'whiteNoise',
  Chroniclers,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined,
  undefined,
  ['Dégâts sonores : tous les (4/3/2) niveaux de dégâts selon niveau de Potentiel : −1D à tous les jets de la victime pendant 1 round.']
)

export const ChroniclerPotentials = [
  DeadEnd,
  Multiply,
  BackDoor,
  Download,
  Upload,
  Tesla,
  Nova,
  FractalMemory,
  SituationalAnalysis,
  NervousBreakdown,
  MindOfTheMachine,
  Y2K,
  ChildOfTheStream,
  Defragment,
  WhiteNoise
]
