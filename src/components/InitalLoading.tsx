import React from "react";
import SkeletonLoading from "./SkeletonLoading";

const InitalLoading = () => {
  return (
    <div className="flex flex-wrap p-2 text-gray-700 lg:p-4 ">
      <div className="flex flex-col w-full h-screen overflow-hidden lg:w-2/3">
        <SkeletonLoading className="w-full h-16 " />
        <SkeletonLoading className="w-full h-full mt-2" />
      </div>
      <SkeletonLoading className="w-full h-screen pt-0 pl-4 pr-0 overflow-y-auto lg:w-1/3" />
    </div>
  );
};

export default InitalLoading;
