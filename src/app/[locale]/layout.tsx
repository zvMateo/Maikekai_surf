import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import '../globals.css'
import { AuthProvider } from '@/features/auth'
import { PerformanceWidget } from '@/components/ui/PerformanceWidget'
import { NextIntlClientProvider, useMessages } from 'next-intl'

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
  title: 'Maikekai Surf - Surf Hotel and School in Costa Rica',
  description:
    'Discover Maikekai Surf, your perfect destination to learn surfing and stay in Costa Rica. We offer professional surf classes, comfortable lodging and the best tropical experience.',
  keywords:
    'surf, Costa Rica, surf hotel, surf lessons, lodging, surf school, Maikekai',
  authors: [{ name: 'Maikekai Surf' }],
  openGraph: {
    title: 'Maikekai Surf - Surf Hotel and School in Costa Rica',
    description:
      'Your perfect destination to learn surfing and stay in Costa Rica',
    url: 'https://maikekaisurf.com',
    siteName: 'Maikekai Surf',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maikekai Surf - Surf Hotel and School in Costa Rica',
    description:
      'Your perfect destination to learn surfing and stay in Costa Rica',
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

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }]
}

export default function RootLayout({ children, params }: any) {
  const messages = useMessages()
  const { locale } = params

  return (
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
  )
}
