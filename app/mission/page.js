import Link from "next/link";

export default function MissionPage() {
  const values = [
    {
      title: "Trust & Security",
      description:
        "Building a secure marketplace where every transaction is protected and verified.",
    },
    {
      title: "Community First",
      description:
        "Fostering a vibrant community of precious metals enthusiasts and experts.",
    },
    {
      title: "Transparency",
      description:
        "Maintaining clear pricing, fees, and policies across all operations.",
    },
    {
      title: "Innovation",
      description:
        "Continuously improving our platform with cutting-edge technology.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        Our Mission
      </h1>

      {/* Mission Statement */}
      <div className="card p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-[#FFD700]">
          Revolutionizing Precious Metals Trading
        </h2>
        <p className="text-[#C0C0C0]/80 text-lg leading-relaxed mb-6">
          At PeerMetals, our mission is to create the most trusted and efficient
          marketplace for precious metals trading. We're dedicated to connecting
          collectors, investors, and enthusiasts in a secure environment that
          promotes transparency and fair trading.
        </p>
        <p className="text-[#C0C0C0]/80 text-lg leading-relaxed">
          We believe in democratizing access to precious metals investment and
          collecting, making it accessible to everyone while maintaining the
          highest standards of security and authenticity.
        </p>
      </div>

      {/* Core Values */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-8 text-[#FFD700]">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div key={index} className="card p-6">
              <h3 className="text-xl font-semibold mb-3 text-[#C0C0C0]">
                {value.title}
              </h3>
              <p className="text-[#C0C0C0]/80">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vision for Future */}
      <div className="card p-8">
        <h2 className="text-2xl font-semibold mb-6 text-[#FFD700]">
          Our Vision for the Future
        </h2>
        <p className="text-[#C0C0C0]/80 text-lg leading-relaxed mb-8">
          We envision a future where precious metals trading is accessible,
          secure, and efficient for everyone. Through continuous innovation and
          community engagement, we're building the foundation for the next
          generation of precious metals commerce.
        </p>
        <div className="flex justify-center">
          <Link
            href="/about"
            className="inline-block bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </div>
  );
}
