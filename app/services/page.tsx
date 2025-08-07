"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import WaveBackground from "@/components/wave-background"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <WaveBackground />
      <Navbar />

      <section className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            {/* Back to Home button */}
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center bg-gradient-to-r from-[#30BAAF] to-[#2aa69b] hover:from-[#2aa69b] hover:to-[#30BAAF] text-white font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#30BAAF]/30 px-8 py-4 rounded-full"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Services
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We offer a comprehensive range of IT solutions to help your business thrive in the digital world. From web development to AI automation, we've got you covered.
            </motion.p>
          </div>

          {/* Services Component */}
          <div className="mt-8">
            <Services />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
