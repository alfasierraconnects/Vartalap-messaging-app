import React, { useState } from "react";
// import { MdEmojiEmotions } from "react-icons/md";
// import { FaImage } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { useDatabase } from "../appwrite/databaseContext";
import { useAuth } from "../appwrite/authContext";
import { useParams } from "react-router-dom";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { addMessage } = useDatabase();
  const { receiverId } = useParams();

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return new Date(dateString).toLocaleTimeString("en-IN", options);
  };

  const sendMessage = () => {
    const currentDate = new Date();
    const messageObject = {
      message: message,
      from: user.$id,
      to: receiverId,
      date: formatDate(currentDate),
      time: formatTime(currentDate),
    };
    // console.log("Message object:", messageObject);
    addMessage(messageObject);
    setMessage("");
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form>
      <div className="flex items-center py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
        {/* <button
          type="button"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        >
          <FaImage size="1.4rem" />
        </button>
        <button
          type="button"
          className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        >
          <MdEmojiEmotions size="1.5rem" />
        </button> */}
        <textarea
          id="chat"
          rows="1"
          value={message}
          onChange={handleChange}
          className="block mx-4 p-2.5 w-full font-medium text-gray-900 rounded-md outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-600 dark:text-gray-100"
          placeholder="Your message..."
        ></textarea>
        <button
          type="button"
          onClick={sendMessage}
          className="inline-flex justify-center p-2 mr-2 disabled:text-gray-800 disabled:hover:text-gray-800 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          disabled={message.trim() === ""}
        >
          <IoSend size="1.5rem" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
