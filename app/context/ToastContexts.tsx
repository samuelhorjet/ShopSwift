"use client"

import type React from "react"

import { createContext, useContext, useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, ShoppingBag, Heart } from "lucide-react"

interface Toast {
  id: string
  type: "success" | "error" | "info"
  title: string
  message: string
  icon?: React.ReactNode
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }

    setToasts((prev) => [...prev, newToast])

    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.3 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.5 }}
              className="bg-white rounded-lg shadow-lg border p-4 min-w-80 max-w-md"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {toast.icon || (
                    <CheckCircle
                      className={`w-5 h-5 ${
                        toast.type === "success"
                          ? "text-green-500"
                          : toast.type === "error"
                            ? "text-red-500"
                            : "text-blue-500"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{toast.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{toast.message}</p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Helper functions for common toast types
export const useToastHelpers = () => {
  const { showToast } = useToast()

  const showAddToCartToast = (productName: string) => {
    showToast({
      type: "success",
      title: "Added to Cart",
      message: `${productName} has been added to your cart`,
      icon: <ShoppingBag className="w-5 h-5 text-green-500" />,
    })
  }

  const showAddToWishlistToast = (productName: string) => {
    showToast({
      type: "success",
      title: "Added to Wishlist",
      message: `${productName} has been added to your wishlist`,
      icon: <Heart className="w-5 h-5 text-red-500" />,
    })
  }

  const showRemoveFromWishlistToast = (productName: string) => {
    showToast({
      type: "info",
      title: "Removed from Wishlist",
      message: `${productName} has been removed from your wishlist`,
      icon: <Heart className="w-5 h-5 text-gray-500" />,
    })
  }

  return {
    showAddToCartToast,
    showAddToWishlistToast,
    showRemoveFromWishlistToast,
  }
}
