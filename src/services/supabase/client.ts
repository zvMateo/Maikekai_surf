import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Validar que la URL esté definida antes de usar startsWith
  if (!supabaseUrl) {
    console.warn(
      '⚠️  Falta NEXT_PUBLIC_SUPABASE_URL. Configura .env.local con credenciales reales de Supabase.'
    );
    return null as any;
  }

  // Validar que las URLs sean correctas para desarrollo
  if (
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

  return createBrowserClient(supabaseUrl, supabaseKey);
}
