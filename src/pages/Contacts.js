import React from "react";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center pt-20 px-6 py-8 mx-auto h-screen">
        <div className="flex flex-col gap-2 items-center p-6 w-full max-w-sm border border-gray-200 rounded-lg shadow bg-white  dark:bg-gray-800 dark:border-gray-700">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Bonnie Green
          </h5>

          <button
            onClick={() => {
              navigate("/chat");
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
