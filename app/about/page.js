export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About PeerMetals
          </h1>
          <p className="text-xl text-blue-100">
            Building the future of precious metals trading
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              PeerMetals was founded with a simple yet powerful mission: to
              create a trusted, transparent, and accessible marketplace for
              precious metals enthusiasts worldwide.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe that everyone should have the opportunity to invest in
              and trade precious metals in a secure environment, backed by a
              community of knowledgeable collectors and investors.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">What Sets Us Apart</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Community First</h3>
                <p className="text-gray-600">
                  Our platform is built around a vibrant community of
                  collectors, investors, and enthusiasts who share knowledge and
                  experiences.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Secure Trading</h3>
                <p className="text-gray-600">
                  Advanced security measures and escrow services ensure safe
                  transactions for both buyers and sellers.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">
                  Expert Verification
                </h3>
                <p className="text-gray-600">
                  Our team of experts helps verify precious metals to ensure
                  authenticity and quality.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Fair Pricing</h3>
                <p className="text-gray-600">
                  Transparent pricing and competitive fees make trading
                  accessible to everyone.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you're a seasoned collector or just starting your journey
              in precious metals, PeerMetals provides the tools and community
              you need to succeed.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started Today
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
