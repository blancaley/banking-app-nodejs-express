import express from "express";
import { MongoClient } from "mongodb";
import session from "express-session";

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
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret',
  cookie: {
    maxAge: 5 * 60 * 1000 // 5 minutes
  }
 }));

// Authentication
// Route to create a new user
app.post("/api/register", async (req, res) => {
  await usersCollection.insertOne(req.body);

  res.json({
    success: true,
    username: req.body.username
  })
})

app.post("/api/login", async (req, res) => {
  // Check if user exists in database
  const foundUser = await usersCollection.findOne({ 
    username: req.body.username,
    password: req.body.password
  })

  if(foundUser) {
    // Save username in session cookie
    req.session.username = foundUser.username;
    res.json({
      username: foundUser.username
    });
  } else {
    // Return an error code and message
    res.status(401).json({ error: "Unauthorized" });
  }
})

// Bank account logic
// Route to create a new account

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})