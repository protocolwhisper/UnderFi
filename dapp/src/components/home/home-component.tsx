"use client"
import React, { FC } from 'react'
import { motion, Variants } from 'framer-motion'
import Hero from '../hero/hero'
import PlatformStats from './platform-stats'
import PrivacyFeatures from './privacy-features'

const HomeComponent: FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Replace the old Privacy-First DeFi section with the new component */}
      <PrivacyFeatures />
      
      {/* Platform Stats Section */}
      <PlatformStats />
    </div>
  )
}

export default HomeComponent