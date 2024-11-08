"use client";
import Link from "next/link";
import {
  XMarkIcon,
  HomeIcon,
  ShoppingBagIcon,
  PlusCircleIcon,
  NewspaperIcon,
  BellIcon,
  WalletIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function MobileMenu({
  isOpen,
  onClose,
  theme,
  session,
  signOut,
}) {
  if (!isOpen) return null;

  const menuItems = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/marketplace", icon: ShoppingBagIcon, label: "Marketplace" },
    { href: "/feed", icon: NewspaperIcon, label: "Feed" },
    { href: "/seller", icon: PlusCircleIcon, label: "Seller" },
    { href: "/wallet", icon: WalletIcon, label: "Wallet" },
    { href: "/cart", icon: ShoppingCartIcon, label: "Cart" },
    { href: "/notifications", icon: BellIcon, label: "Notifications" },
    { href: "/profile", icon: UserCircleIcon, label: "Profile" },
  ];

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 ${
          theme === "light" ? "bg-white" : "bg-[#2A2A2A]"
        } shadow-xl transform transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg ${
            theme === "light"
              ? "hover:bg-gray-100 text-gray-600"
              : "hover:bg-[#333333] text-[#C0C0C0]"
          }`}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Menu Items */}
        <nav className="mt-16 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  theme === "light"
                    ? "text-gray-600 hover:bg-gray-100"
                    : "text-[#C0C0C0] hover:bg-[#333333]"
                } transition-colors`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Auth Button */}
            {session ? (
              <button
                onClick={() => {
                  signOut();
                  onClose();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  theme === "light"
                    ? "text-gray-600 hover:bg-gray-100"
                    : "text-[#C0C0C0] hover:bg-[#333333]"
                } transition-colors`}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                href="/auth/signin"
                onClick={onClose}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  theme === "light"
                    ? "text-gray-600 hover:bg-gray-100"
                    : "text-[#C0C0C0] hover:bg-[#333333]"
                } transition-colors`}
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
