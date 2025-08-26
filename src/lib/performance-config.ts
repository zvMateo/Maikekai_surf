/**
 * Performance optimization configuration for Maikekai Surf
 */

export const PERFORMANCE_CONFIG = {
  // Core Web Vitals thresholds
  thresholds: {
    lcp: {
      good: 2500,
      needsImprovement: 4000
    },
    fid: {
      good: 100,
      needsImprovement: 300
    },
    cls: {
      good: 0.1,
      needsImprovement: 0.25
    },
    fcp: {
      good: 1800,
      needsImprovement: 3000
    },
    ttfb: {
      good: 800,
      needsImprovement: 1800
    }
  },

  // Lazy loading configuration
  lazyLoading: {
    imageThreshold: '100px',
    componentThreshold: '50px',
    defaultDelay: 100
  },

  // Animation preferences
  animations: {
    defaultDuration: 300,
    reducedMotionDuration: 0,
    staggerDelay: 100
  },

  // Bundle optimization
  bundle: {
    chunkSizeWarningLimit: 500,
    maxInitialRequests: 3,
    maxAsyncRequests: 5
  },

  // Cache configuration
  cache: {
    staticAssets: '1y',
    images: '1y',
    html: '1h',
    api: '5m'
  }
}

export type PerformanceConfig = typeof PERFORMANCE_CONFIG

// Environment-specific overrides
export const getPerformanceConfig = (env: string = process.env.NODE_ENV || 'development'): PerformanceConfig => {
  const baseConfig = { ...PERFORMANCE_CONFIG }

  switch (env) {
    case 'development':
      return {
        ...baseConfig,
        lazyLoading: {
          ...baseConfig.lazyLoading,
          defaultDelay: 0 // No delay in development
        }
      }
    case 'production':
      return baseConfig
    case 'test':
      return {
        ...baseConfig,
        animations: {
          ...baseConfig.animations,
          defaultDuration: 0,
          staggerDelay: 0
        }
      }
    default:
      return baseConfig
  }
}

// Feature flags for performance optimizations
export const PERFORMANCE_FEATURES = {
  enablePerformanceWidget: process.env.NODE_ENV === 'development',
  enableLazyLoading: true,
  enableImageOptimization: true,
  enableBundleAnalysis: process.env.ANALYZE === 'true',
  enableServiceWorker: process.env.NODE_ENV === 'production',
  enableCDN: process.env.NODE_ENV === 'production',
  enablePreloading: true,
  enablePrefetching: true
} as const

// Performance monitoring events
export const PERFORMANCE_EVENTS = {
  PAGE_LOAD: 'page_load',
  COMPONENT_RENDER: 'component_render',
  IMAGE_LOAD: 'image_load',
  API_CALL: 'api_call',
  USER_INTERACTION: 'user_interaction',
  ERROR: 'error'
} as const

// Resource priorities
export const RESOURCE_PRIORITIES = {
  critical: [
    'font-display',
    'hero-image',
    'above-fold-css'
  ],
  high: [
    'header-logo',
    'navigation-items',
    'cta-buttons'
  ],
  medium: [
    'section-images',
    'card-content',
    'social-icons'
  ],
  low: [
    'footer-content',
    'analytics',
    'third-party-widgets'
  ]
} as const

// SEO and performance optimizations
export const SEO_PERFORMANCE = {
  preloadCriticalResources: [
    '/fonts/inter-var.woff2',
    '/fonts/poppins-var.woff2'
  ],
  prefetchResources: [
    '/api/plans',
    '/api/reviews'
  ],
  criticalCSS: [
    'layout',
    'hero',
    'navigation'
  ],
  deferredJS: [
    'analytics',
    'chat-widget',
    'social-widgets'
  ]
} as const

// Image optimization settings
export const IMAGE_OPTIMIZATION = {
  formats: ['webp', 'avif'],
  qualities: {
    hero: 90,
    cards: 80,
    thumbnails: 70,
    backgrounds: 85
  },
  sizes: {
    mobile: '(max-width: 768px) 100vw',
    tablet: '(max-width: 1200px) 50vw',
    desktop: '33vw'
  },
  placeholders: {
    blur: true,
    lowQuality: true,
    skeleton: true
  }
} as const

// Monitoring configuration
export const MONITORING_CONFIG = {
  sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  enableConsoleLogging: process.env.NODE_ENV === 'development',
  enableAnalytics: process.env.NODE_ENV === 'production',
  enableErrorReporting: true,
  enablePerformanceReporting: true,
  endpoints: {
    analytics: '/api/analytics',
    errors: '/api/errors',
    performance: '/api/performance'
  }
} as const
