import { updateSession } from '@/services/supabase/middleware'
import { type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en'
})

export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request)
  const supabaseResponse = await updateSession(request)

  if (supabaseResponse.headers.get('location')) {
    return supabaseResponse
  }

  supabaseResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie)
  })

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
