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

// Custom middleware to check if user is admin.
const allowOnlyAdmin = (req, res, next) => {
  if (req.session.role === "admin") {
    next();
  } else {
    res.status(401).send({ error: "Unauthorized" });
  }
}

// Authentication
// Route to create a new user
app.post("/api/register", async (req, res) => {
  // Encrypt password
  const saltRounds = 5;
  const hash = await bcrypt.hash(req.body.password, saltRounds);

  // Save new user in database
  await usersCollection.insertOne({
    ...req.body,
    password: hash
  });

  // Log in direct by saving username and first name in session cookie
  req.session.username = req.body.username;
  req.session.firstName = req.body.firstName

  res.json({
    success: true,
    username: req.body.username,
    firstName: req.body.firstName
  });
})

// Route to log in
app.post("/api/login", async (req, res) => {
  const user = await usersCollection.findOne({ 
    username: req.body.username
  });
  // Exit if user doesn't exist in database
  if(!user) { 
    // Return an error code and message
    return res.status(404).json({ error: "User was not found." });
  }
  // Check password - compare it with saved hash
  const passMatches = await bcrypt.compare(req.body.password, user?.password);

  if (await passMatches) {
    // Save username, first name and ID in session cookie
    req.session.username = user.username;
    req.session.firstName = user.firstName;
    req.session.userID = user._id.toString();

    res.json({
      username: user.username
    });
  } else {
    // Return an error code and message
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Route to check if user is logged in
app.get("/api/loggedin", async (req, res) => {
  if (!req.session.username) { 
    return res.status(401).json({ error: "Unauthorized" }); 
  }

  res.json({
    username: req.session.username,
    firstName: req.session.firstName,
    userID: req.session.userID
  })
})

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
app.post("/api/users/:id/accounts", async (req, res) => {
  // Create unique ID
  const accountID = uuidv4();
  // Create new account
  const account = await accountsCollection.insertOne({
    ...req.body,
    _id: accountID
  });

  // Connect account to user by adding account ID in array
  await usersCollection.updateOne(
    {_id: ObjectId(req.params.id)}, 
    {$push: { "accounts": accountID}
  })

  // For responding with user and new account info
  const user = await usersCollection.findOne({_id: ObjectId(req.params.id)});
  const insertedAccount = await accountsCollection.findOne({_id: account.insertedId});
  
  res.json({ 
    accountCreated: true,
    account: insertedAccount 
  });
});

// Route to get all bank accounts - t.ex. for admin role
app.get("/api/accounts", allowOnlyAdmin, async (req, res) => {
  const accounts = await accountsCollection.find().toArray();
  res.json(accounts);
})

// Route to get all bank accounts for specific user
app.get("/api/users/:id/accounts", async (req, res) => {
  // Get user
  const user = await usersCollection.findOne(
    { _id: ObjectId(req.params.id) }
  );
  
  // Return error if user doesn't have accounts
  if (!user.accounts || user.accounts.length === 0) {
    return res.json({
      error: "User doesn't have any account."
    })
  }
  // Find each account in accountsCollection database
  const accountPromises = 
    user.accounts.map(accountID => accountsCollection.findOne({ _id: accountID}))
  const accounts = await Promise.all(accountPromises);
  res.json(accounts);
})

// Route to deposit amount
app.post("/api/accounts/:id/deposit", async (req, res) => {
  const amountToAdd = req.body.amount;
  const currentAmount = await accountsCollection.findOne(
    {_id: req.params.id }
  )
  const total = parseInt(currentAmount.amount) + parseInt(amountToAdd);

  await accountsCollection.updateOne(
    {_id: req.params.id},
    { $set: { "amount": total }}
  )
  res.json({
    totalAmount: total,
    success: true
  });
})

// Route to withdraw
app.post("/api/accounts/:id/withdraw", async (req, res) => {
  const amountToWithdraw = req.body.amount;
  const currentAmount = await accountsCollection.findOne(
    {_id: req.params.id }
  )
  const total = currentAmount.amount - amountToWithdraw;
  // Check so it's not possible to withdraw more money than what's in the account
  if (total || total === 0) {
    await accountsCollection.updateOne(
      {_id: req.params.id},
      { $set: { "amount": total }}
    )
    res.json({
      success: true,
      totalAmount: total
    });
  } else {
    res.status().json({
      error: "Withdrawal not completed. Amount is larger than amount in account. Try to withdraw a lower amount.",
      currentAmount: currentAmount.amount,
      success: false
    });
  }
})

// Route to delete a bank account
app.delete("/api/accounts/:accID", async (req, res) => {
  // Delete account from accountsCollection
  await accountsCollection.deleteOne({_id: req.params.accID})
  // Delete account reference from user object
  await usersCollection.updateOne(
    // Find user that has specific account ID
    {accounts: req.params.accID},
    // Remove account from accounts array
    {$pull: { "accounts": req.params.accID}}
  );

  res.json({
    success: true
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})