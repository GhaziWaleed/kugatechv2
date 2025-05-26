"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Layers, Palette, Bot, Share2, Smartphone, LineChart, Cog } from "lucide-react"
import ServiceCard from "./service-card"
import { useMobile } from "@/hooks/use-mobile"

// Define technology lists with CDN icons for each service
const serviceTechnologies = [
  {
    title: "Web Development",
    technologies: {
      frontend: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Vue", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
        {
          name: "Angular",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
        },
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Nuxt.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" },
        { name: "Svelte", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
      ],
      backend: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" },
        { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
        {
          name: "Ruby on Rails",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg",
        },
        { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      ],
    },
  },
  {
    title: "Full Stack App Development",
    technologies: {
      frontend: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Vue", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
        {
          name: "Angular",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
        },
        { name: "Svelte", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      ],
      backend: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
        { name: "ASP.NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
      ],
      database: [
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        {
          name: "PostgreSQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
        { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      ],
      others: [
        { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      ],
    },
  },
  {
    title: "UI/UX Design",
    technologies: {
      design: [
        { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        { name: "Adobe XD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg" },
        { name: "Sketch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg" },
        { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
        {
          name: "Illustrator",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
        },
      ],
      prototyping: [
        { name: "Framer", icon: "https://www.framer.com/images/favicons/favicon.svg" },
        { name: "InVision", icon: "https://cdn.worldvectorlogo.com/logos/invision.svg" },
      ],
    },
  },
  {
    title: "AI and Automation",
    technologies: {
      ai: [
        {
          name: "TensorFlow",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
        },
        { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
        { name: "OpenAI", icon: "https://openai.com/favicon.ico" },
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      ],
      automation: [
        { name: "Zapier", icon: "https://cdn.worldvectorlogo.com/logos/zapier.svg" },
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      ],
    },
  },
  {
    title: "Social Media Marketing & SEO",
    technologies: {
      marketing: [
        { name: "Google Ads", icon: "https://cdn.worldvectorlogo.com/logos/google-ads-2.svg" },
        { name: "Facebook", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" },
        { name: "Instagram", icon: "https://cdn.worldvectorlogo.com/logos/instagram-2016-5.svg" },
        { name: "LinkedIn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" },
        { name: "TikTok", icon: "https://cdn.worldvectorlogo.com/logos/tiktok-icon.svg" },
        { name: "Twitter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" },
      ],
      seo: [
        { name: "Google Analytics", icon: "https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg" },
        { name: "SEMrush", icon: "https://cdn.worldvectorlogo.com/logos/semrush.svg" },
      ],
    },
  },
  {
    title: "Mobile App Development",
    technologies: {
      crossPlatform: [
        { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
        { name: "Ionic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" },
        { name: "Xamarin", icon: "https://cdn.worldvectorlogo.com/logos/xamarin.svg" },
      ],
      native: [
        { name: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
        { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      ],
    },
  },
  {
    title: "Business Analysis",
    technologies: {
      tools: [
        { name: "Tableau", icon: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
        { name: "Power BI", icon: "https://cdn.worldvectorlogo.com/logos/power-bi.svg" },
        { name: "JIRA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
        {
          name: "Confluence",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
        },
        { name: "Trello", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg" },
        { name: "Notion", icon: "https://cdn.worldvectorlogo.com/logos/notion-logo-1.svg" },
      ],
      methodologies: [
        { name: "Agile", icon: "https://cdn.worldvectorlogo.com/logos/agile.svg" },
        { name: "Scrum", icon: "https://cdn.worldvectorlogo.com/logos/scrum-1.svg" },
        { name: "Lean", icon: "https://cdn.worldvectorlogo.com/logos/lean-startup.svg" },
        { name: "Kanban", icon: "https://cdn.worldvectorlogo.com/logos/kanban.svg" },
      ],
    },
  },
  {
    title: "Other Software Services",
    technologies: {
      cloud: [
        {
          name: "AWS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
        },
        { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
        {
          name: "Google Cloud",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
        },
        { name: "Vercel", icon: "https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico" },
        { name: "Netlify", icon: "https://cdn.worldvectorlogo.com/logos/netlify.svg" },
        {
          name: "DigitalOcean",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg",
        },
      ],
      devOps: [
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        {
          name: "Kubernetes",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        },
        { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "GitLab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
        {
          name: "Terraform",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
        },
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
                  className="absolute top-0 left-0 right-0 z-[100] bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-[#30BAAF]/20 max-h-[80vh] overflow-auto shadow-lg hover:shadow-[#30BAAF]/20"
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
                            className="flex items-center gap-2 bg-[#30BAAF]/10 hover:bg-[#30BAAF]/20 text-white px-3 py-2 rounded-full text-sm transition-all duration-200 border border-[#30BAAF]/20"
                          >
                            <img
                              src={tech.icon || "/placeholder.svg"}
                              alt={tech.name}
                              className="w-4 h-4 object-contain"
                              onError={(e) => {
                                // Fallback to a generic icon if CDN fails
                                e.currentTarget.style.display = "none"
                              }}
                            />
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
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-[#30BAAF]/20 w-full max-w-md max-h-[80vh] overflow-auto shadow-lg hover:shadow-[#30BAAF]/20"
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
                    {techs.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-2 bg-[#30BAAF]/10 hover:bg-[#30BAAF]/20 text-white px-3 py-2 rounded-full text-sm transition-all duration-200 border border-[#30BAAF]/20"
                      >
                        <img
                          src={tech.icon || "/placeholder.svg"}
                          alt={tech.name}
                          className="w-4 h-4 object-contain"
                          onError={(e) => {
                            // Fallback to a generic icon if CDN fails
                            e.currentTarget.style.display = "none"
                          }}
                        />
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
