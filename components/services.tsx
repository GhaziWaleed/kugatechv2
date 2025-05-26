"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Layers, Palette, Bot, Share2, Smartphone, LineChart, Cog } from "lucide-react"
import ServiceCard from "./service-card"
import { useMobile } from "@/hooks/use-mobile"

// Define technology lists for each service
const serviceTechnologies = [
  {
    title: "Web Development",
    technologies: {
      frontend: ["React", "Vue", "Angular", "Next.js", "Nuxt.js", "Svelte"],
      backend: ["Node.js", "Laravel", "PHP", "Django", "Ruby on Rails", "Express.js"],
    },
  },
  {
    title: "Full Stack App Development",
    technologies: {
      frontend: ["React", "Vue", "Angular", "Svelte", "Next.js"],
      backend: ["Node.js", "Express", "NestJS", "Django", "Spring Boot"],
      database: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis"],
    },
  },
  {
    title: "UI/UX Design",
    technologies: {
      design: ["Figma", "Adobe XD", "Sketch", "InVision", "Photoshop", "Illustrator"],
      prototyping: ["Framer", "Principle", "ProtoPie", "Axure RP", "Marvel"],
    },
  },
  {
    title: "AI and Automation",
    technologies: {
      ai: ["TensorFlow", "PyTorch", "OpenAI API", "Hugging Face", "scikit-learn", "NLTK"],
      automation: ["Zapier", "n8n", "Make", "Power Automate", "UiPath", "Ansible"],
    },
  },
  {
    title: "Social Media Marketing & SEO",
    technologies: {
      marketing: ["Google Ads", "Facebook Ads", "Instagram", "LinkedIn", "TikTok", "Twitter"],
      seo: ["Google Analytics", "SEMrush", "Ahrefs", "Moz", "Screaming Frog", "Yoast SEO"],
    },
  },
  {
    title: "Mobile App Development",
    technologies: {
      crossPlatform: ["React Native", "Flutter", "Ionic", "Xamarin", "Capacitor"],
      native: ["Swift (iOS)", "Kotlin (Android)", "SwiftUI", "Jetpack Compose"],
    },
  },
  {
    title: "Business Analysis",
    technologies: {
      tools: ["Tableau", "Power BI", "JIRA", "Confluence", "Trello", "Notion"],
      methodologies: ["Agile", "Scrum", "Lean", "Six Sigma", "Kanban", "Waterfall"],
    },
  },
  {
    title: "Other Software Services",
    technologies: {
      cloud: ["AWS", "Azure", "Google Cloud", "Vercel", "Netlify", "DigitalOcean"],
      devOps: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "CircleCI", "Terraform"],
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
                    <div key={category} className="mb-4 last:mb-0">
                      <h4 className="text-[#30BAAF] font-medium capitalize mb-2">{category}:</h4>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech) => (
                          <span key={tech} className="bg-[#30BAAF]/10 text-white px-3 py-1 rounded-full text-sm">
                            {tech}
                          </span>
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
                <h3 className="text-2xl font-bold text-white">{services[hoveredServiceIndex].title} Technologies</h3>
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
                      <span key={tech} className="bg-[#30BAAF]/10 text-white px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
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
