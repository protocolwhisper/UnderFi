"use client"
import React, { useState } from 'react'
import { Menu, Shield } from 'lucide-react'
function Navbar() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };
  return (
         <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
           <div className="container mx-auto px-4 py-4">
             <nav className="flex justify-between items-center">
               <div className="flex items-center font-bold text-2xl text-indigo-500">
                 <Shield className="mr-2" />
                 Underfi
               </div>
               <button 
                 className="md:hidden text-2xl"
                 onClick={toggleMobileMenu}
               >
                 <Menu />
               </button>
               <div className={`${mobileMenuOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-white p-5 shadow-md' : 'hidden'} md:flex md:static md:flex-row md:shadow-none md:items-center md:gap-8`}>
                 <a href="#features" className="font-medium text-slate-800 hover:text-indigo-500 transition py-2 md:py-0">Features</a>
                 <a href="#how-it-works" className="font-medium text-slate-800 hover:text-indigo-500 transition py-2 md:py-0">How It Works</a>
                 <a href="#verification" className="font-medium text-slate-800 hover:text-indigo-500 transition py-2 md:py-0">Verification</a>
                 <a href="#" className="font-medium text-slate-800 hover:text-indigo-500 transition py-2 md:py-0">Docs</a>
                 <a href="#" className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600 transition transform hover:-translate-y-0.5">Launch App</a>
               </div>
             </nav>
           </div>
         </header>
   
  )
}

export default Navbar