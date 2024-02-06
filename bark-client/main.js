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
    let usernameDiv = document.createElement("h3");
    let postDiv = document.createElement("p");
    usernameDiv.innerHTML = formOne.querySelector(".username").value;
    postDiv.innerHTML = formOne.querySelector(".post").value;
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

    let newPostDiv = document.createElement("div"); 
    let usernameDiv = document.createElement("h3"); 
    let postDiv = document.createElement("p"); 
    usernameDiv.innerHTML = formOne.querySelector(".username").value; 
    postDiv.innerHTML = formOne.querySelector(".post").value; 
    newPostDiv.appendChild(usernameDiv);
    newPostDiv.appendChild(postDiv); 
    commentsDiv.appendChild(newPostDiv); 
    formOne.reset(); 
  });
};

createButton.addEventListener("click", createPostForm);

