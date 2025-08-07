"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Process", href: "/process" },
  { name: "Projects", href: "/projects" },
  { name: "Team", href: "/team" },
  { name: "Contact Us", href: "/contact", highlight: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center items-center py-4",
          scrolled ? "py-3" : "py-6",
        )}
      >
        <div className="flex items-center gap-4">
          {/* Main Navigation */}
          <div className="rounded-full bg-black/30 backdrop-blur-md border border-white/10 px-2 sm:px-6 py-2 sm:py-3 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-center space-x-0.5 sm:space-x-1 md:space-x-8">
              {navItems
                .filter((item) => !item.highlight) // Filter out Contact Us from main nav
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-xs sm:text-sm md:text-base text-white hover:text-[#30BAAF] transition-colors px-1.5 sm:px-3 py-1 rounded-full",
                      pathname === item.href && "bg-[#30BAAF]/20 text-[#30BAAF]",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}

              {/* Contact Us - stays in navbar when not scrolled */}
              {!scrolled && (
                <Link
                  href="/contact"
                  className={cn(
                    "text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#30BAAF] to-[#2aa69b] text-white font-bold px-1.5 sm:px-3 py-1 rounded-full transition-all duration-300 hover:from-[#2aa69b] hover:to-[#30BAAF] hover:scale-105",
                    pathname === "/contact" && "ring-2 ring-white/30",
                  )}
                >
                  Contact Us
                </Link>
              )}
            </div>

            {/* Magnetic field effect - appears when scrolling */}
            {scrolled && (
              <>
                {/* Energy particles */}
                <div
                  className="absolute right-2 top-1/2 w-1 h-1 bg-[#30BAAF] rounded-full"
                  style={{
                    animation: "particle1 1.2s ease-out",
                    transform: "translateY(-50%)",
                  }}
                />
                <div
                  className="absolute right-1 top-1/3 w-0.5 h-0.5 bg-[#2aa69b] rounded-full"
                  style={{
                    animation: "particle2 1.0s ease-out 0.1s both",
                  }}
                />
                <div
                  className="absolute right-3 bottom-1/3 w-0.5 h-0.5 bg-[#30BAAF] rounded-full"
                  style={{
                    animation: "particle3 1.1s ease-out 0.2s both",
                  }}
                />

                {/* Magnetic field lines */}
                <div
                  className="absolute right-0 top-1/2 w-8 h-0.5 bg-gradient-to-r from-[#30BAAF]/60 via-[#30BAAF]/30 to-transparent"
                  style={{
                    animation: "magneticField 0.8s ease-out",
                    transform: "translateY(-50%)",
                  }}
                />
                <div
                  className="absolute right-0 top-1/2 w-6 h-0.5 bg-gradient-to-r from-[#2aa69b]/40 via-[#2aa69b]/20 to-transparent"
                  style={{
                    animation: "magneticField 0.8s ease-out 0.1s both",
                    transform: "translateY(-50%) translateY(-3px)",
                  }}
                />
                <div
                  className="absolute right-0 top-1/2 w-6 h-0.5 bg-gradient-to-r from-[#2aa69b]/40 via-[#2aa69b]/20 to-transparent"
                  style={{
                    animation: "magneticField 0.8s ease-out 0.1s both",
                    transform: "translateY(-50%) translateY(3px)",
                  }}
                />
              </>
            )}
          </div>

          {/* Separated Contact Us Button with magnetic attraction effect */}
          {scrolled && (
            <div
              className={cn(
                "transition-all duration-700 ease-out transform relative",
                scrolled ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-12 scale-90",
              )}
              style={{
                animation: scrolled ? "magneticAttraction 1.0s ease-out 0.3s both" : "none",
              }}
            >
              {/* Attraction trail */}
              <div
                className="absolute left-0 top-1/2 w-8 h-0.5 bg-gradient-to-l from-[#30BAAF]/60 to-transparent"
                style={{
                  animation: scrolled ? "attractionTrail 0.8s ease-out 0.5s both" : "none",
                  transform: "translateY(-50%) translateX(-32px)",
                }}
              />

              <Link
                href="/contact"
                className={cn(
                  "bg-gradient-to-r from-[#30BAAF] to-[#2aa69b] hover:from-[#2aa69b] hover:to-[#30BAAF] text-white font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#30BAAF]/30 px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg text-xs sm:text-sm md:text-base whitespace-nowrap relative overflow-hidden",
                  pathname === "/contact" && "ring-2 ring-white/30",
                )}
              >
                <span className="relative z-10">Contact Us</span>

                {/* Energy glow effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#30BAAF]/30 to-[#2aa69b]/30 rounded-full"
                  style={{
                    animation: scrolled ? "energyGlow 1.5s ease-in-out 0.8s both" : "none",
                  }}
                />

                {/* Spark effects */}
                <div
                  className="absolute top-1 right-2 w-1 h-1 bg-white rounded-full"
                  style={{
                    animation: scrolled ? "spark1 0.6s ease-out 1.0s both" : "none",
                  }}
                />
                <div
                  className="absolute bottom-1 left-3 w-0.5 h-0.5 bg-white rounded-full"
                  style={{
                    animation: scrolled ? "spark2 0.5s ease-out 1.1s both" : "none",
                  }}
                />
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes particle1 {
          0% {
            transform: translateY(-50%) translateX(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-50%) translateX(20px) scale(1.5);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-50%) translateX(40px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes particle2 {
          0% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(30px) translateY(-10px) scale(0);
            opacity: 0;
          }
        }

        @keyframes particle3 {
          0% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(35px) translateY(10px) scale(0);
            opacity: 0;
          }
        }

        @keyframes magneticField {
          0% {
            width: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }

        @keyframes magneticAttraction {
          0% {
            transform: translateX(48px) scale(0.7) rotate(5deg);
            opacity: 0;
          }
          30% {
            transform: translateX(20px) scale(0.9) rotate(2deg);
            opacity: 0.7;
          }
          60% {
            transform: translateX(-5px) scale(1.05) rotate(-1deg);
            opacity: 0.9;
          }
          80% {
            transform: translateX(2px) scale(1.02) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateX(0) scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes attractionTrail {
          0% {
            width: 0;
            opacity: 0;
          }
          50% {
            width: 32px;
            opacity: 0.8;
          }
          100% {
            width: 32px;
            opacity: 0.3;
          }
        }

        @keyframes energyGlow {
          0%, 100% {
            opacity: 0;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes spark1 {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes spark2 {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(2) rotate(-180deg);
            opacity: 0.6;
          }
          100% {
            transform: scale(0) rotate(-360deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
