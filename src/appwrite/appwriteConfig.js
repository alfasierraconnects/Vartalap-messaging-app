import { Account, Client } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("662bc95d00311d272bdb");

export const account = new Account(client);

export default client;
