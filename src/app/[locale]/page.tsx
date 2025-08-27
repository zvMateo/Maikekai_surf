'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Hero } from '@/features/hero'
import { BookingButtons } from '@/features/booking'
import { SurfPlans } from '@/features/surf-plans'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ROUTES } from '@/lib/constants'

const Reviews = dynamic(() =>
  import('@/features/reviews').then((m) => m.Reviews),
)

export default function Home() {
  const router = useRouter()

  const handleBookNow = () => {
    router.push(ROUTES.BOOKING)
  }

  const handleLearnMore = () => {
    const planesSection = document.getElementById('planes')
    if (planesSection) {
      const headerHeight = 80
      const elementPosition = planesSection.offsetTop - headerHeight

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div id="inicio">
        <Hero onBookNow={handleBookNow} onLearnMore={handleLearnMore} />
      </div>
      <div id="reservas">
        <BookingButtons />
      </div>
      <div id="planes">
        <SurfPlans />
      </div>
      <div id="reseñas">
        <Suspense fallback={<p>Loading reviews...</p>}>
          <Reviews />
        </Suspense>
      </div>
      <div id="contacto">
        <Footer />
      </div>
    </main>
  )
}
