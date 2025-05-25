"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Layers, Palette, Bot, Share2, Smartphone, LineChart, Cog, X } from "lucide-react"
import ServiceCard from "./service-card"
import { useMobile } from "@/hooks/use-mobile"

// FontAwesome Icons
import {
  FaReact, FaVuejs, FaAngular, FaNodeJs, FaLaravel, FaPython, FaJava, FaPhp, FaDatabase, FaPalette, FaCode,
  FaRobot, FaCogs, FaRocket, FaChartLine, FaChartBar, FaSearch, FaMobile, FaServer, FaTools,
  FaProjectDiagram, FaApple, FaGoogle, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaDocker, FaGithub,
  FaAws, FaMicrosoft, FaTrello, FaWordpress, FaCloud, FaDesktop, FaBrush, FaEdit, FaBullhorn, FaAndroid
} from "react-icons/fa"

// Technologies by service
const serviceTechnologies = [
  // your existing serviceTechnologies array here (unchanged for brevity)
]

// Service metadata
const services = [
  { title: "Web Development", description: "Custom websites and web applications built with the latest technologies.", icon: <Code className="h-10 w-10 text-[#30BAAF]" /> },
  { title: "Full Stack App Development", description: "End-to-end application development covering both frontend and backend.", icon: <Layers className="h-10 w-10 text-[#30BAAF]" /> },
  { title: "UI/UX Design", description: "User-centered design that creates intuitive and engaging experiences.", icon: <Palette className="h-10 w-10 text-[#30BAAF]" /> },
  { title: "AI and Automation", description: "Intelligent solutions that streamline processes and enhance decision-making.", icon: <Bot className="h-10 w-10 text-[#30BAAF]" /> },
  { title: "Social Media Marketing & SEO", description: "Strategic digital marketing to increase visibility and drive traffic.", icon: <Share2 className="h-10 w-10 text-[#30BAAF]" /> },
  { title: "Mobile App Development", description: "Native and cross-platform mobile applications for iOS and Android.", icon: <Smartphone className="h-10 w-10 text-[#30BAAF]" /> },
  { title: "Business Analysis", description: "Comprehensive analysis to identify opportunities and optimize processes.", icon: <LineChart className="h-10 w-10 text-[#30BAAF]" /> },
  { title: "Other Software Services", description: "Custom software solutions tailored to your specific business needs.", icon: <Cog className="h-10 w-10 text-[#30BAAF]" /> },
]

export default function Services() {
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState<number | null>(null)
  const isMobile = useMobile()

  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobile && hoveredServiceIndex !== null) {
        setHoveredServiceIndex(null)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isMobile, hoveredServiceIndex])

  return (
    <section id="services" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Intro & Popup */}
          <div className="lg:w-1/3 flex flex-col justify-start lg:sticky lg:top-24 lg:self-start relative">
            <div className={hoveredServiceIndex !== null ? "hidden lg:block opacity-0" : "block"}>
              <motion.h2
                className="text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Our Services
              </motion.h2>
              <motion.p
                className="text-xl text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                We offer a comprehensive range of IT solutions to help your business thrive in the digital world.
              </motion.p>
            </div>

            {/* Desktop Tech Popup */}
            <AnimatePresence>
              {!isMobile && hoveredServiceIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-md rounded-2xl p-6 border border-[#30BAAF]/20 max-h-[80vh] overflow-auto"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {services[hoveredServiceIndex].title} Technologies
                  </h3>
                  {Object.entries(serviceTechnologies[hoveredServiceIndex].technologies).map(([category, techs]) => (
                    <div key={category} className="mb-6 last:mb-0">
                      <h4 className="text-[#30BAAF] font-medium capitalize mb-3 text-lg">{category}:</h4>
                      <div className="flex flex-wrap gap-3">
                        {techs.map((tech) => (
                          <div
                            key={tech.name}
                            className="bg-[#30BAAF]/10 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-[#30BAAF]/20 transition-all duration-200 hover:scale-105"
                          >
                            {tech.icon && (
                              <tech.icon className="h-4 w-4" style={{ color: tech.color }} />
                            )}
                            <span>{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Cards */}
          <div className="lg:w-2/3">
            <div className="flex flex-col space-y-4">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  index={index}
                  onHover={setHoveredServiceIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Popup */}
      <AnimatePresence>
        {isMobile && hoveredServiceIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="bg-black/90 backdrop-blur-md rounded-2xl p-6 border border-[#30BAAF]/20 w-full max-w-md max-h-[80vh] overflow-auto"
              style={{ pointerEvents: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">{services[hoveredServiceIndex].title} Technologies</h3>
                <button onClick={() => setHoveredServiceIndex(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {Object.entries(serviceTechnologies[hoveredServiceIndex].technologies).map(([category, techs]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h4 className="text-[#30BAAF] font-medium capitalize mb-3 text-lg">{category}:</h4>
                  <div className="flex flex-wrap gap-3">
                    {techs.map((tech) => (
                      <div
                        key={tech.name}
                        className="bg-[#30BAAF]/10 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-[#30BAAF]/20 transition-all duration-200 hover:scale-105"
                      >
                        {tech.icon && (
                          <tech.icon className="h-4 w-4" style={{ color: tech.color }} />
                        )}
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
