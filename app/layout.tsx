import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nassere Yacouba — Développeur Web & Mobile',
  description: 'Portfolio de Nassere Yacouba, Informaticien Développeur Web et Mobile basé à Abidjan, Côte d\'Ivoire.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
