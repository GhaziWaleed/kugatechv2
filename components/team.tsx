"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, X, Info } from "lucide-react"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

const teamMembers = [
  {
    name: "Ali Goreja",
    role: "Cloud Engineer",
    image: "/goreja_1.png", // 1Update this path to your actual image
    shortBio: "10+ years of experience in software development and entrepreneurship.",
    fullBio:
      "10+ years of experience in software development and entrepreneurship, driving innovation and building successful products. Proven ability to lead cross-functional teams and navigate complex technical challenges. Expertise spans the full software development lifecycle, from concept to launch and beyond.",
    linkedin: "https://linkedin.com/in/aligoreja",
    github: "https://github.com/aligoreja",
  },
  {
    name: "Ghazi Waleed",
    role: "I made this Site.",
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

  // Split team members into top row (first 3) and bottom row (last 2)
  const topRowMembers = teamMembers.slice(0, 3)
  const bottomRowMembers = teamMembers.slice(3)

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

        {/* Top row - 3 members */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {topRowMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              member={member}
              index={index}
              expandedMember={expandedMember}
              setExpandedMember={setExpandedMember}
              isMobile={isMobile}
              handleToggle={handleToggle}
            />
          ))}
        </div>

        {/* Bottom row - 2 members centered */}
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          {bottomRowMembers.map((member, index) => (
            <TeamMemberCard
              key={index + 3}
              member={member}
              index={index + 3}
              expandedMember={expandedMember}
              setExpandedMember={setExpandedMember}
              isMobile={isMobile}
              handleToggle={handleToggle}
              className="sm:w-[calc(33.333%-1rem)]" // Match width of cards in top row
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Extracted TeamMemberCard component to avoid code duplication
interface TeamMemberCardProps {
  member: (typeof teamMembers)[0]
  index: number
  expandedMember: number | null
  setExpandedMember: (index: number | null) => void
  isMobile: boolean
  handleToggle: (index: number) => void
  className?: string
}

function TeamMemberCard({
  member,
  index,
  expandedMember,
  setExpandedMember,
  isMobile,
  handleToggle,
  className = "",
}: TeamMemberCardProps) {
  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => !isMobile && setExpandedMember(index)}
      onMouseLeave={() => !isMobile && setExpandedMember(null)}
    >
      {/* Base card */}
      <motion.div
        className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 h-full"
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

          <div className="flex justify-center space-x-4 mb-4">
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

          {/* Instruction text */}
          <div className="flex items-center justify-center text-xs text-gray-400 mt-2">
            <Info className="h-3 w-3 mr-1 text-[#30BAAF]" />
            <span>{isMobile ? "Tap for details" : "Hover for details"}</span>
          </div>
        </div>
      </motion.div>

      {/* Expanded bio overlay */}
      <AnimatePresence>
        {expandedMember === index && (
          <motion.div
            className="absolute top-0 left-0 right-0 z-20 bg-black/90 backdrop-blur-md rounded-2xl border border-[#30BAAF]/30 shadow-xl shadow-[#30BAAF]/20 p-6"
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
        <div className="absolute inset-0 bg-[#30BAAF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
      )}
    </div>
  )
}
