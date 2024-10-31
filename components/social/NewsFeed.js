import FeedItem from "./FeedItem";

export default function NewsFeed() {
  const feedItems = [
    {
      id: 1,
      type: "post",
      user: {
        name: "John Doe",
        avatar: "/avatars/john.jpg",
      },
      content:
        "Just added a beautiful 1oz Gold Buffalo to my collection! Check it out!",
      image: "/posts/gold-buffalo.jpg",
      likes: 42,
      comments: 12,
      timestamp: "2h ago",
    },
    {
      id: 2,
      type: "achievement",
      user: {
        name: "Sarah Smith",
        avatar: "/avatars/sarah.jpg",
      },
      achievement: "Silver Seller",
      description: "Completed 10 successful sales!",
      timestamp: "4h ago",
    },
    // Add more mock items...
  ];

  return (
    <div className="space-y-4">
      {feedItems.map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}
    </div>
  );
}
