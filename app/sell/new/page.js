"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  PhotoIcon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function NewListingPage() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    {
      id: "gold_coins",
      name: "Gold Coins",
      subcategories: ["American Eagles", "Buffalos", "Maples", "Other"],
    },
    {
      id: "silver_coins",
      name: "Silver Coins",
      subcategories: ["American Eagles", "Maples", "Morgans", "Other"],
    },
    {
      id: "gold_bars",
      name: "Gold Bars",
      subcategories: ["1oz", "10oz", "Kilo", "Other"],
    },
    {
      id: "silver_bars",
      name: "Silver Bars",
      subcategories: ["1oz", "10oz", "Kilo", "100oz"],
    },
    { id: "platinum", name: "Platinum", subcategories: ["Coins", "Bars"] },
    { id: "palladium", name: "Palladium", subcategories: ["Coins", "Bars"] },
  ];

  const conditions = [
    { id: "new", name: "Brand New" },
    { id: "ms70", name: "MS70" },
    { id: "ms69", name: "MS69" },
    { id: "proof", name: "Proof" },
    { id: "uncirculated", name: "Uncirculated" },
    { id: "circulated", name: "Circulated" },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);

    // Create preview URLs
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Add your form submission logic here
    setTimeout(() => {
      setLoading(false);
      router.push("/seller/listings");
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#C0C0C0] border-l-4 border-[#FFD700] pl-4">
        Create New Listing
      </h1>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[#C0C0C0] mb-2">Title</label>
                <input
                  type="text"
                  className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                  placeholder="e.g., 1oz Gold American Eagle 2024"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C0C0C0] mb-2">Category</label>
                  <select
                    className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <optgroup key={category.id} label={category.name}>
                        {category.subcategories.map((sub) => (
                          <option
                            key={`${category.id}_${sub}`}
                            value={`${category.id}_${sub}`}
                          >
                            {sub}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#C0C0C0] mb-2">Condition</label>
                  <select
                    className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                    required
                  >
                    <option value="">Select Condition</option>
                    {conditions.map((condition) => (
                      <option key={condition.id} value={condition.id}>
                        {condition.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C0C0C0] mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#C0C0C0] mb-2">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                    placeholder="1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#C0C0C0] mb-2">Description</label>
                <textarea
                  className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0] h-32"
                  placeholder="Describe your item in detail..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
              Images
            </h2>

            {/* Image Upload */}
            <div className="border-2 border-dashed border-[#C0C0C0]/20 rounded-lg p-6">
              <div className="text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-[#C0C0C0]/60" />
                <div className="mt-4 flex text-sm leading-6 text-[#C0C0C0]">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-[#4169E1] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#4169E1]"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-[#C0C0C0]/60">
                  PNG, JPG, GIF up to 10MB each
                </p>
              </div>
            </div>

            {/* Image Previews */}
            {previewUrls.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <Image
                      src={url}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shipping */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
              Shipping Details
            </h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C0C0C0] mb-2">
                    Shipping Cost ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#C0C0C0] mb-2">
                    Processing Time
                  </label>
                  <select
                    className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                    required
                  >
                    <option value="1-2">1-2 business days</option>
                    <option value="3-5">3-5 business days</option>
                    <option value="5-7">5-7 business days</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <InformationCircleIcon className="h-5 w-5 text-[#4169E1] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#C0C0C0]/60">
                  Shipping must be insured and require signature confirmation
                  for items over $500.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#4169E1] text-white py-3 rounded-lg hover:bg-[#4169E1]/80 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating Listing..." : "Create Listing"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 border border-[#C0C0C0]/20 text-[#C0C0C0] py-3 rounded-lg hover:bg-[#333333] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
