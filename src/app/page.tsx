'use client'

import { useRouter } from 'next/navigation'
import { Hero } from '@/components/features/hero'
import { BookingButtons } from '@/components/features/booking'
import { Reviews } from '@/components/features/reviews'
import { SurfPlans } from '@/components/features/surf-plans'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ROUTES } from '@/lib/constants'

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
        behavior: 'smooth'
      })
    }
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div id="inicio">
        <Hero 
          onBookNow={handleBookNow}
          onLearnMore={handleLearnMore}
        />
      </div>
      <div id="reservas">
        <BookingButtons />
      </div>
      <div id="planes">
        <SurfPlans />
      </div>
      <div id="reseñas">
        <Reviews />
      </div>
      <div id="contacto">
        <Footer />
      </div>
    </main>
  )
}
