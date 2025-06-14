import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "./context/CartContext"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
// app/globals.css or layout.tsx
import 'leaflet/dist/leaflet.css';
import { ToastProvider } from "./context/ToastContexts"
import { WishlistProvider } from "./context/WishlistContexts"


const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
        <CartProvider>
          <WishlistProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          </WishlistProvider>
        </CartProvider>
        </ToastProvider>
      </body>
    </html>
  )
}

