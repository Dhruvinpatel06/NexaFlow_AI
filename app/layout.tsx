import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["700", "800"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nexaflow-ai.vercel.app'),
  title: 'NexaFlow AI — Automate Everything. Scale Infinitely.',
  description: 'NexaFlow AI automates complex business workflows with intelligent AI agents. Boost team productivity by 10x with seamless integrations and real-time analytics.',
  keywords: ['AI automation', 'workflow automation', 'SaaS', 'productivity', 'AI agents'],
  openGraph: {
    title: 'NexaFlow AI — Automate Everything. Scale Infinitely.',
    description: 'AI-powered workflow automation for modern teams.',
    type: 'website',
    url: 'https://nexaflow-ai.vercel.app',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NexaFlow AI' }],
    siteName: 'NexaFlow AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexaFlow AI — Automate Everything. Scale Infinitely.',
    description: 'AI-powered workflow automation for modern teams.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://nexaflow-ai.vercel.app' },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`} style={{ backgroundColor: 'var(--bg)' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
        <meta name="theme-color" content="#00b8cc" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'NexaFlow AI',
            description: 'AI-powered workflow automation platform',
            applicationCategory: 'BusinessApplication',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
          }) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
