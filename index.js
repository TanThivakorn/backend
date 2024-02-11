const express = require("express");

const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const { MongoClient } = require("mongodb");

const port = process.env.PORT || 8080;
const databaseUrl = process.env.MONGO_DB;

app.post("/test/timestamp", async (req, res) => {
  const thailandTimeZone = "Asia/Bangkok";
  const options = { timeZone: thailandTimeZone };

  const currentDateTime = new Date().toLocaleString("en-US", options);
  const client = new MongoClient(databaseUrl);
  await client.connect();
  await client.db("foryouonly").collection("timestamp").insertOne({
    time_stamp: currentDateTime,
  });
  await client.close();
  return res.status(200).send({
    status: "ok",
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
