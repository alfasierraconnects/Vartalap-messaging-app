import React, { createContext, useContext, useEffect, useState } from "react";
import { account } from "./appwriteConfig";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import { useDatabase } from "./databaseContext";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addContact } = useDatabase();

  /*-----------------------------persisiting userlogin---------------------------------------------------------------- */

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    setLoading(true);
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      // console.log(error);
    }
    setLoading(false);
  };

  /*--------------------------------------login User---------------------------------------------------------------- */

  const login = (loginData) => {
    // console.log(loginData.email);
    // console.log(loginData.password);
    setLoading(true);
    const promise = account.createEmailPasswordSession(
      loginData.email,
      loginData.password
    );

    promise.then(
      function (response) {
        console.log(response); // Success
        setUser(response);
        navigate("/contacts");
      },
      function (error) {
        console.log(error); // Failure
      }
    );
    setLoading(false);
  };

  /*---------------------------------------logout user---------------------------------------------------------------- */
  const logout = () => {
    const promise = account.deleteSession("current");

    promise.then(
      function (response) {
        // console.log(response);
        navigate("/");
        setUser(null);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  /*-----------------------------------------signup user---------------------------------------------------------------- */

  const signup = (signupData) => {
    const promise = account.create(
      ID.unique(),
      signupData.email,
      signupData.password1,
      signupData.name
    );

    promise.then(
      function (response) {
        console.log(response); // Success
        addContact({ userId: response.$id, userName: response.name });
        login({ email: signupData.email, password: signupData.password1 });
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  /*-----------------------------------------context value---------------------------------------------------------------- */

  const contextValue = { user, login, signup, logout };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-6 py-2 text-xl font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            loading...
          </div>
        </div>
      ) : (
        props.children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
