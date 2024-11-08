"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function ListingForm() {
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    metalType: "",
    weight: "",
    purity: "",
    condition: "",
    price: "",
    shippingPrice: "",
    enableOffers: false,
    autoAcceptPrice: "",
    autoDenyPrice: "",
    year: new Date().getFullYear().toString(), // Add year field
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].url);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const uploadImagesToStorage = async () => {
    const imageUrls = [];

    for (const image of images) {
      const fileExt = image.file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `listings/${session.user.id}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("listings")
        .upload(filePath, image.file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("listings").getPublicUrl(filePath);

      imageUrls.push(publicUrl);
    }

    return imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Debug logs
    console.log("Session user:", session?.user);
    console.log("User ID:", session?.user?.id);

    try {
      if (!session?.user?.id) {
        throw new Error("User not authenticated");
      }

      // Upload images first
      const imageUrls = await uploadImagesToStorage();

      // Prepare listing data
      const listingData = {
        user_id: session.user.id,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        metal_type: formData.metalType.toLowerCase(),
        condition: formData.condition.toLowerCase(),
        weight: parseFloat(formData.weight),
        weight_unit: "oz",
        year: formData.year,
        images: imageUrls,
        status: "active",
      };

      console.log("Attempting to insert listing:", listingData);

      // Insert listing into database
      const { error: insertError, data: listing } = await supabase
        .from("listings")
        .insert(listingData)
        .select()
        .single();

      if (insertError) {
        console.error("Insert error:", insertError);
        throw insertError;
      }

      console.log("Listing created successfully:", listing);

      // Redirect to the new listing page
      router.push(`/listings/${listing.id}`);
    } catch (err) {
      console.error("Error creating listing:", err);
      setError(err.message || "Failed to create listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show error message if exists
  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-4">
        {error}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Image Upload */}
      <div className="bg-[#2A2A2A] rounded-lg shadow-sm p-6 border border-[#C0C0C0]/20">
        <h2 className="text-lg font-semibold mb-4 text-[#FFD700]">
          Product Images
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={image.url}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          {images.length < 8 && (
            <label className="border-2 border-dashed border-[#C0C0C0]/40 rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:border-[#FFD700] transition-colors">
              <div className="text-center">
                <div className="text-4xl mb-2 text-[#C0C0C0]">+</div>
                <div className="text-sm text-[#C0C0C0]/80">Add Image</div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                multiple
              />
            </label>
          )}
        </div>
        <p className="text-sm text-[#C0C0C0]/60">
          Upload up to 8 images. First image will be the cover image.
        </p>
      </div>

      {/* Basic Information */}
      <div className="bg-[#2A2A2A] rounded-lg shadow-sm p-6 border border-[#C0C0C0]/20">
        <h2 className="text-lg font-semibold mb-4 text-[#FFD700]">
          Basic Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#C0C0C0] mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg text-[#C0C0C0] focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#C0C0C0] mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg text-[#C0C0C0] focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-1">
                Metal Type
              </label>
              <select
                value={formData.metalType}
                onChange={(e) =>
                  setFormData({ ...formData, metalType: e.target.value })
                }
                className="w-full px-4 py-2 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg text-[#C0C0C0] focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors"
                required
              >
                <option value="">Select Metal</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="platinum">Platinum</option>
                <option value="palladium">Palladium</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-1">
                Weight (oz)
              </label>
              <input
                type="number"
                step="0.001"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                className="w-full px-4 py-2 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg text-[#C0C0C0] focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-1">
                Purity
              </label>
              <input
                type="text"
                value={formData.purity}
                onChange={(e) =>
                  setFormData({ ...formData, purity: e.target.value })
                }
                placeholder="e.g., .999"
                className="w-full px-4 py-2 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg text-[#C0C0C0] focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors placeholder-[#C0C0C0]/40"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#C0C0C0] mb-1">
              Condition
            </label>
            <select
              value={formData.condition}
              onChange={(e) =>
                setFormData({ ...formData, condition: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg text-[#C0C0C0] focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors"
              required
            >
              <option value="">Select Condition</option>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="used">Used</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-[#2A2A2A] rounded-lg shadow-sm p-6 border border-[#C0C0C0]/20">
        <h2 className="text-lg font-semibold mb-4 text-[#FFD700]">Pricing</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-1">
                Price ($)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg text-[#C0C0C0] focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors pl-8"
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C0C0C0]/60">
                  $
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#C0C0C0] mb-1">
                Shipping Price ($)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={formData.shippingPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, shippingPrice: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#333333] border border-[#C0C0C0]/20 rounded-lg text-[#C0C0C0] focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors pl-8"
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C0C0C0]/60">
                  $
                </span>
              </div>
            </div>
          </div>

          {/* Enable Offers Section */}
          <div className="mt-6 p-4 bg-[#333333] rounded-lg border border-[#C0C0C0]/20">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.enableOffers}
                onChange={(e) =>
                  setFormData({ ...formData, enableOffers: e.target.checked })
                }
                className="w-5 h-5 rounded border-[#C0C0C0]/20 text-[#FFD700] focus:ring-[#FFD700] bg-[#2A2A2A]"
              />
              <div>
                <span className="text-sm font-medium text-[#C0C0C0]">
                  Enable Offers
                </span>
                <p className="text-xs text-[#C0C0C0]/60 mt-1">
                  Allow buyers to submit offers for your listing
                </p>
              </div>
            </label>

            {formData.enableOffers && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#C0C0C0] mb-1">
                      Auto Accept Price ($)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={formData.autoAcceptPrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            autoAcceptPrice: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#C0C0C0]/20 rounded-lg text-[#C0C0C0] focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors pl-8"
                        placeholder="Optional"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C0C0C0]/60">
                        $
                      </span>
                    </div>
                    <p className="text-xs text-[#C0C0C0]/60 mt-1">
                      Automatically accept offers above this amount
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#C0C0C0] mb-1">
                      Auto Deny Price ($)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={formData.autoDenyPrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            autoDenyPrice: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#C0C0C0]/20 rounded-lg text-[#C0C0C0] focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-colors pl-8"
                        placeholder="Optional"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C0C0C0]/60">
                        $
                      </span>
                    </div>
                    <p className="text-xs text-[#C0C0C0]/60 mt-1">
                      Automatically reject offers below this amount
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          disabled={isSubmitting}
          className="px-6 py-2 border border-[#C0C0C0]/20 rounded-lg text-[#C0C0C0] hover:bg-[#333333] transition-all duration-300 disabled:opacity-50"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-[#FFD700] text-[#1A1A1A] rounded-lg hover:bg-[#F5C400] transition-all duration-300 font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Publishing..." : "Publish Listing"}
        </button>
      </div>
    </form>
  );
}
