import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nfl-imposter-game.vercel.app'
  
  // Static routes
  const routes = [
    '',
    '/mode',
    '/start',
    '/how-to-play',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Dynamic reveal routes (0-7 for up to 8 players)
  const revealRoutes = Array.from({ length: 8 }, (_, i) => ({
    url: `${baseUrl}/reveal/${i}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...routes, ...revealRoutes]
}

