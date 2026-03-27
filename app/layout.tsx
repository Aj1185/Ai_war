import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blood Donation System',
  description: 'Real-time blood donation tracking and AI-powered assistance',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
