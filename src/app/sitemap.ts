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
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
