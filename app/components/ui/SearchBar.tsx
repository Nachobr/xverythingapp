"use client";

export function SearchBar() {
  return (
    <div className="sticky top-0 bg-black bg-opacity-75 backdrop-blur-md z-10">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-900 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          🔍
        </span>
      </div>
    </div>
  );
}