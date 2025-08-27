import { createNavigation } from 'next-intl/navigation'
import { locales, defaultLocale } from './i18n'

export const { Link, useRouter, usePathname } = createNavigation({
  locales,
  defaultLocale,
})
