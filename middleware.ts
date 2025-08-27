import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'
import { locales, defaultLocale } from './src/i18n'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
})

export default function middleware(request: NextRequest) {
  const locale = request.cookies.get('NEXT_LOCALE')?.value
  const response = intlMiddleware(request, { locale })
  response.headers.set(
    'Cache-Control',
    'public, max-age=3600, stale-while-revalidate=86400',
  )
  return response
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
