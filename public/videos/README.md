# 🎥 Optimización de Videos para el Hero

## 📋 Especificaciones Recomendadas

### **Formato y Calidad**
- **Resolución**: 1920x1080 (Full HD) mínimo
- **Duración**: 10-30 segundos (loop perfecto)
- **Formato principal**: MP4 (H.264)
- **Formato alternativo**: WebM (VP9) para mejor compresión
- **Frame rate**: 30fps máximo
- **Bitrate**: 2-4 Mbps para balance calidad/tamaño

### **📁 Estructura de Archivos**
```
public/
├── videos/
│   ├── surf-hero.mp4          # Video principal (H.264)
│   ├── surf-hero.webm         # Video alternativo (WebM)
│   └── surf-hero-mobile.mp4   # Versión móvil (opcional)
└── images/
    ├── surf-poster.jpg        # Imagen de poster del video
    └── surf-fallback.jpg      # Imagen de respaldo
```

## 🛠️ Comandos para Optimización con FFmpeg

### **1. Convertir a MP4 optimizado:**
```bash
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 23 -c:a aac -b:a 128k -movflags +faststart surf-hero.mp4
```

### **2. Convertir a WebM (mejor compresión):**
```bash
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 2M -c:a libopus -b:a 128k surf-hero.webm
```

### **3. Crear versión móvil (720p):**
```bash
ffmpeg -i surf-hero.mp4 -vf scale=1280:720 -c:v libx264 -crf 28 -preset fast surf-hero-mobile.mp4
```

### **4. Extraer frame para poster:**
```bash
ffmpeg -i surf-hero.mp4 -ss 00:00:05 -vframes 1 -q:v 2 surf-poster.jpg
```

## 🚀 Optimizaciones Implementadas

### **Performance**
✅ **Lazy Loading**: Video se carga después de 1 segundo  
✅ **Fallback Image**: Imagen mientras carga el video  
✅ **Error Handling**: Imagen de respaldo si falla el video  
✅ **Accessibility**: Respeta `prefers-reduced-motion`  
✅ **Multiple Formats**: WebM + MP4 para compatibilidad  
✅ **Progressive Loading**: `preload="metadata"`  

### **Quality**
✅ **Object-fit Cover**: Video se ajusta sin distorsión  
✅ **Smooth Transition**: Fade entre imagen y video  
✅ **Custom Overlay**: Gradiente para legibilidad  
✅ **High Quality Fallback**: Imagen de alta resolución  

### **Mobile Optimization**
✅ **playsInline**: Previene fullscreen en iOS  
✅ **Touch-friendly**: No controles de video visibles  
✅ **Responsive**: Se adapta a todos los tamaños  

## 📱 URLs de Videos de Ejemplo (Gratuitos)

### **Surfing Videos (Royalty Free)**
- **Pexels**: https://www.pexels.com/search/videos/surfing/
- **Pixabay**: https://pixabay.com/videos/search/surf/
- **Unsplash**: https://unsplash.com/s/videos/surfing

### **Videos Recomendados para Surf/Costa Rica**
1. Surfing en Costa Rica
2. Olas del Pacífico
3. Sunset surfing
4. Beach lifestyle
5. Tropical waves

## 🎯 Tips para Videos Perfectos

### **📹 Características del Video Ideal:**
- **Loop seamless**: El final conecta suavemente con el inicio
- **Estabilizado**: Sin movimientos bruscos de cámara
- **Buena iluminación**: Evitar videos muy oscuros o muy claros
- **Acción moderada**: Movimiento fluido pero no demasiado frenético
- **Colores vibrantes**: Que complementen el tema de surf

### **⚡ Performance Tips:**
- Videos de 10-20 segundos son ideales
- Manténlo bajo 10MB para carga rápida
- Usa CDN si el archivo es muy grande
- Considera lazy loading para móviles

## 🔧 Personalización del Componente

El componente `VideoHero` acepta estas props:

```tsx
<VideoHero 
  videoSrc="/videos/mi-video.mp4"           // Ruta del video
  posterSrc="/images/mi-poster.jpg"         // Imagen de poster
  fallbackImageSrc="https://..."            // Imagen de respaldo
  className="custom-overlay"                // Clases CSS adicionales
/>
```

## 🎨 Customización de Overlay

Para cambiar el overlay, modifica el gradiente en el componente:

```tsx
{/* Overlay personalizado */}
<div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-blue-800/30 to-blue-900/50" />
```

¡Listo para crear una experiencia visual impactante! 🏄‍♂️🌊
