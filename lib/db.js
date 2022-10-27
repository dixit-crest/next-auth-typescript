import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.REACT_APP_DB_URI);
  return client;
}

export default connectToDatabase;
