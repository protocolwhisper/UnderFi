'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface CircleStatProps {
  percentage: string
  description: string
  color?: string
  delay?: number
}

const CircleStat: React.FC<CircleStatProps> = ({ 
  percentage, 
  description, 
  color = 'bg-indigo-500', 
  delay = 0 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="relative"
    >
      <div className={`rounded-full ${color === 'lime' ? 'bg-lime-400' : color === 'purple' ? 'bg-purple-600' : 'bg-indigo-500'} text-center p-1`}>
        <div className="rounded-full bg-black bg-opacity-90 p-8 md:p-12 flex flex-col items-center justify-center">
          <span className="text-white text-3xl md:text-5xl font-bold">{percentage}</span>
          <p className="text-gray-300 text-sm md:text-base text-center mt-2 max-w-[140px] md:max-w-[180px]">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

const PrivacyFeatures: React.FC = () => {
  const [headingRef, headingInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [textRef1, textInView1] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [textRef2, textInView2] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div>
            <motion.h2
              ref={headingRef}
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-indigo-400 mb-6"
            >
              Privacy-First DeFi
            </motion.h2>
            
            <motion.p
              ref={textRef1}
              initial={{ opacity: 0, y: 20 }}
              animate={textInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-300 mb-6 text-lg"
            >
              Our advanced zero-knowledge technology enables private financial transactions 
              while maintaining the transparency and security of blockchain. Protect your 
              financial identity while participating in DeFi.
            </motion.p>
          </div>
          
          <div className="flex items-center justify-center">
            <CircleStat
              percentage="100%"
              description="of users maintain complete financial privacy"
              color="bg-indigo-500"
            />
          </div>
        </div>
        
        {/* Middle section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="md:col-start-2 md:col-span-2">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-white mb-4"
            >
              Zero-Knowledge Security
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-300 text-lg"
            >
              Utilize advanced cryptographic proofs to verify transaction validity without 
              revealing sensitive details, helping you secure your financial activity and
              protect your identity while using decentralized finance protocols.
            </motion.p>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-24">
          <div className="flex justify-center">
            <CircleStat
              percentage="95%"
              description="reduction in exposed financial data"
              color="purple"
              delay={0.1}
            />
          </div>
          
          <div className="flex justify-center md:mt-24">
            <CircleStat
              percentage="99%"
              description="transaction security against surveillance"
              color="bg-indigo-500"
              delay={0.2}
            />
          </div>
          
          <div className="flex justify-center">
            <CircleStat
              percentage="70%"
              description="faster private transactions than competitors"
              color="lime"
              delay={0.3}
            />
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <CircleStat
              percentage="0%"
              description="compromise on security while maintaining privacy"
              color="purple"
              delay={0.1}
            />
          </div>
          
          <div>
            <motion.h3
              ref={textRef2}
              initial={{ opacity: 0, y: 20 }}
              animate={textInView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-white mb-4"
            >
              Enhance Financial Privacy
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-300 text-lg"
            >
              Revolutionize your approach to DeFi by using privacy-preserving tools 
              that not only protect your identity but also offer the same functionality 
              as traditional finance without compromising on security or features.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrivacyFeatures 