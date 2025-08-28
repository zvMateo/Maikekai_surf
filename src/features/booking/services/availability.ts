import { createClient } from '@/services/supabase/client'
import type { CartItem } from '@/features/cart/components/CartProvider'

export async function addBookingToCart(
  item: CartItem,
  addItem: (item: CartItem) => void,
): Promise<boolean> {
  const supabase = createClient()
  if (supabase) {
    const { data, error } = await supabase
      .from('product_availability')
      .select('capacity')
      .eq('product_id', item.productId)
      .lte('date_from', item.startDate)
      .gte('date_to', item.endDate)
      .single()

    if (error) {
      console.error('Error checking availability:', error)
      return false
    }

    if (
      data &&
      typeof data.capacity === 'number' &&
      item.persons &&
      data.capacity < item.persons
    ) {
      return false
    }
  }

  addItem(item)
  return true
}
