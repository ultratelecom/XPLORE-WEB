import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Xplore Tobago - Discover the Caribbean Paradise',
  description: 'Your ultimate guide to exploring Tobago. Discover hidden gems, local attractions, cultural events, authentic food, and insider tips from locals. Download the app and experience Tobago like never before.',
  keywords: 'Tobago, Caribbean, travel, tourism, local attractions, cultural events, travel guide, mobile app',
  openGraph: {
    title: 'Xplore Tobago - Discover the Caribbean Paradise',
    description: 'Your ultimate guide to exploring Tobago. Download the app and experience the island like a local.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 