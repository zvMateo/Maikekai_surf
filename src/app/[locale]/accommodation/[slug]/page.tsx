import { getProductBySlug } from '@/features/catalog/services/products'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export default async function AccommodationDetail({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const product = await getProductBySlug(slug, locale)
  if (!product) notFound()

  return (
    <section className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      {product.longDescription && <p className="mb-4">{product.longDescription}</p>}
      {product.highlights.length > 0 && (
        <ul className="list-disc pl-5 space-y-2">
          {product.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
    </section>
  )
}
