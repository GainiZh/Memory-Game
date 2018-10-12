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
let moves = 0;
let counter = document.querySelector('.moves');
let totalMatches = [];
const allMatches = 8;
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
//Add a click event listener to the cards
cardsContainer.addEventListener('click', function(event){
  const clickedCard = event.target;
  //check if class contains card class; enable only two cards to click; check if an array already has a clicked card
  if(clickedCard.classList.contains('card') && openedCards.length < 2 && !openedCards.includes(clickedCard)) {
    //display a card's symbol
    flipOverCard(clickedCard);
    //add clickedCard to openedCards
    addToOpenCards(clickedCard);
    //if two cards are clicked, check if they match
      if (openedCards.length === 2) {
      //call a match function to check if cards match
        checkMatch();

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



//open cards
function flipOverCard(clickedCard) {
  clickedCard.classList.toggle('show');
  clickedCard.classList.toggle('open');
}
//function to push clickedCard into the openedCards
function addToOpenCards(clickedCard) {
  openedCards.push(clickedCard);
}

//function to check if the cards match
function checkMatch(clickedCard) {
  if (
    openedCards[0].firstChild.className === openedCards[1].firstChild.className) {
      openedCards[0].classList.toggle('match');
      openedCards[1].classList.toggle('match');
      openedCards = [];
      totalMatches++;
      //call a function to add moves after two cards are toggled
      countMoves();
      if(totalMatches === allMatches) {
        endGame();
      }
    } else {
      setTimeout(function() {
        flipOverCard(openedCards[0]);
        flipOverCard(openedCards[1]);
        openedCards = [];
      }, 1000);
    }
}

//add moves after flipping over two cards
function countMoves() {
  moves++;
  counter.innerHTML = moves;
}

function endGame() {
  console.log('end game');
}

  //check if class names match

    //call a function to register and keep in track all matched cards








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
