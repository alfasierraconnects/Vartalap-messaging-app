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

  const sendMessage = () => {
    const currentDate = new Date();
    const messageObject = {
      message: message,
      from: user.$id,
      to: receiverId,
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
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
      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
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
          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message..."
        ></textarea>
        <button
          type="button"
          onClick={sendMessage}
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        >
          <IoSend size="1.5rem" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
