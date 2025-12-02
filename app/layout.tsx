import type { Metadata } from 'next'
import '../styles/globals.css'
import DarkModeToggle from './components/DarkModeToggle'
import HomeButton from './components/HomeButton'
import StructuredData from './components/StructuredData'

export const metadata: Metadata = {
  title: 'NFL Imposter Game - Free Online Party Game',
  description: 'Play NFL Imposter Game - A free online party game and social deduction game. Identify the imposter among NFL players! Perfect for game nights, parties, and NFL fans. Choose All-Time or Current NFL players. No download required.',
  keywords: [
    'NFL Imposter Game',
    'NFL party game',
    'imposter game',
    'NFL players',
    'party game',
    'free game',
    'NFL guessing game',
    'social deduction game',
    'NFL trivia game',
    'online party game',
    'free NFL game',
    'NFL game night',
    'group game NFL',
    'NFL fan game',
    'imposter game online',
    'free imposter game',
    'NFL party game online',
    'game night ideas',
    'NFL social game',
    'online group game',
    'free online party game',
    'NFL word game',
    'imposter game free',
    'NFL team game',
    'party game online free'
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    title: 'NFL Imposter Game - Free Online Party Game',
    description: 'Free online NFL Imposter Game - A social deduction party game. Identify the imposter among NFL players! Perfect for game nights and NFL fans. Play with 3-8 players.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'NFL Imposter Game',
    description: 'Free NFL Imposter Game - Social deduction party game to identify the imposter. Perfect for game nights with NFL fans!',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="HdDTmmfLiBcGTWI" />
        <StructuredData />
      </head>
      <body>
        <HomeButton />
        <DarkModeToggle />
        {children}
      </body>
    </html>
  )
}

