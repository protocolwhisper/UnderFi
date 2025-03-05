"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CubeAnimation from './cube-animation';

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex justify-center items-center overflow-hidden bg-primary-ultralight">
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
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary drop-shadow-lg">
          UnderFi
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-800 drop-shadow-lg">
          Privacy-Preserving Lending Protocol
        </h2>
        <p className="text-base md:text-xl mb-10 text-slate-700 drop-shadow-lg">
          Undercollateralized loans using zero-knowledge email verification, built on Aztec's zkVM
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Request a Loan
          </button>
          <button className="bg-white/20 backdrop-blur-sm border-2 border-primary text-primary hover:bg-white/30 font-medium px-8 py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Verify Email
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero; 