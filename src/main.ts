import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import { schema } from "./gql";

const SERVER_PORT = process.env.SERVER_PORT || 8080;
const MONGO_SERVER = process.env.MONGO_SERVER || "localhost:27017";

mongoose.connect(`mongodb://${MONGO_SERVER}/naffiq-com`);
const app = express();

app.get("/", (_, res) => res.send("<h1>What are you doing there?</h1>"));

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

const server = createServer(app);

server.listen(SERVER_PORT, () => {
  console.log(`Server is up and running on ${SERVER_PORT}`);
});
