import Link from "next/link";
import {
  ShoppingCartIcon,
  UserCircleIcon,
  Bars3Icon,
  HomeIcon,
  ShoppingBagIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              PeerMetals
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <HomeIcon className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              href="/marketplace"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              <span className="font-medium">Marketplace</span>
            </Link>
            <Link
              href="/sell"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <PlusCircleIcon className="h-5 w-5" />
              <span className="font-medium">Sell</span>
            </Link>
            <Link
              href="/cart"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="font-medium">Cart</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <UserCircleIcon className="h-5 w-5" />
              <span className="font-medium">Profile</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bars3Icon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
