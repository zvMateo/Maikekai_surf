'use client'

import { useRouter } from 'next/navigation'
import { Hero } from '@/components/features/hero'
import BookingButtons from '@/components/BookingButtons'
import Reviews from '@/components/Reviews'
import { SurfPlans } from '@/components/features/surf-plans'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ROUTES } from '@/lib/constants'

export default function Home() {
  const router = useRouter()

  const handleBookNow = () => {
    router.push(ROUTES.BOOKING)
  }

  const handleLearnMore = () => {
    // Scroll to surf plans section
    const surfPlansSection = document.getElementById('surf-plans')
    if (surfPlansSection) {
      surfPlansSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Hero 
        onBookNow={handleBookNow}
        onLearnMore={handleLearnMore}
      />
      <BookingButtons />
      <div id="surf-plans">
        <SurfPlans />
      </div>
      <Reviews />
      <Footer />
    </main>
  )
}
