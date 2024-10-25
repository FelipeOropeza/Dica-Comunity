import React from "react";

function CardSkeleton() {
  return (
    <div className="animate-pulse p-4 bg-gray-300 rounded-lg shadow-md w-full max-w-2xl h-40 flex flex-col gap-2">
      <div className="h-6 bg-gray-400 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-400 rounded w-5/6"></div>
      <div className="h-4 bg-gray-400 rounded w-4/6"></div>
    </div>
  );
}

export default CardSkeleton;
