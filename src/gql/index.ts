import { makeExecutableSchema } from "graphql-tools";
import { graphql as postsGql } from "../posts";

const typeDefs = `
    type Query {
        ${postsGql.schema.queries}
    }

    type Mutation {
        ${postsGql.schema.mutations}
    }

    ${postsGql.schema.types}
`;

const resolvers = {
  Query: {
    ...postsGql.queries
  },
  Mutation: {
    ...postsGql.mutations
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
