"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ExternalLink, X, Maximize2, Info, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react"

const projects = [

  {
    title: "Rock Scan Mobile App",
    description: "AI-powered rock identification and analysis using camera input and live data.",
    fullDescription:
      "Rock Scan is a Flutter-based mobile app that uses AI and computer vision to identify rock types through camera scans. It provides instant geological insights, including rock classification and properties, with offline functionality, a personal rock gallery, and cloud sync via Firebase.",
    image: "/updateRock.jpeg?height=950&width=800",
    tags: ["Flutter", "TensorFlow Lite", "Firebase", "REST API", "Computer Vision", "Geology", "Image Recognition"],
    screenshots: [
      "/rock1.jpeg",
      "/rock2.jpeg",
    ]
  },

  {
    title: "Healthcare & EMAR Management System",
    description: "A HIPAA-compliant system for managing patient records, billing, and EMAR in U.S. healthcare facilities.",
    fullDescription:
      "A scalable healthcare system for U.S. clinics, offering patient records, billing, EMAR, and appointment scheduling. It includes medication tracking, real-time reports, and role-based access. Built with Angular on the frontend and ASP.NET with PHP Laravel on the backend for secure, high-performance operations.",
    image: "/BT.png?height=600&width=400",
    tags: ["ASP.NET","Laravel","PHP","Angular", "MySQL", "HIPAA", "Docker"],
    //demoUrl: "https://nextjs.org",
    isConfidential: true,
    confidentialImage: "/placeholder.svg?height=400&width=600&text=CONFIDENTIAL",
  },

  {
    title: "Shopify-Based E-Commerce Platform",
    description: "A full-featured online shopping platform with payment integration and inventory management.",
    fullDescription:
      "A mobile-first Shopify store designed for seamless user experience with integrated payment gateways, custom theme design, and inventory management features.",
    image: "/plugnplay.png",
    tags: ["Shopify", "Liquid", "PHP", "JavaScript", "Stripe", "Responsive Design"],
    demoUrl: "https://plugnplay.pk/",
    isConfidential: false,
    canEmbed: false, // This site blocks iframe embedding
    screenshotUrl: "/plugnplay-screenshot.png",
  },
  {
    title: "WordPress Automotive Services Marketplace",
    description: "A full-featured online shopping platform with payment integration and inventory management.",
    fullDescription:
      "A service listing and e-commerce platform built on WordPress for car agents, with payment integration, booking form, and service filters.",
    image: "/jdm-traders.png?height=600&width=800",
    tags: ["WordPress", "WooCommerce", "PHP", "Elementor", "MySQL"],
    demoUrl: "https://jdmtraders.co.uk/",
    isConfidential: false,
    canEmbed: true, // This site allows iframe embedding
  },

  {
    title: "WordPress-Based Nonprofit Organization Site",
    description: "Responsive WordPress site for a nonprofit with donation and community engagement features.",
    fullDescription:
      "A responsive and accessible WordPress website designed to represent the mission of the Delancey Street Foundation. It includes donation integrations, media galleries, volunteer information, and custom page layouts for community outreach.",
    image: "/Delency.png?height=600&width=800",
    tags: ["WordPress", "SEO", "PHP", "Elementor", "MySQL"],
    demoUrl: "https://delanceystreetbc.org/",
    isConfidential: false,
    canEmbed: true, // This site allows iframe embedding
  },

  {
    title: "Pakistan Army Museum CMS System",
    description: "Secure and scalable inventory and content management system for the Pakistan Army Museum, GHQ Rawalpindi.",
    fullDescription:
      "A custom-built backend system developed to manage the digital inventory and content for the Pakistan Army Museum at GHQ Rawalpindi. Designed with a focus on high security, robust database design, and performance optimization, the system handles artifact cataloging, media storage, user access control, and audit logging. Developed using Node.js and Express.js, integrated with a PostgreSQL database, and secured with JWT authentication and role-based access. Media and document management is powered through cloud storage integration with AWS S3 or secure on-premise solutions.",
    image: "/PAKarmy.jpg?height=600&width=400",
    tags: ["Node.js", "Express.js", "PostgreSQL", "JWT", "RBAC", "REST API", "AWS S3","Inventory Management"],
    //demoUrl: "https://nextjs.org",
    isConfidential: true,
    confidentialImage: "/placeholder.svg?height=400&width=600&text=CONFIDENTIAL",
  },
  
  {
    title: "Augmented Reality Dimension measuring app",
    description:
      "Instantly measure real-world objects and distances using your phone's camera with this AR app. Simply point, tap, and get dimensions overlaid on your screen.",
    fullDescription:
      "Note: The production version of this project is under client confidentiality and not publicly accessible. A demo is available to showcase core features. Transform your smartphone or tablet into a virtual measuring tape with this innovative Augmented Reality app. Using your device's camera and AR technology, it enables quick and accurate measurement of length, height, area, and volume in real-world environments. Just point, tap to set points, and see digital measurements overlaid in real time. Ideal for home projects, interior planning, and instant estimations.",
    image: "/AR.jpg?height=600&width=800",
    tags: ["Python", "Next.js", "React", "ARKit", "Computer Vision"],
    demoUrl: "https://radiator-measuring.netlify.app/",
    isConfidential: false,
    canEmbed: true, // This site allows iframe embedding
  },
  {
    title: "Knutsford Express Online Bus Booking System",
    description: "A modern transport booking website for intercity travel across Jamaica.",
    fullDescription:
      "We developed and automated the complete bus booking module for Knutsford Express, a leading Jamaican transport service. The system enables users to select routes, book seats, manage reservations, and make payments through a smooth, intuitive interface. We also built a robust regression test suite using Katalon Studio to automate key booking flows—route management, fare calculation, and trip confirmation—integrated with Azure DevOps for continuous testing and reporting. The solution supports CI/CD, cross-browser compatibility, and security validations.",
    image: "/knu.png?height=600&width=800",
    tags: ["Vue.js", "Nodejs", "Nest.js", "SQL", "Docker", "Katalon Studio", "Azure Devops"],
    demoUrl: "https://www.knutsfordexpress.com/",
    isConfidential: false,
    canEmbed: true, 

  }
]

// Add a simple carousel component for screenshots
function ScreenshotCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div className="relative w-full h-[60vh] bg-black rounded-lg overflow-hidden flex items-center justify-center">
      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#30BAAF] text-white rounded-full p-2 shadow-lg hover:bg-[#259e93] transition z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#30BAAF] text-white rounded-full p-2 shadow-lg hover:bg-[#259e93] transition z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      {/* Image */}
      <img
        src={images[index]}
        alt={`Screenshot ${index + 1}`}
        className="absolute top-0 left-0 w-full h-full object-contain"
      />
      {/* Counter */}
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
        {index + 1} / {images.length}
      </span>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [iframeError, setIframeError] = useState<{ [key: number]: boolean }>({})

  const openProject = (index: number) => {
    setSelectedProject(index)
    setShowDetails(false)
    setIframeError({}) // Reset iframe errors when opening new project
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

  const handleIframeError = (projectIndex: number) => {
    setIframeError((prev) => ({ ...prev, [projectIndex]: true }))
  }

  return (
    <section id="projects" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left div - Project blocks */}
          <div className="lg:w-2/3 order-2 lg:order-1 relative z-20">
            <div className="flex flex-col space-y-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-[#30BAAF]/20 transition-all cursor-pointer relative z-20"
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
          <div className="lg:w-1/3 flex flex-col justify-start order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start relative z-10">
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
              className="bg-black/30 backdrop-blur-sm rounded-2xl border border-[#30BAAF]/30 shadow-xl shadow-[#30BAAF]/20 w-full max-w-7xl max-h-[90vh] overflow-y-auto"
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
                    className="w-1/3 border-r border-[#30BAAF]/20 flex flex-col h-full"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="p-4 overflow-y-auto h-full">
                      <div className="space-y-4">
                        {/* Project Image - Smaller */}
                        <div className="relative h-32 rounded-lg overflow-hidden">
                          <Image
                            src={projects[selectedProject].image || "/placeholder.svg"}
                            alt={projects[selectedProject].title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Description - More Compact */}
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">Project Overview</h3>
                          <p className="text-gray-300 leading-relaxed text-sm">
                            {showDetails
                              ? projects[selectedProject].fullDescription
                              : projects[selectedProject].description}
                          </p>
                          <button
                            onClick={toggleDetails}
                            className="text-[#30BAAF] hover:text-white transition-colors text-xs mt-1 flex items-center"
                          >
                            <Info className="h-3 w-3 mr-1" />
                            {showDetails ? "Show less" : "Click to see more details"}
                          </button>
                        </div>

                        {/* Technologies - More Compact */}
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">Technologies Used</h3>
                          <div className="flex flex-wrap gap-1">
                            {projects[selectedProject].tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="bg-[#30BAAF]/20 text-[#30BAAF] px-2 py-1 rounded-full text-xs border border-[#30BAAF]/30"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons - More Compact */}
                        <div className="space-y-2">
                          {projects[selectedProject].isConfidential ? (
                            <div className="w-full bg-red-500/20 border border-red-500/50 text-red-200 py-2 px-3 rounded-lg text-center">
                              <p className="text-xs">Live demo not available for confidential projects</p>
                            </div>
                          ) : projects[selectedProject].demoUrl ? (
                            <button
                              onClick={() => openFullSite(projects[selectedProject].demoUrl!)}
                              className="w-full bg-[#30BAAF] hover:bg-[#2aa69b] text-white py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Open in New Tab
                            </button>
                          ) : null}
                        </div>

                        {/* Additional Info - More Compact */}
                        <div className="bg-[#30BAAF]/10 rounded-lg p-3 border border-[#30BAAF]/20">
                          <h4 className="text-[#30BAAF] font-medium mb-1 text-sm">
                            {projects[selectedProject].isConfidential
                              ? "Confidential Project"
                              : !projects[selectedProject].canEmbed
                                ? "Screenshot Preview"
                                : "Live Preview"}
                          </h4>
                          <p className="text-gray-300 text-xs leading-relaxed">
                            {projects[selectedProject].isConfidential
                              ? "This project contains sensitive information and cannot be displayed publicly. Detailed screenshots and demos are available during private consultation sessions."
                              : !projects[selectedProject].canEmbed
                                ? "This website has security settings that prevent embedding. A screenshot is shown instead. Click 'Open in New Tab' to view the live site."
                                : "The website preview on the right shows the actual live project. You can interact with it directly or open it in a new tab for the full experience."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Side - Live Website Preview, Screenshot, or Confidential Image */}
                  <motion.div
                    className="flex-1 p-6"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="h-full bg-white rounded-xl overflow-hidden border border-[#30BAAF]/30 shadow-lg">
                      {projects[selectedProject].screenshots && !projects[selectedProject].demoUrl ? (
                        // Screenshot Carousel for projects with screenshots and no live site
                        <div className="h-full flex flex-col items-center justify-center bg-gray-100 relative">
                          <ScreenshotCarousel images={projects[selectedProject].screenshots} />
                          <div className="absolute top-4 right-4 bg-orange-500/90 text-white px-3 py-2 rounded-lg text-sm flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Screenshot Preview
                          </div>
                        </div>
                      ) : projects[selectedProject].isConfidential ? (
                        // Confidential Project Display
                        <div className="h-full flex flex-col items-center justify-center bg-gray-100 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                              src={
                                projects[selectedProject].confidentialImage ||
                                "/placeholder.svg?height=400&width=600&text=CONFIDENTIAL" ||
                                "/placeholder.svg" ||
                                "/placeholder.svg"
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
                      ) : projects[selectedProject].canEmbed === false ? (
                        // Screenshot Display for sites that can't be embedded
                        <div className="h-full flex flex-col">
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

                          {/* Screenshot Display */}
                          <div className="flex-1 relative">
                            <Image
                              src={
                                projects[selectedProject].screenshotUrl ||
                                projects[selectedProject].image ||
                                "/placeholder.svg" ||
                                "/placeholder.svg" ||
                                "/placeholder.svg"
                              }
                              alt={`${projects[selectedProject].title} Screenshot`}
                              fill
                              className="object-cover"
                            />

                            {/* Overlay with explanation */}
                            <div className="absolute top-4 right-4 bg-orange-500/90 text-white px-3 py-2 rounded-lg text-sm flex items-center">
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Screenshot Preview
                            </div>

                            {/* Click overlay to open in new tab */}
                            <div
                              className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all cursor-pointer flex items-center justify-center group"
                              onClick={() => openFullSite(projects[selectedProject].demoUrl)}
                            >
                              <div className="bg-[#30BAAF] text-white px-6 py-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                                <ExternalLink className="h-5 w-5 mr-2" />
                                Click to view live site
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Live Website Preview for embeddable sites
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
                              onError={() => handleIframeError(selectedProject)}
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
