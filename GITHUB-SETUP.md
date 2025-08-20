# 🚀 Guía para Subir a GitHub

## Pasos para crear el repositorio

### 1. Inicializar Git (si no está inicializado)
```bash
git init
git branch -M main
```

### 2. Agregar archivos al staging
```bash
git add .
```

### 3. Hacer el primer commit
```bash
git commit -m "🏄‍♂️ Initial commit: Maikekai Surf website with Next.js + Supabase"
```

### 4. Crear repositorio en GitHub
- Ve a [github.com](https://github.com)
- Click en "New repository"
- Nombre: `maikekai-surf` o `Maikekai_surf`
- Descripción: "Hotel y Escuela de Surf en Costa Rica - Next.js + Supabase"
- Público o Privado (tu elección)
- **NO** marcar "Add a README file" (ya tienes uno)

### 5. Conectar con GitHub
```bash
git remote add origin https://github.com/TU_USUARIO/maikekai-surf.git
```

### 6. Subir al repositorio
```bash
git push -u origin main
```

## ⚠️ Variables de Entorno

### Archivos que NO se suben (protegidos por .gitignore):
- `.env.local` - Contiene tus credenciales de Supabase
- `node_modules/` - Dependencias (se instalan con npm install)

### Para despliegue en Vercel:
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`

## 📁 Estructura que se sube a GitHub:
```
✅ src/ (todo el código fuente)
✅ public/ (assets estáticos)
✅ package.json
✅ README.md
✅ tailwind.config.js
✅ next.config.js
✅ supabase-schema.sql
✅ todos los archivos de configuración

❌ .env.local (credenciales)
❌ node_modules/ (dependencias)
❌ .next/ (build files)
```

## 🌊 ¡Listo para surfear en GitHub!
