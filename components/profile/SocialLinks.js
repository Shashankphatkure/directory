import React from "react";

export default function SocialLinks({ links = {} }) {
  return (
    <div className="social-links">
      <h3 className="text-sm font-semibold text-gray-600 mb-2">Connect</h3>
      <div className="flex gap-4">
        {links?.twitter && (
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500"
          >
            Twitter
          </a>
        )}
        {links?.instagram && (
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500"
          >
            Instagram
          </a>
        )}
        {/* Add other social links as needed */}
      </div>
    </div>
  );
}
