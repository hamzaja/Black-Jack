//------------------------- Consts----------------------------------
 const divContainer = document.querySelector("#cardContainer")
 const playerCardDiv= document.querySelector("#playerCardDiv")
 const computerCardDiv= document.querySelector("#computerCardDiv")
 const buttons = document.getElementById("buttons")
 const stats = document.getElementById("playerStats")
 const divForForm = document.getElementById("divForForm")
 const winOverlay= document.getElementById("winOverlay")
 const winOrLose= document.getElementById("winOrLose")
 const newGameButton = document.getElementById("restartGame")
 const logout = document.getElementById("logout")
 
//---------------------------------- fetches------------------------------------

//shuffle the deck
function shuffle() {
  playerCardDiv.innerHTML=""
  computerCardDiv.innerHTML=""
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
    else if (parseInt(computerCardDiv.dataset.value) > 21){
      increasewon()
      console.log("41")
      winOrLose.innerText = "You won!"
      winOverlay.style.display = "block";
    }
    else if (parseInt(computerCardDiv.dataset.value) < parseInt(playerCardDiv.dataset.value)){
      console.log(computerCardDiv.dataset.value )
      console.log(playerCardDiv.dataset.value )

      
        increasewon()
        console.log("47")
        winOrLose.innerText = "You won!"
        winOverlay.style.display = "block";
      }
    else if(parseInt(computerCardDiv.dataset.value) > parseInt(playerCardDiv.dataset.value)){
      increaselost()
      console.log("53")
      winOrLose.innerText = "You lost!"
      winOverlay.style.display = "block";
      }
  else if (computerCardDiv.dataset.value === playerCardDiv.dataset.value) {
    winOrLose.innerText = "It's a tie! What are the odds? 🧐"
    winOverlay.style.display = "block";}
  
  
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
    increasewon()
    console.log("113")
    winOrLose.innerText = "You won!"
        winOverlay.style.display = "block";
        
  }
  else if (score >21){
    computerCardDiv.querySelector(".imageToBeReplaced").src = computerCardDiv.dataset.img
    increaselost()
    winOrLose.innerText = "You Lost!"
        winOverlay.style.display = "block";

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
    if (event.target.id ===  "login"){
    loginForm()
  }
  else if (event.target.id === "newPlayer"){
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

    newGameButton.addEventListener("click", function(){
      winOverlay.style.display = "none";
      
      shuffle()
      newgamepost(stats.dataset.id)


    })

    logout.addEventListener("click", function() {
      location.reload();
    })


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
    stats.dataset.win = data.win
    stats.dataset.lost = data.lost
    stats.dataset.gamesplayed = data.games.length
    stats.innerHTML = `<p>Name: ${data.name} </p> <p>Money: ${data.money} </p>
    <p id="win" >Games Won: ${data.win} </p>
    <p id="lost">Games Lost: ${data.lost} </p>
    <p id = "totalGamesPlayed">Total Games Played: ${data.games.length} </p>
    <button id="newGamebutton"> New Game </button>
    `
  }
  stats.addEventListener("click" ,function(){
    if (event.target.id ===  "newGamebutton"){
      event.target.remove()
      shuffle()
      newgamepost(stats.dataset.id)
    }
  })


  // fetch for new game
  function newgamepost(id){
    let total = parseInt(stats.dataset.gamesplayed) + 1
    stats.dataset.gamesplayed = total
    stats.querySelector("#totalGamesPlayed").innerText = `Total Games Played: ${total}`
    console.log("new game post")
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


  function increasewon(){
    console.log("increse win")

    wins = stats.dataset.win
    new_wins = parseInt(wins) + 1
    stats.dataset.win = new_wins

    document.getElementById("win").innerText = `Games Won: ${new_wins}`
    // debugger

    fetch(`http://localhost:3000/users/${stats.dataset.id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json" ,
        "Accept": "application/json"
      },
      body: JSON.stringify({
        win: new_wins
      })
    })
  }

  function increaselost(){
    console.log("increse lost")
    losts = stats.dataset.lost
    console.log(losts)
    new_losts = parseInt(losts) + 1
    console.log(new_losts)
    document.getElementById("lost").innerText = `Games Lost: ${new_losts}`
    stats.dataset.lost = new_losts
    // debugger

    fetch(`http://localhost:3000/users/${stats.dataset.id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json" ,
        "Accept": "application/json"
      },
      body: JSON.stringify({
        lost: new_losts
      })
    })
    .then(res=> res.json())
    .then(console.log)
  }
