import express from "express";

const port = 3000;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})