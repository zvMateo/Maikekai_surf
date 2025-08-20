# 🏄‍♂️ Configuración de Supabase para Maikekai Surf

## Paso a Paso

### 1. Crear Proyecto en Supabase
- Ve a [supabase.com](https://supabase.com)
- Crea cuenta o inicia sesión
- "New Project" → Completa datos:
  - Name: `maikekai-surf`
  - Region: `us-west-1` (más cercana a Costa Rica)
  - Database password: (genera una segura y guárdala)

### 2. Obtener Credenciales
**En tu proyecto de Supabase:**
- Ve a `Settings` → `API`
- Copia:
  - **Project URL**: `https://xxxxx.supabase.co`
  - **Project API Key** (anon public): `eyJhbG...`

### 3. Actualizar Variables de Entorno
**Edita `.env.local`:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-real
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Ejecutar Schema de Base de Datos
**En el dashboard de Supabase:**
- Ve a `SQL Editor`
- Nueva query
- Copia y pega TODO el contenido de `supabase-schema.sql`
- Ejecutar (botón "Run")

### 5. Configurar Authentication
**En Supabase Dashboard:**
- `Authentication` → `Settings`
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: `http://localhost:3000/auth/**`
- Habilitar confirmaciones por email (opcional)

### 6. Reiniciar Servidor
```bash
npm run dev
```

## ✅ Verificación

Una vez configurado, deberías ver:
- ✅ No warnings de "Supabase no configurado"
- ✅ Componentes de autenticación funcionales
- ✅ Datos reales cargándose desde Supabase

## 🎯 Datos de Prueba

El schema incluye datos de ejemplo:
- 3 planes de surf (Principiante, Intermedio, Avanzado)
- Reseñas de clientes
- Estructura completa de tablas

¡Listo para surfear! 🌊
