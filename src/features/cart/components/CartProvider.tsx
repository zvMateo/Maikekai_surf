'use client'

import { createContext, useEffect, useState } from 'react'

export interface CartItem {
  productId: string
  variantId?: string
  startDate?: string
  endDate?: string
  persons?: number
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variantId?: string) => void
  clear: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const index = prev.findIndex(
        i =>
          i.productId === item.productId &&
          i.variantId === item.variantId &&
          i.startDate === item.startDate &&
          i.endDate === item.endDate
      )
      if (index !== -1) {
        const updated = [...prev]
        updated[index].quantity += item.quantity
        return updated
      }
      return [...prev, item]
    })
  }

  const removeItem = (productId: string, variantId?: string) => {
    setItems(prev =>
      prev.filter(i => !(i.productId === productId && i.variantId === variantId))
    )
  }

  const clear = () => setItems([])

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('cart') : null
    if (stored) {
      setItems(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items])

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    clear,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
