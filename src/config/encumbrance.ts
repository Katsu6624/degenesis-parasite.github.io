import { ITEMS } from '@/config/items'
import type { InventoryPurchase, Item } from '@/config/items'

export function calculateInventoryEncumbrance(
  inventory: InventoryPurchase[],
  items: Item[] = ITEMS,
): number {
  const itemsById = new Map(items.map((i) => [i.id, i]))

  // Identify containers that reduce encumbrance
  const hasBackpack = inventory.some((p) => p.itemId === 'sac-dos')
  const hasSled = inventory.some((p) => p.itemId === 'traineau')
  const hasHandcart = inventory.some((p) => p.itemId === 'charrette-bras')

  // Weapons and armor are "protected", not packable into a backpack/sled
  const protectedCategories = new Set([
    'armesDeCorpsACorps',
    'armesDeLutte',
    'armesDeJet',
    'armesAProjectiles',
    'armesDePoing',
    'fusils',
    'armesLourdes',
    'armesSoniques',
    'armures',
    'boucliers',
  ])

  let total = 0
  let packable = 0

  for (const purchase of inventory) {
    const item = itemsById.get(purchase.itemId)
    if (!item) continue
    const enc = item.encumbrance ?? 0
    if (enc <= 0) continue
    total += enc
    if (!protectedCategories.has(item.category)) {
      packable += enc
    }
  }

  // Backpack and sled each remove their own encumbrance contribution from the packable total
  // (the item itself is counted already; the rule is that items inside don't count)
  // Simplified: each container reduces packable encumbrance by its own encumbrance value (1)
  let reduction = 0
  if (hasBackpack) reduction += itemsById.get('sac-dos')?.encumbrance ?? 1
  if (hasSled) reduction += itemsById.get('traineau')?.encumbrance ?? 1
  if (hasHandcart) reduction = Math.min(total, reduction + 3)

  return Math.max(0, total - Math.min(packable, reduction))
}
