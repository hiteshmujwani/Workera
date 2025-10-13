"use client";

import { useSelector } from "react-redux";

export default function Dashboard() {
  const { data: user } = useSelector((state: any) => state.user);

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-white flex justify-center items-center flex-col gap-4">
      <div className="!text-5xl !font-bold text-black">Admin Dashboard</div>
      <div className="text-black !text-2xl">
        Hey 👋 Welcome Admin, {user && user.user.firstName}
      </div>
    </div>
  );
}
