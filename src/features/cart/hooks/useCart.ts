'use client'

import { useContext } from 'react'
import { CartContext } from '../components/CartProvider'

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider')
  }
  return context
}
