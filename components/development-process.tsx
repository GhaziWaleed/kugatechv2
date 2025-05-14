"use client"

import { motion } from "framer-motion"
import { FileSearch, Users, Palette, Code, TestTube, Rocket, Repeat, CheckCircle } from "lucide-react"

// Define the process steps
const processSteps = [
  {
    icon: <FileSearch className="h-8 w-8 text-[#30BAAF]" />,
    title: "Requirements Analysis",
    description: "We thoroughly analyze your business needs and project requirements to establish a solid foundation.",
    delay: 0.1,
  },
  {
    icon: <Users className="h-8 w-8 text-[#30BAAF]" />,
    title: "Discovery Workshop",
    description: "Our team conducts detailed workshops with stakeholders to align vision, goals, and expectations.",
    delay: 0.2,
  },
  {
    icon: <Palette className="h-8 w-8 text-[#30BAAF]" />,
    title: "UI/UX Design",
    description: "We create intuitive, engaging designs that enhance user experience and reflect your brand identity.",
    delay: 0.3,
  },
  {
    icon: <Code className="h-8 w-8 text-[#30BAAF]" />,
    title: "Development",
    description: "Our developers build your solution using the latest technologies and best coding practices.",
    delay: 0.4,
  },
  {
    icon: <TestTube className="h-8 w-8 text-[#30BAAF]" />,
    title: "Quality Assurance",
    description:
      "Rigorous testing ensures your product is bug-free, secure, and performs optimally across all devices.",
    delay: 0.5,
  },
  {
    icon: <Rocket className="h-8 w-8 text-[#30BAAF]" />,
    title: "Deployment",
    description:
      "We handle the smooth launch of your product, ensuring everything runs perfectly in the live environment.",
    delay: 0.6,
  },
  {
    icon: <Repeat className="h-8 w-8 text-[#30BAAF]" />,
    title: "Iteration & Feedback",
    description: "We gather user feedback and make continuous improvements to enhance your product's performance.",
    delay: 0.7,
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-[#30BAAF]" />,
    title: "Ongoing Support",
    description: "Our relationship continues with dedicated maintenance, updates, and technical support.",
    delay: 0.8,
  },
]

export default function DevelopmentProcess() {
  return (
    <section id="process" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Development Process
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            How we transform your ideas into exceptional digital products
          </motion.p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#30BAAF]/0 via-[#30BAAF] to-[#30BAAF]/0 hidden md:block"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          <div className="space-y-12 relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.delay }}
              >
                {/* Content */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>

                {/* Center icon */}
                <div className="md:w-2/12 flex justify-center">
                  <div className="bg-black/50 backdrop-blur-sm p-4 rounded-full border-2 border-[#30BAAF] z-10">
                    {step.icon}
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
