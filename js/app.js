/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond', 'fa-diamond',
              'fa-paper-plane-o', 'fa-paper-plane-o',
              'fa-anchor', 'fa-anchor',
              'fa-bolt', 'fa-bolt',
              'fa-cube', 'fa-cube',
              'fa-leaf', 'fa-leaf',
              'fa-bicycle', 'fa-bicycle',
              'fa-bomb', 'fa-bomb'];

//Declare variables
const cardsContainer = document.querySelector('.deck');
let toggledCards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Generate HTML cards
for (card of cards) {
  const unorderedList = document.querySelector('.deck');
  //create list element
  const newList = document.createElement('li');
  //add class for the list element
  newList.classList.toggle('card');
  //create i element
  const iElement = document.createElement('i');
  //add classes for i element
  iElement.classList.toggle('fa');
  iElement.classList.toggle(card);
  //add i element inside li element
  newList.appendChild(iElement);
  //add li element inside ul element
  unorderedList.appendChild(newList);
}

//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Add click event listener to the cards
cardsContainer.addEventListener('click', function(event){
  const clickedCard = event.target;
  //check if class contains card class; enable only two cards to click; check if an array already has the card
  if(clickedCard.classList.contains('card') && toggledCards.length < 2 && !toggledCards.includes(clickedCard)) {
    //call toggleCard function
    toggleCard(clickedCard);
    //call a add function to push clickedCard into the toggledCards array to store the cards in the array
    addToggleCard(clickedCard);
    //if two cards are clicked, check if they match
    if (toggledCards.length === 2) {
    //call a match function to check if cards match
      matchedCards();
    }
  }
});

//Toggle cards
function toggleCard(clickedCard) {
  clickedCard.classList.toggle('show');
  clickedCard.classList.toggle('open');
}
//function to push clickedCard into the toggleCards
function addToggleCard(clickedCard) {
  toggledCards.push(clickedCard);
}

//function to check if the cards match
function matchedCards() {
  //check if class names match
  if(toggledCards[0].firstChild.className ===        toggledCards[1].firstChild.className) {
    console.log('match');
  } else {
    console.log('not a match');
  }


}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 // Shuffle function from http://stackoverflow.com/a/2450976
