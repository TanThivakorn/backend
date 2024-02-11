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
  console.log("11111");
  const currentDateTime = new Date().toLocaleString("en-US", options);
  console.log("22222");

  const client = new MongoClient.connect(databaseUrl);
  console.log("database url =>" + databaseUrl);

  // await client.connect();
  console.log("clinet =>" + client);

  await client.db("foryouonly").collection("timestamp").insertOne({
    time_stamp: currentDateTime,
  });
  console.log("33333");

  await client.close();
  console.log("44444");
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
