"use client";

import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/cube-animation.css';

const CubeAnimation = () => {
  return (
    <div className="cube-animation-container">
      <div className="cube-wrapper">
        <motion.div 
          className="outer-cube"
          animate={{ 
            rotateX: [0, 360], 
            rotateY: [0, 360], 
            rotateZ: [0, 360] 
          }}
          transition={{ 
            duration: 20, 
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          <div className="face face-front"></div>
          <div className="face face-back"></div>
          <div className="face face-right"></div>
          <div className="face face-left"></div>
          <div className="face face-top"></div>
          <div className="face face-bottom"></div>
          
          <motion.div 
            className="inner-cube"
            animate={{ 
              rotateX: [360, 0], 
              rotateY: [0, 360], 
              rotateZ: [180, 540] 
            }}
            transition={{ 
              duration: 15, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            <div className="face inner-face inner-face-front"></div>
            <div className="face inner-face inner-face-back"></div>
            <div className="face inner-face inner-face-right"></div>
            <div className="face inner-face inner-face-left"></div>
            <div className="face inner-face inner-face-top"></div>
            <div className="face inner-face inner-face-bottom"></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CubeAnimation; 