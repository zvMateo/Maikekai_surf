import { revalidateTag } from 'next/cache'

export const PRODUCTS_TAG = 'products'
export const AVAILABILITY_TAG = 'availability'

export function revalidateProducts() {
  revalidateTag(PRODUCTS_TAG)
}

export function revalidateAvailability() {
  revalidateTag(AVAILABILITY_TAG)
}
