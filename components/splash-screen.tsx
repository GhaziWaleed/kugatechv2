"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }} // Show for 2 seconds, then fade out for 0.5 seconds
      onAnimationComplete={onComplete}
    >
      <div className="flex flex-col items-center justify-center">
        {/* Logo placeholder - replace with your actual logo */}
        <div className="relative w-32 h-32 mb-6">
          <Image src="/logo.png?height=128&width=128" alt="KugaTech Logo" fill className="object-contain" />
        </div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="text-[#30BAAF]">Kuga</span>Tech
        </motion.h1>
      </div>
    </motion.div>
  )
}
