# 🚀 Despliegue en Vercel - Maikekai Surf

## Pasos para Desplegar

### Método 1: Desde la Web de Vercel (Recomendado)

#### 1. Ir a Vercel
- Ve a [vercel.com](https://vercel.com)
- Inicia sesión con tu cuenta de GitHub

#### 2. Importar Proyecto
- Click en "Add New..." → "Project"
- Selecciona "Import Git Repository"
- Busca y selecciona `Maikekai_surf`
- Click en "Import"

#### 3. Configurar el Proyecto
- **Framework Preset**: Next.js (se detecta automáticamente)
- **Root Directory**: `./` (raíz del proyecto)
- **Build and Output Settings**: Usar configuración por defecto

#### 4. Configurar Variables de Entorno
En la sección "Environment Variables", agregar:

```
NEXT_PUBLIC_SUPABASE_URL = https://ijbqjfowauvlsyifuybx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqYnFqZm93YXV2bHN5aWZ1eWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NjExNzQsImV4cCI6MjA3MTIzNzE3NH0.QJccXrX2tcBKv05pR9MzUrb2iLBMibVGJoKCSjXRkWg
NEXT_PUBLIC_SITE_URL = https://tu-proyecto.vercel.app
```

#### 5. Desplegar
- Click en "Deploy"
- Esperar a que termine el build (2-3 minutos)

### Método 2: Vercel CLI

#### 1. Instalar Vercel CLI
```bash
npm i -g vercel
```

#### 2. Login a Vercel
```bash
vercel login
```

#### 3. Desplegar desde el proyecto
```bash
cd C:\\Users\\Usuario\\proyectos\\maikekai-surf
vercel --prod
```

## 📋 Checklist de Despliegue

### Antes del Despliegue:
- ✅ Build local exitoso (`npm run build`)
- ✅ Variables de entorno configuradas
- ✅ Código subido a GitHub
- ✅ Supabase configurado y funcionando

### Durante el Despliegue:
- ✅ Proyecto importado en Vercel
- ✅ Variables de entorno agregadas
- ✅ Build completado sin errores
- ✅ URL de producción generada

### Después del Despliegue:
- ✅ Sitio web accesible
- ✅ Autenticación funcionando
- ✅ Base de datos conectada
- ✅ Todas las páginas cargan correctamente

## 🔧 Configuración Post-Despliegue

### 1. Actualizar Supabase Auth Settings
En tu proyecto de Supabase:
- Authentication → Settings
- **Site URL**: `https://tu-proyecto.vercel.app`
- **Redirect URLs**: `https://tu-proyecto.vercel.app/**`

### 2. Verificar Funcionalidades
- ✅ Landing page carga
- ✅ Registro de usuarios funciona
- ✅ Login funciona
- ✅ Páginas protegidas redirigen correctamente
- ✅ Datos se cargan desde Supabase

## 🌐 URLs Importantes

Una vez desplegado:
- **Sitio principal**: `https://tu-proyecto.vercel.app`
- **Dashboard Vercel**: `https://vercel.com/dashboard`
- **Analytics**: Disponible en el dashboard de Vercel

## 🚨 Solución de Problemas

### Build Fallido:
- Verificar que no hay errores de TypeScript
- Comprobar que todas las dependencias están en package.json
- Revisar que no hay imports faltantes

### Variables de Entorno:
- Asegurarse de que están configuradas en Vercel
- Verificar que los nombres son exactos (case-sensitive)
- Comprobar que no hay espacios extra

### Supabase no Conecta:
- Verificar URLs y keys en variables de entorno
- Actualizar Auth settings en Supabase con nueva URL
- Comprobar que las políticas RLS permiten acceso

## 🎉 ¡Listo!

Tu sitio estará disponible en una URL como:
`https://maikekai-surf-xxx.vercel.app`

¡Pura Vida! 🌊🏄‍♂️
