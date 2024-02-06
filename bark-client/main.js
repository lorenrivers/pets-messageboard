const app = document.getElementById('app');
const createButton = document.querySelector('.create'); 

const createPostForm = () => {

  // create container div
  let containerDiv = document.createElement('div');
  containerDiv.setAttribute('class', 'container');
  app.appendChild(containerDiv);

  // create main post div
  let submitMessageDiv = document.createElement('div');
  submitMessageDiv.setAttribute('class', 'submit-message');
  containerDiv.appendChild(submitMessageDiv);

  // create comments section
  let commentsDiv = document.createElement('div');
  commentsDiv.setAttribute('class', 'comments');
  containerDiv.appendChild(commentsDiv);

  // create form
  let formOne = document.createElement('form');
  formOne.setAttribute('class', 'form');
  submitMessageDiv.appendChild(formOne);

  // create username field
  let username = document.createElement('textarea');
  username.setAttribute('class', 'username');
  username.setAttribute('placeholder', 'Enter username');
  
  formOne.appendChild(username);

  // create textarea
  let textarea = document.createElement('textarea');
  textarea.setAttribute('class', 'post');
  textarea.setAttribute('placeholder', 'Got something to bark about? Share your woofs here!');
  formOne.appendChild(textarea);

  let imgUpload = document.createElement('input');
  imgUpload.setAttribute('class', 'img-upload');
  imgUpload.setAttribute('type', 'file');

  formOne.appendChild(imgUpload);




  // create submit button
  let submitButton = document.createElement('button');
  submitButton.setAttribute('class', 'submit-button');
  submitButton.textContent = 'Submit';
  formOne.appendChild(submitButton);

  // // create comment section
  // let commentSection = document.createElement('section');
  // commentSection.setAttribute('class', 'comment-section');
  // commentsDiv.appendChild(commentSection);

  // // create comment section header
  // let commentSectionHeader = document.createElement('h2');
  // commentSectionHeader.textContent = 'Comments';
  // commentSection.appendChild(commentSectionHeader);

  // // create comment section list
  // let commentSectionList = document.createElement('ul');
  // commentSectionList.setAttribute('class', 'comment-section-list');
  // commentSection.appendChild(commentSectionList);

  // // create comment section form
  // let commentSectionForm = document.createElement('form');
  // commentSectionForm.setAttribute('class', 'comment-section-form');
  // commentSection.appendChild(commentSectionForm);

  // // create comment section textarea
  // let commentSectionTextarea = document.createElement('textarea');
  // textarea.setAttribute('class', 'textarea');
  // commentSectionForm.appendChild(commentSectionTextarea);

  // let commentSectionUsername = document.createElement('textarea');
  // textarea.setAttribute('class', 'username');
  // commentSectionForm.appendChild(commentSectionUsername);

  // // create comments section submit button
  // let commentSectionSubmitButton = document.createElement('button');
  // commentSectionSubmitButton.setAttribute('class', 'comment-section-submit-button');
  // commentSectionSubmitButton.textContent = 'Submit';
  // commentSectionForm.appendChild(commentSectionSubmitButton);

}

createButton.addEventListener('click', createPostForm);
