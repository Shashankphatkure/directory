"use client";

// Add this check before using location
const getLocation = () => {
  if (typeof window !== "undefined") {
    return window.location;
  }
  return null;
};

// Replace direct location usage with getLocation()
// For example, if you have code like:
// location.href = '/some-path'
// Change it to:
const location = getLocation();
if (location) {
  location.href = "/some-path";
}
