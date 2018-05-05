import {makeExecutableSchema} from 'graphql-tools'
import {mockPosts} from './data'

const typeDefs = `
    type Query {
        # Returns all posts
        posts   : [Post],
        post    : Post
    }

    # Basic post type.
    type Post {
        title       : String!,
        slug        : String!,
        description : String!,
        body        : String!,
        image       : String!,
        isActive    : Boolean
    }
`

const resolvers = {
    Query: {
        posts: () => mockPosts
    }
}

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})