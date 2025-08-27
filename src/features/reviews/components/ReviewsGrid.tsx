'use client'

import { motion } from 'framer-motion'
import { ReviewCard } from './ReviewCard'
import { ANIMATION_DEFAULTS } from '@/lib/constants'
import type { Review } from '@/types/reviews'

interface ReviewsGridProps {
  reviews: Review[]
  className?: string
}

export function ReviewsGrid({ reviews, className = '' }: ReviewsGridProps) {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 ${className}`}>
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: ANIMATION_DEFAULTS.duration,
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          viewport={{ once: true }}
          whileHover={{ 
            y: -5,
            transition: { duration: 0.3 }
          }}
        >
          <ReviewCard review={review} />
        </motion.div>
      ))}
    </div>
  )
}
