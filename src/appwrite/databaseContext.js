import React, { createContext, useContext, useState } from "react";
import { databases } from "./appwriteConfig";
import { ID } from "appwrite";

const DatabaseContext = createContext();
export const useDatabase = () => useContext(DatabaseContext);

const DatabaseContextProvider = (props) => {
  const DATABASE_ID = "662d39980009d1541b53";
  const USERS_COLLECTION_ID = "662d39a40019c743e5cf";
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const contextValue = { fetchContacts, contacts, addContact };

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
