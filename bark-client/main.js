const app = document.getElementById("app");
const createButton = document.querySelector(".create");
let results = document.getElementById("results");
let submitButton;
let commentsSubmitButton;
let commentsDiv;
let postArray = [];

// we may have to back down here and do this in html :'(
const createPostForm = () => {

  if (document.querySelector('.container')) {
    return
  };
  // Create container div
  let containerDiv = document.createElement("div");
  containerDiv.setAttribute("class", "container");
  app.appendChild(containerDiv);

  // Create main post div
  let submitMessageDiv = document.createElement("div");
  submitMessageDiv.setAttribute("class", "submit-message");
  containerDiv.appendChild(submitMessageDiv);

  // Create comments section
  let commentsDiv = document.createElement("div");
  commentsDiv.setAttribute("class", "comments");
  containerDiv.appendChild(commentsDiv);

  // Create form
  let formOne = createPostFormElements(submitMessageDiv);

  formOne.addEventListener("submit", async (e) => {
    // e.preventDefault();
    await submitPost(formOne, commentsDiv);
    await fetchAndDisplayExistingPosts();
  });

  submitButton.addEventListener("click", async (e) => {
    // e.preventDefault();
    displayStuff();
    fetchMessages();
    submitPost(formOne);
  });
};

const submitPost = async (form, commentsDiv) => {
  try {
    const username = form.querySelector(".username-post").value;
    const postContent = form.querySelector(".post").value;
    const response = await fetch("http://localhost:7700/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        message: postContent,
      }),
    });

    if (response.ok) {
      const postData = await response.json();
      fetchMessages();
      
      form.reset();
    }
  } catch (error) {
    console.error("Error submitting post:", error.message);
  }
};

const fetchMessages = async () => {
  const messages = await fetch("http://localhost:7700/messages");
  let result = await messages.json();
  return result;
};

const submitComment = async (form, postId) => {
  try {
    const username = form.querySelector(".username-comment").value;
    const commentContent = form.querySelector(".comment").value;
    const response = await fetch(`http://localhost:7700/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: postId,
        username: username,
        comment: commentContent,
      }),
    });

    if (response.ok) {
      const commentData = await response.json();
      fetchComments();
      displayStuff();
      form.reset();
    }
  } catch (error) {
    console.error("Error submitting comment:", error.message);
  }
};


const fetchComments = async () => {
  const comments = await fetch("http://localhost:7700/comments");
  let result = await comments.json();
  return result;
};

const displayMessages = async () => {
  try {
    let messages = await fetchMessages();
    const lastMessage = messages[messages.length - 1];
    console.log(lastMessage);
    results.replaceChildren();

    messages.forEach((message) => {
      console.log(message)
      let messageDiv = document.createElement("div");
      postArray.push({
        id: message.postId,
        div: messageDiv

      })
      messageDiv.setAttribute("id", message.postId);
      //loren2 addition
      messageDiv.classList.add("message-div");
      let h3Tag = document.createElement("h3");
      //loren2 addition
      h3Tag.classList.add("user-message");
      let pTag = document.createElement("p");
      //loren2 addition
      pTag.classList.add("username-text");
      let delBut = document.createElement("button");
      //loren2 addition
      delBut.classList.add("delete-button");
      let commentBut = document.createElement("button");
      //loren2 addition
      commentBut.classList.add("comment-button");
      let upvoteButton = document.createElement("button");
      //loren2 addition
      upvoteButton.classList.add("upvote-button");
      let downvoteButton = document.createElement("button");
      //loren2 addition
      downvoteButton.classList.add("downvote-button");
      let pVoteCounter = document.createElement("p");
      //loren2 addition
      pVoteCounter.classList.add("display-vote-count");

      h3Tag.textContent = message.message;
      pTag.textContent = message.username;
      delBut.textContent = "Delete";
      commentBut.textContent = "Comment";
      upvoteButton.textContent = "Upvote";
      downvoteButton.textContent = "Downvote";
      pVoteCounter.textContent = message.voteCount;

      messageDiv.appendChild(h3Tag);
      messageDiv.appendChild(pTag);
      messageDiv.appendChild(delBut);
      messageDiv.appendChild(commentBut);
      messageDiv.appendChild(upvoteButton);
      messageDiv.appendChild(downvoteButton);
      messageDiv.appendChild(pVoteCounter);

      results.appendChild(messageDiv);

      commentBut.addEventListener("click", (e) => {
        // pass postId
        // postId 8
        createCommentSectionFormElements(messageDiv, message.postId);
      });

      //Upvote button event listener. Takes the count from the database and adds 1. Displays this to the user and puts the new count into the database.
      upvoteButton.addEventListener("click", async function () {
        voteCounter = message.voteCount += 1;
        pVoteCounter.textContent = voteCounter + " votes!";
        const response = await fetch(
          `http://localhost:7700/votes/${message.postId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ totalVoteCount: voteCounter }),
          }
        );
      });

      //Downvote button event listener. Takes the count from the database and takes away 1. Displays this to the user and puts the new count into the database.
      downvoteButton.addEventListener("click", async function () {
        voteCounter = message.voteCount -= 1;
        pVoteCounter.textContent = voteCounter + " votes!";
        const response = await fetch(
          `http://localhost:7700/votes/${message.postId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ totalVoteCount: voteCounter }),
          }
        );
      });

      delBut.addEventListener("click", async (e) => {
        e.preventDefault();

        try {
          const response = await fetch(
            `http://localhost:7700/messages/${message.postId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            console.log("Message deleted:", message.postId);
            displayStuff();
          } else {
            console.error("Failed to delete message:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

const displayComments = async (linkedId) => {
  try {
    let comments = await fetchComments();

    comments.forEach((comment) => {
      let finalDiv = document.getElementById(comment.postIdRespondedTo);

      let commentDiv = document.createElement("div");
      let h3Tag = document.createElement("h3");
      let pTag = document.createElement("p");
      // let img = document.createElement("img");
      let delBut = document.createElement("button");

      pTag.textContent = comment.comment;
      h3Tag.textContent = comment.usernameComment;
      // img.src = message.imgURL;
      delBut.textContent = "Delete";

      commentDiv.appendChild(h3Tag);
      commentDiv.appendChild(pTag);
      // commentDiv.appendChild(img);
      // commentDiv.appendChild(delBut);

      finalDiv.appendChild(commentDiv);

      delBut.addEventListener("click", async (e) => {
        e.preventDefault();

        try {
          const response = await fetch(
            `http://localhost:7700/comments/${comment.postIdRespondedTo}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            console.log("Message deleted:", comment.postId);
            displayStuff();
          } else {
            console.error("Failed to delete message:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

console.log(displayMessages());
console.log(fetchMessages());
const displayStuff = async () => {
  results.replaceChildren();
  await displayMessages();
  displayComments();
};
displayStuff()


const createPostFormElements = (parent) => {
  let form = document.createElement("form");
  form.setAttribute("class", "form");
  parent.appendChild(form);

  // Create username field
  let usernamePost = document.createElement("textarea");
  usernamePost.setAttribute("class", "username-post");
  usernamePost.setAttribute("placeholder", "Enter username");
  form.appendChild(usernamePost);

  // Create textarea
  let textarea = document.createElement("textarea");
  textarea.setAttribute("class", "post");
  textarea.setAttribute(
    "placeholder",
    "Got something to bark about? Share your woofs here!"
  );
  form.appendChild(textarea);

  // Create submit button
  submitButton = document.createElement("button");
  submitButton.setAttribute("class", "submit-button");
  submitButton.textContent = "Submit";
  form.appendChild(submitButton);

  return form;
};

const createCommentSectionFormElements = async (parent, linkedId) => {
  // linked8
  if (document.querySelector('.username-comment')) {
    return
  };
  const response = await fetchMessages();
  console.log(response)
  let form = document.createElement("form");
  form.setAttribute("class", "form");
  parent.appendChild(form);

  // Create username field
  let usernamePost = document.createElement("textarea");
  usernamePost.setAttribute("class", "username-comment");
  usernamePost.setAttribute("placeholder", "Enter username");
  form.appendChild(usernamePost);

  // Create textarea
  let textarea = document.createElement("textarea");
  textarea.setAttribute("class", "comment");
  textarea.setAttribute(
    "placeholder",
    "Got something to bark about? Share your woofs here!"
  );
  form.appendChild(textarea);

  // Create submit button
  commentsSubmitButton = document.createElement("button");
  commentsSubmitButton.setAttribute("class", "submit-button");
  commentsSubmitButton.textContent = "Submit";
  form.appendChild(commentsSubmitButton);

  commentsSubmitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    displayStuff();
    fetchComments();
    // pass again the post id
    submitComment(form, linkedId);
  });

  return form;
};

createButton.addEventListener("click", createPostForm);

let voteCounter = 0;