import type { Metadata } from 'next'
import '../styles/globals.css'
import DarkModeToggle from './components/DarkModeToggle'
import HomeButton from './components/HomeButton'
import StructuredData from './components/StructuredData'

export const metadata: Metadata = {
  title: 'NFL Imposter Game - Free Online Party Game',
  description: 'Play NFL Imposter Game - A fun party game where players try to identify the imposter. Choose between All-Time and Current NFL players. Free to play, no download required.',
  keywords: ['NFL Imposter Game', 'NFL party game', 'imposter game', 'NFL players', 'party game', 'free game'],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    title: 'NFL Imposter Game - Free Online Party Game',
    description: 'A fun party game where players try to identify the imposter. Choose between All-Time and Current NFL players.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'NFL Imposter Game',
    description: 'A fun party game where players try to identify the imposter.',
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

