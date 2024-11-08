"use client";
import { useState } from "react";
import Link from "next/link";
import {
  XMarkIcon,
  HomeIcon,
  ShoppingBagIcon,
  NewspaperIcon,
  PlusCircleIcon,
  WalletIcon,
  ShoppingCartIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function MobileMenu({ isOpen, onClose }) {
  const menuItems = [
    { icon: HomeIcon, label: "Home", href: "/" },
    { icon: ShoppingBagIcon, label: "Marketplace", href: "/marketplace" },
    { icon: NewspaperIcon, label: "Feed", href: "/feed" },
    { icon: PlusCircleIcon, label: "Sell", href: "/sell" },
    { icon: WalletIcon, label: "Wallet", href: "/wallet" },
    { icon: ShoppingCartIcon, label: "Cart", href: "/cart" },
    { icon: BellIcon, label: "Notifications", href: "/notifications" },
    { icon: UserCircleIcon, label: "Profile", href: "/profile" },
    { icon: Cog6ToothIcon, label: "Settings", href: "/settings" },
    { icon: QuestionMarkCircleIcon, label: "Help", href: "/help" },
  ];

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-[#2A2A2A] shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-[#C0C0C0]/20">
          <span className="text-[#FFD700] font-semibold">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#333333] text-[#C0C0C0]"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center px-4 py-3 text-[#C0C0C0] hover:bg-[#333333] transition-colors"
              onClick={onClose}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Logout Button */}
          <button
            className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-[#333333] transition-colors"
            onClick={() => {
              // Add logout logic here
              onClose();
            }}
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#C0C0C0]/20">
          <div className="text-center text-[#C0C0C0]/60 text-sm">
            <p>PeerMetals v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
