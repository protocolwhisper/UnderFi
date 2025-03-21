'use client'

import React, { ReactNode } from 'react'
import NeonCursor from './neon-cursor'

interface CursorContainerProps {
  children: ReactNode
}

export default function CursorContainer({ children }: CursorContainerProps) {
  return (
    <div className="custom-cursor-root">
      <style jsx global>{`
        *, *::before, *::after {
          cursor: none !important;
        }
        
        /* Fix for header elements */
        header, nav, .navbar, a, button, [role="button"] {
          cursor: none !important;
          pointer-events: auto !important;
        }
        
        /* Only show default cursor on mobile devices */
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
      <NeonCursor />
      {children}
    </div>
  )
} 