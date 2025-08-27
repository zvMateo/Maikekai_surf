import { describe, it, expect } from 'vitest'
import { formatCurrency } from '@/lib/utils'

describe('formatCurrency', () => {
  it('formatea números como USD', () => {
    expect(formatCurrency(123)).toBe('$123.00')
  })
})
