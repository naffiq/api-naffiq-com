import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  jwt: string;
  github_token: string;
  role: "admin" | "user";
  githubLink: string;
  firstName: string;
  lastName: string;
  email: string;
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  jwt: {
    type: String,
    required: true
  },
  githubToken: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "user"
  },
  githubLogin: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  githubId: {
    type: Number,
    required: true
  }
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
