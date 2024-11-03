import Link from "next/link";
import Image from "next/image";
import {
  FaTwitter,
  FaDiscord,
  FaTelegram,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
  FaMedium,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "About",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Mission", href: "/mission" },
        { label: "Careers", href: "/careers" },
        { label: "Press Kit", href: "/press" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Gold", href: "/marketplace?category=gold" },
        { label: "Silver", href: "/marketplace?category=silver" },
        { label: "Platinum", href: "/marketplace?category=platinum" },
        { label: "Rare Coins", href: "/marketplace?category=rare-coins" },
        { label: "New Arrivals", href: "/marketplace?sort=newest" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Shipping Info", href: "/shipping" },
        { label: "Returns", href: "/returns" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "User Agreement", href: "/agreement" },
        { label: "KYC Policy", href: "/kyc" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Events", href: "/events" },
        { label: "Newsletter", href: "/newsletter" },
        { label: "Market Updates", href: "/updates" },
        { label: "Success Stories", href: "/stories" },
        { label: "Affiliate Program", href: "/affiliate" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: FaTwitter,
      href: "https://twitter.com/peermetals",
      label: "Twitter",
    },
    {
      icon: FaDiscord,
      href: "https://discord.gg/peermetals",
      label: "Discord",
    },
    { icon: FaTelegram, href: "https://t.me/peermetals", label: "Telegram" },
    {
      icon: FaInstagram,
      href: "https://instagram.com/peermetals",
      label: "Instagram",
    },
    {
      icon: FaYoutube,
      href: "https://youtube.com/peermetals",
      label: "YouTube",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/company/peermetals",
      label: "LinkedIn",
    },
    {
      icon: FaFacebook,
      href: "https://facebook.com/peermetals",
      label: "Facebook",
    },
    { icon: FaMedium, href: "https://medium.com/peermetals", label: "Medium" },
  ];

  return (
    <footer className="bg-[#2A2A2A] border-t border-[#C0C0C0]/20">
      {/* Newsletter Section */}
      <div className="border-b border-[#C0C0C0]/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-4">
              Stay Updated with PeerMetals
            </h2>
            <p className="text-[#C0C0C0]/80 mb-6">
              Subscribe to our newsletter for market insights, trading tips, and
              exclusive offers
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#333333] border border-[#C0C0C0]/20 rounded-l-lg px-4 py-2 text-[#C0C0C0]"
              />
              <button className="bg-[#4169E1] text-white px-6 py-2 rounded-r-lg hover:bg-[#4169E1]/80 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center">
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
              </div>
            </Link>
            <p className="text-[#C0C0C0]/80 mb-6">
              The trusted marketplace for precious metals enthusiasts. Buy,
              sell, and connect with fellow collectors.
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C0C0C0]/60 hover:text-[#4169E1] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-[#FFD700] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#C0C0C0]/80 hover:text-[#4169E1] transition-colors text-sm"
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[#C0C0C0]/60 text-sm">
              <p>© {currentYear} PeerMetals. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6">
              <Image
                src="/payment-methods.png"
                alt="Payment Methods"
                width={200}
                height={24}
                className="opacity-60"
              />
              <div className="flex items-center gap-2">
                <span className="text-[#C0C0C0]/60 text-sm">Secured by</span>
                <Image
                  src="/security-badges.png"
                  alt="Security Badges"
                  width={100}
                  height={24}
                  className="opacity-60"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select className="bg-[#333333] text-[#C0C0C0]/60 border border-[#C0C0C0]/20 rounded px-2 py-1 text-sm">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
              <select className="bg-[#333333] text-[#C0C0C0]/60 border border-[#C0C0C0]/20 rounded px-2 py-1 text-sm">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
