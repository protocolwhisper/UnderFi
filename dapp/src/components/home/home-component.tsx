"use client"
import React, { FC } from 'react'
import Hero from '../hero/hero'
import PlatformStats from './platform-stats'
import GridShowcase from './grid-showcase'
import PrivacyFeatures from './privacy-features'
import { Fragment } from 'react'

const HomeComponent: FC = () => {
  return (
    <Fragment>
      {/* Hero/Cube Animation First */}
      <Hero />
      
      {/* Grid Showcase */}
      <GridShowcase />
      
      {/* Platform Stats */}
      <PlatformStats />
      
      {/* Privacy Features */}
      <PrivacyFeatures />
    </Fragment>
  )
}

export default HomeComponent