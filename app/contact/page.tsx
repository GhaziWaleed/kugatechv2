"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, CheckCircle, AlertCircle, Loader2, ArrowLeft, Calendar, Shield } from "lucide-react"
import Link from "next/link"
import WaveBackground from "@/components/wave-background"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

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

export default function ContactPage() {
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

  // Load reCAPTCHA script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js"
    script.async = true
    script.defer = true

    script.onload = () => {
      setCaptchaLoaded(true)
    }

    script.onerror = () => {
      setCaptchaError(true)
      console.error("Failed to load reCAPTCHA")
    }

    document.body.appendChild(script)

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
      if (document.body.contains(script)) {
        document.body.removeChild(script)
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
    window.open("https://calendly.com/techkuga", "_blank")
  }

  // Determine if form can be submitted
  const canSubmit = captchaError || captchaCompleted

  return (
    <main className="min-h-screen">
      <WaveBackground />

      <section className="min-h-screen pt-24 pb-16 flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            {/* Styled Back to Home button with pill design */}
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center bg-gradient-to-r from-[#30BAAF] to-[#2aa69b] hover:from-[#2aa69b] hover:to-[#30BAAF] text-white font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#30BAAF]/30 px-8 py-4 rounded-full"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Let's Connect
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Talk to our Team of Expert Analysts. Send us a message or book a Meeting For FREE CONSULTATION.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Information - 2 columns */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#30BAAF]/20 p-3 rounded-xl">
                      <MapPin className="h-6 w-6 text-[#30BAAF]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Our Location</h3>
                      <p className="text-gray-300">Office 2, GM Heights, Soan Avenue, Islamabad, Pakistan</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#30BAAF]/20 p-3 rounded-xl">
                      <Phone className="h-6 w-6 text-[#30BAAF]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Phone Number</h3>
                      <p className="text-gray-300">+92333-0262686</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#30BAAF]/20 p-3 rounded-xl">
                      <Mail className="h-6 w-6 text-[#30BAAF]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Email Address</h3>
                      <p className="text-gray-300">contact@kugatech.com</p>
                    </div>
                  </div>
                </div>

                {/* Quick Action - Book Appointment */}
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                  <h3 className="text-lg font-bold text-white mb-2">Prefer a Direct Call?</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Book a consultation call and let's discuss your project in detail.
                  </p>
                  <button
                    onClick={openCalendly}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Free Consultation Call
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Contact Form - 3 columns */}
            <motion.div
              className="lg:col-span-3 bg-black/30 backdrop-blur-sm rounded-2xl p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

              {formStatus.status === "success" ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300 text-center mb-6">{formStatus.message}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setFormStatus({ status: "idle" })}
                      className="bg-[#30BAAF] hover:bg-[#2aa69b] text-white font-bold py-2 px-6 rounded-xl transition-all"
                    >
                      Send Another Message
                    </button>
                    <button
                      onClick={openCalendly}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-xl transition-all flex items-center justify-center"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book a Call Instead
                    </button>
                  </div>
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
                        className="w-full bg-black/50 text-white border border-[#30BAAF]/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#30BAAF]"
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
                        className="w-full bg-black/50 text-white border border-[#30BAAF]/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#30BAAF]"
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
                      className="w-full bg-black/50 text-white border border-[#30BAAF]/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#30BAAF]"
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
                      className="w-full bg-black/50 text-white border border-[#30BAAF]/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#30BAAF]"
                      disabled={formStatus.status === "submitting"}
                    ></textarea>
                  </div>

                  {/* reCAPTCHA Section */}
                  {!captchaError && (
                    <div className="bg-black/20 rounded-xl p-4 border border-[#30BAAF]/20">
                      <div className="flex items-center mb-3">
                        <Shield className="h-5 w-5 text-[#30BAAF] mr-2" />
                        <h3 className="text-white font-medium">Security Verification</h3>
                      </div>
                      <div className="flex justify-center">
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
                          <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin text-[#30BAAF] mr-2" />
                            <span className="text-gray-300">Loading security verification...</span>
                          </div>
                        )}
                      </div>
                      {!captchaCompleted && captchaLoaded && (
                        <p className="text-gray-400 text-sm mt-2 text-center">
                          Please complete the verification above to send your message
                        </p>
                      )}
                    </div>
                  )}

                  {/* Captcha Error Fallback */}
                  {captchaError && (
                    <div className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-200 px-4 py-3 rounded-xl flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Security verification unavailable</p>
                        <p className="text-sm">You can still send your message, but it may take longer to process.</p>
                      </div>
                    </div>
                  )}

                  {/* Hidden field for recipient email */}
                  <input type="hidden" name="to_email" value="contact@kugatech.com" />

                  {formStatus.status === "error" && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <p>{formStatus.message}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={formStatus.status === "submitting" || (!canSubmit && !captchaError)}
                      className={`flex-1 font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center ${
                        canSubmit && formStatus.status !== "submitting"
                          ? "bg-[#30BAAF] hover:bg-[#2aa69b] text-white"
                          : "bg-gray-600 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {formStatus.status === "submitting" ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center text-gray-400 text-sm px-4">OR</div>

                    <button
                      type="button"
                      onClick={openCalendly}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Appointment
                    </button>
                  </div>

                  <div className="text-center text-gray-400 text-sm">
                    <p>Choose your preferred way to connect with us</p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
