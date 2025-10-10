"use client";

import { fetchUser } from "@/redux/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UserInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return null;
}
