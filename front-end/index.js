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
    drawTwoCards(deck.deck_id)
  })
}
shuffle()

// draw first hand
function drawTwoCards(id){
  fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=4`).then(res => res.json())
  .then(data => renderCards(data.cards))

}

function renderCards(card) {
  playerCardDiv.innerHTML += `<p>Compter's Hand</p><img src="${card[0].image}"><img src="${card[1].image}">`
  computerCardDiv.innerHTML += `<p>players Hand</p><img src="${card[2].image}"><img src="${card[3].image}">`
}
