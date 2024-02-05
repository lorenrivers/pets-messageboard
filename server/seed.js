import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`CREATE TABLE IF NOT EXISTS posts (
    postId INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    message TEXT,
    upvoteCount INTEGER,
    downvoteCount INTEGER,
    imageURL TEXT
)`);

// Might need two tables as there will be two forms - one for posts, another for comments under posts that will link to the post the comment relates to? USE SELECT/JOIN SQL and needs to be a common data column?

//postIdRespondedTo would match to the postId the comment relates to.
db.exec(`CREATE TABLE IF NOT EXISTS comments (
    postIdRespondedTo INTEGER, 
    usernameComment TEXT,
    comment TEXT,
    commentUpvoteCount INTEGER,
    commentDownvoteCount INTEGER,
    commentImageURL TEXT
)`);

//Test data for tables
db.exec(`INSERT INTO posts (username, message, imageURL)
VALUES
('HoochTheDog', 'Anyone got any tennis balls? 🎾', 'https://images.unsplash.com/photo-1614986387975-467d3735addb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`);

db.exec(`INSERT INTO comments (usernameComment, comment)
VALUES
('Blu', 'Nope I ate them all!!')`);

//SQL query to join two tables together?
db.exec(`SELECT posts.postId, posts.username, posts.message, posts.upvoteCount, posts.downvoteCount, posts.imageURL, comments.postIdRespondedTo, comments.usernameComment, comments.comment, comments.commentUpvoteCount, comments.commentDownvoteCount, comments.commentImageURL
FROM posts
INNER JOIN comments ON posts.postId = comments.postIdRespondedTo`);
