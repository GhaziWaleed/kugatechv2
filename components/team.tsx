"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin } from "lucide-react"

const teamMembers = [
  {
      name: "Ali Goreja",
      role: "Cloud Engineer",
      image: "/goreja_1.png", // Update this path to your actual image
      bio: "10+ years of experience in software development and entrepreneurship, driving innovation and building successful products. Proven ability to lead cross-functional teams and navigate complex technical challenges. Expertise spans the full software development lifecycle, from concept to launch and beyond.",
        linkedin: "https://linkedin.com/in/aligoreja",
        github: "https://github.com/aligoreja",

    },
    {
      name: "Ghazi Waleed",
      role: "Lead Developer",
      image: "/ghazi_1.png", // Update this path to your actual image
      bio: "Full-stack developer with expertise in React, Node.js, and cloud architecture. Proven ability to build scalable and efficient web applications from concept to deployment. Adept at bridging the gap between front-end and back-end development, delivering seamless user experiences and robust solutions.",
        linkedin: "https://www.linkedin.com/in/ghazi-waleed-asif-953405218/",
        github: "https://github.com/ghaziwaleed",

    },
    {
      name: "Usman Haroon",
      role: "Solution Architect",
      image: "/usman_1.png", // Update this path to your actual image
      bio: "A results-oriented Solution Architect with a strong engineering foundation. Proven ability to translate business needs into robust and scalable technical solutions. Expertise in cloud technologies, data architecture and a passion for designing innovative and efficient systems.",
        linkedin: "https://www.linkedin.com/in/muhammad-usman-haroon-8a9342189/",
        github: "https://github.com/usmanharoon",
      
    },
    {
      name: "Umar Arif",
      role: "SDET Architect",
      image: "/umar_1.png", // Update this path to your actual image
      bio: "Concise and results-driven SDET Architect with a strong engineering background. Expertise in building robust test automation frameworks and strategies to ensure software quality and reliability. Proven ability to collaborate with development teams and drive quality-first practices.",
       //linkedin: "https://linkedin.com/in/sheikhumer",
        github: "https://github.com/sheikhumer",
    },
    {
      name: "Kaleem Tahir",
      role: "Business Analyst",
      image: "/kaleem_1.png", // Update this path to your actual image
      bio: "A dynamic leader blending the strategic vision of a CMO with the analytical precision of a Business Analyst. Driving data-informed marketing strategies, optimizing business processes, and identifying growth opportunities to maximize ROI and achieve sustainable business success.",
        linkedin: "https://www.linkedin.com/in/kaleem-tahir-64064226a/",
        github: "https://github.com/kaleemtahir",
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
