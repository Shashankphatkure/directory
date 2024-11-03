export default function HelpCenterPage() {
  const categories = [
    {
      title: "Getting Started",
      topics: [
        "Creating an Account",
        "Verifying Your Identity",
        "Making Your First Purchase",
        "Setting Up Your Seller Profile",
      ],
    },
    {
      title: "Trading Guide",
      topics: [
        "How to List Items",
        "Pricing Guidelines",
        "Shipping Requirements",
        "Payment Methods",
      ],
    },
    {
      title: "Safety & Security",
      topics: [
        "Transaction Protection",
        "Dispute Resolution",
        "Fraud Prevention",
        "Account Security",
      ],
    },
    {
      title: "Platform Policies",
      topics: [
        "Trading Rules",
        "Fee Structure",
        "Return Policy",
        "Community Guidelines",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        Help Center
      </h1>

      {/* Search Bar */}
      <div className="card p-6 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search help articles..."
            className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded-lg px-4 py-3 text-[#C0C0C0] focus:outline-none focus:border-[#4169E1]"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#4169E1] text-white px-4 py-1 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Help Categories */}
      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="card p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
              {category.title}
            </h2>
            <ul className="space-y-3">
              {category.topics.map((topic, topicIndex) => (
                <li key={topicIndex}>
                  <a
                    href="#"
                    className="text-[#C0C0C0]/80 hover:text-[#4169E1] transition-colors"
                  >
                    {topic}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="mt-12 card p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
          Can't find what you're looking for?
        </h2>
        <p className="text-[#C0C0C0]/80 mb-6">
          Our support team is available 24/7 to assist you with any questions.
        </p>
        <a
          href="/contact"
          className="inline-block bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
