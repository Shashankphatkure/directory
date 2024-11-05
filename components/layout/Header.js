"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCartIcon,
  UserCircleIcon,
  Bars3Icon,
  HomeIcon,
  ShoppingBagIcon,
  PlusCircleIcon,
  NewspaperIcon,
  BellIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-[#2A2A2A] border-b border-[#C0C0C0]/20 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.jpg"
                alt="PeerMetals Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] bg-clip-text text-transparent">
                PeerMetals
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="flex items-center space-x-1 text-[#C0C0C0] hover:text-[#4169E1] transition-colors"
              >
                <HomeIcon className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </Link>
              <Link
                href="/marketplace"
                className="flex items-center space-x-1 text-[#C0C0C0] hover:text-[#4169E1] transition-colors"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                <span className="font-medium">Marketplace</span>
              </Link>
              <Link
                href="/feed"
                className="flex items-center space-x-1 text-[#C0C0C0] hover:text-[#4169E1] transition-colors"
              >
                <NewspaperIcon className="h-5 w-5" />
                <span className="font-medium">Feed</span>
              </Link>
              <Link
                href="/seller"
                className="flex items-center space-x-1 text-[#C0C0C0] hover:text-[#4169E1] transition-colors"
              >
                <PlusCircleIcon className="h-5 w-5" />
                <span className="font-medium">Seller</span>
              </Link>
              <Link
                href="/wallet"
                className="flex items-center space-x-1 text-[#C0C0C0] hover:text-[#4169E1] transition-colors"
              >
                <WalletIcon className="h-5 w-5" />
                <span className="font-medium">Wallet</span>
              </Link>
              <Link
                href="/cart"
                className="flex items-center space-x-1 text-[#C0C0C0] hover:text-[#4169E1] transition-colors"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span className="font-medium">Cart</span>
              </Link>
              <Link
                href="/notifications"
                className="flex items-center space-x-1 text-[#C0C0C0] hover:text-[#4169E1] transition-colors"
              >
                <BellIcon className="h-5 w-5" />
                <span className="font-medium">Notifications</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center space-x-1 text-[#C0C0C0] hover:text-[#4169E1] transition-colors"
              >
                <UserCircleIcon className="h-5 w-5" />
                <span className="font-medium">Profile</span>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-[#333333] transition-colors"
            >
              <Bars3Icon className="h-6 w-6 text-[#C0C0C0]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
