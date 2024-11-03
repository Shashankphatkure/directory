import Image from "next/image";
import Link from "next/link";
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function FeedItem({ item }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(item.likes || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div className="card overflow-hidden">
      {/* User Info */}
      <div className="flex items-center p-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={item.user.avatar}
            alt={item.user.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="ml-3 flex-1">
          <Link
            href={`/profile/${item.user.username}`}
            className="font-semibold text-[#C0C0C0] hover:text-[#4169E1] transition-colors"
          >
            {item.user.name}
          </Link>
          <p className="text-sm text-[#C0C0C0]/60">{item.timestamp}</p>
        </div>
        {item.type === "listing" && (
          <span className="text-[#50C878] font-semibold">${item.price}</span>
        )}
      </div>

      {/* Content */}
      {item.image && (
        <div className="relative aspect-square">
          <Image
            src={item.image}
            alt={item.title || "Post image"}
            fill
            className="object-cover"
          />
          {item.type === "listing" && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#333333] p-4">
              <h3 className="text-[#C0C0C0] font-semibold">{item.title}</h3>
              {item.discount && (
                <span className="text-[#50C878] text-sm">
                  {item.discount}% OFF
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Post Content */}
      <div className="p-4">
        {item.type === "post" && (
          <p className="text-[#C0C0C0]/80 mb-4">{item.content}</p>
        )}

        {item.type === "achievement" && (
          <div className="bg-[#FFD700]/10 p-4 rounded-lg">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🏆</span>
              <div>
                <h3 className="font-semibold text-[#FFD700]">
                  {item.achievement}
                </h3>
                <p className="text-sm text-[#C0C0C0]/80">{item.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Interaction Buttons */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-4">
            <button
              onClick={handleLike}
              className="flex items-center space-x-1 text-[#C0C0C0]/60 hover:text-[#4169E1] transition-colors"
            >
              {isLiked ? (
                <HeartSolidIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6" />
              )}
              <span>{likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-[#C0C0C0]/60 hover:text-[#4169E1] transition-colors">
              <ChatBubbleLeftIcon className="h-6 w-6" />
              <span>{item.comments}</span>
            </button>
            <button className="text-[#C0C0C0]/60 hover:text-[#4169E1] transition-colors">
              <ShareIcon className="h-6 w-6" />
            </button>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`text-[#C0C0C0]/60 hover:text-[#4169E1] transition-colors ${
              isSaved ? "text-[#FFD700]" : ""
            }`}
          >
            <BookmarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Comments Preview */}
        {item.topComments && item.topComments.length > 0 && (
          <div className="mt-4 space-y-2">
            {item.topComments.map((comment, index) => (
              <div key={index} className="text-sm">
                <span className="font-semibold text-[#C0C0C0]">
                  {comment.user}
                </span>
                <span className="text-[#C0C0C0]/80 ml-2">{comment.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
