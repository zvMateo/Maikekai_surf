export interface BaseProduct {
  id: string
  slug: string
  name: string
  shortDescription?: string
  longDescription?: string
  highlights: string[]
  price: number
  currency: string
}

export interface Product extends BaseProduct {
  type: string
}

export interface Bundle extends BaseProduct {
  items: { productId: string; quantity: number }[]
}
