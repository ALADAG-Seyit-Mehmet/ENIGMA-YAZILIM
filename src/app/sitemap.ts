import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://enigmayazilim.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Add all static routes here
  const routes = [
    '',
    '/cozumler',
    '/manifesto',
    '/portfoy'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate paths for each supported locale
  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      // Create hreflang alternate links for this specific route
      const languages: Record<string, string> = {};
      routing.locales.forEach((altLocale) => {
        languages[altLocale] = `${BASE_URL}/${altLocale}${route}`;
      });
      // Also add an 'x-default' fallback (usually pointing to your default locale or a generic router)
      languages['x-default'] = `${BASE_URL}/tr${route}`;

      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages,
        },
      });
    });
  });

  return sitemapEntries;
}
