"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "next-auth/react";
import {
  StarIcon,
  ShieldCheckIcon,
  PencilIcon,
  LinkIcon,
  UserPlusIcon,
  MapPinIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";

export default function ProfilePage({ params }) {
  const [activeTab, setActiveTab] = useState("listings");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();
  const { data: session } = useSession();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  console.log("Current session:", session);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        setIsLoading(true);

        // Check if session is loaded and user exists
        if (!session) {
          return; // Wait for session to load
        }

        console.log("Full session data:", session); // Debug the full session

        // Get user's profile using user ID instead of email
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id) // Use ID instead of email
          .maybeSingle();

        if (error) {
          console.error("Supabase error:", error); // Log the specific error
          throw error;
        }

        if (!data) {
          console.log("No profile found for user:", session.user); // Debug log
          setError("Profile not found");
          return;
        }

        console.log("Found profile data:", data); // Debug log
        setProfileData(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    }

    if (session?.user) {
      // Only fetch if we have a user
      fetchProfileData();
    }
  }, [session, supabase]);

  const userProfile = {
    name: profileData?.full_name || "Loading...",
    username: profileData?.username || "Loading...",
    bio: profileData?.bio || "No bio available",
    location: profileData?.location || "Location not set",
    joinDate: profileData?.created_at
      ? `Member since ${new Date(profileData.created_at).toLocaleDateString(
          "en-US",
          { month: "short", year: "numeric" }
        )}`
      : "Join date unknown",
    reputation: profileData?.reputation || 0,
    verified: profileData?.is_verified || false,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    banner: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
    listings: 24,
    sales: 89,
    rating: 4.9,
    followers: 128,
    following: 45,
    awards: [
      { id: 1, name: "Top Seller 2023", icon: "🏆" },
      { id: 2, name: "Trusted Trader", icon: "⭐" },
      { id: 3, name: "Quick Shipper", icon: "🚀" },
    ],
    socialLinks: {
      twitter: "https://twitter.com/metaltrader",
      instagram: "https://instagram.com/metaltrader",
      website: "https://metaltrader.com",
    },
    personalStack: [
      { id: 1, name: "Gold American Eagles", quantity: "5 oz" },
      { id: 2, name: "Silver Bars", quantity: "100 oz" },
      { id: 3, name: "Platinum Coins", quantity: "2 oz" },
    ],
  };

  const tabs = [
    { id: "listings", label: "Listings" },
    { id: "stack", label: "Personal Stack" },
    { id: "activity", label: "Activity Feed" },
    { id: "reviews", label: "Reviews" },
  ];

  // Function to handle avatar upload
  const handleAvatarUpload = async (event) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploadingImage(true);

      // Create preview
      setPreviewImage(URL.createObjectURL(file));

      // Upload to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${session.user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", session.user.id);

      if (updateError) throw updateError;

      // Update local state
      setProfileData((prev) => ({
        ...prev,
        avatar_url: publicUrl,
      }));
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Error uploading avatar. Please try again.");
      // Reset preview if upload failed
      setPreviewImage(null);
    } finally {
      setUploadingImage(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading session...
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card p-6 text-center">
          <p className="text-red-500 mb-2">
            {error === "Profile not found"
              ? `Profile @${params.username} not found`
              : "Error loading profile"}
          </p>
          <p className="text-[#C0C0C0]/60 text-sm">
            {error === "Profile not found"
              ? "Please check the username and try again"
              : "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full">
        <Image
          src={userProfile.banner}
          alt="Profile Banner"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#333333] to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 -mt-16 md:-mt-20 relative z-10">
        {/* Profile Header */}
        <div className="card p-4 md:p-6">
          <div className="flex flex-col items-center md:items-start md:flex-row gap-6 md:gap-8">
            {/* Avatar with Edit Button */}
            <div className="relative">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#2A2A2A]">
                <Image
                  src={
                    previewImage ||
                    profileData?.avatar_url ||
                    "/default-avatar.png"
                  }
                  alt={profileData?.full_name || "Profile"}
                  fill
                  sizes="(max-width: 768px) 96px, 128px"
                  className="object-cover"
                  priority
                />
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
              {isEditing && (
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 p-2 bg-[#4169E1] rounded-full text-white cursor-pointer hover:bg-[#4169E1]/80 transition-colors"
                >
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <PencilIcon className="h-4 w-4" />
                </label>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-[#C0C0C0]">
                  {userProfile.name}
                </h1>
                {userProfile.verified && (
                  <ShieldCheckIcon className="h-6 w-6 text-[#50C878]" />
                )}
              </div>
              <p className="text-[#C0C0C0]/60 mb-2">@{userProfile.username}</p>

              {/* Location and Join Date */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-[#C0C0C0]/60 mb-4">
                <span className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  {userProfile.location}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  {userProfile.joinDate}
                </span>
              </div>

              {/* Bio */}
              <p className="text-[#C0C0C0]/80 mb-4">{userProfile.bio}</p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-sm md:text-base text-[#C0C0C0]/80">
                <div>
                  <span className="font-bold text-[#FFD700]">
                    {userProfile.listings}
                  </span>{" "}
                  Listings
                </div>
                <div>
                  <span className="font-bold text-[#FFD700]">
                    {userProfile.sales}
                  </span>{" "}
                  Sales
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-[#FFD700] mr-1" />
                  <span className="font-bold">{userProfile.rating}</span>
                </div>
                <div>
                  <span className="font-bold text-[#50C878]">
                    {userProfile.reputation}
                  </span>{" "}
                  Rep
                </div>
                <div>
                  <span className="font-bold text-[#C0C0C0]">
                    {userProfile.followers}
                  </span>{" "}
                  Followers
                </div>
                <div>
                  <span className="font-bold text-[#C0C0C0]">
                    {userProfile.following}
                  </span>{" "}
                  Following
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3 mt-4 md:mt-0">
              {isEditing ? (
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full sm:w-auto bg-[#50C878] text-white px-6 py-2 rounded-lg hover:bg-[#50C878]/80 transition-colors"
                >
                  Save Changes
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full sm:w-auto bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors"
                  >
                    Edit Profile
                  </button>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#333333] text-[#C0C0C0] px-6 py-2 rounded-lg hover:bg-[#333333]/80 transition-colors">
                    <UserPlusIcon className="h-5 w-5" />
                    Follow
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Awards Section */}
          {userProfile.awards.length > 0 && (
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#C0C0C0]/20">
              <h3 className="text-[#FFD700] font-semibold mb-3 text-center md:text-left">
                Awards
              </h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {userProfile.awards.map((award, index) => (
                  <div
                    key={`${award.id}-${index}`}
                    className="flex items-center gap-2 bg-[#333333] px-3 py-1 rounded-full"
                  >
                    <span>{award.icon}</span>
                    <span className="text-sm text-[#C0C0C0]">{award.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#C0C0C0]/20">
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {Object.entries(userProfile.socialLinks).map(
                ([platform, url], index) => (
                  <a
                    key={`${platform}-${index}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#4169E1] hover:text-[#4169E1]/80 transition-colors"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span className="capitalize">{platform}</span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 md:mt-8 border-b border-[#C0C0C0]/20">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-[#FFD700] border-b-2 border-[#FFD700]"
                    : "text-[#C0C0C0]/60 hover:text-[#C0C0C0]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6 md:mt-8">
          {activeTab === "listings" && (
            <div className="text-center text-[#C0C0C0]/60">
              No active listings to display
            </div>
          )}
          {activeTab === "stack" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {userProfile.personalStack.map((item) => (
                <div key={item.id} className="card p-4">
                  <h3 className="text-[#FFD700] font-semibold">{item.name}</h3>
                  <p className="text-[#C0C0C0]">{item.quantity}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "activity" && (
            <div className="text-center text-[#C0C0C0]/60">
              No recent activity to display
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="text-center text-[#C0C0C0]/60">
              No reviews to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
