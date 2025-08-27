'use client'

import { Star, Quote, MapPin, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { StarRating } from './StarRating'
import { formatDate } from '@/lib/utils'
import type { Review } from '@/types/reviews'

interface ReviewCardProps {
  review: Review
  className?: string
  showPlatform?: boolean
}

export function ReviewCard({ 
  review, 
  className = '',
  showPlatform = true 
}: ReviewCardProps) {
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'google': return 'text-blue-600'
      case 'tripadvisor': return 'text-green-600'
      case 'booking': return 'text-blue-700'
      default: return 'text-gray-600'
    }
  }

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'google': return 'Google'
      case 'tripadvisor': return 'TripAdvisor'
      case 'booking': return 'Booking.com'
      default: return 'Verificado'
    }
  }

  return (
    <Card className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}>
      {/* Quote Icon */}
      <Quote className="absolute top-4 right-4 h-8 w-8 text-primary-200" />
      
      {/* Platform Badge */}
      {showPlatform && review.platform && (
        <div className="absolute top-4 left-4">
          <div className={`flex items-center space-x-1 text-xs font-medium ${getPlatformColor(review.platform)}`}>
            {review.verified && <CheckCircle className="h-3 w-3" />}
            <span>{getPlatformName(review.platform)}</span>
          </div>
        </div>
      )}
      
      {/* User Info */}
      <div className="flex items-center space-x-4 mb-4 mt-8">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          {review.avatar ? (
            <Image
              src={review.avatar}
              alt={review.name}
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback to initials if image fails
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div className="w-full h-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 font-semibold text-sm">
                {review.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 truncate">{review.name}</h4>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{review.country}</span>
          </div>
        </div>
      </div>

      {/* Rating and Date */}
      <div className="flex items-center justify-between mb-4">
        <StarRating rating={review.rating} size="sm" />
        <span className="text-xs text-gray-500">
          {formatDate(review.date)}
        </span>
      </div>

      {/* Review Text */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed text-sm line-clamp-4">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      {/* Helpful Count */}
      {review.helpful && review.helpful > 0 && (
        <div className="text-xs text-gray-500 border-t border-gray-100 pt-3">
          {review.helpful} persona{review.helpful !== 1 ? 's' : ''} encontraron esto útil
        </div>
      )}

      {/* Business Response */}
      {review.response && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 bg-primary-50 rounded-lg p-3 border-l-4 border-primary-300"
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">MK</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-primary-700">
                {review.response.author}
              </div>
              <div className="text-xs text-primary-600">
                {formatDate(review.response.date)}
              </div>
            </div>
          </div>
          <p className="text-sm text-primary-800 leading-relaxed">
            {review.response.text}
          </p>
        </motion.div>
      )}
    </Card>
  )
}
