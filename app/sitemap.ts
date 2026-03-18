import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://fabian-cubillos.vercel.app',
      lastModified: '2026-03-18',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://fabian-cubillos.vercel.app/privacidad',
      lastModified: '2026-03-18',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];
}
