import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://mongodb-user:mongodb-user%40123@nextjs.xkwqfnx.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
}

export default connectToDatabase;
