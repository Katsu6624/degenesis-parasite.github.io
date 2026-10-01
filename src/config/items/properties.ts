export const WEAPON_PROPERTY_DESCRIPTIONS: Record<string, string> = {
  'armor-piercing': '<b>ARMOR-PIERCING</b><br>This extremely compact and fast projectile pierces armor like paper.<br><br>Armor-piercing projectiles do not deal significantly more damage, but they ignore any special properties armor may have, such as \'Massive\' or \'Bulletproof\'.',

  'camouflage': '<b>CAMOUFLAGE (DIFFICULTY)</b><br>A weapon with the \'Camouflage\' property does not look like a weapon, or can easily be concealed. The value of this property equals the difficulty to detect the camouflage with an INS+Perception roll.',

  'muzzle-loading': '<b>MUZZLE-LOADING</b><br>The weapon is loaded with powder and then a projectile through the muzzle. This procedure takes time, 2 actions.',

  'knockback': '<b>KNOCKBACK (TRIGGER)</b><br>This weapon is heavy and very unwieldy, but in the hands of a professional, it becomes a true instrument of destruction. The fighter can only attack or defend on their next action if they obtain the required number of Triggers. If they fail to do so, they lose their balance and must spend 1 action to grip their weapon again. They may also choose to drop it and fight unarmed.',

  'blunt': '<b>BLUNT</b><br>Judgement Hammers and clubs are blunt weapons particularly effective against armor with the \'Massive\' property.',

  'thunderclap': '<b>THUNDERCLAP</b><br>Each shot rings out like a thunderclap, sending dust swirling and snow falling from the trees. A Thunderclap will scatter a mammoth herd, and other animals will flee.',

  'area damage': '<b>AREA DAMAGE (ANGLE)</b><br>The weapon does not target a single opponent directly, but covers an area expressed in degrees. Everything within this area takes damage.',

  'special damage': '<b>SPECIAL DAMAGE (ENEMY TYPE, DAMAGE)</b><br>A weapon with \'Special Damage\' is designed to deal extra damage against a specific type of enemy.',

  'deviation': '<b>DEVIATION</b><br>Grenades and other indirect weapons never quite hit their target directly. On every successful attack, a die must be rolled (1D); the result gives the deviation in meters from the intended target. Triggers are subtracted from the result: the more Triggers, the more accurate the attack.<br><br>If the attack fails, roll 2D to determine the distance between the point of impact and the intended target.',

  'scatter': '<b>SCATTER</b><br>The weapon fires dozens of projectiles that spread over a cone-shaped area of effect. Although buckshot can create gaping holes in a target at close range, its destructive power quickly diminishes after a few meters.<br><br>The damage listed in the weapon\'s stats only applies at close range. At greater distances, damage is reduced by 4 points. However, no range penalty applies here.',

  'double barrel': '<b>DOUBLE BARREL</b><br>The weapon has two barrels that can be used simultaneously or separately. Either way, it only costs one attack roll. Firing both barrels at once doubles the damage.',

  'entanglement': '<b>ENTANGLEMENT (MOVEMENT PENALTY)</b><br>A bola wraps around the legs, and a net makes all movement impossible. Weapons with this property impose a penalty to all skills requiring movement, in addition to the damage dealt. The Triggers from the attack roll are not added to damage, but to the penalty.<br><br>The fighter can attempt to break free with their next action: by force (PHY+Force) or by wriggling (AGI+Mobility). The difficulty is 2. Another person can make a PHY+Force (2) roll to tear off the net or bola.',

  'biometric encoding': '<b>BIOMETRIC ENCODING (DIFFICULTY)</b><br>The grip contains a biometric sensor that only fires the weapon when the correct person is detected. In the hands of a stranger, the weapon does not fire.<br><br>To disable this mechanism or change the encoding, a technician must succeed on an AGI+Craft roll followed by an INT+Technology roll (difficulty). If either roll fails, the difficulty increases by 1. If it reaches 12, the weapon permanently deactivates.',

  'jam': '<b>JAM</b><br>Any shooter using a weapon with this property must resign themselves to its miserable quirks. If they roll more 1s than 6s on their attack roll, the weapon jams on the next round. Clearing a jam costs 1 action.',

  'banner': '<b>BANNER (BONUS)</b><br>You fight for the same cause, your brothers and sisters united in spirit. You raise this banner on the battlefield; it inspires and unites you. As long as it is raised, everyone around it gains a bonus.',

  'stun': '<b>STUN (EGO DAMAGE)</b><br>A weapon with this property does not deal Flashwounds, but instead targets Ego points. Unless stated otherwise, armor values reduce the damage.',

  'explosive': '<b>EXPLOSIVE</b><br>The ammunition used explodes in a ball of fire, destroying everything within a given radius. Use the explosion rules.',

  'fragile': '<b>FRAGILE</b><br>If at least one 1 is rolled, the weapon breaks apart. If the action still succeeds, it deals its damage.',

  'incendiary': '<b>INCENDIARY</b><br>The weapon\'s ammunition sets the target ablaze. Use the fire rules.',

  'unwieldy': '<b>UNWIELDY (DIFFICULTY)</b><br>Some weapons are a real danger to both the user and the target. If the attacker misses their target, they must regain control of their weapon with a PHY+Melee roll (difficulty). If this also fails, the weapon injures them as if they had attacked themselves.',

  'lethal': '<b>LETHAL</b><br>Thermonuclear explosions, the invisible ray of a microwave gun, or a nanite infection bypass all armor. They destroy every creature from the inside out. A weapon with the \'Lethal\' property deals Traumas directly.',

  'cloud': '<b>CLOUD (RADIUS, DURATION)</b><br>When a grenade explodes, its active agents disperse and cover an area of several meters in radius. In the absence of wind, the cloud hovers over the battlefield for several combat rounds before dissipating. Unless stated otherwise, damage is cumulative for anyone remaining inside the cloud.',

  'penetration': '<b>PENETRATION (ARMOR VALUE)</b><br>The bullet or explosive charge completely pierces armor with a value equal to or less than the one stated in parentheses. Any higher value will be subtracted from the damage points as usual, or, depending on the weapon, the bullet is simply deflected.',

  'burst': '<b>BURST (NUMBER OF BULLETS)</b><br>Some automatic weapons have a high rate of fire. The shooter can fire multiple bullets in rapid succession in 1 action (number stated in parentheses). Each bullet increases Handling by +1D and damage by 1 point.<br><br>If multiple targets are close together, the attack dice are split evenly among them. A burst cannot hit more targets than it fires bullets.',

  'regularity': '<b>REGULARITY (TRIGGER)</b><br>The perfect weapon for rapid successive attacks. If the fighter achieves the stated number of Triggers on their attack roll, they can immediately attack again, but with a -2D penalty this time. This can happen multiple times in a row, but the penalties stack at -2D per additional attack.',

  'sensitive': '<b>SENSITIVE</b><br>High-precision weapons such as sniper rifles are sensitive to impacts. When a fighter equipped with such a weapon is forced into melee combat or is attacked, 1 Trigger is enough for their opponent to damage the weapon: its Handling permanently decreases by 1D.<br><br>A skilled craftsman can repair the damaged weapon with an AGI+Craft roll.',

  'special': '<b>SPECIAL</b><br>This weapon has special rules described in its detailed entry.',

  'talisman': '<b>TALISMAN (BONUS)</b><br>This object has a sentimental value that cannot be measured in armor value or penetrating power: it grants its bearer extra dice on PSY+Faith/Will rolls.',

  'terrifying': '<b>TERRIFYING (DIFFICULTY)</b><br>The mere sight of this weapon strikes fear into the hearts of enemies: all opponents must succeed on a PSY+Faith/Will roll against the property\'s difficulty or suffer a -2D penalty on their next action. At the start of each combat round, they can regain their composure with a successful action roll. Once the roll is succeeded, the opponent becomes immune for the rest of the combat.',

  // Weapon properties
  'laceration': '<b>LACERATION</b><br>If an attack succeeds with 2 Triggers, the fighter can snap the blades shut to deal 1D additional damage. The 2 Triggers used do not count toward damage calculation. This means that if the player rolls only 1 for additional damage, they deal 1 less damage than if they had chosen not to use \'Laceration\'. At best, they can deal +4 damage.',

  'dreadful': '<b>DREADFUL (LEVEL)</b><br>Bristling with serrated blades or menacing spikes, this weapon is designed to leave a burning pain long after striking its target. A weapon with this property adds (1) bonus Trigger per level when it causes a Complication (at least one Trigger must first be spent to inflict the Complication).',

  'concussion': '<b>CONCUSSION (LEVEL)</b><br>Weapons with the Concussion property shake their targets and make their thoughts rattle inside their skull, delaying any reaction. The target suffers the Disorientation Complication at a level equal to the property\'s level.',

  'panic': '<b>PANIC (LEVEL)</b><br>The effects of this weapon are more than terrifying. Anyone who witnesses such a weapon wreaking havoc must make a Mental Defense roll with a difficulty equal to the property\'s level. On failure, the target is afflicted by the Shell Shock Complication.',

  'slow reload': '<b>SLOW RELOAD (DURATION)</b><br>Many weapons have a reloading process that is nearly impossible to complete during combat. The time required is stated immediately after the property name.',

  'single load': '<b>SINGLE LOAD (NUMBER OF BULLETS)</b><br>This weapon does not reload via a removable magazine, a clip, or a cylinder, but has a loading gate or a tubular magazine that requires loading bullets one at a time. The number of rounds that can be loaded in a single action is specified by the property\'s level.',

  'silenced': '<b>SILENCED</b><br>This weapon produces minimal noise when fired, making it difficult to locate the shooter and not triggering panic among distant bystanders.',

  'discreet': '<b>DISCREET</b><br>This weapon is small or easily concealable. It can be carried without drawing attention.',

  // Armor properties
  'brittle': '<b>BRITTLE (CRITICAL DAMAGE VALUE)</b><br>Armor plates can be hardened, increasing the armor value by 1 point. However, this process also makes the material brittle. If the armor takes a certain amount of damage (determined by the property\'s value), the plates crack and permanently lose 1 point of their armor value.',

  'hermetic': '<b>HERMETIC (BONUS SUCCESSES)</b><br>This armor provides reliable protection against toxins, germs, and spore infections. When making a roll to counter contamination, the wearer gains automatic successes equal to the property\'s value.',

  'fireproof': '<b>FIREPROOF (ARMOR)</b><br>Fireproof armor shows its full potential in the infernal flames of a Spitfire: the property\'s value is used instead of the armor value. Furthermore, the armor never catches fire.',

  'unstable': '<b>UNSTABLE (CRITICAL DAMAGE VALUE)</b><br>Iron plates bolted together or pieces of leather and metal bound with cables can be assembled very quickly. However, each blow weakens them. If the damage reaches or exceeds the property\'s value, the unstable armor loses 1 point of its armor value. It is possible to recover 1 armor point with 1 kg of scrap and an AGI+Craft roll.',

  'insulating': '<b>INSULATING</b><br>This material fully protects the armor\'s wearer against electric shocks. All electricity damage is reduced to zero.',

  'massive': '<b>MASSIVE (ARMOR)</b><br>Armor made up of plates or cast in a single piece. Blades, sharp or pointed objects are deflected or turned away: the protection score against these weapons is higher (armor value = property value).<br><br>However, Massive armor is vulnerable to blunt weapons. If the damage dealt by blunt weapons (including Triggers) exceeds the normal armor value, Flashwounds are dealt as normal, but Triggers also inflict additional Traumas.',

  'bulletproof': '<b>BULLETPROOF (ARMOR)</b><br>Bulletproof armor absorbs the kinetic energy of a projectile fired by a firearm. Against this type of attack, the property\'s value replaces the armor value.',

  'first impression': '<b>FIRST IMPRESSION (BONUS)</b><br>The armor makes an impression, and its wearer gains a bonus to social interactions upon first contact with strangers.',

  'respected': '<b>RESPECTED (TARGET GROUP, BONUS DICE)</b><br>This armor is respected by a part of the population. Its wearer gains a dice bonus to all social interactions with this group.',

  'terrifying (armor)': '<b>TERRIFYING (DIFFICULTY)</b><br>An aspect of the armor triggers an instinctive fear in those who behold it. If their PSY+Faith/Will roll fails, they suffer a -2D penalty to their attacks against the armor\'s wearer. This roll can be made before each attack: once this fear is overcome, they become immune for the rest of the combat.',

  // Chemical agents
  'lure': '<b>LURE (TARGET)</b><br>A lure always attracts a specific person, or a group of people with identical characteristics. It influences behavior, most often through pheromones that draw the target in.',

  'poisoned': '<b>POISONED (POTENCY, EFFECT, DURATION)</b><br>The chemical agent attacks its target\'s metabolism. The target must succeed on a PHY+Resistance roll against the agent\'s Potency to counter its effects. Gas masks and armor with the \'Hermetic\' property offer protection in the form of automatic successes, provided the agent has not been ingested or injected.',

  'virtual exsporiator': '<b>VIRTUAL EXSPORIATOR (EXSPORIATOR, DURATION)</b><br>The catalytic effect of the spores is blocked for a set duration, and the level of sporulation in a Leperos or Psychonaut temporarily decreases by a number equal to the Exsporiator points. Once the time has elapsed, the target regains their full number of Spore Infestations.',

  'narcotic': '<b>NARCOTIC (POTENCY, DAMAGE)</b><br>A narcotic damages the nervous system. A PHY+Resistance roll is allowed. Gas masks and armor with the \'Hermetic\' property offer protection. On failure, the damage points and Triggers are removed from the enemy\'s Ego points.',

  // Traps
  'stealth': '<b>STEALTH (DIFFICULTY)</b><br>The first value of a trap indicates its stealth rating. If a potential victim approaches, they can spot the trap in time with a successful INS+Perception roll. The value determines the difficulty. If the roll fails, the victim gets too close and the trap is triggered.',
}

export function getPropertyDescription(propertyText: string): string | undefined {
  const base = propertyText.trim().split('(')[0].trim().toLowerCase()
  return WEAPON_PROPERTY_DESCRIPTIONS[base]
}

export function parseProperties(str: string | undefined): string[] {
  if (!str) return []
  const result: string[] = []
  let depth = 0
  let current = ''
  for (const char of str) {
    if (char === '(') depth++
    else if (char === ')') depth--
    if (char === ',' && depth === 0) {
      if (current.trim()) result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  if (current.trim()) result.push(current.trim())
  return result
}
