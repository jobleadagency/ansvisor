import type { MetadataRoute } from 'next';

/**
 * The marketing experience and product site are managed under the Optumus Analytics domain.
 * The application UI remains non-indexed while the public brand site is the surface for search discovery.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  };
}
