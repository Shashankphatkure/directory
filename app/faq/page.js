export default function FAQPage() {
  const faqs = [
    {
      question: "How does PeerMetals ensure authenticity?",
      answer:
        "We employ a rigorous verification process including expert authentication, detailed imaging requirements, and secure escrow services to ensure all items traded on our platform are genuine.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept major credit cards, bank transfers, and select cryptocurrency payments. All transactions are secured through our platform's escrow service.",
    },
    {
      question: "How does shipping work?",
      answer:
        "Sellers can choose their preferred shipping carrier. All items must be fully insured and require signature confirmation. We integrate with major shipping providers for seamless label creation and tracking.",
    },
    {
      question: "What are the fees for selling?",
      answer:
        "Our platform charges a competitive fee of 5% on successful sales. This includes payment processing and basic listing features. Premium features may incur additional fees.",
    },
    {
      question: "How does the escrow service work?",
      answer:
        "When a purchase is made, funds are held in escrow until the buyer confirms receipt and authenticity of the item. This protects both buyers and sellers throughout the transaction.",
    },
    {
      question: "What if I receive an item that's not as described?",
      answer:
        "Our buyer protection program covers items that significantly differ from their listing description. Contact support within 3 days of receipt to initiate a return or refund process.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100">
            Find answers to common questions about PeerMetals
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative">
              <input
                type="search"
                placeholder="Search FAQ..."
                className="w-full px-4 py-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Please contact our
              support team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
