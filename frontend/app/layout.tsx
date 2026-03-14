import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI SQL Dashboard',
  description: 'Dashboard de inteligência de dados com IA para consultas SQL em linguagem natural',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}