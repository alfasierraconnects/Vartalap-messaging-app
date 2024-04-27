import React from "react";
import ChatInput from "../components/ChatInput";
import ChatBubble from "../components/ChatBubble";

const Homepage = () => {
  return (
    <div className="flex flex-col-reverse gap-4 py-4 px-10 w-[66%] mx-auto h-screen bg-gray-800">
      <ChatInput />
      <ChatBubble />
      <ChatBubble />
    </div>
  );
};

export default Homepage;
