#!/bin/bash

# 🎥 Script de Optimización de Videos para Maikekai Surf
# Este script optimiza videos para uso en el componente Hero

echo "🏄‍♂️ Maikekai Surf - Optimizador de Videos"
echo "=========================================="

# Verificar si FFmpeg está instalado
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg no está instalado."
    echo "📥 Instálalo desde: https://ffmpeg.org/download.html"
    exit 1
fi

# Función para optimizar video principal
optimize_main_video() {
    local input_file="$1"
    local output_file="public/videos/surf-hero.mp4"
    
    echo "🎬 Optimizando video principal..."
    ffmpeg -i "$input_file" \
        -c:v libx264 \
        -preset slow \
        -crf 23 \
        -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -y "$output_file"
    
    echo "✅ Video MP4 creado: $output_file"
}

# Función para crear versión WebM
create_webm_version() {
    local input_file="public/videos/surf-hero.mp4"
    local output_file="public/videos/surf-hero.webm"
    
    echo "🎬 Creando versión WebM..."
    ffmpeg -i "$input_file" \
        -c:v libvpx-vp9 \
        -crf 30 \
        -b:v 2M \
        -c:a libopus \
        -b:a 128k \
        -y "$output_file"
    
    echo "✅ Video WebM creado: $output_file"
}

# Función para crear poster del video
create_poster() {
    local input_file="public/videos/surf-hero.mp4"
    local output_file="public/images/surf-poster.jpg"
    
    echo "📸 Creando imagen poster..."
    ffmpeg -i "$input_file" \
        -ss 00:00:05 \
        -vframes 1 \
        -q:v 2 \
        -y "$output_file"
    
    echo "✅ Poster creado: $output_file"
}

# Función para mostrar información del video
show_video_info() {
    local file="$1"
    echo "📊 Información del video:"
    ffprobe -v quiet -print_format json -show_format -show_streams "$file" | jq '.format.size, .format.duration, .streams[0].width, .streams[0].height'
}

# Menú principal
if [ $# -eq 0 ]; then
    echo "📋 Uso: $0 <video_input>"
    echo "Ejemplo: $0 mi-video-surf.mov"
    exit 1
fi

input_video="$1"

if [ ! -f "$input_video" ]; then
    echo "❌ El archivo '$input_video' no existe."
    exit 1
fi

echo "🎯 Procesando: $input_video"

# Crear directorios si no existen
mkdir -p public/videos
mkdir -p public/images

# Procesar video
optimize_main_video "$input_video"
create_webm_version
create_poster

# Mostrar tamaños de archivo
echo ""
echo "📁 Archivos generados:"
ls -lh public/videos/surf-hero.*
ls -lh public/images/surf-poster.jpg

echo ""
echo "🎉 ¡Optimización completada!"
echo "💡 Ahora puedes usar estos archivos en tu componente Hero."
