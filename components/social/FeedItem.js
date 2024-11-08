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
  FlagIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import { formatDistanceToNow } from "date-fns";

export default function FeedItem({ item, onLike, onComment, currentUser }) {
  const { supabase } = useSupabase();
  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(item.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");

  useEffect(() => {
    checkIfPostIsSaved();
    checkIfPostIsLiked();
  }, [item.id]);

  // Check if post is saved
  const checkIfPostIsSaved = async () => {
    const { data } = await supabase
      .from("saved_posts")
      .select("id")
      .eq("post_id", item.id)
      .eq("user_id", currentUser.id)
      .single();

    setIsSaved(!!data);
  };

  // Check if post is liked
  const checkIfPostIsLiked = async () => {
    const { data } = await supabase
      .from("post_likes")
      .select("id")
      .eq("post_id", item.id)
      .eq("user_id", currentUser.id)
      .single();

    setIsLiked(!!data);
  };

  // Handle like
  const handleLike = async () => {
    try {
      if (isLiked) {
        // Unlike
        await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", item.id)
          .eq("user_id", currentUser.id);

        setLikes((prev) => prev - 1);
      } else {
        // Like
        await supabase.from("post_likes").insert({
          post_id: item.id,
          user_id: currentUser.id,
        });

        setLikes((prev) => prev + 1);
      }

      setIsLiked(!isLiked);
      onLike?.(item.id);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  // Handle save post
  const handleSavePost = async () => {
    try {
      if (isSaved) {
        await supabase
          .from("saved_posts")
          .delete()
          .eq("post_id", item.id)
          .eq("user_id", currentUser.id);
      } else {
        await supabase.from("saved_posts").insert({
          post_id: item.id,
          user_id: currentUser.id,
        });
      }

      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const { data: comments, error } = await supabase
        .from("post_comments")
        .select(
          `
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url
          )
        `
        )
        .eq("post_id", item.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const { data: newComment, error } = await supabase
        .from("post_comments")
        .insert({
          post_id: item.id,
          user_id: currentUser.id,
          content: commentText,
        })
        .select(
          `
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url
          )
        `
        )
        .single();

      if (error) throw error;

      setComments([newComment, ...comments]);
      setCommentText("");
      onComment?.(item.id, commentText);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Handle share
  const handleShare = async (platform) => {
    const shareUrl = `${window.location.origin}/post/${item.id}`;

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`);
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
        break;
      case "copy":
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
        break;
    }

    setShowShareModal(false);
  };

  // Handle report
  const handleReport = async () => {
    try {
      await supabase.from("post_reports").insert({
        post_id: item.id,
        user_id: currentUser.id,
        reason: reportReason,
      });

      alert("Thank you for your report. We will review it shortly.");
      setShowReportModal(false);
      setReportReason("");
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };

  // Load comments when comment section is opened
  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

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
        {item.content && (
          <p className="text-[#C0C0C0] mb-4 whitespace-pre-line text-[15px] leading-relaxed">
            {item.content}
          </p>
        )}
      </div>

      {renderMediaContent()}

      {/* Engagement Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-sm text-[#C0C0C0]/60 border-b border-[#333333]">
        <div className="flex items-center gap-2">
          {likes > 0 && (
            <div className="flex -space-x-1">
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                ❤️
              </div>
              {likes > 1 && (
                <div className="w-5 h-5 rounded-full bg-[#4169E1] flex items-center justify-center">
                  👍
                </div>
              )}
            </div>
          )}
          <span>{likes} likes</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setShowComments(!showComments)}>
            {comments.length} comments
          </button>
          <button onClick={() => setShowShareModal(true)}>Share</button>
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
        <button
          onClick={() => setShowShareModal(true)}
          className="flex-1 flex items-center justify-center gap-2 py-2 text-[#C0C0C0]/60 rounded-lg hover:bg-[#333333] transition-colors"
        >
          <ShareIcon className="h-6 w-6" />
          <span>Share</span>
        </button>
        <button
          onClick={handleSavePost}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-[#333333] transition-colors ${
            isSaved ? "text-[#FFD700]" : "text-[#C0C0C0]/60"
          }`}
        >
          {isSaved ? (
            <BookmarkSolidIcon className="h-6 w-6" />
          ) : (
            <BookmarkIcon className="h-6 w-6" />
          )}
          <span>Save</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="p-4 space-y-4">
          <form onSubmit={handleSubmitComment} className="flex gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={currentUser?.avatar_url || "/default-avatar.png"}
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

          {/* Comments List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center text-[#C0C0C0]/60">
                Loading comments...
              </div>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={comment.profiles.avatar_url || "/default-avatar.png"}
                      alt={`${comment.profiles.username}'s avatar`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#333333] rounded-2xl p-3">
                      <p className="font-semibold text-sm text-[#C0C0C0]">
                        {comment.profiles.full_name}
                      </p>
                      <p className="text-sm text-[#C0C0C0]/80">
                        {comment.content}
                      </p>
                    </div>
                    <div className="flex gap-4 mt-1 ml-3 text-xs text-[#C0C0C0]/60">
                      <button className="hover:text-[#4169E1]">Like</button>
                      <button className="hover:text-[#4169E1]">Reply</button>
                      <span>
                        {formatDistanceToNow(new Date(comment.created_at))} ago
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-[#C0C0C0]/60">
                No comments yet
              </div>
            )}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#C0C0C0] mb-4">
              Share Post
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => handleShare("twitter")}
                className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-[#333333] transition-colors text-[#C0C0C0]"
              >
                Share on Twitter
              </button>
              <button
                onClick={() => handleShare("facebook")}
                className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-[#333333] transition-colors text-[#C0C0C0]"
              >
                Share on Facebook
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-[#333333] transition-colors text-[#C0C0C0]"
              >
                Copy Link
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="mt-4 w-full p-3 bg-[#333333] rounded-lg text-[#C0C0C0] hover:bg-[#333333]/80"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#C0C0C0] mb-4">
              Report Post
            </h3>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Why are you reporting this post?"
              className="w-full h-32 bg-[#333333] rounded-lg px-4 py-2 text-[#C0C0C0] placeholder-[#C0C0C0]/60 focus:outline-none focus:ring-2 focus:ring-[#4169E1] resize-none mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={handleReport}
                disabled={!reportReason.trim()}
                className="flex-1 p-3 bg-red-500 rounded-lg text-white hover:bg-red-600 disabled:opacity-50"
              >
                Submit Report
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 p-3 bg-[#333333] rounded-lg text-[#C0C0C0] hover:bg-[#333333]/80"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
