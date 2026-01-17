import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SupportChatWrapper from '@/components/SupportChatWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FluxHold - Demo Investment Dashboard',
  description: 'A demo investment analytics platform for portfolio purposes. Not real financial advice.',
  keywords: ['investment', 'dashboard', 'demo', 'analytics', 'portfolio'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        {children}
        {/* SupportChat is wrapped to avoid importing client component directly in server component */}
        <SupportChatWrapper />
      </body>
    </html>
  )
}
