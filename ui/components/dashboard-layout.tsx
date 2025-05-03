"use client"

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type DashboardLayoutProps = {
  children: ReactNode;
  title?: string;
};

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/vaults", label: "Vaults" },
    { href: "/activity", label: "Activity" }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="mb-8 pt-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          {title || "Setting a New Standard in Digital Trading"}
        </h1>
        
        <div className="flex items-center mt-2">
          <div className="flex gap-3">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium",
                  pathname === link.href
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_2px_rgba(var(--primary-rgb),0.6),0_0_5px_1px_rgba(var(--primary-rgb),0.4)_inset]"
                    : "bg-secondary hover:bg-secondary/80"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 