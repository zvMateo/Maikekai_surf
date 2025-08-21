/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Configuración para optimizar imágenes
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Configuración optimizada para mejor performance
  experimental: {
    optimizeServerReact: true,
  },
  
  // Headers para optimizar assets estáticos
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Configuración de build optimizada
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configuración del directorio raíz
  outputFileTracingRoot: __dirname,
  
  // Configuración de memoria y performance
  webpack: (config, { dev, isServer }) => {
    // Optimización de memoria
    config.cache = {
      type: 'memory',
    }
    
    // Configuración específica para desarrollo
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['node_modules/**', '.next/**'],
      }
    }
    
    // Optimizaciones de producción
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
        },
      }
    }
    
    return config
  },
  
  // Optimización del bundle
  productionBrowserSourceMaps: false,
  
  // Configuración de TypeScript optimizada
  typescript: {
    // Solo en desarrollo, ignorar errores de tipos para acelerar build
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig
