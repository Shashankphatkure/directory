"use client";
import { useState } from "react";

export default function ProfileTabs({ defaultTab, tabs, renderContent }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      <div className="border-b mb-6">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {renderContent(activeTab)}
    </div>
  );
}
