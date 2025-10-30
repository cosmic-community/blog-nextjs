import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Blog Platform',
  description: 'A beautiful blog platform powered by Cosmic CMS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-50 border-t border-gray-200 mt-20">
          <div className="container-custom py-12">
            <div className="text-center text-gray-600">
              <p>© {new Date().getFullYear()} Modern Blog Platform. Powered by Cosmic.</p>
            </div>
          </div>
        </footer>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}