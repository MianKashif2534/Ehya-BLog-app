//registerUser

import React, { useEffect } from "react";
import Mainlayout from "../../components/Mainlayout";
import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/index/users";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducer";


function RegisterUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userState = useSelector(state => state.user)
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const {
    register, // Function to register input fields
    handleSubmit, // Function to handle form submission
    formState: { errors, isValid }, // Form state with errors and isValid properties
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    mode: "onChange", // "onChange" mode validates on input change
  });
  const password = watch("password");
  const submithandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };
  useEffect(() => {
  if(userState.userInfo){
    navigate('/')
  }
  }, [navigate,userState.userInfo])
  return (
    <Mainlayout>
      <section className="container mx-auto px-5 py-10 ">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-3xl text-center font-bold text-dark-hard mb-8">
            Sign up
          </h1>
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
                Password
              </label>
              <input
                className={`block outline-none text-dark-hard  border ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                } px-5 py-3 rounded-lg placeholder:text-[#c6c8cc]`}
                id="password"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "*password length should be atleast 8 character",
                  },
                  required: {
                    value: true,
                    message: "*password is required",
                  },
                })}
                type="password"
                autoComplete="off"
                placeholder="Enter password"
              />
              {errors.password?.message && (
                <p className=" text-red-500 text-xs">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col mx-auto mb-6  text-sm">
              <label
                htmlFor="password"
                className="block text-[#5a7184] font-semibold mb-1"
              >
                Confirm password
              </label>
              <input
                className={`block outline-none text-dark-hard  border ${
                  errors.confirmpassword ? "border-red-500" : "border-[#c3cad9]"
                } px-5 py-3 rounded-lg placeholder:text-[#c6c8cc]`}
                autoComplete="off"
                id="confirmpassword"
                {...register("confirmpassword", {
                  minLength: {
                    value: 8,
                    message: "*password length should be atleast 8 character",
                  },
                  required: {
                    value: true,
                    message: "*password is required",
                  },
                  validate: (value) => {
                    if (value !== password) {
                      return "password do not match";
                    }
                  },
                })}
                type="password"
                placeholder="Enter confirm password"
              />
              {errors.confirmpassword?.message && (
                <p className=" text-red-500 text-xs">
                  {errors.confirmpassword?.message}
                </p>
              )}
            </div>
           
            <button
              type="submit"
              className="bg-primary text-white rounded-lg w-full border font-bold px-5 py-3 mb-6 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={!isValid || isLoading}
            >
              Register
            </button>
            <p className=" text-xs font-semibold text-[#5a7184]">
              You have an account?{" "}
              <Link
                className="text-primary hover:underline font-bold font-roboto"
                to="/login"
               >
                Login now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </Mainlayout>
  );
}

export default RegisterUser;
