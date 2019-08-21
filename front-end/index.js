//------------------------- Consts----------------------------------
 const divContainer = document.querySelector("#cardContainer")
 const playerCardDiv= document.querySelector("#playerCardDiv")
 const computerCardDiv= document.querySelector("#computerCardDiv")
 const buttons = document.getElementById("buttons")
 const stats = document.getElementById("playerStats")
 const divForForm = document.getElementById("divForForm")
//---------------------------------- fetches------------------------------------

//shuffle the deck
function shuffle() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then(res => res.json())
  .then(deck => {
    drawCards(deck.deck_id)
  })
}
// shuffle()

// draw first hand
function drawCards(id , value=4){
  fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=${value}`).then(res => res.json())
  .then(data => renderCards(data.cards , data.deck_id))
}

function hitcard(id){
  if (computerCardDiv.dataset.value < 17){
    fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
    .then(res => res.json())
    .then(card => computercard(card.cards))
    }
    else if (computerCardDiv.dataset.value > 21){
      divContainer.innerHTML += `<h1> You Won <h1>`
    }
    else if (computerCardDiv.dataset.value < playerCardDiv.dataset.value){
        divContainer.innerHTML += `<h1> You Won <h1>`
      }
    else if(computerCardDiv.dataset.value > playerCardDiv.dataset.value){
        divContainer.innerHTML += `<h1> You Lost <h1>`
      }
  else(
        divContainer.innerHTML += `<h1> Its a Tie <h1>`
      )
  }

function computercard(card){
    computerCardDiv.innerHTML += `<img src="${card[0].image}">`
    let cardtotal = cardvalue(card , computerCardDiv.dataset.value)
    computerCardDiv.dataset.value = parseInt(computerCardDiv.dataset.value) + cardtotal[0]
    computerCardDiv.querySelector(".computerTotal").innerText = computerCardDiv.dataset.value
    hitcard(computerCardDiv.dataset.deck_id)
  }
//------------------------------DOM--------------------------------------------

// render cards
function renderCards(card, deck_id) {

  if (card.length===4){
    computerCardDiv.dataset.value = 0
    playerCardDiv.dataset.value = 0
    let computerValues = cardvalue([card[0], card[2]], computerCardDiv.dataset.value)
    let playervalues = cardvalue([card[1], card[3]], playerCardDiv.dataset.value)
   computerCardDiv.dataset.deck_id= deck_id
   playerCardDiv.dataset.deck_id= deck_id

   computerCardDiv.dataset.value =   computerValues[1]+computerValues[0]
   playerCardDiv.dataset.value =  playervalues[1]+playervalues[0]

   computerCardDiv.dataset.img = card[0].image
   computerCardDiv.innerHTML += `
   <p>Compter's Hand</p>
   <p class="computerTotal" > ${computerValues[1]} </p>
   <img class="imageToBeReplaced" src="http://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-tally-ho-fan-back-1_grande.png?v=1530155076" width="220" height="312" >
   <img src="${card[2].image}">
   `
   playerCardDiv.innerHTML += `
   <button class="standButton"> Stand </button>
   <button class="hitButton" > Hit </button>
   <p class= "playerTotal" >${ playervalues[1] + playervalues[0] }</p>
   <p>players Hand</p><img src="${card[1].image}"><img src="${card[3].image}">
`
}
else if(parseInt(playerCardDiv.dataset.value) <= 21) {
  let playervalues = cardvalue(card)
  playerCardDiv.querySelector(".playerTotal").innerText = parseInt(playerCardDiv.querySelector(".playerTotal").innerText) + playervalues[0]
  playerCardDiv.dataset.value = parseInt(playerCardDiv.dataset.value) + playervalues[0]
  playerCardDiv.innerHTML += `<img src="${card[0].image}">`
}
  let score = parseInt(playerCardDiv.dataset.value)
  console.log(score)

  if( score === 21 ){
    computerCardDiv.querySelector(".imageToBeReplaced").src = computerCardDiv.dataset.img
    divContainer.innerHTML += `<h1> You Won <h1>`
  }
  else if (score >21){
    computerCardDiv.querySelector(".imageToBeReplaced").src = computerCardDiv.dataset.img
    divContainer.innerHTML += `<h1> You Lose <h1>`
  }

}

// checking the values of card
 function cardvalue(cards, div_value){

   let value;
   let valueArray = []
   console.log(cards)
   cards.forEach(card => {
     console.log(card)
     // debugger
   if (card.value === "JACK" || card.value === "KING" || card.value === "QUEEN"){
       value = 10;
   }
   else if(card.value === "ACE"){
     if (div_value + 11 < 21 ){
       value = 11
     }
     else(value = 1)
   }
   else(
     value = parseInt(card.value)
   )
   valueArray.push(value)
   })
   return valueArray

 }

//---------------------------––---––--–--------event listners----------------------
// game related
playerCardDiv.addEventListener("click" , function(){
  const deck_id  = computerCardDiv.dataset.deck_id

  // Stand event
  if(event.target.classList.contains("standButton")){
    console.log(computerCardDiv.dataset.img)

    computerCardDiv.querySelector(".imageToBeReplaced").src = computerCardDiv.dataset.img
    hitcard(deck_id)
  }

// Hit event
  else if (event.target.classList.contains("hitButton")){
    drawCards(deck_id , 1)
  }

})

buttons.addEventListener("click", function() {
    // let playerName = button.name.value
    if (event.target.id = "login"){
    loginForm()
  }
  else if (event.target.id = "newPlayer"){
      newuserForm()
  }
    buttons.remove()

  })

function newPlayerPost(playerName){
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: playerName
    })
  }).then(res => res.json()).then(userOnDom)
}

  //  DOM
// login form
    function loginForm(){
      divForForm.innerHTML =
       `<form method="post" id="formform">
            <input type="text" name="name" required>
            <input type="submit" value="Submit">
        </form>`
      let form = document.querySelector("#formform")
      form.addEventListener("submit",function () {
        event.preventDefault()
      fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(users => {
        if (users.find(user => user.name === form.name.value)){
          let currentUser = users.find(user => user.name === form.name.value)
          userOnDom(currentUser)
          form.remove()
        }
          else(
            divForForm.innerHTML += "<p> You messed up, you forgot the username </p>"
          )
        })
      })
    }


//  newuserForm
function newuserForm(){
  divForForm.innerHTML =
   `<form method="post" id="formform">
        <input type="text" name="name" required>
        <input type="submit" value="Submit">
    </form>`
    let form = document.querySelector("#formform")
    form.addEventListener("submit",function () {
      event.preventDefault()
      newPlayerPost(form.name.value)

    })
    }

  function userOnDom(data) {
    document.querySelector("h1").innerText = `Welcome to Black Jack ${data.name}`
    stats.dataset.id = data.id
    stats.innerHTML = `<p>Name: ${data.name} </p> <p>Money: ${data.money} </p>
    <p>Games Won: ${data.win} </p>
    <p>Games Lost: ${data.lost} </p>
    <p>Total Games Played: ${data.games.length} </p>
    <button id="newGame"> New Game </button>
    `
  }
  stats.addEventListener("click" ,function(){
    if (event.target.id =  "newGame"){
      event.target.remove();
      shuffle()
      newgamepost(stats.dataset.id)
    }
  })


  // fetch for new game
  function newgamepost(id){
    fetch("http://localhost:3000/games",{
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: id
      })
    })

  }
