"use client";
import { useEffect } from "react";
export default function Error({
  error,
  reset,
}: {
  error: any;
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <h2 className="text-2xl text-black">Something went wrong!</h2>
    </div>
  );
}
