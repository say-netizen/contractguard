import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/success', '/api/'],
    },
    sitemap: 'https://contractguard-ai.app/sitemap.xml',
  };
}
