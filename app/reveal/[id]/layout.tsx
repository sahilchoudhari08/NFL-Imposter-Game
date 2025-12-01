export function generateStaticParams() {
  // Generate static params for up to 8 players (0-7)
  return Array.from({ length: 8 }, (_, i) => ({ id: i.toString() }))
}

export default function RevealLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

