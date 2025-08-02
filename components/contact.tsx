"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { MapPin, Phone, Mail, CheckCircle, AlertCircle, Loader2, Calendar } from "lucide-react"

// EmailJS and reCAPTCHA will be loaded via CDN
declare global {
  interface Window {
    emailjs: any
    grecaptcha: any
    onCaptchaSuccess: (token: string) => void
    onCaptchaExpired: () => void
    onCaptchaError: () => void
  }
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState<{
    status: "idle" | "submitting" | "success" | "error"
    message?: string
  }>({ status: "idle" })
  const [captchaCompleted, setCaptchaCompleted] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [captchaLoaded, setCaptchaLoaded] = useState(false)
  const [captchaError, setCaptchaError] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // For now, let's use a test site key (you'll need to replace this)
  const RECAPTCHA_SITE_KEY = "6LdAGJcrAAAAAOS0_FaNQ7eBoqZUbY3u2F6a-d5D" // This is Google's test key

  // Load EmailJS and reCAPTCHA scripts
  useEffect(() => {
    // Load EmailJS
    const emailScript = document.createElement("script")
    emailScript.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
    emailScript.async = true
    emailScript.onload = () => {
      window.emailjs.init("DrRBBIV4aBVbbCOoG") // Your EmailJS public key
    }
    document.body.appendChild(emailScript)

    // Load reCAPTCHA
    const captchaScript = document.createElement("script")
    captchaScript.src = "https://www.google.com/recaptcha/api.js"
    captchaScript.async = true
    captchaScript.defer = true

    captchaScript.onload = () => {
      setCaptchaLoaded(true)
    }

    captchaScript.onerror = () => {
      setCaptchaError(true)
      console.error("Failed to load reCAPTCHA")
    }

    document.body.appendChild(captchaScript)

    // Make callback functions globally available
    window.onCaptchaSuccess = (token: string) => {
      console.log("Captcha success:", token)
      setCaptchaCompleted(true)
      setCaptchaToken(token)
      setFormStatus({ status: "idle" }) // Clear any previous errors
    }

    window.onCaptchaExpired = () => {
      console.log("Captcha expired")
      setCaptchaCompleted(false)
      setCaptchaToken(null)
    }

    window.onCaptchaError = () => {
      console.log("Captcha error")
      setCaptchaCompleted(false)
      setCaptchaToken(null)
      setCaptchaError(true)
    }

    return () => {
      if (document.body.contains(emailScript)) {
        document.body.removeChild(emailScript)
      }
      if (document.body.contains(captchaScript)) {
        document.body.removeChild(captchaScript)
      }
      // Clean up global functions
      if (window.onCaptchaSuccess) delete window.onCaptchaSuccess
      if (window.onCaptchaExpired) delete window.onCaptchaExpired
      if (window.onCaptchaError) delete window.onCaptchaError
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // If captcha failed to load, allow form submission with warning
    if (captchaError) {
      console.log("Captcha failed to load, proceeding without verification")
    } else if (!captchaCompleted || !captchaToken) {
      setFormStatus({
        status: "error",
        message: "Please complete the reCAPTCHA verification before sending your message.",
      })
      return
    }

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

      // Reset form and captcha
      formRef.current?.reset()
      setCaptchaCompleted(false)
      setCaptchaToken(null)

      // Reset reCAPTCHA if available
      if (window.grecaptcha && !captchaError) {
        try {
          window.grecaptcha.reset()
        } catch (error) {
          console.log("Could not reset captcha:", error)
        }
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setFormStatus({
        status: "error",
        message: "Failed to send your message. Please try again or contact us directly at contact@kugatech.com.",
      })
    }
  }

  const openCalendly = () => {
    // Replace with your actual Calendly URL
    //window.open("https://calendly.com/kugatech-consultation", "_blank")
    window.open("https://calendly.com/contact-kugatech/30min", "_blank")
  }

  // Determine if form can be submitted
  const canSubmit = captchaError || captchaCompleted

  return (
    <section id="contact" className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
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
            Have a project in mind? Send us a message or book a consultation call directly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start space-x-4">
              <div className="bg-[#30BAAF]/20 p-3 rounded-xl">
                <MapPin className="h-6 w-6 text-[#30BAAF]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Our Location</h3>
                <p className="text-gray-300 text-sm">Office 2, GM Heights, Soan Avenue, Islamabad, Pakistan</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#30BAAF]/20 p-3 rounded-xl">
                <Phone className="h-6 w-6 text-[#30BAAF]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Phone Number</h3>
                <p className="text-gray-300 text-sm">+92333-0262686</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#30BAAF]/20 p-3 rounded-xl">
                <Mail className="h-6 w-6 text-[#30BAAF]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Email Address</h3>
                <p className="text-gray-300 text-sm">contact@kugatech.com</p>
              </div>
            </div>

            {/* Quick Action - Book Appointment */}
            <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
              <h3 className="text-lg font-bold text-white mb-2">Prefer a Direct Call?</h3>
              <p className="text-gray-300 text-sm mb-3">
                Book a consultation call and let's discuss your project in detail.
              </p>
              <button
                onClick={openCalendly}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center text-sm"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Consultation Call
              </button>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 bg-black/30 backdrop-blur-sm rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {formStatus.status === "success" ? (
              <div className="flex flex-col items-center justify-center py-6">
                <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300 text-center mb-4 text-sm">{formStatus.message}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setFormStatus({ status: "idle" })}
                    className="bg-[#30BAAF] hover:bg-[#2aa69b] text-white font-bold py-2 px-4 rounded-xl transition-all text-sm"
                  >
                    Send Another Message
                  </button>
                  <button
                    onClick={openCalendly}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-xl transition-all flex items-center justify-center text-sm"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    Book a Call Instead
                  </button>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="from_name" className="block text-white mb-1 text-sm">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      required
                      className="w-full bg-black/50 text-white border border-[#30BAAF]/30 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#30BAAF] text-sm"
                      disabled={formStatus.status === "submitting"}
                    />
                  </div>
                  <div>
                    <label htmlFor="from_email" className="block text-white mb-1 text-sm">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="from_email"
                      name="from_email"
                      required
                      className="w-full bg-black/50 text-white border border-[#30BAAF]/30 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#30BAAF] text-sm"
                      disabled={formStatus.status === "submitting"}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white mb-1 text-sm">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full bg-black/50 text-white border border-[#30BAAF]/30 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#30BAAF] text-sm"
                    disabled={formStatus.status === "submitting"}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white mb-1 text-sm">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-black/50 text-white border border-[#30BAAF]/30 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#30BAAF] text-sm"
                    disabled={formStatus.status === "submitting"}
                  ></textarea>
                </div>

                {/* Simplified reCAPTCHA - Just the widget */}
                {!captchaError && (
                  <div className="flex justify-center py-2">
                    {captchaLoaded ? (
                      <div
                        className="g-recaptcha"
                        data-sitekey={RECAPTCHA_SITE_KEY}
                        data-theme="dark"
                        data-callback="onCaptchaSuccess"
                        data-expired-callback="onCaptchaExpired"
                        data-error-callback="onCaptchaError"
                      ></div>
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-4 w-4 animate-spin text-[#30BAAF] mr-2" />
                        <span className="text-gray-300 text-sm">Loading verification...</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Captcha Error Fallback */}
                {captchaError && (
                  <div className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-200 px-3 py-2 rounded-xl flex items-start text-sm">
                    <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Security verification unavailable</p>
                      <p className="text-xs">You can still send your message.</p>
                    </div>
                  </div>
                )}

                {/* Hidden field for recipient email */}
                <input type="hidden" name="to_email" value="contact@kugatech.com" />

                {formStatus.status === "error" && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-3 py-2 rounded-xl flex items-start text-sm">
                    <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p>{formStatus.message}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={formStatus.status === "submitting" || (!canSubmit && !captchaError)}
                    className={`flex-1 font-bold py-2 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center text-sm ${
                      canSubmit && formStatus.status !== "submitting"
                        ? "bg-[#30BAAF] hover:bg-[#2aa69b] text-white"
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {formStatus.status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center text-gray-400 text-xs px-2">OR</div>

                  <button
                    type="button"
                    onClick={openCalendly}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center text-sm"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </button>
                </div>

                <div className="text-center text-gray-400 text-xs">
                  <p>Choose your preferred way to connect with us</p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
