import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useDatabase } from "../appwrite/databaseContext";

const ChatBubble = ({ message, receiver }) => {
  const { deleteMessage } = useDatabase();
  const isReceiver = message.from === receiver.userId;
  // console.log(receiver.userName);
  // console.log(message);

  return (
    <div
      className={`flex ${
        isReceiver ? "flex-row" : "flex-row-reverse"
      } items-start gap-2.5`}
    >
      {/* <img
        className="w-8 h-8 rounded-full border-2 bg-gray-700"
        src=""
        alt=""
      /> */}
      <FaRegUserCircle className="w-8 h-8 rounded-full p-0.5 bg-gray-700" />
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {isReceiver ? receiver.userName : "Me"}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {message.time}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {message.message}
        </p>
        {!isReceiver && (
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Delivered
          </span>
        )}
      </div>
      {!isReceiver && (
        <button
          onClick={() => deleteMessage(message.$id)}
          className="inline-flex self-center p-2 text-sm hover:text-lg text-center bg-white rounded-lg hover:bg-gray-100 dark:text-white dark:bg-blue-900 dark:hover:bg-blue-800"
        >
          <MdDeleteOutline />
        </button>
      )}
    </div>
  );
};

export default ChatBubble;
