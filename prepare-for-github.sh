#!/bin/bash

# Script para preparar el proyecto para GitHub
echo "🏄‍♂️ Preparando Maikekai Surf para GitHub..."

# Eliminar archivos de desarrollo que no queremos subir
echo "🧹 Limpiando archivos temporales..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No estás en el directorio del proyecto"
    exit 1
fi

# Eliminar archivos de test y desarrollo
rm -f test-*.js
rm -f verify-supabase.js
rm -f *-fix*.sql
rm -f setup-supabase.sh

echo "✅ Archivos de desarrollo eliminados"

# Verificar que .env.local está en .gitignore
if ! grep -q ".env.local" .gitignore; then
    echo ".env.local" >> .gitignore
    echo "✅ .env.local agregado a .gitignore"
fi

echo "📁 Archivos listos para GitHub:"
echo "✅ Código fuente (src/)"
echo "✅ Configuraciones"
echo "✅ README.md"
echo "✅ Schema de Supabase"
echo "✅ Documentación"
echo ""
echo "❌ Variables de entorno (.env.local) - protegido"
echo "❌ Archivos de test - removidos"
echo "❌ Scripts de desarrollo - removidos"

echo ""
echo "🚀 Listo para hacer commit y push a GitHub!"
echo ""
echo "Comandos sugeridos:"
echo "git add ."
echo "git commit -m '🏄‍♂️ feat: Complete Maikekai Surf website with Next.js + Supabase'"
echo "git push -u origin main"
