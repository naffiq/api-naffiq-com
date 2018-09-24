import slugify from "slugify";
import Post, { IPost } from "./model";
import User from "../users/model";

export const schema = {
  // Posts query types
  queries: `
    # Returns all posts
    posts   : [Post],
    # Returns single post
    post    : Post
  `,
  // Mutations to posts
  mutations: `
    # Create new post. Just make sure it's interesting enough.
    createPost(newPost: NewPost)           : Post,
    # Update post in case of mistakes nad typos
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
      image       : String,
      isActive    : Boolean,
      createdAt   : String,
      updatedAt   : String
    }

    # Use it to create new posts
    input NewPost {
      title       : String!,
      description : String!,
      body        : String!,
      image       : String,
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
};

// Queries
export const queries = {
  posts: async (): Promise<IPost[]> => await Post.find()
};

// Mutation related interfaces
interface INewPost {
  title: string;
  description: string;
  body: string;
  image: string;
  isActive: boolean;
}
interface IExistingPost {
  id: number;
  title: string;
  description: string;
  body: string;
  image: string;
  isActive: boolean;
}

export const mutations = {
  createPost: async (
    _: any,
    { newPost }: { newPost: INewPost },
    context: any
  ): Promise<IPost> => {
    console.log(context);
    if (!context.user) {
      throw new Error("Unauthorized access");
    }

    const author = await User.findOne({ githubId: context.user.githubId });

    if (!author || !author._id || author.role !== "admin") {
      throw new Error("Unallowed");
    }

    return await Post.create({
      ...newPost,
      slug: slugify(newPost.title)
    });
  },
  updatePost: async (
    _: any,
    { existingPost }: { existingPost: IExistingPost }
  ): Promise<IPost> =>
    await Post.findByIdAndUpdate(existingPost.id, existingPost)
};
