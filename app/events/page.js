"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Image from "next/image";
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function EventsPage() {
  const [filter, setFilter] = useState("upcoming");
  const [events, setEvents] = useState([]);
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  async function fetchEvents() {
    try {
      setIsLoading(true);
      setError(null);

      let query = supabase.from("events").select(`
          *,
          profiles:organizer_id (
            username,
            avatar_url
          ),
          event_attendees (
            id
          )
        `);

      // Apply filters
      if (filter === "upcoming") {
        query = query.gt("date", new Date().toISOString());
      } else if (filter === "past") {
        query = query.lt("date", new Date().toISOString());
      } else if (filter === "virtual") {
        query = query.eq("is_virtual", true);
      } else if (filter === "in-person") {
        query = query.eq("is_virtual", false);
      }

      const { data, error } = await query.order("date", { ascending: true });

      if (error) throw error;

      // Set featured event to the nearest upcoming event
      if (data.length > 0) {
        setFeaturedEvent(data[0]);
        setEvents(data.slice(1)); // Rest of the events
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events. Please try again later.");
    } finally {
      setIsLoading(false);
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
          <div className="text-[#C0C0C0] text-lg">Loading events...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D]">
      {/* Hero Section */}
      <div className="relative bg-black/40 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Join our community events, workshops, and meetups. Connect with
            fellow developers and expand your network.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Event Filters */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-2">
          {["upcoming", "past", "virtual", "in-person"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-3 rounded-xl capitalize transition-all transform hover:scale-[1.02] ${
                filter === type
                  ? "bg-gradient-to-r from-[#4169E1] to-[#5179F1] text-white font-semibold"
                  : "backdrop-blur-sm bg-white/5 text-white/80 hover:bg-white/10"
              }`}
            >
              {type.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Featured Event */}
        {featuredEvent && (
          <div className="mb-16 rounded-2xl overflow-hidden backdrop-blur-sm bg-black/30">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="relative aspect-video">
                <Image
                  src={featuredEvent.image || "/placeholder-event.jpg"}
                  alt={featuredEvent.title}
                  fill
                  className="object-cover"
                  priority
                />
                {featuredEvent.is_virtual && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#4169E1] to-[#5179F1] text-white px-4 py-2 rounded-xl">
                    Virtual Event
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-[#4169E1] text-sm font-semibold tracking-wider uppercase mb-2">
                  Featured Event
                </span>
                <h2 className="text-3xl font-bold text-white mb-4">
                  {featuredEvent.title}
                </h2>
                <p className="text-white/80 mb-6 line-clamp-3">
                  {featuredEvent.description}
                </p>

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/70">
                      <CalendarIcon className="h-5 w-5" />
                      <span>{formatEventDate(featuredEvent.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <ClockIcon className="h-5 w-5" />
                      <span>{formatEventTime(featuredEvent.time_start)}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/70">
                      <MapPinIcon className="h-5 w-5" />
                      <span>{featuredEvent.location || "Online Event"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <UserGroupIcon className="h-5 w-5" />
                      <span>
                        {featuredEvent.event_attendees.length} Registered
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/events/${featuredEvent.id}`}
                  className="bg-gradient-to-r from-[#4169E1] to-[#5179F1] text-white px-8 py-3 rounded-xl hover:scale-[1.02] transition-transform text-center font-semibold"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <div className="rounded-xl overflow-hidden backdrop-blur-sm bg-black/30 hover:transform hover:scale-[1.02] transition-all duration-300">
                  <div className="relative aspect-video">
                    <Image
                      src={event.image || "/placeholder-event.jpg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    {event.is_virtual && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#4169E1] to-[#5179F1] text-white px-3 py-1 rounded-xl text-sm">
                        Virtual Event
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-white/70 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{formatEventDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{event.location || "Online Event"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserGroupIcon className="h-4 w-4" />
                        <span>{event.event_attendees.length} Registered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/60">No {filter} events found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
