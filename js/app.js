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
let openedCards = [];
let matchedCards = [];
let moves = 0;
let counter = document.querySelector('.moves');
const totalMatches = 8;
let seconds = 0;
let minutes = 0;
let timeInterval;
let time = document.querySelector('.clock');

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
  if(clockNotStarted) {
    clockNotStarted = false;
    startClock();
  }
  //check if class contains card class; enable only two cards to click; check if an array already has a clicked card
  if(clickedCard.classList.contains('card') && openedCards.length < 2 && !openedCards.includes(clickedCard)) {
    //call flipOverCard function
    flipOverCard(clickedCard);
    //call a function to push clickedCard into the openedCards array to store the cards in the array
    addToggledCard(clickedCard);
    //if two cards are clicked, check if they match
    if (openedCards.length === 2) {
    //call a match function to check if cards match
      checkMatch();
    //call a function to add moves after two cards are toggled
  } else {
    resetCards();
  }
  }
});

function startClock() {
  timeInterval = setInterval(function() {
    seconds = parseInt(seconds, 10) + 1;
    minutes = parseInt(minutes, 10);
    if(seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  time.innerHTML = minutes + ':' + seconds;
  lastTime.textContent = time.textContent;
  }, 1000);
  }



//Open cards
function flipOverCard(clickedCard) {
  clickedCard.classList.toggle('show');
  clickedCard.classList.toggle('open');
}
//function to push clickedCard into the openedCards
function addToggledCard(clickedCard) {
  openedCards.push(clickedCard);
}

//function to check if the cards match
function checkMatch() {
  //check if class names match
  if(
    openedCards[0].firstChild.className ===        openedCards[1].firstChild.className) {
    //store matched cards in the variable
    matchedCards = [];
    //call a function to register and keep in track all matched cards
    addMatchedCards();
  }

function addMatchedCards() {
  matchedCards++;
  for (let matchedCard of matchedCards) {
    //if 8 matches achieved, let the user know, end the time & the game
    if (matchedCards === totalMatches) {
      //end time, end game and add pop up with congrats and game results - in progess
      endGame();
      //otherwise flip over the cards in a second
    }
}
}

function resetCards() {
  setTimeout(() => {
    for(let openedCard of openedCards) {
      openedCards.classList.toggle('open');
      openedCards.classList.toggle('show');
      }
      openedCards = [];
    }, 1000);
    }

 function endGame() {
   clearInterval(timeInterval);
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
