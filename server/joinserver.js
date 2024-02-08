import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
const app = express();

app.use(express.json());
app.use(cors());

const db = new Database("database.db");

//
app.get("/posts", (req, res) => {
  const postsAndComments = db
    .prepare(
      `
  SELECT
    posts.postId, posts.username, posts.message, posts.voteCount, comments.postIdRespondedTo, comments.usernameComment, comments.comment, comments.commentVoteCount, comments.commentImageURL
   FROM
    posts
   LEFT JOIN comments ON posts.postId = comments.postIdRespondedTo
  `
    )
    .all();
  res.json(postsAndComments);
});

app.listen("4242", () => {
  console.log("Join test server running");
});
