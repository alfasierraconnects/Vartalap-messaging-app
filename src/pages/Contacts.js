import React, { useEffect } from "react";
import { useDatabase } from "../appwrite/databaseContext";
import ContactCard from "../components/ContactCard";
import { useAuth } from "../appwrite/authContext";

const Contacts = () => {
  const { fetchContacts, contacts } = useDatabase();
  const { user } = useAuth();

  useEffect(() => {
    fetchContacts(user.userId);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 min-h-screen">
      <h1 className="pt-24 py-10 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        {contacts.length > 0
          ? "Select a contact to start messaging..."
          : "No contacts found!"}
      </h1>
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-5 sm:justify-evenly pt-0 p-10 lg:px-12 xl:px-36 mx-auto">
        {contacts.map((user) => (
          <ContactCard key={user.userId} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
