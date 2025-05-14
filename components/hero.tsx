"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Logo above the title */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <Image src="/placeholder.svg?height=128&width=128" alt="KugaTech Logo" fill className="object-contain" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            <span className="text-[#30BAAF]">Kuga</span>Tech
          </h1>
          <div className="flex justify-center items-center space-x-4 mb-8">
            <span className="text-xl md:text-2xl text-white">Keen</span>
            <span className="text-[#30BAAF]">|</span>
            <span className="text-xl md:text-2xl text-white">Unified</span>
            <span className="text-[#30BAAF]">|</span>
            <span className="text-xl md:text-2xl text-white">Global</span>
            <span className="text-[#30BAAF]">|</span>
            <span className="text-xl md:text-2xl text-white">Agile</span>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Transforming ideas into powerful digital solutions. We build innovative software that drives business
            growth.
          </p>

          <button
            onClick={scrollToContact}
            className="group bg-gradient-to-r from-[#30BAAF] to-[#2aa69b] hover:from-[#2aa69b] hover:to-[#30BAAF] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#30BAAF]/30 flex items-center justify-center mx-auto"
          >
            <span>Get Started</span>
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
