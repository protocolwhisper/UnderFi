'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface StatItemProps {
  value: string
  label: string
  endValue: number
  prefix?: string
  suffix?: string
}

const StatItem: React.FC<StatItemProps> = ({ value, label, endValue, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null
      const duration = 1500 // milliseconds
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        setCount(Math.floor(progress * endValue))
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
  }, [inView, endValue])

  return (
    <div ref={ref} className="text-center">
      <div className="text-6xl md:text-7xl font-bold text-indigo-500 mb-3">
        {prefix}{count}{suffix}
      </div>
      <div className="text-gray-600 text-xl">{label}</div>
    </div>
  )
}

const PlatformStats: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Platform Statistics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of users who trust UnderFi for their private lending needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StatItem 
              value="$500000" 
              label="Total Value Locked" 
              endValue={500000}
              prefix="$"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatItem 
              value="5000" 
              label="Verified Users" 
              endValue={5000}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StatItem 
              value="99%" 
              label="System Uptime" 
              endValue={99}
              suffix="%"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PlatformStats 