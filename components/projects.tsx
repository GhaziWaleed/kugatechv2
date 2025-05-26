"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ExternalLink, X, Maximize2, Info } from "lucide-react"

const projects = [
  {
    title: "Mobile first approach E-Commerce Platform",
    description: "A full-featured online shopping platform with payment integration and inventory management.",
    fullDescription:
      "This comprehensive e-commerce solution features user authentication, product catalog management, shopping cart functionality, secure payment processing with Stripe, order tracking, inventory management, and an admin dashboard. Built with React and Node.js for optimal performance.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "https://plugnplay.pk/",
    isConfidential: false,
  },
    {
    title: "Platform to provide Car services/Agents",
    description: "A full-featured online shopping platform with payment integration and inventory management.",
    fullDescription:
      "This comprehensive e-commerce solution features user authentication, product catalog management, shopping cart functionality, secure payment processing with Stripe, order tracking, inventory management, and an admin dashboard. Built with React and Node.js for optimal performance.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "PHP"],
    demoUrl: "https://jdmtraders.co.uk/",
    isConfidential: false,
  },
  {
    title: "Healthcare Management System",
    description: "A comprehensive solution for managing patient records, appointments, and billing.",
    fullDescription:
      "An advanced healthcare management system designed to streamline medical practice operations. Features include patient registration, appointment scheduling, billing processing, medical history tracking, and HIPAA-compliant data storage. Built with Angular and Express for enterprise-level reliability.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Angular", "MySQL", "PHP", "Docker"],
    demoUrl: "https://nextjs.org",
    isConfidential: true,
    confidentialImage: "/placeholder.svg?height=400&width=600&text=CONFIDENTIAL",
  },
  {
    title: "Augmented Reality Dimension measuring app",
    description: "Instantly measure real-world objects and distances using your phone's camera with this AR app. Simply point, tap, and get dimensions overlaid on your screen.",
    fullDescription:
      "Transforms your smartphone or tablet into a virtual measuring tape with this innovative Augmented Reality app. By leveraging your device's camera and advanced AR technology, you can quickly and easily measure the length, width, height, area, and even volume of objects and spaces around you. Simply point your camera, tap to set measurement points on the real world as seen through your screen, and the app will overlay accurate digital measurements in real-time. Ideal for quick estimations, DIY projects, interior design planning, and more.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "React", "Gemini-API", "Lucide"],
    demoUrl: "https://radiator-measuring.netlify.app/",
    isConfidential: false,
  },
  {
    title: "Financial E-Wallet App",
    description: "Interactive data visualization tools for financial analysis and reporting.",
    fullDescription:
      "A powerful financial analytics platform providing real-time data visualization, portfolio tracking, risk assessment, automated reporting, and predictive modeling. Built with Vue.js and Python for advanced data processing and beautiful visualizations.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Vue.js", "Python", "D3.js", "FastAPI"],
    demoUrl: "https://react.dev",
    isConfidential: true,
    confidentialImage: "/placeholder.svg?height=400&width=600&text=CONFIDENTIAL",
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const openProject = (index: number) => {
    setSelectedProject(index)
    setShowDetails(false)
  }

  const closeProject = () => {
    setSelectedProject(null)
    setShowDetails(false)
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const openFullSite = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <section id="projects" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left div - Project blocks */}
          <div className="lg:w-2/3 order-2 lg:order-1">
            <div className="flex flex-col space-y-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-[#30BAAF]/20 transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => openProject(index)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 relative h-64 md:h-auto">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl"
                      />
                    </div>
                    <div className="md:w-3/5 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-[#30BAAF]/20 text-[#30BAAF] px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#30BAAF] hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          <span className="text-sm">Live Demo</span>
                        </a>
                        <div className="flex items-center text-xs text-gray-400">
                          <Info className="h-3 w-3 mr-1" />
                          <span>Click to preview</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right div - Title and description */}
          <div className="lg:w-1/3 flex flex-col justify-start order-1 lg:order-2 sticky top-24 self-start">
            <motion.h2
              className="text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Projects
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore some of our recent work and see how we've helped businesses achieve their goals.
            </motion.p>
            <motion.div
              className="text-sm text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="mb-2">
                💡 <strong>Tip:</strong> Click on any project to open a live preview window with detailed information.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full Screen Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeProject}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/30 backdrop-blur-sm rounded-2xl border border-[#30BAAF]/30 shadow-xl shadow-[#30BAAF]/20 w-full max-w-7xl h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-[#30BAAF]/20">
                  <h2 className="text-3xl font-bold text-white">{projects[selectedProject].title}</h2>
                  <button onClick={closeProject} className="text-gray-400 hover:text-white transition-colors">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex">
                  {/* Left Side - Project Details */}
                  <motion.div
                    className="w-1/3 p-6 border-r border-[#30BAAF]/20 overflow-y-auto"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="space-y-6">
                      {/* Project Image */}
                      <div className="relative h-48 rounded-xl overflow-hidden">
                        <Image
                          src={projects[selectedProject].image || "/placeholder.svg"}
                          alt={projects[selectedProject].title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">Project Overview</h3>
                        <p className="text-gray-300 leading-relaxed">
                          {showDetails
                            ? projects[selectedProject].fullDescription
                            : projects[selectedProject].description}
                        </p>
                        <button
                          onClick={toggleDetails}
                          className="text-[#30BAAF] hover:text-white transition-colors text-sm mt-2 flex items-center"
                        >
                          <Info className="h-3 w-3 mr-1" />
                          {showDetails ? "Show less" : "Click to see more details"}
                        </button>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {projects[selectedProject].tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-[#30BAAF]/20 text-[#30BAAF] px-3 py-1 rounded-full text-sm border border-[#30BAAF]/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        {projects[selectedProject].isConfidential ? (
                          <div className="w-full bg-red-500/20 border border-red-500/50 text-red-200 py-3 px-4 rounded-lg text-center">
                            <p className="text-sm">Live demo not available for confidential projects</p>
                          </div>
                        ) : (
                          <button
                            onClick={() => openFullSite(projects[selectedProject].demoUrl)}
                            className="w-full bg-[#30BAAF] hover:bg-[#2aa69b] text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open in New Tab
                          </button>
                        )}
                      </div>

                      {/* Additional Info */}
                      <div className="bg-[#30BAAF]/10 rounded-xl p-4 border border-[#30BAAF]/20">
                        <h4 className="text-[#30BAAF] font-medium mb-2">
                          {projects[selectedProject].isConfidential ? "Confidential Project" : "Live Preview"}
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {projects[selectedProject].isConfidential
                            ? "This project contains sensitive information and cannot be displayed publicly. Detailed screenshots and demos are available during private consultation sessions."
                            : "The website preview on the right shows the actual live project. You can interact with it directly or open it in a new tab for the full experience."}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Side - Live Website Preview or Confidential Image */}
                  <motion.div
                    className="flex-1 p-6"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="h-full bg-white rounded-xl overflow-hidden border border-[#30BAAF]/30 shadow-lg">
                      {projects[selectedProject].isConfidential ? (
                        // Confidential Project Display
                        <div className="h-full flex flex-col items-center justify-center bg-gray-100 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                              src={
                                projects[selectedProject].confidentialImage ||
                                "/placeholder.svg?height=400&width=600&text=CONFIDENTIAL"
                              }
                              alt="Confidential Project"
                              fill
                              className="object-contain opacity-80"
                            />
                          </div>
                          <div className="relative z-10 text-center p-8">
                            <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-6 backdrop-blur-sm">
                              <h3 className="text-2xl font-bold text-red-600 mb-2">CONFIDENTIAL PROJECT</h3>
                              <p className="text-gray-700 mb-4">
                                This project contains sensitive client information and cannot be displayed publicly.
                              </p>
                              <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3">
                                <p className="text-yellow-800 text-sm">
                                  <strong>Note:</strong> Screenshots and live demos are available upon request during
                                  consultation.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Live Website Preview (existing code)
                        <>
                          {/* Browser Header */}
                          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              </div>
                              <div className="bg-white rounded px-3 py-1 text-sm text-gray-600 border flex-1 max-w-md ml-4">
                                {projects[selectedProject].demoUrl}
                              </div>
                            </div>
                            <button
                              onClick={() => openFullSite(projects[selectedProject].demoUrl)}
                              className="text-gray-600 hover:text-gray-800 transition-colors"
                              title="Open in new tab"
                            >
                              <Maximize2 className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Website iframe */}
                          <div className="h-full">
                            <iframe
                              src={projects[selectedProject].demoUrl}
                              className="w-full h-full border-0"
                              title={`${projects[selectedProject].title} Preview`}
                              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                              loading="lazy"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
