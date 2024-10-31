import Image from "next/image";
import Link from "next/link";

export default function FeedItem({ item }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* User Info */}
      <div className="flex items-center mb-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={item.user.avatar}
            alt={item.user.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="ml-3">
          <Link
            href={`/profile/${item.user.name}`}
            className="font-semibold hover:underline"
          >
            {item.user.name}
          </Link>
          <p className="text-sm text-gray-500">{item.timestamp}</p>
        </div>
      </div>

      {/* Content */}
      {item.type === "post" && (
        <>
          <p className="mb-4">{item.content}</p>
          {item.image && (
            <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt="Post image"
                fill
                className="object-cover"
              />
            </div>
          )}
        </>
      )}

      {item.type === "achievement" && (
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🏆</span>
            <div>
              <h3 className="font-semibold">{item.achievement}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Interaction Buttons */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
            <span>👍</span>
            <span>{item.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
            <span>💬</span>
            <span>{item.comments}</span>
          </button>
        </div>
        <button className="text-gray-600 hover:text-blue-600">Share</button>
      </div>
    </div>
  );
}
