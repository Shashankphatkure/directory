export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        Privacy Policy
      </h1>

      <div className="card p-8">
        <div className="prose prose-invert max-w-none">
          <div className="space-y-6 text-[#C0C0C0]">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
                Information We Collect
              </h2>
              <p className="mb-4">
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information</li>
                <li>Payment and transaction details</li>
                <li>Communication preferences</li>
                <li>Device and usage information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
                How We Use Your Information
              </h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your transactions</li>
                <li>Provide customer support</li>
                <li>Send important updates</li>
                <li>Improve our services</li>
                <li>Prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
                Data Security
              </h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your
                personal information from unauthorized access, disclosure, or
                destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
                Your Rights
              </h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
