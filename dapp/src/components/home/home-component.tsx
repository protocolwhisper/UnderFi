"use client"
import React, { useEffect, FC, ReactNode } from 'react'
import { 
  Shield, 
  Mail, 
  Clipboard, 
  Clock
} from 'lucide-react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface FadeInWhenVisibleProps {
  children: ReactNode;
}

const HomeComponent: FC = () => {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerChildren: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };
  
  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  const slideFromLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
  };

  const slideFromRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
  };
  
  return (
    <div className="min-h-screen text-slate-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">Privacy-Preserving Lending Protocol</h1>
              <p className="text-xl text-slate-600 mb-10">
                Underfi enables undercollateralized loans using zero-knowledge email verification, built on Aztec's zkVM.
              </p>
              <motion.div 
                className="flex flex-col md:flex-row gap-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <a href="#" className="bg-indigo-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-600 transition transform hover:-translate-y-0.5">
                  Request a Loan
                </a>
                <a href="#" className="bg-white text-indigo-500 font-semibold px-6 py-3 rounded-md border border-indigo-500 hover:bg-indigo-50 transition transform hover:-translate-y-0.5">
                  Verify Email
                </a>
              </motion.div>
              <p className="text-sm text-slate-500">
                Best price guarantee - if you find a lower rate elsewhere, we'll match it.
              </p>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute right-4 top-0 w-64 h-96 bg-indigo-500 rounded-xl opacity-10 transform rotate-6"></div>
              <div className="relative z-10 flex justify-center">
                <Image src="/underfi.png" alt="Underfi platform interface" width={500} height={650} className="w-auto h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Key Features</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Underfi combines the best of privacy technology with modern lending practices.
              </p>
            </div>
          </FadeInWhenVisible>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={fadeIn} className="bg-slate-50 rounded-lg p-8 transition transform hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 text-indigo-500 rounded-xl mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Private Credit Scoring</h3>
              <p className="text-slate-600">
                Verify your financial reputation without exposing personal data, maintaining your privacy while accessing financial services.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-slate-50 rounded-lg p-8 transition transform hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 text-indigo-500 rounded-xl mb-6">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">zkEmail Integration</h3>
              <p className="text-slate-600">
                Prove email legitimacy through cryptographic proofs, enabling secure verification without revealing sensitive information.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-slate-50 rounded-lg p-8 transition transform hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 text-indigo-500 rounded-xl mb-6">
                <Clipboard size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Hybrid Loan Management</h3>
              <p className="text-slate-600">
                Combine public verification of credentials with private loan details for a secure and transparent lending process.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-slate-50 rounded-lg p-8 transition transform hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 text-indigo-500 rounded-xl mb-6">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Automated Repayments</h3>
              <p className="text-slate-600">
                Account-abstracted recurring payments make loan management seamless and convenient. (Coming Soon)
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">How It Works</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Underfi makes privacy-preserving lending simple and accessible in just a few steps.
              </p>
            </div>
          </FadeInWhenVisible>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={scaleIn} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-500 text-white rounded-full font-bold text-xl mb-6">1</div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Verify Your Email</h3>
              <p className="text-slate-600">
                Generate a zero-knowledge proof that verifies your email ownership without revealing any sensitive information.
              </p>
            </motion.div>
            <motion.div variants={scaleIn} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-500 text-white rounded-full font-bold text-xl mb-6">2</div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Select Loan Terms</h3>
              <p className="text-slate-600">
                Choose your desired loan amount and term. Your privacy is protected throughout the entire process.
              </p>
            </motion.div>
            <motion.div variants={scaleIn} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-500 text-white rounded-full font-bold text-xl mb-6">3</div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Receive Funds</h3>
              <p className="text-slate-600">
                Once approved, receive your loan funds directly to your wallet while maintaining complete privacy.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Email Verification Section */}
      <section id="verification" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">Private Email Verification</h2>
              <p className="text-slate-600 mb-8">
                Our innovative zkEmail technology allows you to prove you own an email address without revealing your actual email or any personal data. This breakthrough enables undercollateralized loans while preserving your privacy.
              </p>
              <a href="#" className="bg-indigo-500 text-white font-semibold px-6 py-3 rounded-md inline-block hover:bg-indigo-600 transition transform hover:-translate-y-0.5">
                Start Verification Process
              </a>
            </motion.div>
            <motion.div
              className="relative"
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute inset-0 bg-indigo-200 rounded-xl opacity-30 transform rotate-3"></div>
              <div className="relative z-10">
                <Image src="/underfi.png" alt="Email verification process" width={600} height={600} className="w-full h-auto rounded-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section (like Rapido) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeIn} className="flex items-center">
              <div className="bg-indigo-100 p-4 rounded-full mr-4">
                <Shield size={24} className="text-indigo-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Secure Transactions</h3>
                <p className="text-slate-600">Zero-knowledge proofs protect your data</p>
              </div>
            </motion.div>
            <motion.div variants={fadeIn} className="flex items-center">
              <div className="bg-indigo-100 p-4 rounded-full mr-4">
                <Mail size={24} className="text-indigo-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Flexible Verification</h3>
                <p className="text-slate-600">Verify any email provider seamlessly</p>
              </div>
            </motion.div>
            <motion.div variants={fadeIn} className="flex items-center">
              <div className="bg-indigo-100 p-4 rounded-full mr-4">
                <Clock size={24} className="text-indigo-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Quick Approval</h3>
                <p className="text-slate-600">Get loans approved within minutes</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Metrics (like Rapido) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="order-2 md:order-1"
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-6">
                <CountUp end={5} suffix="K+" label="Verified Users" />
                <CountUp end={2} suffix="M" prefix="$" label="Total Loan Value" />
                <CountUp end={99} suffix="%" label="Successful Verifications" />
                <CountUp end={12} label="Lending Partners" />
              </div>
            </motion.div>
            <motion.div 
              className="order-1 md:order-2"
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">Trusted by Thousands</h2>
              <p className="text-slate-600 mb-4">
                Underfi has processed over $2 million in undercollateralized loans while maintaining complete user privacy.
              </p>
              <p className="text-slate-600 mb-8">
                Our protocol is built on cutting-edge zero-knowledge technology and has been audited by leading security firms.
              </p>
              <a href="#" className="text-indigo-500 font-medium flex items-center">
                Learn more about our security
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Private Lending?</h2>
              <p className="text-xl mb-10 text-indigo-100">
                Join Underfi today and access undercollateralized loans without compromising your privacy.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <a href="#" className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-md hover:bg-indigo-50 transition transform hover:-translate-y-0.5">
                  Launch App
                </a>
                <a href="#" className="bg-transparent text-white font-semibold px-6 py-3 rounded-md border border-white hover:bg-white/10 transition transform hover:-translate-y-0.5">
                  Learn More
                </a>
              </div>
            </motion.div>
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -right-4 -top-4 w-64 h-96 bg-indigo-300 rounded-xl opacity-30 transform rotate-6"></div>
                <div className="relative z-10">
                  <Image src="/underfi.png" alt="Underfi mobile app" width={400} height={600} className="w-auto h-auto" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}


const FadeInWhenVisible: FC<FadeInWhenVisibleProps> = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};


const CountUp: FC<CountUpProps> = ({ end, suffix = "", prefix = "", label }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [count, setCount] = React.useState(0);
  
  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const duration = 1500; // milliseconds
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, end]);
  
  return (
    <div ref={ref} className="text-center">
      <h2 className="text-5xl font-bold text-indigo-500 mb-2">
        {prefix}{count}{suffix}
      </h2>
      <p className="text-slate-600">{label}</p>
    </div>
  );
};

export default HomeComponent;