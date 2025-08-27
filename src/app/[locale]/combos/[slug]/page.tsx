import { getBundleBySlug } from '@/features/catalog/services/products'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export default async function ComboDetail({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const bundle = await getBundleBySlug(slug, locale)
  if (!bundle) notFound()

  return (
    <section className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{bundle.name}</h1>
      {bundle.longDescription && <p className="mb-4">{bundle.longDescription}</p>}
      {bundle.highlights.length > 0 && (
        <ul className="list-disc pl-5 space-y-2">
          {bundle.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
    </section>
  )
}
