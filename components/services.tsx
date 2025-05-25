"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Layers, Palette, Bot, Share2, Smartphone, LineChart, Cog } from "lucide-react"
import ServiceCard from "./service-card"
import { useMobile } from "@/hooks/use-mobile"
// Use ONLY the most basic and guaranteed FontAwesome icons
import {
  FaReact,
  FaVuejs,
  FaAngular,
  FaNodeJs,
  FaLaravel,
  FaPython,
  FaJava,
  FaPhp,
  FaDatabase,
  FaPalette,
  FaCode,
  FaRobot,
  FaCogs,
  FaRocket,
  FaChartLine,
  FaChartBar,
  FaSearch,
  FaMobile,
  FaServer,
  FaTools,
  FaProjectDiagram,
  FaApple,
  FaGoogle,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaDocker,
  FaGithub,
  FaAws,
  FaMicrosoft,
  FaTrello,
  FaWordpress,
  FaCloud,
  FaDesktop,
  FaBrush,
  FaEdit,
  FaBullhorn,
  FaAndroid,
} from "react-icons/fa"

// Define technology lists with icons and colors for each service
const serviceTechnologies = [
  {
    title: "Web Development",
    technologies: {
      frontend: [
        { name: "React", icon: FaReact, color: "#61DAFB" },
        { name: "Vue", icon: FaVuejs, color: "#4FC08D" },
        { name: "Angular", icon: FaAngular, color: "#DD0031" },
        { name: "Next.js", icon: FaReact, color: "#000000" },
        { name: "Nuxt.js", icon: FaVuejs, color: "#00DC82" },
        { name: "Svelte", icon: FaCode, color: "#FF3E00" },
      ],
      backend: [
        { name: "Node.js", icon: FaNodeJs, color: "#339933" },
        { name: "Laravel", icon: FaLaravel, color: "#FF2D20" },
        { name: "PHP", icon: FaPhp, color: "#777BB4" },
        { name: "Django", icon: FaPython, color: "#092E20" },
        { name: "Ruby on Rails", icon: FaServer, color: "#CC0000" },
        { name: "Express.js", icon: FaNodeJs, color: "#000000" },
      ],
    },
  },
  {
    title: "Full Stack App Development",
    technologies: {
      frontend: [
        { name: "React", icon: FaReact, color: "#61DAFB" },
        { name: "Vue", icon: FaVuejs, color: "#4FC08D" },
        { name: "Angular", icon: FaAngular, color: "#DD0031" },
        { name: "Svelte", icon: FaCode, color: "#FF3E00" },
        { name: "Next.js", icon: FaReact, color: "#000000" },
      ],
      backend: [
        { name: "Node.js", icon: FaNodeJs, color: "#339933" },
        { name: "Express", icon: FaNodeJs, color: "#000000" },
        { name: "NestJS", icon: FaServer, color: "#E0234E" },
        { name: "Django", icon: FaPython, color: "#092E20" },
        { name: "Spring Boot", icon: FaJava, color: "#6DB33F" },
      ],
      database: [
        { name: "MongoDB", icon: FaDatabase, color: "#47A248" },
        { name: "PostgreSQL", icon: FaDatabase, color: "#336791" },
        { name: "MySQL", icon: FaDatabase, color: "#4479A1" },
        { name: "Firebase", icon: FaDatabase, color: "#FFCA28" },
        { name: "Redis", icon: FaDatabase, color: "#DC382D" },
      ],
    },
  },
  {
    title: "UI/UX Design",
    technologies: {
      design: [
        { name: "Figma", icon: FaBrush, color: "#F24E1E" },
        { name: "Adobe XD", icon: FaDesktop, color: "#FF61F6" },
        { name: "Sketch", icon: FaPalette, color: "#F7B500" },
        { name: "InVision", icon: FaEdit, color: "#FF3366" },
        { name: "Photoshop", icon: FaBrush, color: "#31A8FF" },
        { name: "Illustrator", icon: FaPalette, color: "#FF9A00" },
      ],
      prototyping: [
        { name: "Framer", icon: FaCode, color: "#0055FF" },
        { name: "Principle", icon: FaCogs, color: "#000000" },
        { name: "ProtoPie", icon: FaRocket, color: "#00D4FF" },
        { name: "Axure RP", icon: FaChartLine, color: "#00B2FF" },
        { name: "Marvel", icon: FaCogs, color: "#FF6900" },
      ],
    },
  },
  {
    title: "AI and Automation",
    technologies: {
      ai: [
        { name: "TensorFlow", icon: FaRobot, color: "#FF6F00" },
        { name: "PyTorch", icon: FaRobot, color: "#EE4C2C" },
        { name: "OpenAI API", icon: FaRobot, color: "#412991" },
        { name: "Hugging Face", icon: FaRobot, color: "#FFD21E" },
        { name: "scikit-learn", icon: FaChartBar, color: "#F7931E" },
        { name: "NLTK", icon: FaRobot, color: "#3776AB" },
      ],
      automation: [
        { name: "Zapier", icon: FaCogs, color: "#FF4A00" },
        { name: "n8n", icon: FaCogs, color: "#EA4B71" },
        { name: "Make", icon: FaCogs, color: "#6366F1" },
        { name: "Power Automate", icon: FaMicrosoft, color: "#0078D4" },
        { name: "UiPath", icon: FaRocket, color: "#FA4616" },
        { name: "Ansible", icon: FaTools, color: "#EE0000" },
      ],
    },
  },
  {
    title: "Social Media Marketing & SEO",
    technologies: {
      marketing: [
        { name: "Google Ads", icon: FaGoogle, color: "#4285F4" },
        { name: "Facebook Ads", icon: FaFacebook, color: "#1877F2" },
        { name: "Instagram", icon: FaInstagram, color: "#E4405F" },
        { name: "LinkedIn", icon: FaLinkedin, color: "#0A66C2" },
        { name: "TikTok", icon: FaBullhorn, color: "#000000" },
        { name: "Twitter", icon: FaTwitter, color: "#1DA1F2" },
      ],
      seo: [
        { name: "Google Analytics", icon: FaGoogle, color: "#E37400" },
        { name: "SEMrush", icon: FaBullhorn, color: "#FF642D" },
        { name: "Ahrefs", icon: FaSearch, color: "#00695C" },
        { name: "Moz", icon: FaSearch, color: "#3EAFC3" },
        { name: "Screaming Frog", icon: FaSearch, color: "#8BC34A" },
        { name: "Yoast SEO", icon: FaWordpress, color: "#A4286A" },
      ],
    },
  },
  {
    title: "Mobile App Development",
    technologies: {
      crossPlatform: [
        { name: "React Native", icon: FaReact, color: "#61DAFB" },
        { name: "Flutter", icon: FaMobile, color: "#02569B" },
        { name: "Ionic", icon: FaMobile, color: "#3880FF" },
        { name: "Xamarin", icon: FaMicrosoft, color: "#3498DB" },
        { name: "Capacitor", icon: FaMobile, color: "#119EFF" },
      ],
      native: [
        { name: "Swift (iOS)", icon: FaApple, color: "#FA7343" },
        { name: "Kotlin (Android)", icon: FaAndroid, color: "#7F52FF" },
        { name: "SwiftUI", icon: FaApple, color: "#007AFF" },
        { name: "Jetpack Compose", icon: FaAndroid, color: "#4285F4" },
      ],
    },
  },
  {
    title: "Business Analysis",
    technologies: {
      tools: [
        { name: "Tableau", icon: FaChartBar, color: "#E97627" },
        { name: "Power BI", icon: FaMicrosoft, color: "#F2C811" },
        { name: "JIRA", icon: FaProjectDiagram, color: "#0052CC" },
        { name: "Confluence", icon: FaProjectDiagram, color: "#172B4D" },
        { name: "Trello", icon: FaTrello, color: "#0079BF" },
        { name: "Notion", icon: FaCode, color: "#000000" },
      ],
      methodologies: [
        { name: "Agile", icon: FaRocket, color: "#FF6B35" },
        { name: "Scrum", icon: FaCogs, color: "#0052CC" },
        { name: "Lean", icon: FaChartLine, color: "#00C851" },
        { name: "Six Sigma", icon: FaChartLine, color: "#2E7D32" },
        { name: "Kanban", icon: FaCogs, color: "#FF9800" },
        { name: "Waterfall", icon: FaChartLine, color: "#1976D2" },
      ],
    },
  },
  {
    title: "Other Software Services",
    technologies: {
      cloud: [
        { name: "AWS", icon: FaAws, color: "#FF9900" },
        { name: "Azure", icon: FaMicrosoft, color: "#0078D4" },
        { name: "Google Cloud", icon: FaGoogle, color: "#4285F4" },
        { name: "Vercel", icon: FaRocket, color: "#000000" },
        { name: "Netlify", icon: FaRocket, color: "#00C7B7" },
        { name: "DigitalOcean", icon: FaCloud, color: "#0080FF" },
      ],
      devOps: [
        { name: "Docker", icon: FaDocker, color: "#2496ED" },
        { name: "Kubernetes", icon: FaServer, color: "#326CE5" },
        { name: "Jenkins", icon: FaTools, color: "#D33833" },
        { name: "GitHub Actions", icon: FaGithub, color: "#2088FF" },
        { name: "CircleCI", icon: FaCogs, color: "#343434" },
        { name: "Terraform", icon: FaTools, color: "#7B42BC" },
      ],
    },
  },
]

const services = [
  {
    title: "Web Development",
    description: "Custom websites and web applications built with the latest technologies.",
    icon: <Code className="h-10 w-10 text-[#30BAAF]" />,
  },
  {
    title: "Full Stack App Development",
    description: "End-to-end application development covering both frontend and backend.",
    icon: <Layers className="h-10 w-10 text-[#30BAAF]" />,
  },
  {
    title: "UI/UX Design",
    description: "User-centered design that creates intuitive and engaging experiences.",
    icon: <Palette className="h-10 w-10 text-[#30BAAF]" />,
  },
  {
    title: "AI and Automation",
    description: "Intelligent solutions that streamline processes and enhance decision-making.",
    icon: <Bot className="h-10 w-10 text-[#30BAAF]" />,
  },
  {
    title: "Social Media Marketing & SEO",
    description: "Strategic digital marketing to increase visibility and drive traffic.",
    icon: <Share2 className="h-10 w-10 text-[#30BAAF]" />,
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    icon: <Smartphone className="h-10 w-10 text-[#30BAAF]" />,
  },
  {
    title: "Business Analysis",
    description: "Comprehensive analysis to identify opportunities and optimize processes.",
    icon: <LineChart className="h-10 w-10 text-[#30BAAF]" />,
  },
  {
    title: "Other Software Services",
    description: "Custom software solutions tailored to your specific business needs.",
    icon: <Cog className="h-10 w-10 text-[#30BAAF]" />,
  },
]

export default function Services() {
  // Track which service is being hovered
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState<number | null>(null)
  const isMobile = useMobile()

  // Close popup when clicking outside on mobile
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
          {/* Left div - Title and description */}
          <div className="lg:w-1/3 flex flex-col justify-start lg:sticky lg:top-24 lg:self-start relative">
            {/* Default content - always render but hide when showing technologies */}
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

            {/* Desktop technology popup - positioned in the left column */}
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
                              <tech.icon
                                className="h-4 w-4 transition-all duration-200"
                                style={{ color: tech.color }}
                              />
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

          {/* Right div - Service blocks */}
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

      {/* Mobile technology popup - Fixed position with high z-index */}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              {Object.entries(serviceTechnologies[hoveredServiceIndex].technologies).map(([category, techs]) => (
                <div key={category} className="mb-4 last:mb-0">
                  <h4 className="text-[#30BAAF] font-medium capitalize mb-2">{category}:</h4>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <div
                        key={tech.name}
                        className="bg-[#30BAAF]/10 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1.5 hover:bg-[#30BAAF]/20 transition-all duration-200 hover:scale-105"
                      >
                        {tech.icon && (
                          <tech.icon className="h-3 w-3 transition-all duration-200" style={{ color: tech.color }} />
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
