'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface CursorProps {
  trailColor?: string
  cursorSize?: number
  trailLength?: number
}

export default function Cursor({
  trailColor = '#4f46e5',
  cursorSize = 12,
  trailLength = 6
}: CursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<{x: number, y: number, opacity: number}[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const frameRef = useRef(0)

  useEffect(() => {
    // Start with cursor hidden until mouse moves
    setIsVisible(false)
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      
      // Update position immediately for responsive tracking
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Cancel any existing animation frame
      cancelAnimationFrame(frameRef.current)
      
      // Schedule trail update
      frameRef.current = requestAnimationFrame(() => {
        setTrail(prevTrail => {
          // Create new trail
          const newTrail = [
            { x: e.clientX, y: e.clientY, opacity: 1 },
            ...prevTrail.slice(0, trailLength - 1)
          ]
          
          // Gradually reduce opacity for each trail element
          return newTrail.map((point, index) => ({
            ...point,
            opacity: 1 - (index / trailLength)
          }))
        })
      })
    }
    
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    
    const handleLinkHover = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }
    
    // Ensure all parts of the page are covered by adding to window
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    handleLinkHover()
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(frameRef.current)
    }
  }, [isVisible, trailLength])
  
  return (
    <div className="pointer-events-none fixed inset-0 z-50" style={{ overflow: 'hidden' }}>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        animate={{
          x: position.x - cursorSize / 2,
          y: position.y - cursorSize / 2,
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 500,
          restDelta: 0.001
        }}
        style={{
          width: cursorSize,
          height: cursorSize,
          backgroundColor: trailColor,
          borderRadius: '50%',
          mixBlendMode: 'difference',
          filter: 'blur(1px)',
          boxShadow: `0 0 20px ${trailColor}`
        }}
      />
      
      {/* Trail elements */}
      {trail.map((point, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: 0,
            top: 0,
            transform: `translate(${point.x - (cursorSize / 3) / 2}px, ${point.y - (cursorSize / 3) / 2}px)`,
            width: cursorSize / 3,
            height: cursorSize / 3,
            backgroundColor: trailColor,
            borderRadius: '50%',
            opacity: point.opacity * 0.5,
            filter: 'blur(2px)'
          }}
        />
      ))}
    </div>
  )
} 