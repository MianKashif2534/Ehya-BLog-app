//ProfilePage.jsx
import React, { useEffect } from "react";
import Mainlayout from "../../components/Mainlayout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector ,  } from "react-redux";
import { useQuery , useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../../services/index/users";
import ProfilePictures from "../../components/ProfilePictures";
import { userActions } from "../../store/reducers/userReducer";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);

  const {
    data: profileData,
    isLoading: profileLoading,

  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
  });

  const { mutate, isLoading : profilePictureUploading} = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password },
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"])
      toast.success("Profile is Updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const {
    register, // Function to register input fields
    handleSubmit, // Function to handle form submission
    formState: { errors, isValid }, // Form state with errors and isValid properties
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: {
      name: profileLoading ? "" : profileData.name,
      email: profileLoading ? "" : profileData.email,
    },
    mode: "onChange", // "onChange" mode validates on input change
  });
  const submithandler = (data) => {
    const {name , email ,password} = data
    mutate({name , email ,password})
  };
  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

//  console.log("profileData",profileData)

  return (
    <Mainlayout>
      <section className="container mx-auto px-5 py-10 ">
        <div className="w-full max-w-sm mx-auto">
          <ProfilePictures avatar={profileData?.avatar} />
          <form className="" action="" onSubmit={handleSubmit(submithandler)}>

            <div className="flex flex-col mx-auto mb-6 text-sm">
              <label
                htmlFor="name"
                className="block text-[#5a7184] font-semibold mb-1"
              >
                Name
              </label>
              <input
                className={`block outline-none text-dark-hard border ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                } border-[#c3cad9] px-5 py-3 rounded-lg placeholder:text-[#c6c8cc]`}
                id="name"
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "Name length should be atleast 1 character",
                  },
                  required: {
                    value: true,
                    message: "*name is required",
                  },
                })}
                type="text"
                placeholder="Enter name"
              />
              {errors.name?.message && (
                <p className=" text-red-500 text-xs">{errors.name?.message}</p>
              )}
            </div>

            <div className="flex flex-col mx-auto mb-6  text-sm">
              <label
                htmlFor="email"
                className="block text-[#5a7184] font-semibold mb-1"
              >
                Email address
              </label>
              <input
                className={`block outline-none text-dark-hard border ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                } px-5 py-3 rounded-lg placeholder:text-[#c6c8cc]`}
                id="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "*email is required",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                })}
                type="email"
                placeholder="Enter email"
              />
              {errors.email?.message && (
                <p className=" text-red-500 text-xs">{errors.email?.message}</p>
              )}
            </div>

            <div className="flex flex-col mx-auto mb-6  text-sm">
              <label
                htmlFor="password"
                className="block text-[#5a7184] font-semibold mb-1"
              >
                New Password (Optional)
              </label>
              <input
                className={`block outline-none text-dark-hard  border ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                } px-5 py-3 rounded-lg placeholder:text-[#c6c8cc]`}
                id="password"
                {...register("password")}
                type="password"
                autoComplete="off"
                placeholder="Enter new password"
              />
              {errors.password?.message && (
                <p className=" text-red-500 text-xs">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-primary text-white rounded-lg w-full border font-bold px-5 py-3 mb-6 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={!isValid || profileLoading || profilePictureUploading}
            >
              Update
            </button>
          </form>
        </div>
      </section>
    </Mainlayout>
  );
}

export default ProfilePage;
