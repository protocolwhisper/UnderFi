"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CubeAnimation from './cube-animation';

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex justify-center items-center overflow-hidden">
      {/* Background with cube animation */}
      <div className="absolute inset-0 z-0">
        <CubeAnimation />
      </div>
      
      {/* Centered text content */}
      <motion.div 
        className="z-10 text-center px-6 max-w-4xl relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
          UnderFi
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-foreground/90">
          Decentralized finance reimagined
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-lg transition duration-300">
            Get Started
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero; 