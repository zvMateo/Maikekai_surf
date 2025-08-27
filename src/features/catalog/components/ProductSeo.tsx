'use client'

import { ProductJsonLd } from 'next-seo'
import type { BaseProduct } from '@/types/catalog'

interface Props {
  product: BaseProduct
}

export function ProductSeo({ product }: Props) {
  return (
    <ProductJsonLd
      useAppDir={true}
      productName={product.name}
      description={product.shortDescription || product.longDescription || ''}
      offers={[
        {
          price: product.price / 100,
          priceCurrency: product.currency,
          availability: 'https://schema.org/InStock',
        },
      ]}
    />
  )
}
