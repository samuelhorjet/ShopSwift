"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { User, Package, CreditCard, LogOut, Settings, Heart, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock user data - in a real app, this would come from authentication
const userData = {
  name: "John Doe",
  email: "john@example.com",
  memberSince: "2024",
  avatar: "/placeholder.svg?height=200&width=200",
}

// Mock order data
const recentOrders = [
  {
    id: "ORD-12345",
    date: "June 1, 2024",
    status: "Delivered",
    total: 349.99,
    items: 3,
  },
  {
    id: "ORD-12344",
    date: "May 15, 2024",
    status: "Processing",
    total: 129.99,
    items: 1,
  },
  {
    id: "ORD-12343",
    date: "April 28, 2024",
    status: "Delivered",
    total: 599.99,
    items: 2,
  },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold">My Account</h1>
          <p className="text-gray-600">Manage your profile and view your orders</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                    <Image
                      src={userData.avatar || "/placeholder.svg"}
                      alt={userData.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 right-0">
                      <Button size="sm" variant="secondary" className="rounded-full w-8 h-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <p className="text-gray-500">{userData.email}</p>
                  <p className="text-sm text-gray-400">Member since {userData.memberSince}</p>
                </div>

                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="w-5 h-5 mr-3" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Package className="w-5 h-5 mr-3" />
                    Orders
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="w-5 h-5 mr-3" />
                    Wishlist
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <CreditCard className="w-5 h-5 mr-3" />
                    Payment Methods
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                        <p className="font-medium">{userData.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email Address</label>
                        <p className="font-medium">{userData.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone Number</label>
                        <p className="font-medium">+1 (555) 123-4567</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                        <p className="font-medium">January 1, 1990</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Default Address</h3>
                      <p className="text-gray-600">
                        123 Main Street
                        <br />
                        Apt 4B
                        <br />
                        San Francisco, CA 94103
                        <br />
                        United States
                      </p>
                    </div>

                    <Button>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{order.id}</h3>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">{order.date}</p>
                              <p className="text-sm">{order.items} items</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <p className="font-semibold">${order.total.toFixed(2)}</p>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Email Notifications</h3>
                      <div className="flex items-center justify-between">
                        <span>Order updates</span>
                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                          <span className="absolute h-4 w-4 rounded-full bg-white translate-x-6"></span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Promotions and deals</span>
                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                          <span className="absolute h-4 w-4 rounded-full bg-white translate-x-1"></span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Account activity</span>
                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                          <span className="absolute h-4 w-4 rounded-full bg-white translate-x-6"></span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Privacy</h3>
                      <div className="flex items-center justify-between">
                        <span>Make profile public</span>
                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                          <span className="absolute h-4 w-4 rounded-full bg-white translate-x-1"></span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Show activity status</span>
                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                          <span className="absolute h-4 w-4 rounded-full bg-white translate-x-6"></span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
