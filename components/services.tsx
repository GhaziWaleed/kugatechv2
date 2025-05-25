"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Code,
  Layers,
  Palette,
  Bot,
  Share2,
  Smartphone,
  LineChart,
  Cog,
  Cloud,
  BarChart3,
  Settings,
  MessageCircle,
  Monitor,
} from "lucide-react"
import ServiceCard from "./service-card"
import { useMobile } from "@/hooks/use-mobile"
// Import only the most reliable technology icons
import {
  SiReact,
  SiVuedotjs,
  SiAngular,
  SiNextdotjs,
  SiNuxtdotjs,
  SiSvelte,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiRubyonrails,
  SiLaravel,
  SiPhp,
  SiDotnet,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiRedis,
  SiGraphql,
  SiGit,
  SiDocker,
  SiFigma,
  SiAdobexd,
  SiSketch,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiFramer,
  SiTensorflow,
  SiPytorch,
  SiOpenai,
  SiPython,
  SiZapier,
  SiGoogle,
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiTiktok,
  SiGoogleanalytics,
  SiFlutter,
  SiIonic,
  SiSwift,
  SiKotlin,
  SiTableau,
  SiJira,
  SiConfluence,
  SiTrello,
  SiNotion,
  SiAmazonwebservices,
  SiGooglecloud,
  SiVercel,
  SiNetlify,
  SiDigitalocean,
  SiKubernetes,
  SiJenkins,
  SiGithubactions,
  SiCircleci,
  SiTerraform,
} from "react-icons/si"

// Define technology lists with icons and colors for each service
const serviceTechnologies = [
  {
    title: "Web Development",
    technologies: {
      frontend: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Vue", icon: SiVuedotjs, color: "#4FC08D" },
        { name: "Angular", icon: SiAngular, color: "#DD0031" },
        { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
        { name: "Nuxt.js", icon: SiNuxtdotjs, color: "#00DC82" },
        { name: "Svelte", icon: SiSvelte, color: "#FF3E00" },
      ],
      backend: [
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
        { name: "PHP", icon: SiPhp, color: "#777BB4" },
        { name: "Django", icon: SiDjango, color: "#092E20" },
        { name: "Ruby on Rails", icon: SiRubyonrails, color: "#CC0000" },
        { name: "Express.js", icon: SiExpress, color: "#000000" },
      ],
    },
  },
  {
    title: "Full Stack App Development",
    technologies: {
      frontend: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Vue", icon: SiVuedotjs, color: "#4FC08D" },
        { name: "Angular", icon: SiAngular, color: "#DD0031" },
        { name: "Svelte", icon: SiSvelte, color: "#FF3E00" },
        { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      ],
      backend: [
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Express", icon: SiExpress, color: "#000000" },
        { name: "Django", icon: SiDjango, color: "#092E20" },
        { name: "ASP.NET", icon: SiDotnet, color: "#512BD4" },
      ],
      database: [
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
        { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        { name: "Redis", icon: SiRedis, color: "#DC382D" },
      ],
      others: [
        { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
        { name: "Git", icon: SiGit, color: "#F05032" },
        { name: "Docker", icon: SiDocker, color: "#2496ED" },
      ],
    },
  },
  {
    title: "UI/UX Design",
    technologies: {
      design: [
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        { name: "Adobe XD", icon: SiAdobexd, color: "#FF61F6" },
        { name: "Sketch", icon: SiSketch, color: "#F7B500" },
        { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
        { name: "Illustrator", icon: SiAdobeillustrator, color: "#FF9A00" },
      ],
      prototyping: [
        { name: "Framer", icon: SiFramer, color: "#0055FF" },
        { name: "Adobe XD", icon: SiAdobexd, color: "#FF61F6" },
      ],
    },
  },
  {
    title: "AI and Automation",
    technologies: {
      ai: [
        { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
        { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
        { name: "OpenAI API", icon: SiOpenai, color: "#412991" },
        { name: "Python", icon: SiPython, color: "#3776AB" },
      ],
      automation: [
        { name: "Zapier", icon: SiZapier, color: "#FF4A00" },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      ],
    },
  },
  {
    title: "Social Media Marketing & SEO",
    technologies: {
      marketing: [
        { name: "Google Ads", icon: SiGoogle, color: "#4285F4" },
        { name: "Facebook Ads", icon: SiFacebook, color: "#1877F2" },
        { name: "Instagram", icon: SiInstagram, color: "#E4405F" },
        { name: "LinkedIn", icon: SiLinkedin, color: "#0A66C2" },
        { name: "TikTok", icon: SiTiktok, color: "#000000" },
        { name: "Twitter", icon: MessageCircle, color: "#1DA1F2" },
      ],
      seo: [{ name: "Google Analytics", icon: SiGoogleanalytics, color: "#E37400" }],
    },
  },
  {
    title: "Mobile App Development",
    technologies: {
      crossPlatform: [
        { name: "React Native", icon: SiReact, color: "#61DAFB" },
        { name: "Flutter", icon: SiFlutter, color: "#02569B" },
        { name: "Ionic", icon: SiIonic, color: "#3880FF" },
        { name: "Xamarin", icon: Monitor, color: "#3498DB" },
      ],
      native: [
        { name: "Swift (iOS)", icon: SiSwift, color: "#FA7343" },
        { name: "Kotlin (Android)", icon: SiKotlin, color: "#7F52FF" },
      ],
    },
  },
  {
    title: "Business Analysis",
    technologies: {
      tools: [
        { name: "Tableau", icon: SiTableau, color: "#E97627" },
        { name: "Power BI", icon: BarChart3, color: "#F2C811" },
        { name: "JIRA", icon: SiJira, color: "#0052CC" },
        { name: "Confluence", icon: SiConfluence, color: "#172B4D" },
        { name: "Trello", icon: SiTrello, color: "#0079BF" },
        { name: "Notion", icon: SiNotion, color: "#000000" },
      ],
      methodologies: [
        { name: "Agile", icon: Settings, color: "#30BAAF" },
        { name: "Scrum", icon: Settings, color: "#30BAAF" },
        { name: "Lean", icon: Settings, color: "#30BAAF" },
        { name: "Six Sigma", icon: Settings, color: "#30BAAF" },
        { name: "Kanban", icon: Settings, color: "#30BAAF" },
        { name: "Waterfall", icon: Settings, color: "#30BAAF" },
      ],
    },
  },
  {
    title: "Other Software Services",
    technologies: {
      cloud: [
        { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
        { name: "Azure", icon: Cloud, color: "#0078D4" },
        { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
        { name: "Vercel", icon: SiVercel, color: "#000000" },
        { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
        { name: "DigitalOcean", icon: SiDigitalocean, color: "#0080FF" },
      ],
      devOps: [
        { name: "Docker", icon: SiDocker, color: "#2496ED" },
        { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
        { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
        { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
        { name: "CircleCI", icon: SiCircleci, color: "#343434" },
        { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
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
                        {techs.map((tech) => {
                          const IconComponent = tech.icon
                          return (
                            <div
                              key={tech.name}
                              className="flex items-center gap-2 bg-[#30BAAF]/10 hover:bg-[#30BAAF]/20 text-white px-3 py-2 rounded-full text-sm transition-all duration-200 border border-[#30BAAF]/20"
                            >
                              <IconComponent style={{ color: tech.color }} className="w-4 h-4" />
                              <span>{tech.name}</span>
                            </div>
                          )
                        })}
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
                <div key={category} className="mb-6 last:mb-0">
                  <h4 className="text-[#30BAAF] font-medium capitalize mb-3 text-lg">{category}:</h4>
                  <div className="flex flex-wrap gap-3">
                    {techs.map((tech) => {
                      const IconComponent = tech.icon
                      return (
                        <div
                          key={tech.name}
                          className="flex items-center gap-2 bg-[#30BAAF]/10 hover:bg-[#30BAAF]/20 text-white px-3 py-2 rounded-full text-sm transition-all duration-200 border border-[#30BAAF]/20"
                        >
                          <IconComponent style={{ color: tech.color }} className="w-4 h-4" />
                          <span>{tech.name}</span>
                        </div>
                      )
                    })}
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
