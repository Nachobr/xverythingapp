"use client";

export function Feed({ activeTab }: { activeTab: "forYou" | "following" }) {
  const posts = [
    {
      id: 1,
      username: "user1",
      handle: "@user1",
      content: "This is a post from the For You tab.",
      timestamp: "2h",
    },
    {
      id: 2,
      username: "user2",
      handle: "@user2",
      content: "This is a post from the Following tab.",
      timestamp: "3h",
    },
  ];

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="p-4 border-b border-gray-800">
          <div className="flex space-x-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
            <div>
              <div className="font-bold">{post.username}</div>
              <div className="text-gray-500">{post.handle}</div>
              <div className="mt-2">{post.content}</div>
              <div className="text-gray-500 text-sm mt-2">{post.timestamp}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}