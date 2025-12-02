export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "NFL Imposter Game",
    "description": "A free online party game where players try to identify the imposter. Choose between All-Time and Current NFL players. Perfect for game nights and parties!",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://nfl-imposter-game.vercel.app",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "1"
    },
    "featureList": [
      "Free to play",
      "No download required",
      "Works on mobile and desktop",
      "All-Time and Current NFL player modes",
      "3-8 players supported",
      "Dark mode support"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

