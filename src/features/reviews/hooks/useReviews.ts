'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Review, ReviewStats } from '@/types/reviews'

// Mock data que será reemplazado por Google Reviews API
const MOCK_REVIEWS: Review[] = [
  {
    id: 'google_1',
    name: 'María González',
    country: 'España',
    rating: 5,
    date: '2024-01-15',
    text: 'Experiencia increíble! Los instructores son súper profesionales y el hospedaje muy cómodo. Aprendí a surfear en solo 3 días. La ubicación es perfecta, muy cerca de la playa.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    platform: 'google',
    verified: true,
    helpful: 12,
    response: {
      text: '¡Muchas gracias María! Nos alegra saber que tuviste una experiencia tan increíble. ¡Esperamos verte pronto en las olas de nuevo!',
      date: '2024-01-16',
      author: 'Equipo Maikekai Surf'
    }
  },
  {
    id: 'google_2',
    name: 'John Smith',
    country: 'Estados Unidos',
    rating: 5,
    date: '2024-01-10',
    text: 'Amazing surf school! The instructors were patient and knowledgeable. The accommodation was clean and comfortable. Highly recommend for anyone wanting to learn to surf in Costa Rica.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    platform: 'google',
    verified: true,
    helpful: 8
  },
  {
    id: 'google_3',
    name: 'Sophie Dubois',
    country: 'Francia',
    rating: 5,
    date: '2024-01-08',
    text: 'Une expérience fantastique! L\'école de surf est vraiment professionnelle et l\'hébergement est parfait. J\'ai adoré l\'ambiance décontractée et la beauté de Costa Rica.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    platform: 'google',
    verified: true,
    helpful: 5
  },
  {
    id: 'google_4',
    name: 'Carlos Ruiz',
    country: 'México',
    rating: 5,
    date: '2024-01-05',
    text: 'Excelente servicio! La atención es personalizada y realmente se preocupan por que aprendas. Las instalaciones están muy bien cuidadas y la comida deliciosa.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    platform: 'google',
    verified: true,
    helpful: 15,
    response: {
      text: 'Gracias Carlos! Nos emociona saber que disfrutaste tanto tu estadía. Tu dedicación al surf fue inspiradora. ¡Te esperamos para la próxima aventura!',
      date: '2024-01-06',
      author: 'Equipo Maikekai Surf'
    }
  },
  {
    id: 'google_5',
    name: 'Emma Wilson',
    country: 'Reino Unido',
    rating: 5,
    date: '2024-01-02',
    text: 'Best surf experience ever! The team at Maikekai Surf made everything easy and fun. Perfect for beginners and the location is just stunning. Will definitely come back!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    platform: 'google',
    verified: true,
    helpful: 22
  },
  {
    id: 'google_6',
    name: 'Luis Fernández',
    country: 'Colombia',
    rating: 5,
    date: '2023-12-28',
    text: 'Una experiencia única! El equipo de Maikekai Surf es increíble, muy profesional y amigable. Las clases son excelentes y el hospedaje muy cómodo. 100% recomendado!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    platform: 'google',
    verified: true,
    helpful: 18
  }
]

const MOCK_STATS: ReviewStats = {
  totalReviews: 542,
  averageRating: 4.9,
  ratingDistribution: {
    5: 498,
    4: 35,
    3: 7,
    2: 1,
    1: 1
  },
  recentRating: 5.0,
  lastUpdated: new Date().toISOString()
}

interface UseReviewsOptions {
  limit?: number
  platform?: 'google' | 'all'
  useCache?: boolean
}

interface UseReviewsReturn {
  reviews: Review[]
  stats: ReviewStats | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useReviews({
  limit = 6,
  platform = 'all',
  useCache = true
}: UseReviewsOptions = {}): UseReviewsReturn {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // TODO: Replace with actual Google Places API call
      // const response = await fetch(`/api/reviews?limit=${limit}&platform=${platform}`)
      // const data = await response.json()

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Filter and limit reviews
      let filteredReviews = MOCK_REVIEWS
      if (platform !== 'all') {
        filteredReviews = MOCK_REVIEWS.filter(review => review.platform === platform)
      }
      
      const limitedReviews = filteredReviews.slice(0, limit)

      setReviews(limitedReviews)
      setStats(MOCK_STATS)
    } catch (err) {
      console.error('Error fetching reviews:', err)
      setError('No se pudieron cargar las reseñas')
    } finally {
      setLoading(false)
    }
  }, [limit, platform])

  const refetch = async () => {
    await fetchReviews()
  }

  useEffect(() => {
    fetchReviews()
  }, [limit, platform])

  return {
    reviews,
    stats,
    loading,
    error,
    refetch
  }
}

// Future Google Places API integration helper
export async function fetchGoogleReviews(placeId: string, apiKey: string) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch Google reviews')
    }
    
    const data = await response.json()
    
    // Transform Google API response to our Review type
    const reviews: Review[] = data.result.reviews?.map((review: any, index: number) => ({
      id: `google_${review.time}_${index}`,
      name: review.author_name,
      country: 'Google User', // Google doesn't provide location
      rating: review.rating,
      date: new Date(review.time * 1000).toISOString(),
      text: review.text,
      avatar: review.profile_photo_url,
      platform: 'google' as const,
      verified: true,
      helpful: review.helpful || 0
    })) || []

    const stats: ReviewStats = {
      totalReviews: data.result.user_ratings_total,
      averageRating: data.result.rating,
      ratingDistribution: {
        5: 0, 4: 0, 3: 0, 2: 0, 1: 0
      }, // Google doesn't provide distribution
      recentRating: data.result.rating,
      lastUpdated: new Date().toISOString()
    }

    return { reviews, stats }
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    throw error
  }
}
