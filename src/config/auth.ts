import GithubOAuth from "github-oauth";
import fetch from "node-fetch";
import User from "../users/model";
import jwt from "jsonwebtoken";

export const initGithubOAuthClient = () => {
  const JWT_SECRET = process.env.JWT_SECRET || "TEST_SECRET";
  const AUTH_SUCCESS_REDIRECT_URL =
    process.env.AUTH_SUCCESS_REDIRECT_URL ||
    "http://localhost:3000/auth/success";

  const githubOAuth = GithubOAuth({
    githubClient: process.env.GITHUB_KEY,
    githubSecret: process.env.GITHUB_SECRET,
    baseURL: process.env.BASE_URL,
    loginURI: "/oauth/github/login",
    callbackURI: "/oauth/github"
  });

  githubOAuth.on("error", err => {
    console.error("there was a login error", err);
  });

  githubOAuth.on("token", async (token, serverResponse) => {
    console.log(serverResponse);
    fetch(`https://api.github.com/user`, {
      headers: {
        Authorization: `token ${token.access_token}`
      }
    })
      .then(result => result.json())
      .then(async userJson => {
        const existingUser = await User.findOne({
          githubLogin: userJson.login
        });
        if (!existingUser._id) {
          const userToken = jwt.sign(
            {
              githubId: userJson.id
            },
            JWT_SECRET
          );

          const user = await new User({
            username: userJson.login,
            jwt: userToken,
            githubToken: token.access_token,
            role: userJson.login === "naffiq" ? "admin" : "user",
            githubLogin: userJson.login,
            fullName: userJson.name,
            email: userJson.email,
            githubId: userJson.id
          });

          await user.save();

          serverResponse.redirect(`${AUTH_SUCCESS_REDIRECT_URL}/${user.jwt}/`);
        }

        serverResponse.redirect(
          `${AUTH_SUCCESS_REDIRECT_URL}/${existingUser.jwt}/`
        );
      });
  });

  return githubOAuth;
};
