import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../appwrite/authContext";
import { PiChatsBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 sm:py-4 sm:px-10">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <PiChatsBold className="text-white text-3xl" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Vartalap
          </span>
        </div>

        {!user && (
          <button
            type="button"
            className="inline-flex items-center p-2 justify-center text-md text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        )}

        {/* User Menu Dropdown */}
        {user && (
          <>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center w-12 h-12 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="user-dropdown"
              aria-expanded={isDropdownOpen}
              onClick={toggleDropdown}
            >
              <FaRegUserCircle className="text-3xl" />
            </button>
            <div
              ref={dropdownRef}
              className={`z-50 ${
                isDropdownOpen ? "block" : "hidden"
              } absolute -top-3 right-1 sm:-top-1 sm:right-9 my-4 overflow-hidden text-base bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
              id="user-dropdown"
            >
              <div className="px-4 py-3 relative">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user.name}
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  {user.email}
                </span>
                <button
                  onClick={toggleDropdown}
                  className="text-lg p-2 absolute top-0 right-0"
                >
                  <IoCloseSharp />
                </button>
              </div>

              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                onClick={() => {
                  logout();
                  toggleDropdown();
                }}
              >
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
