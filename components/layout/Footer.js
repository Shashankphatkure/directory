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
    <footer className="bg-[#2A2A2A] border-t border-[#C0C0C0]/20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] bg-clip-text text-transparent">
                PeerMetals
              </span>
            </Link>
            <p className="mt-4 text-[#C0C0C0]/80 max-w-sm">
              The trusted marketplace for precious metals enthusiasts. Buy,
              sell, and connect with fellow collectors in a secure environment.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {[FaTwitter, FaFacebook, FaInstagram, FaLinkedin].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-[#C0C0C0]/60 hover:text-[#4169E1] transition-colors"
                  >
                    <Icon size={24} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-[#FFD700] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#C0C0C0]/80 hover:text-[#4169E1] transition-colors"
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
        <div className="mt-12 pt-8 border-t border-[#C0C0C0]/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#C0C0C0]/60 text-sm">
              © {currentYear} PeerMetals. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <button className="bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
