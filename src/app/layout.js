import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Knightly Gazette',
  description: 'Your one-stop source for all things Ateneo de Davao University',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}><Providers>{children}</Providers></body>
      
    </html>
  )
}
