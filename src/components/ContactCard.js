import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const ContactCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 items-center p-6 w-[300px] border-2 border-gray-200 rounded-lg shadow bg-white dark:bg-gray-800 dark:border-gray-700">
      <FaRegUserCircle className="w-24 h-24 mb-3 rounded-full shadow-lg" />
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {user.userName}
      </h5>

      <button
        onClick={() => {
          navigate(`/chat/${user.userId}`);
        }}
        className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Message
      </button>
    </div>
  );
};

export default ContactCard;
