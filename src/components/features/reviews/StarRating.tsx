'use client'

import { Star, StarHalf } from 'lucide-react'
import { motion } from 'framer-motion'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'xs' | 'sm' | 'md' | 'lg'
  showNumber?: boolean
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  className?: string
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = false,
  interactive = false,
  onRatingChange,
  className = ''
}: StarRatingProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'xs': return 'h-3 w-3'
      case 'sm': return 'h-4 w-4'
      case 'md': return 'h-5 w-5'
      case 'lg': return 'h-6 w-6'
      default: return 'h-5 w-5'
    }
  }

  const getTextSize = () => {
    switch (size) {
      case 'xs': return 'text-xs'
      case 'sm': return 'text-sm'
      case 'md': return 'text-base'
      case 'lg': return 'text-lg'
      default: return 'text-base'
    }
  }

  const renderStar = (index: number) => {
    const starNumber = index + 1
    const isFilled = starNumber <= Math.floor(rating)
    const isHalf = starNumber === Math.ceil(rating) && rating % 1 !== 0
    const isEmpty = starNumber > Math.ceil(rating)

    const StarIcon = isHalf ? StarHalf : Star

    return (
      <motion.button
        key={index}
        type="button"
        disabled={!interactive}
        onClick={() => interactive && onRatingChange && onRatingChange(starNumber)}
        whileHover={interactive ? { scale: 1.1 } : {}}
        whileTap={interactive ? { scale: 0.95 } : {}}
        className={`
          ${getSizeClasses()}
          ${interactive 
            ? 'cursor-pointer hover:text-yellow-400 transition-colors' 
            : 'cursor-default'
          }
          ${isFilled || isHalf 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
          }
          ${isEmpty && interactive ? 'hover:text-yellow-300' : ''}
        `}
        aria-label={`${starNumber} star${starNumber !== 1 ? 's' : ''}`}
      >
        <StarIcon className="drop-shadow-sm" />
      </motion.button>
    )
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex items-center space-x-0.5">
        {Array.from({ length: maxRating }, (_, index) => renderStar(index))}
      </div>
      
      {showNumber && (
        <span className={`ml-2 font-medium text-gray-700 ${getTextSize()}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
