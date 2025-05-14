"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, ChevronDown, X } from "lucide-react"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

const teamMembers = [
  {
    name: "Ali Goreja",
    role: "Cloud Engineer",
    image: "/goreja_1.png", // Update this path to your actual image
    shortBio: "10+ years of experience in software development and entrepreneurship.",
    fullBio:
      "10+ years of experience in software development and entrepreneurship, driving innovation and building successful products. Proven ability to lead cross-functional teams and navigate complex technical challenges. Expertise spans the full software development lifecycle, from concept to launch and beyond.",
    linkedin: "https://linkedin.com/in/aligoreja",
    github: "https://github.com/aligoreja",
  },
  {
    name: "Ghazi Waleed",
    role: "Lead Developer",
    image: "/ghazi_1.png", // Update this path to your actual image
    shortBio: "Full-stack developer with expertise in React, Node.js, and cloud architecture.",
    fullBio:
      "Full-stack developer with expertise in React, Node.js, and cloud architecture. Proven ability to build scalable and efficient web applications from concept to deployment. Adept at bridging the gap between front-end and back-end development, delivering seamless user experiences and robust solutions.",
    linkedin: "https://www.linkedin.com/in/ghazi-waleed-asif-953405218/",
    github: "https://github.com/ghaziwaleed",
  },
  {
    name: "Usman Haroon",
    role: "Solution Architect",
    image: "/usman_1.png", // Update this path to your actual image
    shortBio: "A results-oriented Solution Architect with a strong engineering foundation.",
    fullBio:
      "A results-oriented Solution Architect with a strong engineering foundation. Proven ability to translate business needs into robust and scalable technical solutions. Expertise in cloud technologies, data architecture and a passion for designing innovative and efficient systems.",
    linkedin: "https://www.linkedin.com/in/muhammad-usman-haroon-8a9342189/",
    github: "https://github.com/usmanharoon",
  },
  {
    name: "Umar Arif",
    role: "SDET Architect",
    image: "/umar_1.png", // Update this path to your actual image
    shortBio: "Concise and results-driven SDET Architect with a strong engineering background.",
    fullBio:
      "Concise and results-driven SDET Architect with a strong engineering background. Expertise in building robust test automation frameworks and strategies to ensure software quality and reliability. Proven ability to collaborate with development teams and drive quality-first practices.",
    github: "https://github.com/sheikhumer",
  },
  {
    name: "Kaleem Tahir",
    role: "Business Analyst",
    image: "/kaleem_1.png", // Update this path to your actual image
    shortBio: "A dynamic leader blending strategic vision with analytical precision.",
    fullBio:
      "A dynamic leader blending the strategic vision of a CMO with the analytical precision of a Business Analyst. Driving data-informed marketing strategies, optimizing business processes, and identifying growth opportunities to maximize ROI and achieve sustainable business success.",
    linkedin: "https://www.linkedin.com/in/kaleem-tahir-64064226a/",
    github: "https://github.com/kaleemtahir",
  },
]

export default function Team() {
  const [expandedMember, setExpandedMember] = useState<number | null>(null)
  const isMobile = useMobile()

  const handleToggle = (index: number) => {
    if (expandedMember === index) {
      setExpandedMember(null)
    } else {
      setExpandedMember(index)
    }
  }

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
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => !isMobile && setExpandedMember(index)}
              onMouseLeave={() => !isMobile && setExpandedMember(null)}
            >
              {/* Base card */}
              <motion.div
                className="bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => isMobile && handleToggle(index)}
              >
                <div className="relative w-full pt-6 flex justify-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#30BAAF]/50">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-[#30BAAF] mb-3">{member.role}</p>

                  {/* Always show short bio */}
                  <p className="text-gray-300 mb-4">{member.shortBio}</p>

                  {/* Mobile-only expand indicator */}
                  {isMobile && (
                    <div className="flex justify-center mb-2">
                      <ChevronDown
                        className={`h-5 w-5 text-[#30BAAF] transition-transform duration-300 ${
                          expandedMember === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  )}

                  <div className="flex justify-center space-x-4">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-[#30BAAF] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-6 w-6" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-[#30BAAF] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Expanded bio overlay */}
              <AnimatePresence>
                {expandedMember === index && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 z-20 bg-black/90 backdrop-blur-md rounded-lg border border-[#30BAAF]/30 shadow-xl shadow-[#30BAAF]/20 p-6"
                    initial={{ opacity: 0, y: 10, height: "100%" }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      height: "auto",
                      minHeight: "100%",
                    }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      {isMobile && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setExpandedMember(null)
                          }}
                          className="text-gray-400 hover:text-white"
                          aria-label="Close"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    <p className="text-[#30BAAF] mb-4">{member.role}</p>
                    <p className="text-gray-300 mb-6">{member.fullBio}</p>
                    <div className="flex space-x-4">
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-[#30BAAF] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-6 w-6" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-[#30BAAF] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin className="h-6 w-6" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop hover indicator */}
              {!isMobile && (
                <div className="absolute inset-0 bg-[#30BAAF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
