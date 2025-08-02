import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Crud App',
  description: 'A sample CRUD app ',
  generator: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
       
      </head>
      <body>{children}</body>
    </html>
  )
}
