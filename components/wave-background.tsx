"use client"

import { useEffect, useRef } from "react"

interface WaveBackgroundProps {
  className?: string
}

export default function WaveBackground({ className }: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let mouseX = 0
    let mouseY = 0
    const hoverRadius = 120

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Define the teal color
    const tealColor = "#30BAAF"
    const tealRgb = hexToRgb(tealColor)

    // Convert hex to rgb
    function hexToRgb(hex: string) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : { r: 48, g: 186, b: 175 } // Default to #30BAAF if parsing fails
    }

    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string
      angle: number
      velocity: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.size = Math.random() * 3 + 1
        this.density = Math.random() * 30 + 1
        this.angle = Math.random() * Math.PI * 2
        this.velocity = 0.05

        // Create variations of the teal color
        const opacity = Math.random() * 0.5 + 0.3
        this.color = `rgba(${tealRgb.r}, ${tealRgb.g}, ${tealRgb.b}, ${opacity})`
      }

      update() {
        // Calculate distance between mouse and particle
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const maxDistance = hoverRadius
        const force = (maxDistance - distance) / maxDistance
        const directionX = forceDirectionX * force * this.density
        const directionY = forceDirectionY * force * this.density

        // If mouse is close enough, move particle away from mouse
        if (distance < hoverRadius) {
          this.x -= directionX
          this.y -= directionY
        } else {
          // Otherwise, move particle back to original position
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 10
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 10
          }
        }

        // Add wave motion
        this.angle += this.velocity
        this.y += Math.sin(this.angle) * 0.5
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles = []
      // Increase particle density by reducing the divisor (was 8000, now 4000)
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 4000)

      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push(new Particle(x, y))
      }
    }

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Increase connection distance (was 100, now 120)
          if (distance < 120) {
            const opacity = 1 - distance / 120
            ctx.strokeStyle = `rgba(${tealRgb.r}, ${tealRgb.g}, ${tealRgb.b}, ${opacity * 0.2})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background with teal tones
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(10, 40, 50, 1)")
      gradient.addColorStop(0.5, "rgba(20, 60, 70, 1)")
      gradient.addColorStop(1, "rgba(5, 30, 40, 1)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw wave patterns with teal color
      ctx.strokeStyle = `rgba(${tealRgb.r}, ${tealRgb.g}, ${tealRgb.b}, 0.1)`
      ctx.lineWidth = 1

      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height * 0.2 + i * 50 + Math.sin(Date.now() * 0.001) * 20)

        for (let x = 0; x < canvas.width; x += 10) {
          const y =
            canvas.height * 0.2 +
            i * 50 +
            Math.sin((x + Date.now() * 0.2) * 0.003) * 50 +
            Math.sin((x + Date.now() * 0.1) * 0.005) * 30
          ctx.lineTo(x, y)
        }

        ctx.stroke()
      }

      // Update and draw particles
      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      connectParticles()

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`} />
}
