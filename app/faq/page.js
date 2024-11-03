export default function FAQPage() {
  const faqs = [
    {
      question: "How does PeerMetals ensure transaction security?",
      answer:
        "We implement bank-level security measures, including secure payment processing, identity verification, and escrow services for all transactions.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept major credit cards, bank transfers, and select cryptocurrencies. All payments are processed through secure, verified channels.",
    },
    {
      question: "How is shipping handled?",
      answer:
        "Sellers are required to use insured shipping methods. All items are tracked and require signature confirmation upon delivery.",
    },
    {
      question: "What are the seller fees?",
      answer:
        "Our platform charges a competitive 2.5% fee on successful sales. There are no listing fees or monthly charges.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        Frequently Asked Questions
      </h1>

      <div className="grid gap-6">
        {faqs.map((faq, index) => (
          <div key={index} className="card p-6">
            <h3 className="text-xl font-semibold mb-3 text-[#FFD700]">
              {faq.question}
            </h3>
            <p className="text-[#C0C0C0]/80">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 card p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
          Still Have Questions?
        </h2>
        <p className="text-[#C0C0C0]/80 mb-4">
          Our support team is here to help you with any questions or concerns.
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
