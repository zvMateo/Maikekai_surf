'use client'

import { SignUp } from '@clerk/nextjs'
import { useLocale } from 'next-intl'
import { useEffect } from 'react'
import { setCookie } from 'cookies-next'

export default function SignUpPage() {
  const locale = useLocale()

  useEffect(() => {
    setCookie('NEXT_LOCALE', locale)
  }, [locale])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignUp signInUrl={`/${locale}/auth`} />
    </div>
  )
}
