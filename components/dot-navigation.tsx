"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const sections = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
]

export default function DotNavigation() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section.id)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <div key={section.id} className="relative group">
            {/* Dot */}
            <button
              onClick={() => scrollToSection(section.id)}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-[#30BAAF] border-[#30BAAF] scale-125"
                  : "bg-transparent border-white/50 hover:border-[#30BAAF] hover:scale-110"
              }`}
              aria-label={`Go to ${section.label} section`}
            />

            {/* Label */}
            <div
              className={`absolute right-6 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-[#30BAAF] text-white opacity-100 translate-x-0"
                  : "bg-black/80 text-gray-300 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {section.label}
              {/* Arrow */}
              <div
                className={`absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent ${
                  activeSection === section.id ? "border-l-[#30BAAF]" : "border-l-black/80"
                }`}
              />
            </div>

            {/* Active indicator line */}
            {activeSection === section.id && (
              <motion.div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-2 border-[#30BAAF]/30 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
