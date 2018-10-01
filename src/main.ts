import dotenv from "dotenv";
import path from "path";

import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import mongoose from "mongoose";
import jwt from "express-jwt";

import { initGithubOAuthClient } from "./config/auth";
import { schema } from "./gql";

const dotenvPath = path.resolve(path.dirname(__dirname), ".env");

dotenv.config({
  path: dotenvPath
});

const SERVER_PORT = process.env.SERVER_PORT || 8080;
const MONGO_SERVER = process.env.MONGO_SERVER || "localhost:27017";
const JWT_SECRET = process.env.JWT_SECRET || "TEST_SECRET";

const authMiddleware = jwt({ secret: JWT_SECRET, credentialsRequired: false });

const githubOAuth = initGithubOAuthClient();

mongoose.connect(
  `mongodb://${MONGO_SERVER}/naffiq-com`,
  {
    useNewUrlParser: true
  }
);
const app = express();

app.use(cors());
app.get("/", (_, res) => res.send("<h1>What are you doing there?</h1>"));

app.use(
  "/graphql",
  bodyParser.json(),
  authMiddleware,
  graphqlExpress(req => {
    console.log(req.user);

    return {
      schema,
      context: {
        user: req.user
      }
    };
  })
);
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.get("/oauth/github/login", (req, res) => {
  console.log("started oauth");
  return githubOAuth.login(req, res);
});

app.get("/oauth/github", (req, res) => {
  console.log("received callback");
  return githubOAuth.callback(req, res);
});

const server = createServer(app);

server.listen(SERVER_PORT, () => {
  console.log(`Server is up and running on ${SERVER_PORT}`);
});
