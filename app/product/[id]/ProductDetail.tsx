"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Star, Heart, ShoppingBag, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "../../context/CartContext"

// Your product data (same as before)
const productData = {
  1: {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 299.99,
    originalPrice: 399.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.8,
    reviews: 124,
    category: "Electronics",
    badge: "Best Seller",
    description:
      "Experience premium sound quality with our Wireless Headphones Pro. Featuring advanced noise cancellation technology, 30-hour battery life, and premium comfort design.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium comfort design",
      "High-resolution audio",
      "Quick charge technology",
      "Voice assistant compatible",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0",
    },
    inStock: true,
    stockCount: 15,
  },
}

export default function ProductDetail({ productId }: { productId: number }) {
  const product = productData[productId as keyof typeof productData]

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()

  if (!product) {
    return <div>Product not found</div>
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    })
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary">{product.badge}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-purple-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">{product.category}</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm ml-1">{product.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({product.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold">${product.price}</span>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <Badge variant="destructive">Save ${(product.originalPrice - product.price).toFixed(2)}</Badge>
              </div>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                {product.inStock ? `In Stock (${product.stockCount} available)` : "Out of Stock"}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-4">
                <Button size="lg" onClick={handleAddToCart} disabled={!product.inStock} className="flex-1">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <Truck className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-medium text-sm">Free Shipping</div>
                  <div className="text-xs text-gray-500">Orders over $50</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-medium text-sm">2 Year Warranty</div>
                  <div className="text-xs text-gray-500">Full coverage</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <RotateCcw className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-medium text-sm">30-Day Returns</div>
                  <div className="text-xs text-gray-500">No questions asked</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-4xl font-bold">{product.rating}</div>
                      <div>
                        <div className="flex items-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500">Based on {product.reviews} reviews</div>
                      </div>
                    </div>
                    <div className="text-gray-600">
                      Reviews functionality would be implemented here with actual review data.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Shipping & Returns</h3>
                  <div className="space-y-4 text-gray-600">
                    <div>
                      <h4 className="font-medium text-black mb-2">Shipping Options</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Standard Shipping (5-7 business days) - Free on orders over $50</li>
                        <li>• Express Shipping (2-3 business days) - $9.99</li>
                        <li>• Overnight Shipping (1 business day) - $19.99</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-black mb-2">Returns Policy</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 30-day return window</li>
                        <li>• Items must be in original condition</li>
                        <li>• Free return shipping</li>
                        <li>• Refunds processed within 5-7 business days</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
