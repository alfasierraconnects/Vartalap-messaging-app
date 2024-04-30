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

  // Extract unique dates from messages
  const uniqueDates = Array.from(
    new Set(messages.map((message) => message.date))
  );

  return (
    <div className="h-screen bg-gray-800">
      <div className="flex flex-col-reverse gap-4 h-full pt-20 p-2 px-4 lg:px-24 xl:px-36 mx-auto overflow-y-scroll ">
        <ChatInput />
        {uniqueDates.map((date) => (
          <React.Fragment key={date}>
            {messages
              .filter((message) => message.date === date)
              .map((filteredMessage) => (
                <ChatBubble
                  key={filteredMessage.$id}
                  message={filteredMessage}
                  receiver={receiver}
                />
              ))}
            <div className="text-gray-400 text-center">{date}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Chat;
