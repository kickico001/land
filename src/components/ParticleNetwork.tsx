'use client'
import { useEffect, useRef } from 'react'

const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { 
        x: e.clientX, 
        y: e.clientY, 
        isMoving: true 
      }
      setTimeout(() => {
        mouseRef.current.isMoving = false
      }, 100)
    }
    window.addEventListener('mousemove', handleMouseMove)

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      originalX: number
      originalY: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.originalX = this.x
        this.originalY = this.y
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.size = Math.random() * 2 + 1
      }

      update() {
        if (mouseRef.current.isMoving) {
          const dx = mouseRef.current.x - this.x
          const dy = mouseRef.current.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 200) {
            const force = (200 - distance) / 200
            this.vx -= (dx / distance) * force * 0.5
            this.vy -= (dy / distance) * force * 0.5
          }
        }

        // Return to original position when mouse is not moving
        const dx = this.originalX - this.x
        const dy = this.originalY - this.y
        this.vx += dx * 0.005
        this.vy += dy * 0.005

        this.x += this.vx
        this.y += this.vy

        // Damping
        this.vx *= 0.95
        this.vy *= 0.95

        // Boundary check
        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(147, 51, 234, 0.8)'
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle(canvasWidth, canvasHeight))
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(147, 51, 234, ${0.3 * (1 - distance / 150)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.5 }}
    />
  )
}

export default ParticleNetwork 