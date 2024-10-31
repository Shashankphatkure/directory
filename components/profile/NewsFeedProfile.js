import FeedItem from "../social/FeedItem";

export default function NewsFeedProfile({ username }) {
  // Mock data - replace with real data later
  const feedItems = [
    {
      id: 1,
      type: "post",
      user: {
        name: username,
        avatar: "/avatars/default.jpg",
      },
      content:
        "Just added a new piece to my collection! Check out this beautiful Morgan Dollar.",
      image: "/posts/morgan-dollar.jpg",
      likes: 32,
      comments: 8,
      timestamp: "3h ago",
    },
    {
      id: 2,
      type: "achievement",
      user: {
        name: username,
        avatar: "/avatars/default.jpg",
      },
      achievement: "Gold Status",
      description: "Completed 50 successful transactions!",
      timestamp: "1d ago",
    },
    // Add more mock items...
  ];

  return (
    <div className="space-y-6">
      {feedItems.map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}
    </div>
  );
}
