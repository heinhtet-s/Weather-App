import React from "react";

const SkeletonLoading = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="flex flex-col items-center w-full h-full">
        <div className="flex-row items-center justify-center w-full h-full animate-pulse rounded-xl ">
          <div className="w-full h-full bg-gray-300 rounded-md "></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
