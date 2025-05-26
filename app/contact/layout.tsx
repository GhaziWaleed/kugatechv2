"use client"

import type React from "react"

import { useEffect } from "react"

export default function ContactLayout({ children }: { children: React.ReactNode }) {
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

  return <>{children}</>
}
