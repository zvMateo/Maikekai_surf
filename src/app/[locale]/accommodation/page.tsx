import { getProductsByType } from '@/features/catalog/services/products'
import ProductList from '@/features/catalog/components/ProductList'
import { getTranslations } from 'next-intl/server'

export const revalidate = 3600

export default async function AccommodationPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'catalog' })
  const products = await getProductsByType('lodging', locale)

  return (
    <section className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('accommodation.title')}</h1>
      <ProductList products={products} basePath={`/${locale}/accommodation`} />
    </section>
  )
}
