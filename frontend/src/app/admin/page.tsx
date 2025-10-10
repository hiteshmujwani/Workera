"use client";

import { useSelector } from "react-redux";

export default function Dashboard() {
  const {
    data: user,
    loading,
    error,
  } = useSelector((state: any) => state.user);

  return (
    <>
      <div>{user && user.user.firstName}</div>
    </>
  );
}
