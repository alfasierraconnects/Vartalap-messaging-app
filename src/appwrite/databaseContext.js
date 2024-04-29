import React, { createContext, useContext, useState } from "react";
import { databases } from "./appwriteConfig";
import { ID, Query } from "appwrite";

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

  /*-----------------------------fetch all contacts---------------------------------------------------------------- */
  const fetchContacts = (userId) => {
    setLoading(true);
    const promise = databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID);

    promise.then(
      function (response) {
        // console.log(response);
        // console.log(response.documents);
        setContacts(
          response.documents.filter((user) => user.userId !== userId)
        );
      },
      function (error) {
        console.log(error);
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
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
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
        console.log(error); // Failure
      }
    );
  };
  /*--------------------------------Get all mesaagaes----------------------------------------------------------------- */
  const getMessages = () => {
    let promise = databases.listDocuments(DATABASE_ID, MESSAGES_COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
    ]);

    promise.then(
      function (response) {
        // console.log("created new message");
        // console.log(response);
        setMessages(response.documents);
      },
      function (error) {
        console.log(error);
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
        setMessages((prevMessages) => [response, ...prevMessages]);
      },
      function (error) {
        console.log(error);
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
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.$id !== messageId)
        );
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const contextValue = {
    fetchContacts,
    contacts,
    addContact,
    getContactDetail,
    receiver,
    addMessage,
    getMessages,
    messages,
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
