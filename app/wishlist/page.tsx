
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContexts";
import { useToastHelpers } from "../context/ToastContexts";

export default function WishlistPage() {
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showAddToCartToast, showRemoveFromWishlistToast } = useToastHelpers();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    showAddToCartToast(item.name);
  };

  const handleRemoveFromWishlist = (item: any) => {
    removeFromWishlist(item.id);
    showRemoveFromWishlistToast(item.name);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="text-8xl">❤️</div>
          <h2 className="text-3xl font-bold">Your wishlist is empty</h2>
          <p className="text-gray-600 text-lg">
            Save items you love to your wishlist!
          </p>
          <Link href="/categories">
            <Button size="lg" className="px-8">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <Link href="/categories">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} in your wishlist
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl shadow-lg transition-all duration-300">
                  <Link href={`/product/${item.id}`}>
                    <div className="relative flex justify-center bg-[#b497d2] items-center h-64">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="w-40 h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveFromWishlist(item);
                          }}
                          className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
                        >
                          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                        </motion.button>
                      </div>
                    </div>
                  </Link>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <span className="text-sm text-gray-500">
                        {item.category}
                      </span>
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-semibold text-lg hover:text-purple-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">${item.price}</span>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveFromWishlist(item)}
                          className="flex-1"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                        <Button
                          onClick={() => handleAddToCart(item)}
                          className="flex-1"
                        >
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
