import Link from 'next/link'
import type { BaseProduct } from '@/types/catalog'

interface Props {
  products: BaseProduct[]
  basePath: string
}

export default function ProductList({ products, basePath }: Props) {
  return (
    <ul className="grid gap-4">
      {products.map((p) => (
        <li key={p.id} className="border rounded p-4">
          <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
          {p.shortDescription && <p className="mb-2">{p.shortDescription}</p>}
          <p className="font-medium mb-4">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: p.currency,
            }).format(p.price / 100)}
          </p>
          <Link href={`${basePath}/${p.slug}`} className="text-blue-600 underline">
            Ver más
          </Link>
        </li>
      ))}
    </ul>
  )
}
