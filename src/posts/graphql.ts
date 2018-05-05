import {mockPosts} from './data'

export const schema = {
  // Posts query types
  queries: `
    # Returns all posts
    posts   : [Post],
    post    : Post
  `,
  // Mutations to posts
  mutations: `
    createPost(post: NewPost)      : Post,
    updatePost(post: ExistingPost) : Post
  `,
  // Posts gql types
  types: `
    # Basic post type.
    type Post {
      id          : ID,
      title       : String!,
      slug        : String!,
      description : String!,
      body        : String!,
      image       : String!,
      isActive    : Boolean
    }

    # Use it to create new posts
    input NewPost {
      title       : String!,
      description : String!,
      body        : String!,
      image       : String!,
      isActive    : Boolean
    }

    # Use it to update existing posts
    input ExistingPost {
      id          : ID
      title       : String!,
      description : String!,
      body        : String!,
      image       : String!,
      isActive    : Boolean
    }
  `
}

// Queries
export const queries = {
  posts: () => mockPosts
}

export const mutations = {

}