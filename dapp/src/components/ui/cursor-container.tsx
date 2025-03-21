'use client'

import React, { ReactNode } from 'react'
import CanvasCursor from './canvas-cursor'

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
        
        a, button, [role="button"] {
          cursor: none !important;
        }
        
        /* Only show default cursor on mobile devices */
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
          
          #canvas {
            display: none !important;
          }
        }
      `}</style>
      <CanvasCursor />
      {children}
    </div>
  )
} 