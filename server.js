import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import session from "express-session";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

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
  // Encrypt password
  const saltRounds = 5;
  const hash = await bcrypt.hash(req.body.password, saltRounds);

  await usersCollection.insertOne({
    ...req.body,
    password: hash
  });

  res.json({
    success: true,
    username: req.body.username
  })
})

// Route to log in
app.post("/api/login", async (req, res) => {
  // Check if user exists in database
  const foundUser = await usersCollection.findOne({ 
    username: req.body.username
  });

  // Check a password - compare with saved hash
  const passMatches = await bcrypt.compare(req.body.password, foundUser.password);

  if (passMatches) {
    // Save username in session cookie
    req.session.username = foundUser.username;
    res.json({
      username: foundUser.username
    });
  } else {
    // Return an error code and message
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Route to logout
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({
      loggedin: false
    });
  });
});

// Bank account logic
// Route to create a new account
app.post("/api/users/:id/account", async (req, res) => {
  // Create unique ID
  const accountID = uuidv4();
  // Create new account
  const account = await accountsCollection.insertOne({
    _id: accountID,
    ...req.body
  });

  // Connect account to user by adding account ID in array
  await usersCollection.updateOne(
    {_id: ObjectId(req.params.id)}, 
    {$push: { "accounts": accountID}
  })

  // For responding with user and new account info
  const user = await usersCollection.findOne({_id: ObjectId(req.params.id)});
  const insertedAccount = await accountsCollection.findOne({_id: account.insertedId});
  
  res.json({ accountCreated: true });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})