"use client";

export function PostField() {
  return (
    <div className="p-4 border-b border-gray-800">
      <div className="flex space-x-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
        <textarea
          placeholder="What's happening?"
          className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none"
          rows={3}
        />
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-colors">
          Post
        </button>
      </div>
    </div>
  );
}