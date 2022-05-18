import express from "express";

const port = 3000;
const app = express();

// Connect to database
const client = new MongoClient("mongodb://127.0.0.1:27017");
await client.connect();
const db = client.db("bankingapp");
const usersCollection = db.collection("users");
const accountsCollection = db.collection("accounts");

// Middlewares
app.use(express.json());
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})