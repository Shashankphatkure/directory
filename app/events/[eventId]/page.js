"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const gradientOverlay = "bg-gradient-to-t from-black/60 to-transparent";
const glassEffect = "backdrop-blur-sm bg-black/30";

export default function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchEvent();
    if (user) {
      checkRegistrationStatus();
    }
  }, [eventId, user]);

  async function fetchEvent() {
    try {
      const { data, error } = await supabase
        .from("events")
        .select(
          `
          *,
          profiles:organizer_id (
            username,
            avatar_url
          ),
          event_attendees (
            id,
            user_id
          )
        `
        )
        .eq("id", eventId)
        .single();

      if (error) throw error;
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event:", error);
      setError("Failed to load event details.");
    } finally {
      setIsLoading(false);
    }
  }

  async function checkRegistrationStatus() {
    try {
      const { data, error } = await supabase
        .from("event_attendees")
        .select("id")
        .eq("event_id", eventId)
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      setIsRegistered(!!data);
    } catch (error) {
      console.error("Error checking registration status:", error);
    }
  }

  async function handleRegistration() {
    if (!user) {
      router.push(
        "/login?redirect=" + encodeURIComponent(window.location.pathname)
      );
      return;
    }

    try {
      setIsRegistering(true);

      if (isRegistered) {
        // Unregister
        const { error } = await supabase
          .from("event_attendees")
          .delete()
          .eq("event_id", eventId)
          .eq("user_id", user.id);

        if (error) throw error;
        setIsRegistered(false);
      } else {
        // Register
        const { error } = await supabase.from("event_attendees").insert({
          event_id: eventId,
          user_id: user.id,
        });

        if (error) throw error;
        setIsRegistered(true);
      }

      // Refresh event data to update attendee count
      fetchEvent();
    } catch (error) {
      console.error("Error updating registration:", error);
      alert("Failed to update registration. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  }

  function formatEventDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function formatEventTime(timeString) {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-[#C0C0C0] text-lg">Loading event details...</div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500 text-lg">
            {error || "Event not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D]">
      <div className="relative">
        {/* Hero Section with Parallax Effect */}
        <div className="relative h-[50vh] lg:h-[70vh] w-full overflow-hidden">
          <Image
            src={event.image || "/placeholder-event.jpg"}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 ${gradientOverlay}`} />

          {/* Floating Event Info */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <div className={`${glassEffect} p-6 rounded-xl max-w-3xl`}>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    {formatEventDate(event.date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-5 w-5" />
                    {formatEventTime(event.time_start)} -{" "}
                    {formatEventTime(event.time_end)}
                  </div>
                  {event.is_virtual && (
                    <span className="bg-[#4169E1] px-3 py-1 rounded-full text-sm">
                      Virtual Event
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Organizer Info */}
              <div className={`${glassEffect} p-6 rounded-xl`}>
                <div className="flex items-center gap-4">
                  <Image
                    src={event.profiles.avatar_url || "/placeholder-avatar.jpg"}
                    alt={event.profiles.username}
                    width={56}
                    height={56}
                    className="rounded-full ring-2 ring-[#FFD700]"
                  />
                  <div>
                    <p className="text-[#C0C0C0]">Organized by</p>
                    <p className="text-[#FFD700] text-lg font-semibold">
                      {event.profiles.username}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className={`${glassEffect} p-6 rounded-xl`}>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  About this event
                </h2>
                <p className="text-[#C0C0C0] leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Right Column - Registration Card */}
            <div className="lg:sticky lg:top-8 h-fit">
              <div className={`${glassEffect} p-6 rounded-xl space-y-6`}>
                <div className="space-y-4">
                  {/* ... existing event details ... */}
                  <div className="flex items-center gap-4 text-[#C0C0C0]">
                    <UserGroupIcon className="h-5 w-5" />
                    <div>
                      <span className="text-lg font-semibold text-white">
                        {event.event_attendees.length}
                      </span>
                      <span className="ml-2">Registered</span>
                    </div>
                  </div>

                  {event.max_attendees && (
                    <div className="flex items-center gap-4 text-[#C0C0C0]">
                      <UserIcon className="h-5 w-5" />
                      <div>
                        <span className="text-lg font-semibold text-white">
                          {event.max_attendees}
                        </span>
                        <span className="ml-2">Max Attendees</span>
                      </div>
                    </div>
                  )}

                  {/* Progress Bar for Capacity */}
                  {event.max_attendees && (
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-[#4169E1] h-2.5 rounded-full"
                        style={{
                          width: `${
                            (event.event_attendees.length /
                              event.max_attendees) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Registration Button */}
                <button
                  onClick={handleRegistration}
                  disabled={
                    isRegistering ||
                    (event.max_attendees &&
                      event.event_attendees.length >= event.max_attendees &&
                      !isRegistered)
                  }
                  className={`w-full py-3 px-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-[1.02] ${
                    isRegistered
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                      : "bg-gradient-to-r from-[#4169E1] to-[#5179F1] text-white"
                  } ${
                    event.max_attendees &&
                    event.event_attendees.length >= event.max_attendees &&
                    !isRegistered
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isRegistering
                    ? "Processing..."
                    : isRegistered
                    ? "Cancel Registration"
                    : event.max_attendees &&
                      event.event_attendees.length >= event.max_attendees
                    ? "Event Full"
                    : "Register Now"}
                </button>

                {event.price > 0 && (
                  <div className="text-center">
                    <span className="text-[#C0C0C0]">Price: </span>
                    <span className="text-[#FFD700] text-xl font-bold">
                      ${event.price}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
