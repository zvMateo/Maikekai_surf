'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { ReviewsGrid } from './ReviewsGrid'
import { GoogleCTA } from './GoogleCTA'
import { useReviews } from '@/features/reviews/hooks/useReviews'
import { LoadingSkeleton } from '@/components/ui/Loading'
import { ANIMATION_DEFAULTS } from '@/lib/constants'

interface ReviewsProps {
  className?: string
  showGoogleCTA?: boolean
  maxReviews?: number
}

export default function Reviews({ 
  className = '', 
  showGoogleCTA = true,
  maxReviews = 6
}: ReviewsProps) {
  const { reviews, loading, error, stats } = useReviews({ limit: maxReviews })

  return (
    <section 
      id="reseñas" 
      className={`py-20 bg-gradient-to-b from-gray-50 to-white ${className}`}
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DEFAULTS.duration }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Lo que dicen nuestros{' '}
            <span className="text-primary-600 relative">
              Huéspedes
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-primary-300 origin-left rounded-full"
              />
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Más de {stats?.totalReviews || 500} surfistas satisfechos han vivido la experiencia Maikekai Surf.{' '}
            <span className="font-semibold text-primary-600">
              Lee sus reseñas reales de Google.
            </span>
          </p>
          
          {/* Google Rating Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: ANIMATION_DEFAULTS.duration, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 px-8 py-6 mb-12"
          >
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.5 + (i * 0.1),
                      type: "spring",
                      stiffness: 200 
                    }}
                    viewport={{ once: true }}
                  >
                    <Star className="h-6 w-6 text-yellow-400 fill-current drop-shadow-sm" />
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
                className="text-3xl font-display font-bold text-gray-900 mb-1"
              >
                {stats?.averageRating || '4.9'}
              </motion.div>
              
              <div className="text-sm text-gray-600 font-medium">
                {stats?.totalReviews || 542} reseñas en{' '}
                <span className="text-blue-600 font-semibold">Google</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Reviews Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: maxReviews }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <LoadingSkeleton lines={1} height="h-3" width="w-32" className="mb-3" />
                <LoadingSkeleton lines={2} height="h-4" width="w-full" className="mb-4" />
                <LoadingSkeleton lines={1} height="h-3" width="w-24" />
              </div>
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-700">
                No se pudieron cargar las reseñas en este momento.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-3 text-red-600 hover:text-red-800 font-medium underline"
              >
                Intentar de nuevo
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            <ReviewsGrid reviews={reviews} />
            
            {showGoogleCTA && (
              <GoogleCTA 
                businessId={process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_ID}
                className="mt-12"
              />
            )}
          </>
        )}
      </div>
    </section>
  )
}
