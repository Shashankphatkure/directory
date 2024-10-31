export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      subsections: [
        {
          subtitle: "1.1 Personal Information",
          content:
            "We collect information that you provide directly to us, including name, email address, phone number, and shipping address when you register for an account or make a purchase.",
        },
        {
          subtitle: "1.2 Transaction Information",
          content:
            "When you make a purchase, we collect information about the transaction, including payment details, purchase amount, and the items purchased.",
        },
        {
          subtitle: "1.3 Automatic Information",
          content:
            "We automatically collect certain information about your device when you use our services, including IP address, device type, and browser type.",
        },
      ],
    },
    {
      title: "2. How We Use Your Information",
      content:
        "We use the information we collect to provide, maintain, and improve our services, process your transactions, communicate with you, and prevent fraud.",
    },
    {
      title: "3. Information Sharing",
      subsections: [
        {
          subtitle: "3.1 Service Providers",
          content:
            "We may share your information with third-party service providers who assist us in providing our services, such as payment processors and shipping carriers.",
        },
        {
          subtitle: "3.2 Legal Requirements",
          content:
            "We may disclose your information if required to do so by law or in response to valid requests from public authorities.",
        },
      ],
    },
    {
      title: "4. Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      title: "5. Your Rights",
      subsections: [
        {
          subtitle: "5.1 Access and Update",
          content:
            "You can access and update your personal information through your account settings.",
        },
        {
          subtitle: "5.2 Data Deletion",
          content:
            "You may request deletion of your personal information by contacting our support team.",
        },
      ],
    },
    {
      title: "6. Cookies and Tracking",
      content:
        "We use cookies and similar tracking technologies to collect information about your browsing activities on our platform.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
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
              At PeerMetals, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our platform.
            </p>
          </div>

          {/* Privacy Sections */}
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
            <h2 className="text-xl font-bold mb-4">Privacy Questions?</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about our Privacy Policy, please contact
              our privacy team.
            </p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Privacy Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
