import React, { useState, useEffect } from "react";
import { useAuth } from "../appwrite/authContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { signup, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/contacts");
    }
    // eslint-disable-next-line
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignupData({ ...signupData, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Trim the input values
    const trimmedName = signupData.name.trim();
    const trimmedEmail = signupData.email.trim();
    const trimmedPassword1 = signupData.password1.trim();
    const trimmedPassword2 = signupData.password2.trim();

    // Check if any of the required fields are empty or passwords don't match
    if (
      trimmedName === "" ||
      trimmedEmail === "" ||
      trimmedPassword1 === "" ||
      trimmedPassword1.length < 8 ||
      trimmedPassword2 === "" ||
      trimmedPassword1 !== trimmedPassword2
    ) {
      // Provide validation messages to the user
      if (trimmedName === "") {
        toast.error("Name is required");
      }
      if (trimmedEmail === "") {
        toast.error("Email is required");
      }
      if (trimmedPassword1 === "") {
        toast.error("Password is required");
      }
      if (trimmedPassword1.length < 8) {
        toast.error("Password should be of atleast 8 characters");
      }
      if (trimmedPassword2 === "") {
        toast.error("Confirm password is required");
      }
      if (trimmedPassword1 !== trimmedPassword2) {
        toast.error("Passwords do not match");
      }
    } else {
      // If validation passes, call the signup function
      signup(signupData);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center pt-20 px-6 py-8 mx-auto h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Register new account
            </h1>

            <form onSubmit={onSubmitHandler} className="max-w-sm mx-auto">
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  onChange={onChangeHandler}
                  type="name"
                  id="name"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Firstname Lastname"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={onChangeHandler}
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="name@email.com"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={onChangeHandler}
                  type="password"
                  name="password1"
                  id="password1"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                  required=""
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Repeat Password
                </label>
                <input
                  onChange={onChangeHandler}
                  type="password"
                  name="password2"
                  id="password2"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                  required=""
                />
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  I agree with the{" "}
                  <a
                    href="/"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    terms and conditions
                  </a>
                </label>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Register new account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-2"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
