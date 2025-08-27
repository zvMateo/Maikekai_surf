'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Star, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ANIMATION_DEFAULTS } from '@/lib/constants'

interface GoogleCTAProps {
  businessId?: string
  className?: string
  variant?: 'default' | 'compact'
}

export function GoogleCTA({ 
  businessId, 
  className = '',
  variant = 'default'
}: GoogleCTAProps) {
  const googleReviewUrl = businessId 
    ? `https://search.google.com/local/writereview?placeid=${businessId}`
    : 'https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review'

  const googleBusinessUrl = businessId
    ? `https://www.google.com/maps/place/?q=place_id:${businessId}`
    : 'https://www.google.com/maps/search/maikekai+surf'

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DEFAULTS.duration }}
        viewport={{ once: true }}
        className={`text-center ${className}`}
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            size="md"
            onClick={() => window.open(googleReviewUrl, '_blank')}
            className="inline-flex items-center space-x-2"
          >
            <Star className="h-4 w-4" />
            <span>Escribir Reseña</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="md"
            onClick={() => window.open(googleBusinessUrl, '_blank')}
            className="inline-flex items-center space-x-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Ver Todas</span>
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_DEFAULTS.duration }}
      viewport={{ once: true }}
      className={`text-center ${className}`}
    >
      <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50">
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Star className="h-8 w-8 text-primary-600" />
          </div>
          
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
            ¿Has estado con nosotros?
          </h3>
          
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Nos encantaría conocer tu experiencia. Déjanos una reseña en Google 
            y ayuda a otros viajeros a descubrir la magia de{' '}
            <span className="font-semibold text-primary-600">Maikekai Surf</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.open(googleReviewUrl, '_blank')}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
          >
            <Star className="h-5 w-5" />
            <span>Escribir Reseña en Google</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open(googleBusinessUrl, '_blank')}
            className="inline-flex items-center space-x-2 border-2 hover:bg-gray-50"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Ver Todas las Reseñas</span>
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-6 pt-6 border-t border-gray-200"
        >
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Verificado por Google</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Respuesta garantizada</span>
            </div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}
