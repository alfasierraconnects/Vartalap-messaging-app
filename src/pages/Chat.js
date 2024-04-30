import React, { useEffect } from "react";
import ChatInput from "../components/ChatInput";
import ChatBubble from "../components/ChatBubble";
import { useDatabase } from "../appwrite/databaseContext";
import { useParams } from "react-router-dom";
import { useAuth } from "../appwrite/authContext";

const Chat = () => {
  const { user } = useAuth();
  const {
    getMessages,
    messages,
    getContactDetail,
    receiver,
    subscribeRealTime,
  } = useDatabase();

  const { receiverId } = useParams();
  useEffect(() => {
    getMessages(user.$id, receiverId);
    getContactDetail(receiverId);
    const unsubscribe = subscribeRealTime(); // Subscribe to real-time updates

    return () => {
      unsubscribe(); // Unsubscribe from real-time updates when component unmounts
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="h-screen bg-gray-800">
      <div className="flex flex-col-reverse gap-4 h-full pt-20 p-2 px-4 lg:px-24 xl:px-36 mx-auto overflow-y-scroll ">
        <ChatInput />
        {messages.map((message) => (
          <ChatBubble key={message.$id} message={message} receiver={receiver} />
        ))}
      </div>
    </div>
  );
};

export default Chat;
