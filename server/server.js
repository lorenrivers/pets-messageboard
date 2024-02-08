import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();
const db = new Database("database.db");

app.use(cors());
app.use(express.json());

// /POST request. Creates variables to store the information entered by the user. Then runs a prepare statement to prepare the code (uses ? to avoid user input in SQL code) which then runs (which adds info the user entered to the database). Sends error if did not work. THIS .get ONLY WORKS FOR POSTS, NOT COMMENTS.
app.post("/messages", (req, res) => {
  try {
    const username = req.body.username;
    const message = req.body.message;

    const newMessage = db
      .prepare(
        `INSERT INTO posts (username, message, voteCount) VALUES (?, ?, ?)`
      )
      .run(username, message, 0);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET request to show the user all the messages already within the message board and sends successful status code. Sends error if did not work. THIS .get ONLY WORKS FOR POSTS, NOT COMMENTS.
app.get("/messages", (req, res) => {
  try {
    let posts = db.prepare(`SELECT * FROM posts`).all();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//PUT request to update the number of votes within the database
app.put("/votes/:postId", (req, res) => {
  try {
    const id = req.params.postId;
    const voteCount = req.body.totalVoteCount;

    const updatedVote = db
      .prepare(`UPDATE posts SET voteCount = ? WHERE postId = ?`)
      .run(voteCount, id);
    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/messages/:postId", (req, res) => {
  try {
    const id = req.params.postId;

    const result = db.prepare(`DELETE FROM posts WHERE postId = '${id}'`).run();
    res.status(200).json({ message: "message deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/comments/:postId", (req, res) => {
  console.log(req.body, req.params)
  try {
    const username = req.body.username;
    const comment = req.body.comment;
    // const imageURL = req.body.imageURL;
    const postIdRespondedTo = parseInt(req.params.postId);
    console.log(postIdRespondedTo)
    // you need to insert the ID that the comment happened on.
    const newComment = db
      .prepare(
        `INSERT INTO comments (usernameComment, comment, postIdRespondedTo) VALUES (?,?,?)`
      ).run(username, comment, postIdRespondedTo);
      res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET request to show the user all the comments already within the message board and sends successful status code. Sends error if did not work. THIS .get ONLY WORKS FOR POSTS, NOT COMMENTS.
app.get("/comments", (req, res) => {
  try {
    let comments = db.prepare(`SELECT * FROM comments`).all();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/comments/:postId", (req, res) => {
  try {
    const id = req.params.postId;

    const result = db
      .prepare(`DELETE FROM comments WHERE postIdRespondedTo = '${id}'`)
      .run();
    res.status(200).json({ message: "message deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

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

app.listen("7700", () => {
  console.log("Ah yes, the server is listening");
});