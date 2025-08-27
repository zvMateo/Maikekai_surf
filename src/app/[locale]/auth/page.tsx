'use client'

import { SignIn } from '@clerk/nextjs'
import { useLocale } from 'next-intl'
import { useEffect } from 'react'
import { setCookie } from 'cookies-next'

export default function AuthPage() {
  const locale = useLocale()

  useEffect(() => {
    setCookie('NEXT_LOCALE', locale)
  }, [locale])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignIn signUpUrl={`/${locale}/sign-up`} />
    </div>
  )
}
