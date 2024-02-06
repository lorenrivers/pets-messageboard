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
    let newPostDiv = document.createElement("div"); // Corrected line
    let usernameDiv = document.createElement("h3"); // Corrected line
    let postDiv = document.createElement("p"); // Corrected line
    usernameDiv.innerHTML = formOne.querySelector(".username").value; // Corrected line
    postDiv.innerHTML = formOne.querySelector(".post").value; // Corrected line
    newPostDiv.appendChild(usernameDiv); // Corrected line
    newPostDiv.appendChild(postDiv); // Corrected line
    commentsDiv.appendChild(newPostDiv); // Corrected line
    formOne.reset(); // Clears the form after submitting
  });
};

createButton.addEventListener("click", createPostForm);