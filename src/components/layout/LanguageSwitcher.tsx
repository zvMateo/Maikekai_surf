'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'

export default function LanguageSwitcher() {
  const t = useTranslations('common.language')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value
    setCookie('NEXT_LOCALE', newLocale)
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <select
      aria-label={t('label')}
      value={locale}
      onChange={handleChange}
      className="bg-transparent border rounded-md px-2 py-1 text-sm"
    >
      <option value="en">{t('en')}</option>
      <option value="es">{t('es')}</option>
    </select>
  )
}
