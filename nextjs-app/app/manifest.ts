import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Makarand Narwekar - Mumbai Corporator',
    short_name: 'M. Narwekar',
    description: 'Official website of Makarand Narwekar, Mumbai Corporator serving A Ward. Dedicated to transparent governance and community development.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#FF6B6B',
    icons: [
      {
        src: '/icon?size=192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon?size=512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
