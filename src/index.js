let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;  
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


document.addEventListener('DOMContentLoaded', appendToyObjects)

function appendToyObjects() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(function(toyObjects) {

    for(singleToy of toyObjects) {
      const toyCard = document.createElement('div');
      toyCard.className = "card";
      toyCard.id = singleToy.id;

      toyCard.innerHTML = 
      `<h2>${singleToy.name}</h2>
      <img src=${singleToy.image} class= toy-avatar />
      <p> ${singleToy.likes} </p>
      <button class=like-btn id=${singleToy.id}>Like ❤️</button>`

    
        toyCard.querySelector('button').addEventListener('click', updateLikes);
        function updateLikes() {
        toyCard.querySelector('p').innerHTML ++;
        const newLikeNumber = toyCard.querySelector('p').innerHTML;
        console.log(newLikeNumber, toyCard.id)

        fetch(`http://localhost:3000/toys/${toyCard.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              "likes": newLikeNumber
            })
          })
        .then(response => response.json())
        .then(data => console.log(data))
        }
      const toyCollection = document.querySelector('#toy-collection');
      toyCollection.append(toyCard);
        }})


const submitBtn = document.querySelector('.submit');
submitBtn.addEventListener('click', function(e) {
  e.preventDefault();

  const toyName = document.querySelector('#nameInput').value;
  const toyImageURL = document.querySelector('#URLInput').value;
  
  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": `${toyName}`,
      "image": `${toyImageURL}`,
      "likes": 0
    })
    }
  fetch('http://localhost:3000/toys', configurationObject)
  .then(response => response.json())
  .then(function(data) {
    const toyCard = document.createElement('div');
      toyCard.className = "card";
      toyCard.innerHTML = 

      `<h2>${data.name}</h2>
      <img src=${data.image} class= toy-avatar />
      <p> ${data.likes} </p>
      <button class=like-btn id=${data.id}>Like ❤️</button>`

      const toyCollection = document.querySelector('#toy-collection');
      toyCollection.append(toyCard);

  })})}



 


       
      
 
  

 
  

