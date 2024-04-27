import React, { createContext, useContext, useEffect, useState } from "react";
import { account } from "./appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      // console.log(error);
    }
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

  const signup = (signupData) => {
    // console.log(signupData.email, signupData.password1, signupData.phoneNumber);
    const promise = account.create(
      ID.unique(),
      signupData.email,
      signupData.password1,
      signupData.phoneNumber
    );

    promise.then(
      function (response) {
        console.log(response); // Success
        login({ email: signupData.email, password: signupData.password1 });
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const userContext = { user, login, signup };

  return (
    <AuthContext.Provider value={userContext}>
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
