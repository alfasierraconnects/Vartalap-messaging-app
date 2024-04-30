import React, { createContext, useContext, useState } from "react";
import client, { databases } from "./appwriteConfig";
import { ID, Query } from "appwrite";
import { toast } from "react-toastify";

const DatabaseContext = createContext();
export const useDatabase = () => useContext(DatabaseContext);

const DatabaseContextProvider = (props) => {
  const DATABASE_ID = "662d39980009d1541b53";
  const USERS_COLLECTION_ID = "662d39a40019c743e5cf";
  const MESSAGES_COLLECTION_ID = "662d39b9001d3685a83d";
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState([]);

  /*-----------------------------Subscribing to realtime events---------------------------------------------------- */
  const subscribeRealTime = () => {
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${MESSAGES_COLLECTION_ID}.documents`,
      (response) => {
        // console.log(response);
        // Handle create event
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          // console.log(response.payload);
          setMessages((prevMessages) => [response.payload, ...prevMessages]);
        }

        // Handle delete event
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          // console.log(response.payload);
          // console.log(messageId);
          const messageId = response.payload.$id;
          setMessages((prevMessages) =>
            prevMessages.filter((message) => message.$id !== messageId)
          );
        }
      }
    );

    return unsubscribe;
  };

  /*-----------------------------fetch all contacts---------------------------------------------------------------- */
  const fetchContacts = () => {
    setLoading(true);
    const promise = databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID);

    promise.then(
      function (response) {
        // console.log(response);
        setContacts(response.documents);
      },
      function (error) {
        // console.log(error);
        toast.error("Unable to fetch Contacts!");
      }
    );
    setLoading(false);
  };

  /*--------------------------------Add a contact------------------------------------------------------------------ */
  const addContact = (userData) => {
    const promise = databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      userData
    );

    promise.then(
      function (response) {
        // console.log(response); // Success
      },
      function (error) {
        // console.log(error); // Failure
        toast.error("Unable to add Contact!");
      }
    );
  };

  /*--------------------------------Get contact details--------------------------------------------------------------- */
  const getContactDetail = (contactUserId) => {
    const promise = databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
      Query.equal("userId", contactUserId),
    ]);

    promise.then(
      function (response) {
        // console.log(response); // Success
        setReceiver(response.documents[0]);
      },
      function (error) {
        // console.log(error); // Failure
        toast.error("Unable to get Contact Details!");
      }
    );
  };
  /*--------------------------------Get all mesaagaes----------------------------------------------------------------- */
  const getMessages = (userId, receiverId) => {
    // console.log(userId, receiverId);
    let promise = databases.listDocuments(DATABASE_ID, MESSAGES_COLLECTION_ID, [
      Query.or([
        Query.and([Query.equal("from", userId), Query.equal("to", receiverId)]),
        Query.and([Query.equal("from", receiverId), Query.equal("to", userId)]),
      ]),
      Query.orderDesc("$createdAt"),
    ]);
    promise.then(
      function (response) {
        // console.log("created new message");
        // console.log(response);
        setMessages(response.documents);
      },
      function (error) {
        // console.log(error);
        toast.error("Error loading Messages!");
      }
    );
  };

  /*--------------------------------Add message document to collection------------------------------------------------ */
  const addMessage = (messageObject) => {
    const promise = databases.createDocument(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      ID.unique(),
      messageObject
    );

    promise.then(
      function (response) {
        // console.log(response);
        // setMessages((prevMessages) => [response, ...prevMessages]);
      },
      function (error) {
        // console.log(error);
        toast.error("Unable to send message!");
      }
    );
  };

  /*------------------------------------Delete message from collection------------------------------------------------ */

  const deleteMessage = (messageId) => {
    const promise = databases.deleteDocument(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      messageId
    );

    promise.then(
      function (response) {
        // console.log(response); // Success
        // setMessages((prevMessages) =>
        //   prevMessages.filter((message) => message.$id !== messageId)
        // );
        toast.success("Message deleted!");
      },
      function (error) {
        // console.log(error); // Failure
        toast.error("Unable to delete message!");
      }
    );
  };

  const contextValue = {
    subscribeRealTime,
    fetchContacts,
    contacts,
    addContact,
    getContactDetail,
    receiver,
    addMessage,
    getMessages,
    messages,
    setMessages,
    deleteMessage,
  };

  return (
    <DatabaseContext.Provider value={contextValue}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-6 py-2 text-xl font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            loading...
          </div>
        </div>
      ) : (
        props.children
      )}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContextProvider;
