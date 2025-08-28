'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/features/cart/hooks/useCart'
import { addBookingToCart } from '../services/availability'
import { useTranslations } from 'next-intl'

interface BookingVariant {
  id: string
  name: string
}

interface BookingProduct {
  id: string
  name: string
  variants?: BookingVariant[]
}

interface BookingFormProps {
  products: BookingProduct[]
}

export function BookingForm({ products }: BookingFormProps) {
  const { addItem } = useCart()
  const t = useTranslations('booking')
  const [productId, setProductId] = useState('')
  const [variantId, setVariantId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [persons, setPersons] = useState(1)
  const [error, setError] = useState<string | null>(null)

  const selectedProduct = products.find((p) => p.id === productId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await addBookingToCart(
      { productId, variantId, startDate, endDate, persons, quantity: 1 },
      addItem,
    )
    if (!success) {
      setError(t('form.noAvailability'))
      return
    }
    setError(null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('form.productLabel')}
        </label>
        <select
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value)
            setVariantId('')
          }}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="">{t('form.productPlaceholder')}</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProduct?.variants && selectedProduct.variants.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.variantLabel')}
          </label>
          <select
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">{t('form.variantPlaceholder')}</option>
            {selectedProduct.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <Input
        type="date"
        label={t('form.startDateLabel')}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <Input
        type="date"
        label={t('form.endDateLabel')}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <Input
        type="number"
        label={t('form.personsLabel')}
        min={1}
        value={persons}
        onChange={(e) => setPersons(Number(e.target.value))}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" className="w-full">
        {t('form.addToCart')}
      </Button>
    </form>
  )
}
