'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useResponsive } from '@/hooks/useResponsive'

interface HeroProps {
  onBookNow?: () => void
  onLearnMore?: () => void
}

export function Hero({ onBookNow, onLearnMore }: HeroProps) {
  const { isMobile } = useResponsive()

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.7)' }}
        >
          <source src="/videos/surf-hero-1.mp4" type="video/mp4" />
          <source src="/videos/surf-hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Maikekai Surf
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Experimenta las mejores olas de Costa Rica con nuestras clases profesionales
          y alojamiento de lujo frente al mar.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-7 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button
            variant="primary"
            size={isMobile ? "md" : "lg"}
            onClick={onBookNow}
            className="w-full sm:w-auto min-w-[200px] shadow-lg"
          >
            🏄‍♂️ Reservar Ahora
          </Button>
          
          <Button
            variant="outline"
            size={isMobile ? "md" : "lg"}
            onClick={onLearnMore}
            className="w-full sm:w-auto min-w-[200px] border-white text-white hover:bg-white hover:text-black shadow-lg"
          >
            🌊 Conocer Más
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute mt-14 ml-2 bottom-auto left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center cursor-pointer"
            onClick={onLearnMore}
          >
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
