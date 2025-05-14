"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Projects", href: "#projects" },
  { name: "Team", href: "#team" },
  { name: "Contact Us", href: "#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Optional: Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center py-4",
        scrolled ? "py-3" : "py-6",
      )}
    >
      {/* Apple-like pill container with blur effect */}
      <div className="rounded-full bg-black/30 backdrop-blur-md border border-white/10 px-2 sm:px-6 py-2 sm:py-3 shadow-lg">
        <div className="flex items-center justify-center space-x-0.5 sm:space-x-1 md:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-xs sm:text-sm md:text-base text-white hover:text-[#30BAAF] transition-colors px-1.5 sm:px-3 py-1 rounded-full",
                activeSection === item.href.substring(1) && "bg-[#30BAAF]/20 text-[#30BAAF]",
              )}
              onClick={(e) => {
                e.preventDefault()
                const element = document.querySelector(item.href)
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                  setActiveSection(item.href.substring(1))
                }
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
