"use client";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
            Send us a Message
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-[#C0C0C0] mb-2">Name</label>
              <input
                type="text"
                className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-[#C0C0C0] mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-[#C0C0C0] mb-2">Subject</label>
              <select className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]">
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Billing Question</option>
                <option>Report an Issue</option>
              </select>
            </div>
            <div>
              <label className="block text-[#C0C0C0] mb-2">Message</label>
              <textarea
                className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0] h-32"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button className="w-full bg-[#4169E1] text-white py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
              Quick Contact
            </h2>
            <div className="space-y-3 text-[#C0C0C0]">
              <p>Email: support@peermetals.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Hours: Mon-Fri 9AM-5PM EST</p>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
              Office Location
            </h2>
            <div className="space-y-3 text-[#C0C0C0]">
              <p>123 Precious Metal Street</p>
              <p>Suite 100</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">FAQ</h2>
            <div className="space-y-3">
              <a
                href="/faq"
                className="block text-[#4169E1] hover:text-[#4169E1]/80"
              >
                View Frequently Asked Questions →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
