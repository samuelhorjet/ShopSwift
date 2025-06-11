"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  ShoppingBag,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 299.99,
    originalPrice: 399.99,
    image: "/headphone.png",
    rating: 4.8,
    reviews: 124,
    category: "Electronics",
    badge: "Best Seller",
    description: "Premium wireless headphones with noise cancellation",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    image: "/watch.png",
    rating: 4.6,
    reviews: 89,
    category: "Wearables",
    badge: "New",
    description: "Track your fitness goals with advanced health monitoring",
  },
  {
    id: 3,
    name: "Premium Coffee Maker",
    price: 149.99,
    originalPrice: 199.99,
    image: "/coffee.png",
    rating: 4.9,
    reviews: 156,
    category: "Home",
    badge: "Sale",
    description:
      "Brew the perfect cup every time with precision temperature control",
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 399.99,
    originalPrice: 499.99,
    image: "/chair.png",
    rating: 4.7,
    reviews: 203,
    category: "Furniture",
    badge: "Popular",
    description: "Comfortable seating for long work sessions",
  },
  {
    id: 5,
    name: "Smartphone Pro Max",
    price: 999.99,
    originalPrice: 1199.99,
    image: "/phone.png",
    rating: 4.9,
    reviews: 342,
    category: "Electronics",
    badge: "Premium",
    description: "Latest flagship smartphone with advanced camera system",
  },
  {
    id: 6,
    name: "Designer Backpack",
    price: 89.99,
    originalPrice: 129.99,
    image: "/bags.png",
    rating: 4.5,
    reviews: 67,
    category: "Fashion",
    badge: "Trending",
    description: "Stylish and functional backpack for everyday use",
  },
  {
    id: 7,
    name: "Gaming Keyboard",
    price: 159.99,
    originalPrice: 199.99,
    image: "/keyboard.png",
    rating: 4.8,
    reviews: 189,
    category: "Electronics",
    badge: "Gaming",
    description: "RGB mechanical keyboard with tactile switches",
  },
  {
    id: 8,
    name: "Yoga Mat Premium",
    price: 49.99,
    originalPrice: 69.99,
    image: "/mat.png",
    rating: 4.6,
    reviews: 94,
    category: "Sports",
    badge: "Eco-Friendly",
    description: "Non-slip yoga mat made from sustainable materials",
  },
];

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home",
  "Sports",
  "Wearables",
  "Furniture",
];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Keep original order for featured
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">All Products</h1>
          <p className="text-gray-600">
            Discover our amazing collection of products
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={
                            selectedCategory === category
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort by</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border rounded-md"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} of {products.length}{" "}
            products
          </p>
        </motion.div>

        {/* Products Grid/List */}
        <motion.div
          layout
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-6"
              : "space-y-6"
          }
        >
          <AnimatePresence>
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                {viewMode === "grid" ? (
                  <Link href={`/product/${product.id}`}>
                    <Card className="overflow-hidden hover:shadow-xl shadow-2xl transition-all duration-300">
                      <div className="relative flex justify-center bg-[#b497d2] items-center h-64">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="w-45 h-45 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {product.badge}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.preventDefault();
                              // Add to wishlist functionality would go here
                            }}
                          >
                            <Heart className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(product);
                            }}
                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ShoppingBag className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              {product.category}
                            </span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm ml-1">
                                {product.rating}
                              </span>
                            </div>
                          </div>
                          <h3 className="font-semibold text-lg">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {product.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold">
                              ${product.price}
                            </span>
                            <span className="text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {product.reviews} reviews
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Link href={`/product/${product.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg shadow-xl transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative bg-[#b497d2] w-50 h-50 justify-center flex flex-col items-center">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={60}
                            height={60}
                            className="w-35 h-35 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {product.badge}
                          </span>
                        </div>

                        <CardContent className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between h-full">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">
                                  {product.category}
                                </span>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm ml-1">
                                    {product.rating}
                                  </span>
                                </div>
                              </div>
                              <h3 className="font-semibold text-xl">
                                {product.name}
                              </h3>
                              <p className="text-gray-600">
                                {product.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {product.reviews} reviews
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-4 mt-4 md:mt-0">
                              <div className="text-right">
                                <div className="text-2xl font-bold">
                                  ${product.price}
                                </div>
                                <div className="text-gray-500 line-through">
                                  ${product.originalPrice}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    // Add to wishlist functionality would go here
                                  }}
                                >
                                  <Heart className="w-4 h-4" />
                                </Button>
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToCart(product);
                                  }}
                                >
                                  <ShoppingBag className="w-4 h-4 mr-2" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
