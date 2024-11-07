export default function ShippingPolicyPage() {
  const sections = [
    {
      title: "1. Shipping Methods",
      subsections: [
        {
          subtitle: "1.1 Domestic Shipping",
          content:
            "We offer USPS Priority Mail, UPS Ground, and FedEx services for domestic shipments. All items are fully insured and require signature confirmation.",
        },
        {
          subtitle: "1.2 International Shipping",
          content:
            "International shipping is available to select countries. Additional customs fees and import duties may apply and are the responsibility of the buyer.",
        },
      ],
    },
    {
      title: "2. Shipping Costs",
      subsections: [
        {
          subtitle: "2.1 Cost Calculation",
          content:
            "Shipping costs are calculated based on weight, dimensions, destination, and selected shipping method. Exact costs will be displayed at checkout.",
        },
        {
          subtitle: "2.2 Insurance",
          content:
            "All shipments include full insurance coverage up to the declared value of the items. Insurance costs are included in the shipping price.",
        },
      ],
    },
    {
      title: "3. Processing Time",
      content:
        "Orders are typically processed within 1-2 business days. Sellers are required to ship items within 3 business days of order confirmation unless otherwise specified.",
    },
    {
      title: "4. Tracking Information",
      content:
        "Tracking information will be provided via email once your order has been shipped. You can also track your order through your account dashboard.",
    },
    {
      title: "5. Packaging Standards",
      subsections: [
        {
          subtitle: "5.1 Secure Packaging",
          content:
            "All items must be securely packaged to prevent damage during transit. Precious metals require special handling and appropriate protective materials.",
        },
        {
          subtitle: "5.2 Discreet Shipping",
          content:
            "All packages are shipped discreetly without any indication of the valuable contents for security purposes.",
        },
      ],
    },
    {
      title: "6. Lost or Damaged Items",
      content:
        "In the rare event that an item is lost or damaged during transit, our customer service team will work with you and the shipping carrier to file a claim and resolve the issue promptly.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D]">
      {/* Hero Section */}
      <div className="relative bg-black/40 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shipping Policy
          </h1>
          <p className="text-xl text-white/80">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="backdrop-blur-sm bg-black/30 rounded-xl p-6 mb-8">
            <p className="text-white/70 leading-relaxed">
              At PeerMetals, we understand the importance of secure and reliable
              shipping when it comes to precious metals. Our shipping policy is
              designed to ensure your items arrive safely and on time.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div
                key={section.title}
                className="backdrop-blur-sm bg-black/30 rounded-xl p-6"
              >
                <h2 className="text-xl font-bold mb-4 text-white">
                  {section.title}
                </h2>
                {section.content && (
                  <p className="text-white/70 leading-relaxed mb-4">
                    {section.content}
                  </p>
                )}
                {section.subsections && (
                  <div className="space-y-4 ml-4">
                    {section.subsections.map((subsection) => (
                      <div key={subsection.subtitle}>
                        <h3 className="text-lg font-semibold mb-2 text-[#C0C0C0]">
                          {subsection.subtitle}
                        </h3>
                        <p className="text-white/70 leading-relaxed">
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
          <div className="mt-12 backdrop-blur-sm bg-black/30 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold mb-4 text-white">
              Shipping Questions?
            </h2>
            <p className="text-white/70 mb-6">
              If you have any questions about our shipping policies or need
              assistance with a shipment, please contact our support team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-[#4169E1] to-[#5179F1] text-white px-6 py-3 rounded-xl hover:scale-[1.02] transition-transform font-semibold"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
