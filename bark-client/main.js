const app = document.getElementById("app");
const createButton = document.querySelector(".create");
let results = document.getElementById("results");
let submitButton;


// we may have to back down here and do this in html :'(
const createPostForm = () => {
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
    e.preventDefault();
    await submitPost(formOne, commentsDiv);
    await fetchAndDisplayExistingPosts();
  });

  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    displayMessages()
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
      fetchMessages()
      displayPost(postData);
      form.reset();    }

    
  } catch (error) {
    console.error("Error submitting post:", error.message);
  }
};

const fetchMessages = async () => {
  const messages = await fetch('http://localhost:7700/messages');
  let result = await messages.json();
return result
}



const displayMessages = async () => {
  try {
    let messages = await fetchMessages(); 
    results.replaceChildren();

    messages.forEach(message => {
      let messageDiv = document.createElement('div')
      messageDiv.setAttribute('id', message.id);
        let h3Tag = document.createElement("h3");
        let pTag = document.createElement("p");
        let img = document.createElement("img");
        let delBut = document.createElement('button')

      

        h3Tag.textContent = message.message;
        pTag.textContent = message.username;
        img.src = message.imgURL;
        delBut.textContent = 'Delete';


        messageDiv.appendChild(h3Tag);
        messageDiv.appendChild(pTag);
        messageDiv.appendChild(img);
        messageDiv.appendChild(delBut)


        results.appendChild(messageDiv)

        delBut.addEventListener('click', async (e) => {
          e.preventDefault();

          try {
            const response = await fetch(`http://localhost:7700/messages/${message.postId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            });

            if (response.ok) {
              console.log('Message deleted:', message.postId);
              displayMessages();
            } else {
              console.error('Failed to delete message:', response.statusText);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }

        )
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};


console.log(displayMessages());
console.log(fetchMessages());
displayMessages();

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
  textarea.setAttribute("placeholder", "Got something to bark about? Share your woofs here!");
  form.appendChild(textarea);

  // Create submit button
  submitButton = document.createElement("button");
  submitButton.setAttribute("class", "submit-button");
  submitButton.textContent = "Submit";
  form.appendChild(submitButton);

 

  return form;
};



const submitComment = async (form, commentSectionList) => {
  let newCommentDiv = document.createElement("div");
  let commentUsername = document.createElement("h3");
  let commentText = document.createElement("p");
  commentUsername.innerHTML = form.querySelector(".username-comment").value;
  commentText.innerHTML = form.querySelector(".textarea").value;
  newCommentDiv.appendChild(commentUsername);
  newCommentDiv.appendChild(commentText);
  commentSectionList.appendChild(newCommentDiv);
  form.reset();
};




const createCommentSection = (lastPostContainer) => {
  let commentSection = document.createElement("section");
  commentSection.setAttribute("class", "comment-section");
  let commentSectionHeader = document.createElement("h2");
  commentSectionHeader.textContent = "Comments";
  let commentSectionList = document.createElement("ul");
  commentSectionList.setAttribute("class", "comment-section-list");
  let commentSectionForm = document.createElement("form");
  commentSectionForm.setAttribute("class", "comment-section-form");
  let commentSectionTextarea = document.createElement("textarea");
  commentSectionTextarea.setAttribute("class", "textarea");
  commentSectionTextarea.setAttribute("placeholder", "Add a comment...");
  let commentSectionUsername = document.createElement("textarea");
  commentSectionUsername.setAttribute("class", "username-comment");
  commentSectionUsername.setAttribute("placeholder", "Your username");
  let commentSectionSubmitButton = document.createElement("button");
  commentSectionSubmitButton.setAttribute("class", "comment-section-submit-button");
  commentSectionSubmitButton.textContent = "Submit";

  commentSectionForm.appendChild(commentSectionTextarea);
  commentSectionForm.appendChild(commentSectionUsername);
  commentSectionForm.appendChild(commentSectionSubmitButton);
  commentSection.appendChild(commentSectionHeader);
  commentSection.appendChild(commentSectionList);
  commentSection.appendChild(commentSectionForm);

  lastPostContainer.appendChild(commentSection);

  commentSectionForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await submitComment(commentSectionForm, commentSectionList);
  });
}



createButton.addEventListener("click", createPostForm);

//have a variable to store the total votes which is displayed to the user (DOM)
// FUNCTION
//total increments by one when the upvote button is clicked
//total is updated in the database and is saved under the post ID that was clicked
//updated total variable is presented to the user on the webpage

let voteCounter = 0;

const pVoteCounter = document.getElementById("voteCounter");
const upvoteButton = document.getElementById("upvote");
const downvoteButton = document.getElementById("downvote");

function displayVoteCount() {
  document.getElementById("voteCounter").textContent = voteCounter;
}

displayVoteCount();

upvoteButton.addEventListener("click", function () {
  voteCounter++;
  displayVoteCount();
  // const response = fetch("http://localhost:7700/votes", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ totalVoteCount: voteCounter++ }),
  // });
  // if (response.ok) {
  //   const updateVote = response.json();
  //   console.log("Vote added!");
  // } else {
  //   console.log("Failed to add vote :( ");
  // }
});

downvoteButton.addEventListener("click", function () {
  voteCounter--;
  displayVoteCount();
  // need a function to save number of upvotes to database
  // be a good idea to only let each user vote once?
});

