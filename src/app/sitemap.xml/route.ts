import { NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://enigmayazilim.com';

export async function GET() {
  const routes = [
    '',
    '/cozumler',
    '/manifesto',
    '/portfoy'
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  const lastModified = new Date().toISOString();
  
  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = `${BASE_URL}/${locale}${route}`;
      const changeFreq = 'weekly';
      const priority = route === '' ? '1.0' : '0.8';

      xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>`;

      routing.locales.forEach((altLocale) => {
        const altUrl = `${BASE_URL}/${altLocale}${route}`;
        xml += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${altUrl}" />`;
      });
      
      const defaultUrl = `${BASE_URL}/tr${route}`;
      xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />
  </url>`;
    });
  });

  xml += `
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
