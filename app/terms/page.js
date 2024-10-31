export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using PeerMetals.com ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.`,
    },
    {
      title: "2. User Eligibility",
      content: `You must be at least 18 years old to use our services. By using the Platform, you represent and warrant that you have the right, authority, and capacity to enter into these Terms.`,
    },
    {
      title: "3. Account Registration",
      content: `To access certain features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.`,
    },
    {
      title: "4. Listing and Trading Rules",
      subsections: [
        {
          subtitle: "4.1 Listing Requirements",
          content:
            "All items listed must be authentic precious metals. Detailed images and accurate descriptions are required.",
        },
        {
          subtitle: "4.2 Prohibited Items",
          content:
            "Counterfeit items, stolen goods, and items violating any laws are strictly prohibited.",
        },
        {
          subtitle: "4.3 Pricing and Fees",
          content:
            "Sellers are responsible for setting their prices. Platform fees will be clearly displayed before listing.",
        },
      ],
    },
    {
      title: "5. Transaction Policies",
      subsections: [
        {
          subtitle: "5.1 Escrow Service",
          content:
            "All transactions must use our escrow service to ensure safe trading.",
        },
        {
          subtitle: "5.2 Shipping Requirements",
          content:
            "Items must be fully insured and require signature confirmation.",
        },
      ],
    },
    {
      title: "6. User Conduct",
      content: `Users agree to conduct themselves in a professional manner and not engage in any behavior that could harm the Platform or other users.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of Service
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
              Welcome to PeerMetals. These Terms of Service govern your use of
              our platform and services. Please read them carefully before using
              our services.
            </p>
          </div>

          {/* Terms Sections */}
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
            <h2 className="text-xl font-bold mb-4">
              Questions About Our Terms?
            </h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about these terms, please contact our
              support team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
