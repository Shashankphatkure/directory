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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative aspect-[16/9] mb-8">
          <Image
            src={event.image || "/placeholder-event.jpg"}
            alt={event.title}
            fill
            className="object-cover rounded-lg"
          />
          {event.is_virtual && (
            <div className="absolute top-4 right-4 bg-[#4169E1] text-white px-3 py-1 rounded-full text-sm">
              Virtual Event
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold text-[#FFD700]">{event.title}</h1>
            <p className="text-[#C0C0C0]/80 whitespace-pre-wrap">
              {event.description}
            </p>

            <div className="flex items-center gap-4">
              <Image
                src={event.profiles.avatar_url || "/placeholder-avatar.jpg"}
                alt={event.profiles.username}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-[#C0C0C0]">Organized by</p>
                <p className="text-[#FFD700]">{event.profiles.username}</p>
              </div>
            </div>
          </div>

          <div className="card p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[#C0C0C0]">
                <CalendarIcon className="h-5 w-5" />
                <span>{formatEventDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-4 text-[#C0C0C0]">
                <ClockIcon className="h-5 w-5" />
                <span>
                  {formatEventTime(event.time_start)} -{" "}
                  {formatEventTime(event.time_end)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[#C0C0C0]">
                <MapPinIcon className="h-5 w-5" />
                <span>{event.location || "Online Event"}</span>
              </div>
              <div className="flex items-center gap-4 text-[#C0C0C0]">
                <UserGroupIcon className="h-5 w-5" />
                <span>{event.event_attendees.length} Registered</span>
              </div>
              {event.max_attendees && (
                <div className="flex items-center gap-4 text-[#C0C0C0]">
                  <UserIcon className="h-5 w-5" />
                  <span>{event.max_attendees} Max Attendees</span>
                </div>
              )}
            </div>

            <button
              onClick={handleRegistration}
              disabled={
                isRegistering ||
                (event.max_attendees &&
                  event.event_attendees.length >= event.max_attendees &&
                  !isRegistered)
              }
              className={`w-full py-2 px-4 rounded-lg transition-colors ${
                isRegistered
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-[#4169E1] hover:bg-[#4169E1]/80 text-white"
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
              <div className="text-center text-[#C0C0C0]">
                Price: ${event.price}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
