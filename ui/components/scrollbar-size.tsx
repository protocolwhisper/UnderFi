"use client"

import { useEffect } from 'react'

export default function ScrollbarSize() {
  useEffect(() => {
    // Calculate scrollbar width and set it as a CSS variable
    const calculateScrollbarWidth = () => {
      // Create a div with scrollbars
      const outer = document.createElement('div')
      outer.style.visibility = 'hidden'
      outer.style.overflow = 'scroll'
      document.body.appendChild(outer)
      
      // Create an inner div
      const inner = document.createElement('div')
      outer.appendChild(inner)
      
      // Calculate the width difference
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
      
      // Remove the divs
      outer.parentNode?.removeChild(outer)
      
      // Set the scrollbar width as a CSS variable
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
    }

    calculateScrollbarWidth()
    
    // Recalculate on resize
    window.addEventListener('resize', calculateScrollbarWidth)
    
    return () => {
      window.removeEventListener('resize', calculateScrollbarWidth)
    }
  }, [])

  return null
} 