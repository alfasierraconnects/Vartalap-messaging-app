import { Account, Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("662bc95d00311d272bdb");

export const account = new Account(client);
export const databases = new Databases(client);

export default client;
