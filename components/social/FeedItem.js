import Image from "next/image";
import Link from "next/link";
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon,
  PlayIcon,
  EllipsisHorizontalIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function FeedItem({ item, onLike, onComment, currentUser }) {
  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(item.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike(item.id);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(item.id, commentText);
      setCommentText("");
    }
  };

  const renderMediaContent = () => {
    switch (item.type) {
      case "image":
        return (
          <div className="relative -mx-4">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={item.mediaUrl}
                alt="Post image"
                fill
                className="object-cover"
              />
            </div>
            {item.additionalImages && item.additionalImages.length > 0 && (
              <div className="grid grid-cols-2 gap-1 mt-1">
                {item.additionalImages.map((img, index) => (
                  <div key={index} className="relative aspect-square w-full">
                    <Image
                      src={img}
                      alt={`Additional image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "video":
        return (
          <div className="relative -mx-4">
            <div className="relative aspect-video w-full cursor-pointer group">
              <Image
                src={item.thumbnail}
                alt="Video thumbnail"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                  <PlayIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 px-2 py-1 rounded text-sm text-white">
                4:32
              </div>
            </div>
          </div>
        );

      case "link":
        return (
          <Link
            href={item.link.url}
            target="_blank"
            className="block -mx-4 hover:bg-[#1A1A1A] transition-colors"
          >
            <div className="flex flex-col md:flex-row border border-[#333333] hover:border-[#4169E1]">
              <div className="relative aspect-video md:w-[200px]">
                <Image
                  src={item.link.image}
                  alt={item.link.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex-1">
                <p className="text-sm text-[#4169E1] mb-1">
                  {new URL(item.link.url).hostname}
                </p>
                <h3 className="font-semibold text-[#C0C0C0] mb-2">
                  {item.link.title}
                </h3>
                <p className="text-sm text-[#C0C0C0]/60 line-clamp-2">
                  {item.link.description}
                </p>
              </div>
            </div>
          </Link>
        );

      default:
        return null;
    }
  };

  return (
    <div className="card overflow-hidden hover:bg-[#1A1A1A]/50 transition-colors">
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
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${item.user.username}`}
              className="font-semibold text-[#C0C0C0] hover:text-[#4169E1] transition-colors"
            >
              {item.user.name}
            </Link>
            {item.user.verified && (
              <span className="text-[#4169E1] bg-[#4169E1]/10 p-0.5 rounded-full">
                ✓
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-[#C0C0C0]/60">
            <span>{item.timestamp}</span>
            <span>•</span>
            <GlobeAmericasIcon className="h-4 w-4" />
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 hover:bg-[#333333] rounded-full transition-colors"
          >
            <EllipsisHorizontalIcon className="h-6 w-6 text-[#C0C0C0]" />
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] rounded-lg shadow-lg border border-[#333333] z-10">
              <div className="py-1">
                <button className="w-full px-4 py-2 text-left text-sm text-[#C0C0C0] hover:bg-[#333333]">
                  Save Post
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-[#C0C0C0] hover:bg-[#333333]">
                  Hide Post
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-[#333333]">
                  Report Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        {/* Post Text Content */}
        {item.content && (
          <p className="text-[#C0C0C0] mb-4 whitespace-pre-line text-[15px] leading-relaxed">
            {item.content}
          </p>
        )}
      </div>

      {/* Media Content */}
      {renderMediaContent()}

      {/* Engagement Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-sm text-[#C0C0C0]/60 border-b border-[#333333]">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              ❤️
            </div>
            <div className="w-5 h-5 rounded-full bg-[#4169E1] flex items-center justify-center">
              👍
            </div>
          </div>
          <span>{likes} likes</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setShowComments(!showComments)}>
            {item.comments} comments
          </button>
          <button>2 shares</button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-1 flex items-center justify-between border-b border-[#333333]">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-[#333333] transition-colors ${
            isLiked ? "text-red-500" : "text-[#C0C0C0]/60"
          }`}
        >
          {isLiked ? (
            <HeartSolidIcon className="h-6 w-6" />
          ) : (
            <HeartIcon className="h-6 w-6" />
          )}
          <span>Like</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-2 py-2 text-[#C0C0C0]/60 rounded-lg hover:bg-[#333333] transition-colors"
        >
          <ChatBubbleLeftIcon className="h-6 w-6" />
          <span>Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-[#C0C0C0]/60 rounded-lg hover:bg-[#333333] transition-colors">
          <ShareIcon className="h-6 w-6" />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="p-4 space-y-4">
          {/* Comment Input */}
          <form onSubmit={handleSubmitComment} className="flex gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={currentUser?.avatar || "/default-avatar.png"}
                alt="Your avatar"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex items-center gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-[#333333] rounded-full px-4 py-2 text-[#C0C0C0] placeholder-[#C0C0C0]/60 focus:outline-none focus:ring-2 focus:ring-[#4169E1]"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="px-4 py-2 bg-[#4169E1] text-white rounded-full hover:bg-[#4169E1]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </form>

          {/* Demo Comments */}
          <div className="space-y-4">
            {[1, 2].map((_, i) => (
              <div key={i} className="flex gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                    alt="Commenter avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-[#333333] rounded-2xl p-3">
                    <p className="font-semibold text-sm text-[#C0C0C0]">
                      Demo User {i + 1}
                    </p>
                    <p className="text-sm text-[#C0C0C0]/80">
                      This is a demo comment! Great post! 👍
                    </p>
                  </div>
                  <div className="flex gap-4 mt-1 ml-3 text-xs text-[#C0C0C0]/60">
                    <button className="hover:text-[#4169E1]">Like</button>
                    <button className="hover:text-[#4169E1]">Reply</button>
                    <span>2h</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
