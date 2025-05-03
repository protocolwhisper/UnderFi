'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import Image from "next/image";
import { useAppKit } from '@reown/appkit/react';
import { Wallet } from "lucide-react";
import { useAccount } from 'wagmi';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  // Use the AppKit hook for opening the modal
  const { open } = useAppKit();
  
  // Use Wagmi hooks to get connection status and address
  const { address, isConnected } = useAccount();
  
  // Get current path to determine which buttons to show
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <nav className="flex items-center justify-between py-4 px-4 bg-card rounded-xl border border-border my-4">
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_2px_rgba(var(--primary-rgb),0.6),0_0_5px_1px_rgba(var(--primary-rgb),0.4)_inset]">
          <Image src="/logo.svg" alt="logo" width={32} height={32} className="rounded-[4px]"/>
        </div>
        <span className="font-semibold text-lg pointer-events-none">UnderFi</span>
      </Link>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:text-white info-button">
          <Settings className="w-5 h-5" />
        </Button>
        
        {/* Show wallet connection button only when not on home page */}
        {!isHomePage && (
          <Button 
            onClick={() => open()} 
            className="flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            {isConnected ? 
              <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span> : 
              "Connect Wallet"
            }
          </Button>
        )}
        
        {/* Show Launch App button only on home page */}
        {isHomePage && (
          <Link href="/dashboard">
            <Button>Launch App</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}