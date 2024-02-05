const express = require("express");

const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const { MongoClient } = require("mongodb");

app.post("/test/timestamp", async (req, res) => {
  const thailandTimeZone = "Asia/Bangkok";
  const options = { timeZone: thailandTimeZone };

  const currentDateTime = new Date().toLocaleString("en-US", options);
  const client = new MongoClient(
    "mongodb+srv://thivakornng:cQb60qeAB2m5HrU4@foryouonly.4etocee.mongodb.net/"
  );
  await client.connect();
  await client.db("foryouonly").collection("timestamp").insertOne({
    time_stamp: currentDateTime,
  });
  await client.close();
  res.status(200).send({
    status: "ok",
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
