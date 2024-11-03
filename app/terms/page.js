export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        Terms of Service
      </h1>

      <div className="card p-8">
        <div className="prose prose-invert max-w-none">
          <div className="space-y-6 text-[#C0C0C0]">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
                1. Introduction
              </h2>
              <p className="mb-4">
                Welcome to PeerMetals. By accessing our website, you agree to
                these terms and conditions. Please read them carefully before
                using our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
                2. User Obligations
              </h2>
              <p className="mb-4">
                Users must be at least 18 years old to use our services. You
                agree to provide accurate information and maintain the security
                of your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
                3. Trading Rules
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All trades must be conducted through our platform</li>
                <li>Users must verify their identity before trading</li>
                <li>Sellers must accurately describe their items</li>
                <li>Buyers must pay through our secure payment system</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
                4. Fees and Payments
              </h2>
              <p className="mb-4">
                PeerMetals charges a small fee for each successful transaction.
                All fees are clearly displayed before completing a purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
                5. Privacy and Security
              </h2>
              <p className="mb-4">
                We take your privacy seriously. Please review our Privacy Policy
                to understand how we collect and use your information.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
