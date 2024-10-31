export default function ReturnsPolicy() {
  const sections = [
    {
      title: "1. Return Eligibility",
      subsections: [
        {
          subtitle: "1.1 Eligible Items",
          content:
            "Returns are accepted for items that significantly differ from their listing description, are damaged upon arrival, or are proven to be inauthentic. All returns must be initiated within 3 days of delivery.",
        },
        {
          subtitle: "1.2 Non-Eligible Items",
          content:
            "Items that have been altered, damaged after delivery, or opened from sealed packaging are not eligible for return. Market fluctuations in precious metal prices are not valid reasons for returns.",
        },
      ],
    },
    {
      title: "2. Return Process",
      subsections: [
        {
          subtitle: "2.1 Initiating a Return",
          content:
            "Contact our support team within 3 days of delivery. You'll need to provide photos and a detailed explanation of the issue. Our team will review your request within 24 hours.",
        },
        {
          subtitle: "2.2 Return Shipping",
          content:
            "If your return is approved, we'll provide a prepaid shipping label. Items must be securely packaged and fully insured. All returns require signature confirmation.",
        },
      ],
    },
    {
      title: "3. Refund Information",
      subsections: [
        {
          subtitle: "3.1 Refund Processing",
          content:
            "Refunds are processed within 3-5 business days after we receive and verify the returned item. The original payment method will be refunded, including original shipping costs for eligible returns.",
        },
        {
          subtitle: "3.2 Partial Refunds",
          content:
            "Partial refunds may be issued for items that show signs of handling or if original packaging materials are missing. This will be assessed on a case-by-case basis.",
        },
      ],
    },
    {
      title: "4. Buyer Protection",
      content:
        "Our Buyer Protection program ensures you receive the item as described or your money back. This includes protection against counterfeit items and items significantly not as described.",
    },
    {
      title: "5. Seller Protection",
      content:
        "Sellers are protected against fraudulent return claims through our verification process. All returns are thoroughly inspected before refunds are issued.",
    },
    {
      title: "6. Disputes",
      content:
        "If you disagree with a return decision, you can appeal through our dispute resolution process. Each case will be reviewed by our specialist team.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Returns Policy
          </h1>
          <p className="text-xl text-blue-100">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="text-gray-600 leading-relaxed">
              At PeerMetals, we strive to ensure every transaction is smooth and
              satisfactory. Our returns policy is designed to protect both
              buyers and sellers while maintaining the integrity of our
              marketplace.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div
                key={section.title}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                {section.content && (
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {section.content}
                  </p>
                )}
                {section.subsections && (
                  <div className="space-y-4 ml-4">
                    {section.subsections.map((subsection) => (
                      <div key={subsection.subtitle}>
                        <h3 className="text-lg font-semibold mb-2">
                          {subsection.subtitle}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {subsection.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Need to Return an Item?</h2>
            <p className="text-gray-600 mb-6">
              If you need to initiate a return or have questions about our
              return policy, our support team is here to help.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/contact"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/help/returns"
                className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Return Guide
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
