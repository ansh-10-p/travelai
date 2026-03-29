import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Travel AI - Your Smart Travel Companion',
  description: 'Discover the world with AI-powered travel planning and personalized recommendations',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
