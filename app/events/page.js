"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        Events & Meetups
      </h1>

      {/* Featured Event */}
      {featuredEvent && (
        <div className="card p-6 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-[16/9]">
              <Image
                src={featuredEvent.image || "/placeholder-event.jpg"}
                alt={featuredEvent.title}
                fill
                className="object-cover rounded-lg"
              />
              {featuredEvent.is_virtual && (
                <div className="absolute top-4 right-4 bg-[#4169E1] text-white px-3 py-1 rounded-full text-sm">
                  Virtual Event
                </div>
              )}
            </div>
            <div className="space-y-4">
              <span className="text-[#4169E1] text-sm font-medium">
                Featured Event
              </span>
              <h2 className="text-2xl font-bold text-[#FFD700]">
                {featuredEvent.title}
              </h2>
              <p className="text-[#C0C0C0]/80">{featuredEvent.description}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-[#C0C0C0]/60">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{formatEventDate(featuredEvent.date)}</span>
                </div>
                <div className="flex items-center gap-4 text-[#C0C0C0]/60">
                  <ClockIcon className="h-5 w-5" />
                  <span>
                    {formatEventTime(featuredEvent.time_start)} -{" "}
                    {formatEventTime(featuredEvent.time_end)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[#C0C0C0]/60">
                  <MapPinIcon className="h-5 w-5" />
                  <span>{featuredEvent.location || "Online Event"}</span>
                </div>
                <div className="flex items-center gap-4 text-[#C0C0C0]/60">
                  <UserGroupIcon className="h-5 w-5" />
                  <span>{featuredEvent.event_attendees.length} Registered</span>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Link
                  href={`/events/${featuredEvent.id}`}
                  className="flex-1 bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Filters */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {["upcoming", "past", "virtual", "in-person"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors whitespace-nowrap ${
              filter === type
                ? "bg-[#4169E1] text-white"
                : "text-[#C0C0C0] hover:bg-[#333333]"
            }`}
          >
            {type.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {events.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id}>
              <div className="card overflow-hidden group">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={event.image || "/placeholder-event.jpg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {event.is_virtual && (
                    <div className="absolute top-4 right-4 bg-[#4169E1] text-white px-3 py-1 rounded-full text-sm">
                      Virtual Event
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-[#FFD700]">
                      {event.title}
                    </h3>
                    <span className="text-sm text-[#C0C0C0]/60">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-[#C0C0C0]/80 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="space-y-2 text-sm text-[#C0C0C0]/60">
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
                  <button className="w-full mt-4 bg-[#4169E1] text-white py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[#C0C0C0]/60">No {filter} events found.</p>
        </div>
      )}
    </div>
  );
}
