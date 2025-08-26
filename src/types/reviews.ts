export interface Review {
  id: string | number
  name: string
  country: string
  rating: number
  date: string
  text: string
  avatar?: string
  verified?: boolean
  platform?: 'google' | 'tripadvisor' | 'booking' | 'manual'
  helpful?: number
  response?: {
    text: string
    date: string
    author: string
  }
}

export interface ReviewStats {
  totalReviews: number
  averageRating: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  recentRating: number
  lastUpdated: string
}

export interface GoogleReviewsResponse {
  reviews: Review[]
  stats: ReviewStats
  nextPageToken?: string
}
