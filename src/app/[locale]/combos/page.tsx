import { getBundles } from '@/features/catalog/services/products'
import ProductList from '@/features/catalog/components/ProductList'
import { getTranslations } from 'next-intl/server'

export const revalidate = 3600

export default async function CombosPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'catalog' })
  const bundles = await getBundles(locale)

  return (
    <section className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('combos.title')}</h1>
      <ProductList products={bundles} basePath={`/${locale}/combos`} />
    </section>
  )
}
