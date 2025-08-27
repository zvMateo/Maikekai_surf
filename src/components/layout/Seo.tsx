'use client'

import { DefaultSeo, OrganizationJsonLd } from 'next-seo'

const url = process.env.NEXT_PUBLIC_APP_URL || 'https://maikekaisurf.com'

export default function Seo() {
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Maikekai Surf"
        defaultTitle="Maikekai Surf - Hotel y Escuela de Surf en Costa Rica"
        description="Descubre Maikekai Surf, tu destino perfecto para aprender surf y hospedarte en Costa Rica."
        canonical={url}
        openGraph={{
          url,
          title: 'Maikekai Surf - Hotel y Escuela de Surf en Costa Rica',
          description: 'Tu destino perfecto para aprender surf y hospedarte en Costa Rica',
          siteName: 'Maikekai Surf',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <OrganizationJsonLd
        useAppDir={true}
        id={`${url}/#organization`}
        url={url}
        name="Maikekai Surf"
        logo={`${url}/logo.png`}
      />
    </>
  )
}
