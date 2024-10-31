import Image from "next/image";
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-square group">
        <Image
          src="https://images.unsplash.com/photo-1610375461246-83df859d849d"
          alt={product.title}
          fill
          className="object-cover"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              View Details
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600">
              by{" "}
              <span className="hover:text-blue-600 cursor-pointer">
                {product.seller}
              </span>
            </p>
          </div>
          <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
            New
          </div>
        </div>

        <div className="flex items-baseline mt-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          <span className="text-sm text-gray-500 ml-2">
            + ${product.shippingPrice} shipping
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
              <HeartIcon className="h-5 w-5" />
              <span className="text-sm">{product.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
              <ChatBubbleLeftIcon className="h-5 w-5" />
              <span className="text-sm">{product.comments}</span>
            </button>
          </div>
          <button className="text-gray-500 hover:text-blue-600 transition-colors">
            <ShareIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
