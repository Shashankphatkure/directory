"use client";
import { useState } from "react";
import Image from "next/image";

export default function ListingForm() {
  const [images, setImages] = useState([
    // Pre-populated mock images for demonstration
    {
      url: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
      file: null,
    },
    {
      url: "https://images.unsplash.com/photo-1624365168968-f283d506c6b6",
      file: null,
    },
  ]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", { ...formData, images });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Image Upload */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Product Images</h2>
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
            <label className="border-2 border-dashed rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:border-blue-500">
              <div className="text-center">
                <div className="text-4xl mb-2">+</div>
                <div className="text-sm text-gray-600">Add Image</div>
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
        <p className="text-sm text-gray-500">
          Upload up to 8 images. First image will be the cover image.
        </p>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Metal Type
              </label>
              <select
                value={formData.metalType}
                onChange={(e) =>
                  setFormData({ ...formData, metalType: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (oz)
              </label>
              <input
                type="number"
                step="0.001"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purity
              </label>
              <input
                type="text"
                value={formData.purity}
                onChange={(e) =>
                  setFormData({ ...formData, purity: e.target.value })
                }
                placeholder="e.g., .999"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <select
              value={formData.condition}
              onChange={(e) =>
                setFormData({ ...formData, condition: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
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
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Pricing</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.shippingPrice}
                onChange={(e) =>
                  setFormData({ ...formData, shippingPrice: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.enableOffers}
                onChange={(e) =>
                  setFormData({ ...formData, enableOffers: e.target.checked })
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Enable Offers
              </span>
            </label>
          </div>

          {formData.enableOffers && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Auto Accept Price ($)
                </label>
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
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Auto Deny Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.autoDenyPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, autoDenyPrice: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Publish Listing
        </button>
      </div>
    </form>
  );
}
