"use client";

import { Api } from "@/apiClient/ApiClient";
import { LOGOUT_USER } from "@/constant/constant";
import { fetchUser, logout } from "@/redux/userSlice";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const { data, loading, error } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const response = await Api.post(LOGOUT_USER);
      console.log(response);
      if (response.status == 200) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error, "error in logout on client side");
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-white flex justify-center items-center flex-col gap-4">
        <div className="!text-5xl !font-bold text-black">User Dashboard</div>
        <div className="text-black !text-2xl">
          Hey 👋 Welcome, {data && data.user.firstName}
        </div>
        <Button
          variant={"solid"}
          bg={"black"}
          color={"white"}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </>
  );
}
