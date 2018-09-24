import mongoose from "mongoose";

export interface IPost extends mongoose.Document {
  title: string;
  slug: string;
  description: string;
  body: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const PostSchema = new mongoose.Schema(
  {
    title: {
      default: "",
      type: String,
      required: "Provide a title at least, bro, common"
    },
    slug: {
      type: String,
      unique: true,
      required:
        "This should be generated out of title, are you hacking your way through?"
    },
    description: {
      type: String,
      required:
        "You want it to be shared, right? Imagine the meta tags being blank in that case"
    },
    body: {
      type: String,
      required: "У тебя в сумке пусто, и сама ты пустая. 0/10"
    },
    image: String,
    isActive: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
