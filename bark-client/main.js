isa Sloot
isasloot
Online

Tom — 02/02/2024 13:43
Hey Isa, I think you've been added to a group with me and Loren, could you send me your email address please so I can add you to my Trello board:)
isa Sloot — 02/02/2024 13:49
isasloot@hotmail.com
Tom — 02/02/2024 14:16
https://discord.gg/zrabbZBc
isa Sloot — Today at 10:55
const app = document.getElementById("app");
const createButton = document.querySelector(".create");

const createPostForm = () => {
  // create container div
  let containerDiv = document.createElement("div");
Expand
message.txt
3 KB
Tom — Today at 11:19
const app = document.getElementById("app");
const createButton = document.querySelector(".create");

const createPostForm = () => {
  // create container div
  let containerDiv = document.createElement("div");
Expand
message.txt
5 KB
const app = document.getElementById("app");
const createButton = document.querySelector(".create");

const createPostForm = () => {
  // create container div
  let containerDiv = document.createElement("div");
Expand
message.txt
5 KB
js
 
Tom — Today at 11:54
const app = document.getElementById("app");
const createButton = document.querySelector(".create");

const createPostForm = () => {
  // create container div
  let containerDiv = document.createElement("div");
Expand
message.txt
5 KB
﻿
Tom
tom_g01
const app = document.getElementById("app");
const createButton = document.querySelector(".create");

const createPostForm = () => {
  // create container div
  let containerDiv = document.createElement("div");
  containerDiv.setAttribute("class", "container");
  app.appendChild(containerDiv);

  // create main post div
  let submitMessageDiv = document.createElement("div");
  submitMessageDiv.setAttribute("class", "submit-message");
  containerDiv.appendChild(submitMessageDiv);

  // create comments section
  let commentsDiv = document.createElement("div");
  commentsDiv.setAttribute("class", "comments");
  containerDiv.appendChild(commentsDiv);

  // create form
  let formOne = document.createElement("form");
  formOne.setAttribute("class", "form");
  submitMessageDiv.appendChild(formOne);

  // create username field
  let username = document.createElement("textarea");
  username.setAttribute("class", "username");
  username.setAttribute("placeholder", "Enter username");

  formOne.appendChild(username);

  // create textarea
  let textarea = document.createElement("textarea");
  textarea.setAttribute("class", "post");
  textarea.setAttribute(
    "placeholder",
    "Got something to bark about? Share your woofs here!"
  );
  formOne.appendChild(textarea);

  // create submit button
  let submitButton = document.createElement("button");
  submitButton.setAttribute("class", "submit-button");
  submitButton.textContent = "Submit";
  formOne.appendChild(submitButton);

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let newPostDiv = document.createElement("div");
    let usernameH3 = document.createElement("h3");
    let postP = document.createElement("p");
    usernameH3.innerHTML = formOne.querySelector(".username").value;
    postP.innerHTML = formOne.querySelector(".post").value;
    try {
        const response = await fetch('http://localhost:7700/messages'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            usernameH3,
            postP
          })
          if (response.ok){
            const newPost = await response.json()
            console.log('New post added!')
          } else {
            console.log('Failed to add post :( ')
          }
        } catch (error) {
          console.error('Error:', error)
        }
    })
    newPostDiv.appendChild(usernameDiv);
    newPostDiv.appendChild(postDiv);
    commentsDiv.appendChild(newPostDiv);
    formOne.reset();
    submitMessageDiv.removeChild(formOne);

    // create comment section
    let commentSection = document.createElement("section");
    commentSection.setAttribute("class", "comment-section");
    commentsDiv.appendChild(commentSection);

    // create comment section header
    let commentSectionHeader = document.createElement("h2");
    commentSectionHeader.textContent = "Comments";
    commentSection.appendChild(commentSectionHeader);

    // create comment section list
    let commentSectionList = document.createElement("ul");
    commentSectionList.setAttribute("class", "comment-section-list");
    commentSection.appendChild(commentSectionList);

    // create comment section form
    let commentSectionForm = document.createElement("form");
    commentSectionForm.setAttribute("class", "comment-section-form");
    commentSection.appendChild(commentSectionForm);

    // create comment section textarea
    let commentSectionTextarea = document.createElement("textarea");
    commentSectionTextarea.setAttribute("class", "textarea");
    commentSectionForm.appendChild(commentSectionTextarea);

    let commentSectionUsername = document.createElement("textarea");
    commentSectionUsername.setAttribute("class", "username");
    commentSectionUsername.setAttribute("placeholder", "username");
    commentSectionForm.appendChild(commentSectionUsername);

    // create comments section submit button
    let commentSectionSubmitButton = document.createElement("button");
    commentSectionSubmitButton.setAttribute(
      "class",
      "comment-section-submit-button"
    );
    commentSectionSubmitButton.textContent = "Submit";
    commentSectionForm.appendChild(commentSectionSubmitButton);

    commentSectionSubmitButton.addEventListener("click", (e) => {
      e.preventDefault();
      let newCommentDiv = commentsDiv.createElement("div");
      let commentUsername = commentsDiv.createElement("h3");
      let commentText = commentsDiv.createElement("p");
      commentUsername.innerHTML =
        commentSectionForm.querySelector(".username").value;
      commentText.innerHTML =
        commentSectionForm.querySelector(".textarea").value;
      newCommentDiv.appendChild(commentUsername);
      newCommentDiv.appendChild(commentText);
      commentSectionForm.reset();
    });
  });
};

createButton.addEventListener("click", createPostForm);