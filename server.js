import express from "express";
import { MongoClient } from "mongodb";

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

// Authentication
// Route to create a new user
app.post("/api/register", async (req, res) => {
  await usersCollection.insertOne(req.body);

  res.json({
    success: true,
    username: req.body.username
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})