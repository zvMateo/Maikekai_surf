import { useEffect, useRef, useState, useCallback } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
  once?: boolean
}

/**
 * Hook for intersection observer - useful for lazy loading and scroll animations
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    root = null,
    once = true
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const targetRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersectingNow = entry.isIntersecting
        setIsIntersecting(isIntersectingNow)

        if (isIntersectingNow && !hasIntersected) {
          setHasIntersected(true)
          if (once) {
            observer.unobserve(target)
          }
        }
      },
      {
        threshold,
        rootMargin,
        root
      }
    )

    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [threshold, rootMargin, root, once, hasIntersected])

  return {
    targetRef,
    isIntersecting,
    hasIntersected
  }
}

/**
 * Hook for lazy loading components
 */
export function useLazyLoading(delay: number = 0) {
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    once: true
  })

  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (hasIntersected) {
      if (delay > 0) {
        const timer = setTimeout(() => setShouldLoad(true), delay)
        return () => clearTimeout(timer)
      } else {
        setShouldLoad(true)
      }
    }
  }, [hasIntersected, delay])

  return {
    targetRef,
    shouldLoad,
    hasIntersected
  }
}

/**
 * Hook for scroll-based animations
 */
export function useScrollAnimation(options: UseIntersectionObserverOptions = {}) {
  const { targetRef, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '50px',
    ...options
  })

  return {
    targetRef,
    isVisible: isIntersecting,
    hasBeenVisible: hasIntersected
  }
}

/**
 * Hook for tracking scroll position and direction
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const lastScrollTop = useRef(0)
  const scrollTimer = useRef<NodeJS.Timeout>()

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // Determine direction
    if (scrollTop > lastScrollTop.current) {
      setScrollDirection('down')
    } else if (scrollTop < lastScrollTop.current) {
      setScrollDirection('up')
    }

    lastScrollTop.current = scrollTop
    setScrollPosition(scrollTop)
    setIsScrolling(true)

    // Clear existing timer
    if (scrollTimer.current) {
      clearTimeout(scrollTimer.current)
    }

    // Set scroll end timer
    scrollTimer.current = setTimeout(() => {
      setIsScrolling(false)
    }, 150)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current)
      }
    }
  }, [handleScroll])

  return {
    scrollPosition,
    scrollDirection,
    isScrolling
  }
}

/**
 * Hook for smooth scroll to element
 */
export function useSmoothScroll() {
  const scrollToElement = useCallback((
    elementId: string,
    offset: number = 0,
    behavior: ScrollBehavior = 'smooth'
  ) => {
    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior
      })
    }
  }, [])

  const scrollToTop = useCallback((behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({
      top: 0,
      behavior
    })
  }, [])

  return {
    scrollToElement,
    scrollToTop
  }
}

/**
 * Hook for element size tracking
 */
export function useElementSize<T extends HTMLElement = HTMLElement>() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setSize({ width, height })
      }
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.unobserve(element)
    }
  }, [])

  return {
    elementRef,
    size
  }
}

/**
 * Hook for viewport size
 */
export function useViewportSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

/**
 * Hook for detecting if user prefers reduced motion
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}
