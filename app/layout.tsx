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
  metadataBase: new URL('https://nexaflow-ai-kappa.vercel.app'),
  title: 'NexaFlow AI — Automate Everything. Scale Infinitely.',
  description: 'NexaFlow AI automates complex business workflows with intelligent AI agents. Boost team productivity by 10x with seamless integrations and real-time analytics.',
  keywords: ['AI automation', 'workflow automation', 'SaaS', 'productivity', 'AI agents', 'no-code automation', 'enterprise workflow automation', 'SaaS automation platform', 'AI developer tools'],
  openGraph: {
    title: 'NexaFlow AI — Automate Everything. Scale Infinitely.',
    description: 'AI-powered workflow automation for modern teams. Transform operations and optimize developer productivity.',
    type: 'website',
    url: 'https://nexaflow-ai-kappa.vercel.app',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NexaFlow AI' }],
    siteName: 'NexaFlow AI',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexaFlow AI — Automate Everything. Scale Infinitely.',
    description: 'AI-powered workflow automation for modern teams. Transform operations and optimize developer productivity.',
    images: ['/og-image.png'],
    creator: '@nexaflow_ai',
  },
  alternates: { canonical: 'https://nexaflow-ai-kappa.vercel.app' },
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
            description: 'NexaFlow AI automates complex business workflows with intelligent AI agents. Boost team productivity by 10x with seamless integrations and real-time analytics.',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'All',
            url: 'https://nexaflow-ai-kappa.vercel.app',
            logo: 'https://nexaflow-ai-kappa.vercel.app/logo.png',
            screenshot: 'https://nexaflow-ai-kappa.vercel.app/og-image.png',
            featureList: [
              'AI-powered intelligent agents',
              'Multi-currency dynamic pricing models',
              'Real-time visual dashboard metrics',
              'Advanced enterprise pipeline integrations',
              'Interactive 3D bento grids and charts'
            ],
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              lowPrice: '0',
              highPrice: '199',
              offerCount: '3',
              offers: [
                {
                  '@type': 'Offer',
                  name: 'Starter Plan',
                  price: '0',
                  priceCurrency: 'USD'
                },
                {
                  '@type': 'Offer',
                  name: 'Pro Plan',
                  price: '49',
                  priceCurrency: 'USD'
                },
                {
                  '@type': 'Offer',
                  name: 'Enterprise Plan',
                  price: '199',
                  priceCurrency: 'USD'
                }
              ]
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '1247'
            },
            creator: {
              '@type': 'Organization',
              name: 'NexaFlow AI Inc.',
              url: 'https://nexaflow-ai-kappa.vercel.app'
            }
          }) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
