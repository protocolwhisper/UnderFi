'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

const GridShowcase = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12 px-4 max-w-6xl mx-auto"
    >
      {/* Left top panel - Mission statement */}
      <motion.div 
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 rounded-xl p-10 flex flex-col justify-center text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          At UnderFi, we believe that financial privacy should be accessible to everyone.
        </h2>
        <p className="text-gray-300 text-xl mb-8">
          Our zero-knowledge lending protocol makes borrowing and lending both private and secure.
        </p>
        <div>
          <Link 
            href="/app" 
            className="inline-block py-3 px-8 bg-transparent border-2 border-purple-500 text-purple-400 rounded-full hover:bg-purple-900 hover:bg-opacity-30 transition duration-300"
          >
            Launch App
          </Link>
        </div>
      </motion.div>

      {/* Right panel - App showcase */}
      <motion.div 
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 flex items-center justify-center relative min-h-[500px]"
      >
        <Image
          src="/images/app-mockup.png" // You'll need to add this image
          alt="UnderFi App Interface"
          width={300}
          height={600}
          className="z-10 drop-shadow-2xl rounded-3xl"
        />
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-600 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute top-20 -left-10 w-40 h-40 bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="absolute bottom-8 left-8 right-8 bg-black bg-opacity-70 backdrop-blur-sm rounded-lg p-4 text-white">
          <p className="text-sm text-gray-300 mb-2">
            "We're revolutionizing DeFi by combining privacy with transparency. Borrow without revealing your identity, while maintaining the system's integrity."
          </p>
          <div className="flex items-center mt-2">
            <div className="w-10 h-10 rounded-full bg-purple-800 mr-3 flex items-center justify-center">
              <span className="text-purple-300 font-bold">UF</span>
            </div>
            <div>
              <p className="font-bold">UnderFi Team</p>
              <p className="text-xs text-gray-400">Founders</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Left bottom panel - Protocol statistics */}
      <motion.div 
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-8 flex flex-col justify-between relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between mb-16">
            <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm">
              <span className="text-white text-2xl">Ξ</span>
            </div>
            <div className="w-16 h-16 rounded-full bg-lime-400 flex items-center justify-center">
              <span className="text-gray-900 text-lg font-bold">99%</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-5xl font-bold mb-4">ETH 94%</h3>
            <p className="text-3xl text-lime-400 font-bold">Private Txs</p>
          </div>
        </div>
        
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute top-10 -left-10 w-40 h-40 bg-indigo-600 opacity-30 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Right bottom panel - Features */}
      <motion.div 
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8"
      >
        <h3 className="text-white text-2xl font-bold mb-6">Secure by Design</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black bg-opacity-40 rounded-lg p-4">
            <div className="text-purple-400 text-4xl font-bold mb-2">100%</div>
            <div className="text-gray-300">On-chain Verification</div>
          </div>
          
          <div className="bg-black bg-opacity-40 rounded-lg p-4">
            <div className="text-purple-400 text-4xl font-bold mb-2">$0</div>
            <div className="text-gray-300">Privacy Cost</div>
          </div>
          
          <div className="bg-black bg-opacity-40 rounded-lg p-4">
            <div className="text-purple-400 text-4xl font-bold mb-2">24/7</div>
            <div className="text-gray-300">Trustless Access</div>
          </div>
          
          <div className="bg-black bg-opacity-40 rounded-lg p-4">
            <div className="text-purple-400 text-4xl font-bold mb-2">ZK</div>
            <div className="text-gray-300">Advanced Proofs</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GridShowcase 