import Hero from '@/components/Hero'
import BookingButtons from '@/components/BookingButtons'
import Reviews from '@/components/Reviews'
import SurfPlans from '@/components/SurfPlans'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BookingButtons />
      <SurfPlans />
      <Reviews />
      <Footer />
    </main>
  )
}
