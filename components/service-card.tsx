"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  index: number
  onHover: (index: number | null) => void
}

export default function ServiceCard({ title, description, icon, index, onHover }: ServiceCardProps) {
  const isMobile = useMobile()

  const handleInteraction = () => {
    onHover(index)
  }

  return (
    <motion.div
      className="bg-black/30 backdrop-blur-sm rounded-2xl p-5 hover:bg-black/50 transition-all hover:shadow-lg hover:shadow-[#30BAAF]/20 relative group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={isMobile ? undefined : handleInteraction}
      onMouseLeave={isMobile ? undefined : () => onHover(null)}
      onClick={isMobile ? handleInteraction : undefined}
    >
      <div className="flex items-start">
        <div className="mr-4">{icon}</div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
