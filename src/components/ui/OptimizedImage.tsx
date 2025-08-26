'use client'

import { useState, useRef, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { motion } from 'framer-motion'
import { useLazyLoading } from '@/hooks/useOptimization'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'loading'> {
  fallbackSrc?: string
  showPlaceholder?: boolean
  placeholderClassName?: string
  containerClassName?: string
  loadingDelay?: number
  animateOnLoad?: boolean
  blurDataURL?: string
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc,
  showPlaceholder = true,
  placeholderClassName,
  containerClassName,
  loadingDelay = 0,
  animateOnLoad = true,
  className,
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const { targetRef, shouldLoad } = useLazyLoading(loadingDelay)

  // Reset states when src changes
  useEffect(() => {
    setIsLoaded(false)
    setHasError(false)
    setCurrentSrc(src)
  }, [src])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setIsLoaded(false)
    }
  }

  // Generate a simple placeholder if no blurDataURL is provided
  const defaultBlurDataURL = blurDataURL || 
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNjY2MiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+"

  return (
    <div ref={targetRef as React.RefObject<HTMLDivElement>} className={cn("relative overflow-hidden", containerClassName)}>
      {/* Placeholder */}
      {showPlaceholder && !isLoaded && (
        <div className={cn(
          "absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center",
          placeholderClassName
        )}>
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}

      {/* Main Image */}
      {shouldLoad && (
        <motion.div
          initial={animateOnLoad ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn("relative", className)}
        >
          <Image
            src={currentSrc}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            placeholder="blur"
            blurDataURL={defaultBlurDataURL}
            className={cn(
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            {...props}
          />
        </motion.div>
      )}

      {/* Error State */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image not available</div>
          </div>
        </div>
      )}
    </div>
  )
}

// Preset configurations for common use cases
export const ImagePresets = {
  hero: {
    priority: true,
    quality: 90,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw",
    animateOnLoad: true,
  },
  card: {
    quality: 80,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    animateOnLoad: true,
    loadingDelay: 100,
  },
  avatar: {
    quality: 75,
    sizes: "200px",
    animateOnLoad: false,
    loadingDelay: 0,
  },
  thumbnail: {
    quality: 70,
    sizes: "150px",
    animateOnLoad: false,
    loadingDelay: 200,
  },
  background: {
    quality: 85,
    priority: false,
    sizes: "100vw",
    animateOnLoad: false,
    loadingDelay: 500,
  }
}

// Helper component for responsive images with different sources
interface ResponsiveImageProps extends OptimizedImageProps {
  sources?: {
    src: string
    media: string
  }[]
}

export function ResponsiveImage({ sources, ...props }: ResponsiveImageProps) {
  if (!sources || sources.length === 0) {
    return <OptimizedImage {...props} />
  }

  return (
    <picture>
      {sources.map((source, index) => (
        <source
          key={index}
          srcSet={source.src}
          media={source.media}
        />
      ))}
      <OptimizedImage {...props} />
    </picture>
  )
}

// Helper component for gallery/grid images
interface GalleryImageProps extends OptimizedImageProps {
  index: number
  totalImages: number
}

export function GalleryImage({ index, totalImages, loadingDelay, ...props }: GalleryImageProps) {
  // Stagger loading delay based on position
  const calculatedDelay = loadingDelay || (index * 100)
  
  return (
    <OptimizedImage
      {...props}
      loadingDelay={calculatedDelay}
      quality={ImagePresets.card.quality}
      sizes={ImagePresets.card.sizes}
      animateOnLoad={ImagePresets.card.animateOnLoad}
    />
  )
}
