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
    const imageURL = req.body.imageURL;

    const newMessage = db
      .prepare(
        `INSERT INTO posts (username, message, imageURL) VALUES (?, ?, ?)`
      )
      .run(username, message, imageURL);
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

//POST request for sending number of votes to the server
app.post("/votes", (req, res) => {
  try {
    const voteCount = req.body.totalVoteCount;
    console.log(voteCount);

    const updateVoteTotal = db
      .prepare(`INSERT INTO posts (voteCount) VALUES (voteCount)`)
      .run(voteCount);
    res.json(updateVoteTotal);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.delete('/messages/:postId', (req, res) => {
  try {

      const id = req.params.postId;

      const result = db.prepare(`DELETE FROM posts WHERE postId = '${id}'`).run();
      res.status(200).json({ message: 'message deleted successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});


app.post("/comments", (req, res) => {
  try {
    const username = req.body.username;
    const comment = req.body.comment;
    const imageURL = req.body.imageURL;

    const newComment = db
      .prepare(
        `INSERT INTO comments (username, message, imageURL) VALUES (?, ?, ?)`
      )
      .run(username, comment, imageURL);
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




app.delete('/comments/:postId', (req, res) => {
  try {

      const id = req.params.postId;

      const result = db.prepare(`DELETE FROM comments WHERE postId = '${id}'`).run();
      res.status(200).json({ message: 'message deleted successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen("7700", () => {
  console.log("Ah yes, the server is listening");
});
