"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online shopping platform with payment integration and inventory management.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    title: "Healthcare Management System",
    description: "A comprehensive solution for managing patient records, appointments, and billing.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Angular", "Express", "PostgreSQL", "Docker"],
  },
  {
    title: "Real Estate Marketplace",
    description: "A platform connecting property buyers, sellers, and agents with advanced search capabilities.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "GraphQL", "AWS", "Tailwind CSS"],
  },
  {
    title: "Financial Analytics Dashboard",
    description: "Interactive data visualization tools for financial analysis and reporting.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Vue.js", "Python", "D3.js", "FastAPI"],
  },
]

export default function Projects() {
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
                  className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-[#30BAAF]/20 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-[#30BAAF]/20 text-[#30BAAF] px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
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
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore some of our recent work and see how we've helped businesses achieve their goals.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
