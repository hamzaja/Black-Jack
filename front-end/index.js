//------------------------- Consts
 const divContainer = document.querySelector("#cardContainer")
 const playerCardDiv= document.querySelector("#playerCardDiv")
 const computerCardDiv= document.querySelector("#computerCardDiv")


//---------------------------------- fetches------------------------------------

//shuffle the deck
function shuffle() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then(res => res.json())
  .then(deck => {
    drawCards(deck.deck_id)
  })
}
shuffle()

// draw first hand
function drawCards(id , value=4){
  fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=${value}`).then(res => res.json())
  .then(data => renderCards(data.cards , data.deck_id))
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

   computerCardDiv.innerHTML += `<p>Compter's Hand</p><img src="${card[0].image}"><img src="${card[2].image}">
   <p class="computerTotal" > ${computerValues[1]} </p>`
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
    divContainer.innerHTML += `<h1> You Won <h1>`
  }
  else if (score >21){
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

playerCardDiv.addEventListener("click" , function(){
  const deck_id  = computerCardDiv.dataset.deck_id

  // Stand event
  if(event.target.classList.contains("standButton")){

  }

// Hit event
  else if (event.target.classList.contains("hitButton")){
    drawCards(deck_id , 1)
  }















})