import { Shield } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
        <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center font-bold text-2xl text-white mb-6">
                <Shield className="mr-2" />
                Underfi
              </div>
              <p className="text-slate-400">
                A privacy-preserving lending protocol that enables undercollateralized loans using zero-knowledge email verification.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Products</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white transition">Loans</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Verification</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Privacy Tools</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Guides</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-700 text-center text-slate-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Underfi. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer