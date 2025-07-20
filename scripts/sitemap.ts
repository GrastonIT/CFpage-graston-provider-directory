// Sitemap generator for Graston Provider Directory
// This generates a sitemap.xml for better SEO

import type { Provider } from '../app/data/providers';
import { mockProviders } from '../app/data/providers';

export function generateSitemap(baseUrl: string): string {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: 'providers', priority: '0.9', changefreq: 'daily' },
  ];

  const providerPages = mockProviders.map((provider: Provider) => ({
    url: `providers/${provider.id}`,
    priority: '0.7',
    changefreq: 'weekly'
  }));

  const allPages = [...staticPages, ...providerPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}/${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

// Generate robots.txt
export function generateRobots(baseUrl: string): string {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;
}
