"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useRef, useState } from "react"

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    image: "/user.png",
  },
  {
    name: "Sarah Williams",
    role: "CTO",
    image: "/user1.png",
  },
  {
    name: "Michael Chen",
    role: "Head of Design",
    image: "/user3.png",
  },
  {
    name: "Jessica Taylor",
    role: "Customer Experience",
    image: "/user2.png",
  },
]

const values = [
  {
    title: "Customer First",
    description: "We prioritize customer satisfaction above all else, ensuring every interaction exceeds expectations.",
    icon: "🌟",
  },
  {
    title: "Quality Products",
    description: "We curate only the highest quality products that meet our rigorous standards.",
    icon: "✅",
  },
  {
    title: "Fast Delivery",
    description: "We believe in getting products to you as quickly as possible without compromising on service.",
    icon: "🚚",
  },
  {
    title: "Sustainability",
    description: "We're committed to reducing our environmental impact through sustainable practices.",
    icon: "🌱",
  },
]

export default function AboutPage() {

  const videoRef = useRef<HTMLVideoElement>(null);
    const [paused, setPaused] = useState(false);
  
    const togglePlayback = () => {
      const video = videoRef.current;
      if (!video) return;
  
      if (video.paused) {
        video.play();
        setPaused(false);
      } else {
        video.pause();
        setPaused(true);
      }
    };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">About ShopSwift</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your destination for amazing products with lightning-fast delivery and unbeatable prices.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At ShopSwift, our mission is to make online shopping smooth, fast, and delightful with beautiful design
                and a focus on performance. We believe that shopping should be an enjoyable experience, not a chore.
              </p>
              <p className="text-lg text-gray-600">
                We're dedicated to bringing you the best products at competitive prices, all while providing exceptional
                customer service and a seamless shopping experience from browse to delivery.
              </p>
            </div>
           <div
                className="relative z-10 w-full max-w-lg mx-auto h-[550px] rounded-xl overflow-hidden shadow-lg"
                onMouseEnter={() => videoRef.current?.pause()}
                onMouseLeave={() => {
                  if (!paused) videoRef.current?.play();
                }}
                onClick={togglePlayback} // works for tap on mobile
              >
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src="https://videos.pexels.com/video-files/8764795/8764795-sd_360_640_25fps.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div whileHover={{ scale: 1.05 }} className="text-center space-y-4">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Browse & Select</h3>
              <p className="text-gray-600">
                Explore our wide range of high-quality products and add your favorites to cart.
              </p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="text-center space-y-4">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Quick Checkout</h3>
              <p className="text-gray-600">
                Our streamlined checkout process makes completing your purchase fast and easy.
              </p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="text-center space-y-4">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Swift Delivery</h3>
              <p className="text-gray-600">Receive your order quickly with our lightning-fast shipping options.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="text-center"
              >
                <div className="mb-4 relative mx-auto w-48 h-48 flex justify-center bg-[#b497d2] items-center rounded-full overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-45 h-45 mt-10 object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
