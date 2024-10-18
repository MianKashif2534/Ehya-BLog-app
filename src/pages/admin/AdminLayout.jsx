import React from "react";
import Header from "./components/header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getUserProfile } from "../../services/index/users";
import { Bars } from "react-loader-spinner";

function AdminLayout() {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    onSuccess: (data) => {
      if (!data?.admin) {
        navigate("/");
        toast.error("You are not allowed to access admin panel");
      }
    },
    onError: (err) => {
      console.log(err);
      navigate("/");
      toast.error("You are not allowed to access admin panel");
    },
  });

  if (profileLoading) {
    return (
      <div className="w-full h-screen  flex justify-center items-center">
        <Bars
          height="50"
          width="50"
          color="#9ca3af"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass="flex justify-center item-center"
          visible={true}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Header />
      <main className="bg-[#f9f9f9] flex-1 p-4 lg:p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
