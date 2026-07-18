const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const cors= require('cors')
const express = require("express");
const app = express();
app.use(cors())
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT;

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("wonderDB");
    const destinationCollection = db.collection("destination");

    app.post("/destination",async (req, res) => {
      const destinationData = req.body;
      const result = await destinationCollection.insertOne(destinationData)
      res.send(result)

      console.log(destinationData)
    });

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Server running in ${port}`);
});
