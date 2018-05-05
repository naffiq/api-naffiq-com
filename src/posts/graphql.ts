import {mockPosts} from './data'
import {IPost} from './model'

export const schema = {
  // Posts query types
  queries: `
    # Returns all posts
    posts   : [Post],
    post    : Post
  `,
  // Mutations to posts
  mutations: `
    createPost(newPost: NewPost)           : Post,
    updatePost(existingPost: ExistingPost) : Post
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

// Mutation related interfaces
interface INewPost {
  title       : string,
  description : string,
  body        : string,
  image       : string,
  isActive    : boolean
}
interface IExistingPost {
  id          : number,
  title       : string,
  description : string,
  body        : string,
  image       : string,
  isActive    : boolean
}

export const mutations = {
  createPost: (_: any, {newPost}: {newPost: INewPost}): IPost => ({
    id    : 1,
    slug  : 'ok',
    ...newPost
  }),
  updatePost: (_: any, {existingPost}: {existingPost: IExistingPost}): IPost => ({
    ...existingPost,
    slug: 'ok'
  })
}
