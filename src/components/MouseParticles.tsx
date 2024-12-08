'use client'
import { useEffect, useRef } from 'react'

const MouseParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Array<{ x: number; y: number; alpha: number; dx: number; dy: number; size: number }>>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      // Create particles in a circular pattern
      const particleCount = 8
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount
        const speed = 2
        particlesRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          alpha: 1,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 1
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.dx
        particle.y += particle.dy
        particle.alpha *= 0.96 // Faster fade
        particle.dx *= 0.99 // Slow down gradually
        particle.dy *= 0.99 // Slow down gradually

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(147, 51, 234, ${particle.alpha})`
        ctx.fill()

        return particle.alpha > 0.01
      })

      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30"
      style={{ opacity: 0.6 }}
    />
  )
}

export default MouseParticles 