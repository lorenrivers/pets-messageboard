import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`CREATE TABLE IF NOT EXISTS posts (
    postId INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    message TEXT,
    voteCount INTEGER
)`);

// Might need two tables as there will be two forms - one for posts, another for comments under posts that will link to the post the comment relates to? USE SELECT/JOIN SQL and needs to be a common data column?

//postIdRespondedTo would match to the postId the comment relates to.
db.exec(`CREATE TABLE IF NOT EXISTS comments (
    postIdRespondedTo INTEGER NOT NULL REFERENCES posts,
    usernameComment TEXT,
    comment TEXT,
    commentVoteCount INTEGER,
    commentImageURL TEXT
)`);

//Test data for tables
db.exec(`INSERT INTO posts (username, message, voteCount)
VALUES
('HoochTheDog', 'Anyone got any tennis balls? 🎾', 0), ('Loren', 'ashvcjsvjsd', 0)`);

db.exec(`INSERT INTO comments (postIdRespondedTo, usernameComment, comment)
VALUES
(1, 'Blu', 'Nope I ate them all!!')`);

//SQL query to join two tables together?
db.exec(`SELECT posts.postId, posts.username, posts.message, posts.voteCount, comments.postIdRespondedTo, comments.usernameComment, comments.comment, comments.commentVoteCount, comments.commentImageURL
FROM posts
INNER JOIN comments ON posts.postId = comments.postIdRespondedTo`);
