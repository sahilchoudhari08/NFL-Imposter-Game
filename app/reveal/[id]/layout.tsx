export function generateStaticParams() {
  // Generate static params for up to 3 players (0, 1, 2)
  return [{ id: '0' }, { id: '1' }, { id: '2' }]
}

export default function RevealLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

