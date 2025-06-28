"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Layers, Palette, Bot, Share2, Smartphone, LineChart, Cog, Cloud } from "lucide-react"
import ServiceCard from "./service-card"
import { useMobile } from "@/hooks/use-mobile"


const services = [
  {
    title: "Full Stack Development",
    description:
      "Robust web & mobile apps built with modern stacks and integrated QA. From UI/UX to APIs, cloud deployments and testing—we deliver reliable, scalable digital products.",
    icon: <Code className="h-10 w-10 text-[#30BAAF]" />,
  },
  {
    title: "Mobile App Development",
    description:
      "Cross-platform and native mobile apps for iOS and Android. We ensure seamless UX, backend integration, performance, and thorough QA testing for every release.",
    icon: <Smartphone className="h-10 w-10 text-[#30BAAF]" />,
  },
  {
    title: "E-Commerce Solutions",
    description:
      "Scalable e-commerce platforms with payment, inventory & custom features. Built with Shopify, WooCommerce, or custom stacks—optimized for conversions and growth.",
    icon: <Layers className="h-10 w-10 text-[#30BAAF]" />,
  },
  {
    title: "AI & Automation",
    description:
      "We build intelligent AI systems and automation tools that power chatbots, smart assistants, and streamlined workflows—enhancing business efficiency through machine learning and predictive intelligence.",
    icon: <Bot className="h-10 w-10 text-[#30BAAF]" />,
  },
  {
    title: "Cloud & DevOps",
    description:
      "Infrastructure, CI/CD, and automated deployments on AWS, Azure, and GCP. Our DevOps experts ensure uptime, scalability, and efficient delivery pipelines.",
    icon: <Cloud className="h-10 w-10 text-[#30BAAF]" />,
  },
  {
    title: "UI/UX Design",
    description:
      "User-centered interfaces, design systems, and prototypes using Figma, Adobe XD, and more. We translate ideas into pixel-perfect, intuitive experiences.",
    icon: <Palette className="h-10 w-10 text-[#30BAAF]" />,
  },
  {
    title: "Digital Marketing & SEO",
    description:
      "SEO, ads, and marketing campaigns designed to increase visibility and leads. From content strategy to analytics, we grow your brand through data-driven performance.",
    icon: <Share2 className="h-10 w-10 text-[#30BAAF]" />,
  },
]

const serviceTechnologies = [
  {
    title: "Full Stack Development",
    technologies: {
      frontend: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
        { name: "Vue", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
        { name: "Nuxt.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" },

      ],
      backend: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "ASP.NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
        { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" },
        { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
        { name: "Nest.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" },
      ],
      database: [
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      ],
      QA: [
        { name: "Selenium", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" },
        { name: "Cypress", icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/cypress.svg" },
        { name: "Playwright", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg" },
      ],
    },
  },
  {
    title: "Mobile App Development",
    technologies: {
      crossPlatform: [
        { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
        { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      ],
      native: [
        { name: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
        { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
      ],
      database: [
        { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
        { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
      ],
    QA: [
        { name: "Appium", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/appium.svg" },
        { name: "Playwright", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg" },
      ],
    },
  },
  {
    title: "E-Commerce Solutions",
    technologies: {
      platforms: [
        { name: "Shopify", icon: "https://cdn.shopify.com/assets/images/logos/shopify-bag.png" },
        { name: "WooCommerce", icon: "https://cdn.worldvectorlogo.com/logos/woocommerce.svg" },
        { name: "Magento", icon: "https://cdn.worldvectorlogo.com/logos/magento.svg" },
        { name: "Wordpress", icon: "https://cdn.worldvectorlogo.com/logos/wordpress-icon-1.svg"},
      ],
      payment: [
        { name: "Stripe", icon: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg" },
        { name: "PayPal", icon: "https://cdn.worldvectorlogo.com/logos/paypal-3.svg" },
        { name: "Razorpay", icon: "https://cdn.worldvectorlogo.com/logos/razorpay.svg" },
      ],
    },
  },
  {
    title: "AI & Automation",
    technologies: {
      ai: [
        { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
        { name: "OpenAI", icon: "https://openai.com/favicon.ico" },
        { name: "LangChain", icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/langchain.svg" },
      ],
      automation: [
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
        { name: "OpenAI", icon: "https://openai.com/favicon.ico" },
        { name: "Zapier", icon: "https://cdn.worldvectorlogo.com/logos/zapier.svg" },
        

      ],
      // QA: [
      //   { name: "Katalon Studio", icon: "https://cdn.worldvectorlogo.com/logos/katalon-studio.svg" },

      // ],
    },
  },
  {
    title: "Cloud & DevOps",
    technologies: {
      cloud: [
        { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
        { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
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
          name: "Terraform",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
        },
        { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
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
          { name: "Framer", icon: "https://cdn.worldvectorlogo.com/logos/framed.svg"},
          { name: "InVision", icon: "https://cdn.worldvectorlogo.com/logos/invision.svg" },
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
          { name: "Ahrefs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ahrefs/ahrefs-original.svg" },
          { name: "SemRush", icon: "https://cdn.worldvectorlogo.com/logos/semrush.svg" },
        ],
      },
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
                    <div key={category} className="mb-4 last:mb-0">
                      <h4 className="text-[#30BAAF] font-medium capitalize mb-2 text-base">{category}:</h4>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech) => (
                          <div
                            key={tech.name}
                            className="flex items-center gap-1 bg-[#30BAAF]/10 hover:bg-[#30BAAF]/20 text-white px-2 py-1 rounded-full text-xs transition-all duration-200 border border-[#30BAAF]/20 max-w-[120px]"
                          >
                            <img
                              src={tech.icon || "/placeholder.svg"}
                              alt={tech.name}
                              className="w-3.5 h-3.5 object-contain"
                              onError={(e) => {
                                // Fallback to a generic icon if CDN fails
                                e.currentTarget.style.display = "none"
                              }}
                            />
                            <span className="truncate">{tech.name}</span>
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
                <div key={category} className="mb-4 last:mb-0">
                  <h4 className="text-[#30BAAF] font-medium capitalize mb-2 text-base">{category}:</h4>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-1 bg-[#30BAAF]/10 hover:bg-[#30BAAF]/20 text-white px-2 py-1 rounded-full text-xs transition-all duration-200 border border-[#30BAAF]/20 max-w-[120px]"
                      >
                        <img
                          src={tech.icon || "/placeholder.svg"}
                          alt={tech.name}
                          className="w-3.5 h-3.5 object-contain"
                          onError={(e) => {
                            // Fallback to a generic icon if CDN fails
                            e.currentTarget.style.display = "none"
                          }}
                        />
                        <span className="truncate">{tech.name}</span>
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
