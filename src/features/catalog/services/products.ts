import { createClient } from '@/services/supabase/server'
import type { Product, Bundle } from '@/types/catalog'
import { unstable_cache } from 'next/cache'
import { PRODUCTS_TAG } from '@/lib/cache'

// Datos de respaldo en caso de no tener Supabase configurado
const fallbackProducts: Record<string, Record<string, Product[]>> = {
  en: {
    camp: [
      {
        id: '00000000-0000-0000-0000-000000000001',
        slug: 'surf-guru',
        type: 'camp',
        name: 'Surf Guru Camp',
        shortDescription: 'Intensive surf camp for all levels',
        longDescription: 'Seven-day program with lodging, meals and surf lessons.',
        highlights: ['6 nights lodging', '5 surf lessons', 'Equipment included'],
        price: 89900,
        currency: 'USD',
      },
    ],
    lodging: [
      {
        id: '00000000-0000-0000-0000-000000000002',
        slug: 'ocean-view-room',
        type: 'lodging',
        name: 'Ocean View Room',
        shortDescription: 'Private room with ocean view',
        longDescription: 'Comfortable room just steps from the beach.',
        highlights: ['Private bathroom', 'Breakfast included'],
        price: 5000,
        currency: 'USD',
      },
      {
        id: '00000000-0000-0000-0000-000000000003',
        slug: 'surf-hostel-bed',
        type: 'lodging',
        name: 'Surf Hostel Bed',
        shortDescription: 'Shared room in surf hostel',
        longDescription: 'Affordable bed in a friendly surf hostel.',
        highlights: ['Shared bathroom', 'Wi-Fi'],
        price: 2500,
        currency: 'USD',
      },
    ],
  },
  es: {
    camp: [
      {
        id: '00000000-0000-0000-0000-000000000001',
        slug: 'surf-guru',
        type: 'camp',
        name: 'Campamento Surf Guru',
        shortDescription: 'Campamento intensivo de surf para todos los niveles',
        longDescription: 'Programa de siete días con hospedaje, comidas y clases de surf.',
        highlights: ['6 noches de hospedaje', '5 clases de surf', 'Equipo incluido'],
        price: 89900,
        currency: 'USD',
      },
    ],
    lodging: [
      {
        id: '00000000-0000-0000-0000-000000000002',
        slug: 'ocean-view-room',
        type: 'lodging',
        name: 'Habitación Vista al Mar',
        shortDescription: 'Habitación privada con vista al mar',
        longDescription: 'Habitación cómoda a pasos de la playa.',
        highlights: ['Baño privado', 'Desayuno incluido'],
        price: 5000,
        currency: 'USD',
      },
      {
        id: '00000000-0000-0000-0000-000000000003',
        slug: 'surf-hostel-bed',
        type: 'lodging',
        name: 'Cama en Surf Hostel',
        shortDescription: 'Habitación compartida en hostel surf',
        longDescription: 'Cama económica en un hostel de surf amigable.',
        highlights: ['Baño compartido', 'Wi-Fi'],
        price: 2500,
        currency: 'USD',
      },
    ],
  },
}

const fallbackBundles: Record<string, Bundle[]> = {
  en: [
    {
      id: '00000000-0000-0000-0000-000000000010',
      slug: 'surf-guru-ocean-view',
      name: 'Surf Guru + Ocean View Room',
      shortDescription: 'Camp plus premium room',
      longDescription: 'Package including Surf Guru Camp and Ocean View Room.',
      highlights: ['7 days', 'Ocean view lodging'],
      price: 94900,
      currency: 'USD',
      items: [
        { productId: '00000000-0000-0000-0000-000000000001', quantity: 1 },
        { productId: '00000000-0000-0000-0000-000000000002', quantity: 1 },
      ],
    },
  ],
  es: [
    {
      id: '00000000-0000-0000-0000-000000000010',
      slug: 'surf-guru-ocean-view',
      name: 'Surf Guru + Habitación Vista al Mar',
      shortDescription: 'Campamento más habitación premium',
      longDescription: 'Paquete que incluye Campamento Surf Guru y Habitación Vista al Mar.',
      highlights: ['7 días', 'Hospedaje con vista al mar'],
      price: 94900,
      currency: 'USD',
      items: [
        { productId: '00000000-0000-0000-0000-000000000001', quantity: 1 },
        { productId: '00000000-0000-0000-0000-000000000002', quantity: 1 },
      ],
    },
  ],
}

function mapProduct(data: any): Product {
  const tr = data.product_translations?.[0] ?? {}
  const price = data.product_prices?.[0] ?? {}
  return {
    id: data.id,
    slug: data.slug,
    type: data.product_types?.slug ?? '',
    name: tr.name,
    shortDescription: tr.short_description ?? undefined,
    longDescription: tr.long_description ?? undefined,
    highlights: tr.highlights ?? [],
    price: price.unit_amount ?? 0,
    currency: price.currency ?? 'USD',
  }
}

function mapBundle(data: any): Bundle {
  const tr = data.bundle_translations?.[0] ?? {}
  const price = data.bundle_prices?.[0] ?? {}
  return {
    id: data.id,
    slug: data.slug,
    name: tr.name,
    shortDescription: tr.short_description ?? undefined,
    longDescription: tr.long_description ?? undefined,
    highlights: tr.highlights ?? [],
    price: price.unit_amount ?? 0,
    currency: price.currency ?? 'USD',
    items:
      data.bundle_items?.map((item: any) => ({
        productId: item.product_id,
        quantity: item.quantity,
      })) ?? [],
  }
}

export const getProductsByType = unstable_cache(
  async (type: string, locale: string): Promise<Product[]> => {
    const supabase = await createClient()
    if (!supabase) {
      return fallbackProducts[locale]?.[type] ?? []
    }

    const { data, error } = await supabase
      .from('products')
      .select(
        `id, slug, sorting, product_types!inner(slug),
       product_translations!inner(locale, name, short_description, long_description, highlights),
       product_prices(currency, unit_amount)`
      )
      .eq('product_types.slug', type)
      .eq('product_translations.locale', locale)
      .eq('is_active', true)
      .order('sorting')

    if (error || !data) {
      console.error('Error fetching products:', error)
      return []
    }

    return data.map(mapProduct)
  },
  ['getProductsByType'],
  { tags: [PRODUCTS_TAG] }
)

export const getProductBySlug = unstable_cache(
  async (slug: string, locale: string): Promise<Product | null> => {
    const supabase = await createClient()
    if (!supabase) {
      const all = {
        ...fallbackProducts[locale]?.camp?.reduce(
          (acc, p) => ({ ...acc, [p.slug]: p }),
          {}
        ),
        ...fallbackProducts[locale]?.lodging?.reduce(
          (acc, p) => ({ ...acc, [p.slug]: p }),
          {}
        ),
      }
      return all[slug] ?? null
    }

    const { data, error } = await supabase
      .from('products')
      .select(
        `id, slug, sorting, product_types!inner(slug),
       product_translations!inner(locale, name, short_description, long_description, highlights),
       product_prices(currency, unit_amount)`
      )
      .eq('slug', slug)
      .eq('product_translations.locale', locale)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      return null
    }

    return mapProduct(data)
  },
  ['getProductBySlug'],
  { tags: [PRODUCTS_TAG] }
)

export const getBundles = unstable_cache(
  async (locale: string): Promise<Bundle[]> => {
    const supabase = await createClient()
    if (!supabase) {
      return fallbackBundles[locale] ?? []
    }

    const { data, error } = await supabase
      .from('bundles')
      .select(
        `id, slug, bundle_items(product_id, quantity),
       bundle_translations!inner(locale, name, short_description, long_description, highlights),
       bundle_prices(currency, unit_amount)`
      )
      .eq('bundle_translations.locale', locale)
      .eq('is_active', true)
      .order('created_at')

    if (error || !data) {
      console.error('Error fetching bundles:', error)
      return []
    }

    return data.map(mapBundle)
  },
  ['getBundles'],
  { tags: [PRODUCTS_TAG] }
)

export const getBundleBySlug = unstable_cache(
  async (slug: string, locale: string): Promise<Bundle | null> => {
    const supabase = await createClient()
    if (!supabase) {
      return (fallbackBundles[locale] ?? []).find((b) => b.slug === slug) ?? null
    }

    const { data, error } = await supabase
      .from('bundles')
      .select(
        `id, slug, bundle_items(product_id, quantity),
       bundle_translations!inner(locale, name, short_description, long_description, highlights),
       bundle_prices(currency, unit_amount)`
      )
      .eq('slug', slug)
      .eq('bundle_translations.locale', locale)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      return null
    }

    return mapBundle(data)
  },
  ['getBundleBySlug'],
  { tags: [PRODUCTS_TAG] }
)
