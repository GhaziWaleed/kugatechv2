"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import DevelopmentProcess from "@/components/development-process"
import Projects from "@/components/projects"
import Team from "@/components/team"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import WaveBackground from "@/components/wave-background"
import SplashScreen from "@/components/splash-screen"
import BackToTop from "@/components/back-to-top"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  // aDisable scroll when splash screen is showing2
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [showSplash])

  return (
    <main className="min-h-screen">
      <WaveBackground />

      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Services />
          <DevelopmentProcess />
          <Projects />
          <Team />
          <Contact />
          <Footer />
          <BackToTop />
        </>
      )}
    </main>
  )
}
