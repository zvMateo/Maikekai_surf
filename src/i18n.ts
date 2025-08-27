import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en';

export default getRequestConfig(async ({locale}) => {
  const currentLocale = locale ?? defaultLocale;
  return {
    locale: currentLocale,
    messages: {
      common: (await import(`../public/locales/${currentLocale}/common.json`)).default,
      header: (await import(`../public/locales/${currentLocale}/header.json`)).default,
      hero: (await import(`../public/locales/${currentLocale}/hero.json`)).default,
      catalog: (await import(`../public/locales/${currentLocale}/catalog.json`)).default
    }
  };
});
