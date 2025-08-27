import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import '../globals.css'
import { AuthProvider } from '@/features/auth'
import { PerformanceWidget } from '@/components/ui/PerformanceWidget'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://maikekaisurf.com'),
  title: 'Maikekai Surf - Hotel y Escuela de Surf en Costa Rica',
  description: 'Descubre Maikekai Surf, tu destino perfecto para aprender surf y hospedarte en Costa Rica. Ofrecemos clases de surf profesionales, alojamiento cómodo y la mejor experiencia tropical.',
  keywords: 'surf, Costa Rica, hotel surf, clases surf, hospedaje, escuela surf, Maikekai',
  authors: [{ name: 'Maikekai Surf' }],
  openGraph: {
    title: 'Maikekai Surf - Hotel y Escuela de Surf en Costa Rica',
    description: 'Tu destino perfecto para aprender surf y hospedarte en Costa Rica',
    url: 'https://maikekaisurf.com',
    siteName: 'Maikekai Surf',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_CR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maikekai Surf - Hotel y Escuela de Surf en Costa Rica',
    description: 'Tu destino perfecto para aprender surf y hospedarte en Costa Rica',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const dynamic = 'force-dynamic'

export const generateStaticParams = async (): Promise<{ locale: string }[]> => {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <ClerkProvider>
      <html lang={locale} className={`${inter.variable} ${poppins.variable}`}>
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body className={inter.className} suppressHydrationWarning={true}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthProvider>
              {children}
              <PerformanceWidget />
            </AuthProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
