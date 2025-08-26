/**
 * Application constants and configuration
 */

// App Information
export const APP_CONFIG = {
  name: 'Maikekai Surf',
  description: 'Premier surf hotel and lessons in Costa Rica',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  contact: {
    email: 'info@maikekaisurf.com',
    phone: '+506 2777 5050',
    whatsapp: '+506 8888 8888',
  },
  social: {
    instagram: 'https://instagram.com/maikekaisurf',
    facebook: 'https://facebook.com/maikekaisurf',
    youtube: 'https://youtube.com/@maikekaisurf',
  },
} as const

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  BOOKING: '/booking',
  LESSONS: '/lessons',
  ACCOMMODATION: '/accommodation',
} as const

// Surf Plan Types
export const SURF_PLANS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  ACCOMMODATION: 'accommodation',
} as const

// Animation Durations
export const ANIMATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 0.8,
} as const

// Animation Defaults
export const ANIMATION_DEFAULTS = {
  duration: 0.6,
  stagger: 0.1,
  ease: "easeOut",
  viewport: { once: true },
} as const

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

// API Endpoints
export const API_ENDPOINTS = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
} as const

// Default Values
export const DEFAULTS = {
  PROFILE_AVATAR: '/images/default-avatar.png',
  LESSON_DURATION: 120, // minutes
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB
  DEBOUNCE_DELAY: 300, // ms
} as const
