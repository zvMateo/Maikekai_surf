import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Validar que las URLs son válidas para desarrollo
  if (
    !supabaseUrl ||
    supabaseUrl === 'your_supabase_project_url' ||
    !supabaseUrl.startsWith('http')
  ) {
    console.warn(
      '⚠️  Usando variables de entorno de desarrollo. Configura .env.local con credenciales reales de Supabase.'
    );
    // Retornar un cliente mock para desarrollo
    return null as any;
  }

  if (!supabaseKey) {
    console.warn(
      '⚠️  Falta NEXT_PUBLIC_SUPABASE_ANON_KEY. Configura .env.local con credenciales reales de Supabase.'
    );
    return null as any;
  }

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
