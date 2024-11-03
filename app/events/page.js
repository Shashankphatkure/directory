"use client";
import { useState } from "react";
import Image from "next/image";
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function EventsPage() {
  const [filter, setFilter] = useState("upcoming");

  const events = [
    {
      id: 1,
      title: "Precious Metals Investment Summit 2024",
      date: "March 15, 2024",
      time: "9:00 AM - 5:00 PM EST",
      location: "New York City, NY",
      type: "Conference",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      description:
        "Join industry experts for a day of insights into precious metals investment strategies.",
      attendees: 250,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Gold Trading Masterclass",
      date: "March 20, 2024",
      time: "2:00 PM - 4:00 PM EST",
      location: "Virtual Event",
      type: "Workshop",
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
      description:
        "Learn advanced trading techniques from experienced traders.",
      attendees: 100,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Numismatic Collectors Meet",
      date: "April 5, 2024",
      time: "11:00 AM - 3:00 PM EST",
      location: "Chicago, IL",
      type: "Meetup",
      image: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
      description:
        "Network with fellow collectors and showcase your rare pieces.",
      attendees: 75,
      status: "upcoming",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        Events & Meetups
      </h1>

      {/* Featured Event */}
      <div className="card p-6 mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-[16/9]">
            <Image
              src={events[0].image}
              alt={events[0].title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <span className="text-[#4169E1] text-sm font-medium">
              Featured Event
            </span>
            <h2 className="text-2xl font-bold text-[#FFD700]">
              {events[0].title}
            </h2>
            <p className="text-[#C0C0C0]/80">{events[0].description}</p>
            <div className="flex items-center gap-4 text-[#C0C0C0]/60">
              <CalendarIcon className="h-5 w-5" />
              <span>{events[0].date}</span>
            </div>
            <div className="flex items-center gap-4 text-[#C0C0C0]/60">
              <MapPinIcon className="h-5 w-5" />
              <span>{events[0].location}</span>
            </div>
            <button className="bg-[#4169E1] text-white px-6 py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
              Register Now
            </button>
          </div>
        </div>
      </div>

      {/* Event Filters */}
      <div className="flex gap-4 mb-8">
        {["upcoming", "past", "virtual", "in-person"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="card overflow-hidden">
            <div className="relative aspect-[16/9]">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-[#FFD700]">
                  {event.title}
                </h3>
                <span className="text-sm text-[#C0C0C0]/60">{event.type}</span>
              </div>
              <p className="text-[#C0C0C0]/80 mb-4">{event.description}</p>
              <div className="space-y-2 text-sm text-[#C0C0C0]/60">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="h-4 w-4" />
                  <span>{event.attendees} Attendees</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-[#4169E1] text-white py-2 rounded-lg hover:bg-[#4169E1]/80 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
