export default function AboutPage() {
  const features = [
    {
      title: "Secure Trading",
      description:
        "State-of-the-art security measures protect every transaction",
    },
    {
      title: "Expert Verification",
      description: "Each item undergoes thorough authenticity verification",
    },
    {
      title: "Global Community",
      description: "Connect with collectors and traders worldwide",
    },
    {
      title: "Market Insights",
      description: "Real-time precious metals market data and analysis",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        About PeerMetals
      </h1>

      {/* Mission Statement */}
      <div className="card p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-[#FFD700]">
          Our Mission
        </h2>
        <p className="text-[#C0C0C0]/80 text-lg leading-relaxed">
          PeerMetals is dedicated to creating a secure, transparent marketplace
          for precious metals enthusiasts. We connect collectors, investors, and
          traders in a trusted environment where authenticity and security are
          paramount.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="card p-6">
            <h3 className="text-xl font-semibold mb-3 text-[#FFD700]">
              {feature.title}
            </h3>
            <p className="text-[#C0C0C0]/80">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="card p-8">
        <h2 className="text-2xl font-semibold mb-6 text-[#FFD700]">Our Team</h2>
        <p className="text-[#C0C0C0]/80 mb-8">
          Our team consists of precious metals experts, security specialists,
          and technology professionals dedicated to providing the best trading
          experience.
        </p>
        <a
          href="/careers"
          className="inline-block bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
        >
          Join Our Team
        </a>
      </div>
    </div>
  );
}
