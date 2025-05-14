"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin } from "lucide-react"

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "With over 15 years of experience in software development and business leadership, Alex leads our vision and strategy.",
    image: "/placeholder.svg?height=400&width=400",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    bio: "Sarah brings deep technical expertise in cloud architecture and AI, driving our technology innovation.",
    image: "/placeholder.svg?height=400&width=400",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Michael Rodriguez",
    role: "Lead Developer",
    bio: "Michael specializes in full-stack development and has led numerous successful projects for enterprise clients.",
    image: "/placeholder.svg?height=400&width=400",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Priya Patel",
    role: "UI/UX Designer",
    bio: "Priya creates beautiful, intuitive interfaces that enhance user experience and drive engagement.",
    image: "/placeholder.svg?height=400&width=400",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "David Kim",
    role: "Project Manager",
    bio: "David ensures our projects are delivered on time and within budget while maintaining the highest quality standards.",
    image: "/placeholder.svg?height=400&width=400",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
]

export default function Team() {
  return (
    <section id="team" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Team
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Meet the talented professionals behind KugaTech's success.
          </motion.p>
        </div>

        {/* Grid layout with 4 members per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-lg hover:shadow-[#30BAAF]/20 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative w-full pt-6 flex justify-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-[#30BAAF] mb-3">{member.role}</p>
                <p className="text-gray-300 mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#30BAAF] transition-colors"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#30BAAF] transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
