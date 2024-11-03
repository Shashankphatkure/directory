export default function CareersPage() {
  const openings = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "New York, NY / Remote",
      type: "Full-time",
      description:
        "Join our engineering team to build and scale our precious metals trading platform.",
    },
    {
      title: "Precious Metals Expert",
      department: "Authentication",
      location: "Remote",
      type: "Full-time",
      description:
        "Help verify and authenticate precious metals listings on our platform.",
    },
    {
      title: "Customer Success Manager",
      department: "Support",
      location: "Remote",
      type: "Full-time",
      description:
        "Lead our customer support team and ensure excellent service for our users.",
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "New York, NY / Remote",
      type: "Full-time",
      description:
        "Drive growth and engagement through strategic marketing initiatives.",
    },
  ];

  const benefits = [
    "Competitive Salary & Equity",
    "Health, Dental & Vision Insurance",
    "Flexible Work Hours",
    "Remote Work Options",
    "Professional Development",
    "401(k) Matching",
    "Paid Time Off",
    "Home Office Stipend",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        Join Our Team
      </h1>

      {/* Introduction */}
      <div className="card p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-[#FFD700]">
          Build the Future of Precious Metals Trading
        </h2>
        <p className="text-[#C0C0C0]/80 text-lg leading-relaxed">
          At PeerMetals, we're revolutionizing how people trade precious metals.
          Join our team of passionate individuals working to create the most
          trusted and efficient marketplace in the industry.
        </p>
      </div>

      {/* Benefits */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-[#FFD700]">
          Why Work With Us
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="card p-6">
              <p className="text-[#C0C0C0] text-center">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-[#FFD700]">
          Open Positions
        </h2>
        <div className="space-y-6">
          {openings.map((job, index) => (
            <div
              key={index}
              className="card p-6 hover:border-[#4169E1] transition-colors"
            >
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#C0C0C0] mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="text-[#C0C0C0]/60">{job.department}</span>
                    <span className="text-[#C0C0C0]/60">•</span>
                    <span className="text-[#C0C0C0]/60">{job.location}</span>
                    <span className="text-[#C0C0C0]/60">•</span>
                    <span className="text-[#C0C0C0]/60">{job.type}</span>
                  </div>
                </div>
                <button className="bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
                  Apply Now
                </button>
              </div>
              <p className="text-[#C0C0C0]/80">{job.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-12 card p-8 text-center">
        <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
          Don't see a position that fits?
        </h2>
        <p className="text-[#C0C0C0]/80 mb-6">
          We're always looking for talented individuals to join our team. Send
          us your resume and let us know how you can contribute!
        </p>
        <a
          href="mailto:careers@peermetals.com"
          className="inline-block bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
