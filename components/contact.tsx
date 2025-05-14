"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { MapPin, Phone, Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

// EmailJS will be loaded via CDN
declare global {
  interface Window {
    emailjs: any
  }
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState<{
    status: "idle" | "submitting" | "success" | "error"
    message?: string
  }>({ status: "idle" })
  const formRef = useRef<HTMLFormElement>(null)

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
    script.async = true
    script.onload = () => {
      window.emailjs.init("DrRBBIV4aBVbbCOoG") // Your EmailJS public key
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus({ status: "submitting" })

    try {
      // Make sure EmailJS is loaded
      if (!window.emailjs) {
        throw new Error("EmailJS not loaded")
      }

      // Use sendForm method which is more reliable for form submissions
      await window.emailjs.sendForm(
        "service_f5xevyn", // Your EmailJS service ID
        "template_3lpqtja", // Template ID (create this in your EmailJS dashboard)
        formRef.current, // The form element
        "DrRBBIV4aBVbbCOoG", // Your public key
      )

      // Success
      setFormStatus({
        status: "success",
        message: "Thank you for your message! We will get back to you soon.",
      })

      // Reset form
      formRef.current?.reset()
    } catch (error) {
      console.error("Error sending email:", error)
      setFormStatus({
        status: "error",
        message: "Failed to send your message. Please try again or contact us directly at contact@kugatech.com.",
      })
    }
  }

  return (
    <section id="contact" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have a project in mind? Get in touch with us to discuss how we can help.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start space-x-4">
              <div className="bg-[#30BAAF]/20 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-[#30BAAF]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Our Location</h3>
                <p className="text-gray-300">GM Heights, Soan Avenue, Islamabad, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#30BAAF]/20 p-3 rounded-full">
                <Phone className="h-6 w-6 text-[#30BAAF]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Phone Number</h3>
                <p className="text-gray-300">+92333-0262686</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#30BAAF]/20 p-3 rounded-full">
                <Mail className="h-6 w-6 text-[#30BAAF]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Email Address</h3>
                <p className="text-gray-300">contact@kugatech.com</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 bg-black/30 backdrop-blur-sm rounded-lg p-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {formStatus.status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300 text-center mb-6">{formStatus.message}</p>
                <button
                  onClick={() => setFormStatus({ status: "idle" })}
                  className="bg-[#30BAAF] hover:bg-[#2aa69b] text-white font-bold py-2 px-6 rounded-lg transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="from_name" className="block text-white mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      required
                      className="w-full bg-black/50 text-white border border-[#30BAAF]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#30BAAF]"
                      disabled={formStatus.status === "submitting"}
                    />
                  </div>
                  <div>
                    <label htmlFor="from_email" className="block text-white mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="from_email"
                      name="from_email"
                      required
                      className="w-full bg-black/50 text-white border border-[#30BAAF]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#30BAAF]"
                      disabled={formStatus.status === "submitting"}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full bg-black/50 text-white border border-[#30BAAF]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#30BAAF]"
                    disabled={formStatus.status === "submitting"}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full bg-black/50 text-white border border-[#30BAAF]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#30BAAF]"
                    disabled={formStatus.status === "submitting"}
                  ></textarea>
                </div>

                {/* Hidden field for recipient email */}
                <input type="hidden" name="to_email" value="contact@kugatech.com" />

                {formStatus.status === "error" && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <p>{formStatus.message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus.status === "submitting"}
                  className="bg-[#30BAAF] hover:bg-[#2aa69b] text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  {formStatus.status === "submitting" ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
