import type { ItemTranslation } from '../types'
import { itemTranslationsFr } from './fr'
import { itemTranslationsEn } from './en'

const localeMap: Record<string, Record<string, ItemTranslation>> = {
  fr: itemTranslationsFr,
  en: itemTranslationsEn,
}

export function getItemTranslation(itemId: string, locale: string): ItemTranslation | undefined {
  const map = localeMap[locale] ?? localeMap['fr']
  return map[itemId]
}
