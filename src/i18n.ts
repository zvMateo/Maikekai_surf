import { getRequestConfig } from 'next-intl/server'

export const locales = ['en', 'es'] as const
export const defaultLocale = 'en'

export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || defaultLocale
  const messages = {
    common: (await import(`../public/locales/${locale}/common.json`)).default,
    hero: (await import(`../public/locales/${locale}/hero.json`)).default,
    catalog: (await import(`../public/locales/${locale}/catalog.json`)).default,
  }
  return { locale, messages }
})
