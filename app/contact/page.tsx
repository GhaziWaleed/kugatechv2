"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, CheckCircle, AlertCircle, Loader2, ArrowLeft, Calendar, Shield } from "lucide-react"
import Link from "next/link"
import WaveBackground from "@/components/wave-background"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

declare global {
  interface Window {
    emailjs: any
    grecaptcha: any
    Calendly?: any
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

  const RECAPTCHA_SITE_KEY = "6LdAGJcrAAAAAOS0_FaNQ7eBoqZUbY3u2F6a-d5D"

  // Load reCAPTCHA and Calendly widget
  useEffect(() => {
    // Load reCAPTCHA
    const recaptchaScript = document.createElement("script")
    recaptchaScript.src = "https://www.google.com/recaptcha/api.js"
    recaptchaScript.async = true
    recaptchaScript.defer = true
    recaptchaScript.onload = () => setCaptchaLoaded(true)
    recaptchaScript.onerror = () => {
      setCaptchaError(true)
      console.error("Failed to load reCAPTCHA")
    }
    document.body.appendChild(recaptchaScript)

    // Load Calendly
    const calendlyScript = document.createElement("script")
    calendlyScript.src = "https://assets.calendly.com/assets/external/widget.js"
    calendlyScript.async = true
    document.body.appendChild(calendlyScript)

    // Callback functions
    window.onCaptchaSuccess = (token: string) => {
      setCaptchaCompleted(true)
      setCaptchaToken(token)
      setFormStatus({ status: "idle" })
    }
    window.onCaptchaExpired = () => {
      setCaptchaCompleted(false)
      setCaptchaToken(null)
    }
    window.onCaptchaError = () => {
      setCaptchaCompleted(false)
      setCaptchaToken(null)
      setCaptchaError(true)
    }

    return () => {
      document.body.removeChild(recaptchaScript)
      document.body.removeChild(calendlyScript)
      delete window.onCaptchaSuccess
      delete window.onCaptchaExpired
      delete window.onCaptchaError
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
      if (!window.emailjs) throw new Error("EmailJS not loaded")

      await window.emailjs.sendForm(
        "service_f5xevyn",
        "template_3lpqtja",
        formRef.current,
        "DrRBBIV4aBVbbCOoG",
      )

      setFormStatus({
        status: "success",
        message: "Thank you for your message! We will get back to you soon.",
      })

      formRef.current?.reset()
      setCaptchaCompleted(false)
      setCaptchaToken(null)

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
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/kugatech-consultation",
      })
    } else {
      window.open("https://calendly.com/kugatech-consultation", "_blank")
    }
  }

  const canSubmit = captchaError || captchaCompleted

  return (
    <main className="min-h-screen">
      <WaveBackground />
      <section className="min-h-screen pt-24 pb-16 flex items-center">
        <div className="container mx-auto px-4">
          {/* Hero Heading */}
          <div className="flex flex-col items-center mb-12">
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
            {/* Contact Info + Calendly Button */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                {/* ... [Contact details left as-is] ... */}

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

            {/* Contact Form (unchanged) */}
            {/* ... keep your full form component and motion.div here exactly as before ... */}
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
