import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        {/* Decorative divider - moved to top */}
        <div className="relative">
          <div className="border-t border-gray-800 mb-12">
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-purple-500 w-3 h-3 rounded-full shadow-lg shadow-purple-500/50"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-indigo-400">UnderFi</h3>
            <p className="text-gray-400">
              Private DeFi lending powered by zero-knowledge proofs.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#docs" className="hover:text-indigo-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#whitepaper" className="hover:text-indigo-400 transition-colors">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link href="#api" className="hover:text-indigo-400 transition-colors">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#careers" className="hover:text-indigo-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-indigo-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link href="https://twitter.com/underfi" className="hover:text-indigo-400 transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="https://discord.gg/underfi" className="hover:text-indigo-400 transition-colors">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="https://github.com/underfi" className="hover:text-indigo-400 transition-colors">
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Decorative divider */}
        <div className="relative">
          <div className="border-t border-gray-800 my-8">
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-purple-500 w-3 h-3 rounded-full shadow-lg shadow-purple-500/50"></div>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400">
          <p>© {new Date().getFullYear()} UnderFi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;