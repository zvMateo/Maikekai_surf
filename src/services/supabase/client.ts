

  // Validar que las URLs son válidas para desarrollo
  if (
    !supabaseUrl ||
    supabaseUrl === 'your_supabase_project_url' ||
    !supabaseUrl.startsWith('http')
  ) {
    console.warn(
      '⚠️  Usando variables de entorno de desarrollo. Configura .env.local con credenciales reales de Supabase.'

  }

  if (!supabaseKey) {
    console.warn(
      '⚠️  Falta NEXT_PUBLIC_SUPABASE_ANON_KEY. Configura .env.local con credenciales reales de Supabase.'

}
