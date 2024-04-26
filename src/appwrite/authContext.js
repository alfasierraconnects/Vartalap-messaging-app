import React, { createContext, useContext, useEffect, useState } from "react";
import { account } from "./appwriteConfig";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
      },
      function (error) {
        console.log(error); // Failure
      }
    );
    setLoading(false);
  };

  const userContext = { user, login };

  return (
    <AuthContext.Provider value={userContext}>
      {loading ? (
        <div class="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
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