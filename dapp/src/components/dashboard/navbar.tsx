import Link from "next/link";
import { ReactNode } from "react";
import { WalletConnectButton } from "../../components/wallet-connect-button";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/underfi.png"
                  alt="UnderFi Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="hidden md:flex text-2xl font-bold text-indigo-400">
                  UnderFi
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavItem href="/dashboard" isActive>
                Dashboard
              </NavItem>
              <NavItem href="/markets">Markets</NavItem>
              <NavItem href="/stake">Stake</NavItem>
              <NavItem href="/governance">Governance</NavItem>
              <NavItem href="/more">
                More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </NavItem>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-gray-800 md:flex hidden text-white px-4 py-2 rounded-md flex items-center">
              Bridge GHO
              <span className="ml-2 bg-pink-500 rounded-full w-2 h-2"></span>
            </button>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center">
              Switch tokens
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>
            <WalletConnectButton />
            <button className="text-white p-2 md:flex hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

type NavItemProps = {
  href: string;
  isActive?: boolean;
  children: ReactNode;
};

function NavItem({ href, isActive, children }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
        isActive
          ? "border-indigo-500 text-white"
          : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
      }`}
    >
      {children}
    </Link>
  );
}
