import Link from "next/link";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "About PeerMetals",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Mission", href: "/mission" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Blog", href: "/blog" },
        { label: "Help Center", href: "/help" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Shipping Policy", href: "/shipping" },
        { label: "Returns Policy", href: "/returns" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Market Updates", href: "/updates" },
        { label: "Success Stories", href: "/stories" },
        { label: "Newsletter", href: "/newsletter" },
        { label: "Events", href: "/events" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                PeerMetals
              </span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-sm">
              The trusted marketplace for precious metals enthusiasts. Buy,
              sell, and connect with fellow collectors in a secure environment.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {currentYear} PeerMetals. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
