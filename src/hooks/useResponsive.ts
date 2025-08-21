'use client'

import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '@/lib/constants'

interface UseResponsiveReturn {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLarge: boolean
  width: number
  height: number
}

/**
 * Custom hook for responsive design and window dimensions
 */
export function useResponsive(): UseResponsiveReturn {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial dimensions
    updateDimensions()

    // Add event listener
    window.addEventListener('resize', updateDimensions)

    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Return default values during SSR
  if (!mounted) {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isLarge: false,
      width: 1024,
      height: 768,
    }
  }

  const { width, height } = dimensions

  return {
    isMobile: width < BREAKPOINTS.MD,
    isTablet: width >= BREAKPOINTS.MD && width < BREAKPOINTS.LG,
    isDesktop: width >= BREAKPOINTS.LG,
    isLarge: width >= BREAKPOINTS.XL,
    width,
    height,
  }
}
