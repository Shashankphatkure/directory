"use client";

import Image from "next/image";
import { useState } from "react";
import SocialLinks from "./SocialLinks";

export default function ProfileHeader({ user }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="relative">
      {/* Banner */}
      <div className="h-48 md:h-64 relative">
        <Image
          src="https://images.unsplash.com/photo-1629451437390-1c07c07a2777"
          alt="Profile banner"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative -mt-20 pb-4">
          {/* Profile Picture and Basic Info */}
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
            <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              <Image
                src="https://ui-avatars.com/api/?name=John+Doe&size=128"
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-600">@{user.username}</p>
                </div>

                <div className="flex gap-4">
                  {/* Follow/Edit Button */}
                  {user.isOwnProfile ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={`px-6 py-2 rounded-full ${
                        isFollowing
                          ? "bg-gray-200 hover:bg-gray-300"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  )}
                </div>
              </div>

              {/* Bio */}
              <p className="mt-4 text-gray-700">{user.bio}</p>

              {/* Stats */}
              <div className="flex gap-6 mt-4">
                <div>
                  <span className="font-bold">{user.followers}</span>{" "}
                  <span className="text-gray-600">Followers</span>
                </div>
                <div>
                  <span className="font-bold">{user.following}</span>{" "}
                  <span className="text-gray-600">Following</span>
                </div>
              </div>
            </div>
          </div>

          {/* Awards */}
          {user.awards && user.awards.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Awards
              </h3>
              <div className="flex gap-2">
                {user.awards.map((award, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                  >
                    🏆 {award}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          <SocialLinks links={user.socialLinks} />
        </div>
      </div>
    </div>
  );
}
