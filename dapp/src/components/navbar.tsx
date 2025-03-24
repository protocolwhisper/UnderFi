"use client"
import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import Image from "next/image";
import Link from "next/link";

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 bg-gray-900 border-b border-slate-200">
            <div className="container mx-auto px-4 py-4">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/underfi.png"
                                alt="UnderFi Logo"
                                width={40}
                                height={40}
                                className="mr-2"
                            />
                            <span className="text-2xl font-bold text-indigo-400">UnderFi</span>
                        </Link>
                    </div>
                    <button 
                        className="md:hidden text-2xl"
                        onClick={toggleMobileMenu}
                    >
                        <Menu />
                    </button>
                    <div className={`${mobileMenuOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-white p-5 shadow-md' : 'hidden'} md:flex md:static md:flex-row md:shadow-none md:items-center md:gap-8`}>
                        <Link
                            href="#features"
                            className="font-medium text-gray-300 hover:text-indigo-400 transition py-2 md:py-0"
                        >
                            Features
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="font-medium text-gray-300 hover:text-indigo-400 transition py-2 md:py-0"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="#verification"
                            className="font-medium text-gray-300 hover:text-indigo-400 transition py-2 md:py-0"
                        >
                            Verification
                        </Link>
                        <Link
                            href="#docs"
                            className="font-medium text-gray-300 hover:text-indigo-400 transition py-2 md:py-0"
                        >
                            Docs
                        </Link>
                    </div>
                    <div>
                        <Link
                            href="/app"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition transform hover:-translate-y-0.5"
                        >
                            Launch App
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar