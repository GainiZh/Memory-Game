/*
 * Create a list that holds all of your cards
 */
 //declare variables
let cards = ['fa-diamond', 'fa-diamond',
              'fa-paper-plane-o', 'fa-paper-plane-o',
              'fa-anchor', 'fa-anchor',
              'fa-bolt', 'fa-bolt',
              'fa-cube', 'fa-cube',
              'fa-leaf', 'fa-leaf',
              'fa-bicycle', 'fa-bicycle',
              'fa-bomb', 'fa-bomb'];

const cardsContainer = document.querySelector('.deck');
let openedCards = [];
let matches = [];
let moves = 0;
let counter = document.querySelector('.moves');
let totalMatches = 0;
const allMatches = 8;
let stars = 3;
let timerOff = true;
let second = 0;
let minute = 0;
let hour = 0;
let timerId;
let timer = document.querySelector('.clock');
let popup = document.querySelector('.modal');
let replayButton = document.querySelector('.replay');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


function startGame() {
  generateCards();
  game();

}
startGame();


//generate HTML cards
function generateCards() {
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
}

//shuffle function from http://stackoverflow.com/a/2450976
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

//main logic of the game
function game() {
//ADD A CLICK EVENT LISTENER
  cardsContainer.addEventListener('click', function(event){
    const clickedCard = event.target;
    //initiate timer
    startClock();
    //check if class contains card class; enable only two cards to click; check if an array already has a clicked card
    if(clickedCard.classList.contains('card') && openedCards.length < 2 && !openedCards.includes(clickedCard)) {
      //DISPLAY A CARD'S SYMBOL
      flipOverCard(clickedCard);
      //ADD IT TO OPENED CARDS
      addToOpenCards(clickedCard);
      //IF THE LIST HAS ANOTHER CARD, CHECK FOR A MATCH
        if (openedCards.length === 2) {
        //call a function to check if cards match
          checkCards();
        }
    }
  });
}

//ADD A CLOCK TIMER
function startClock() {
  if(timerOff) {
    increaseTime();
    timerOff = false;
  }
}

//increment time
function increaseTime() {
  clearInterval(timerId);
  timerId = setInterval(() => {
    second++;
    if(second == 60){
      minute++;
      second = 0;
    }
    if(minute == 60){
      hour++;
      minute = 0;
      }
      showTime();
    }, 1000);
}

//display time in the panel
function showTime() {
  timer.innerHTML = minute + " mins "+ second + " secs ";
}

//check two cards if the match and count moves
function checkCards() {
  const twoOpenCards = 2;
  if (openedCards.length === twoOpenCards) {
    countMoves();
    checkMatch();
  }
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

//INCREMENT THE MOVE
function countMoves() {
  moves++;
  //DISPLAY IT ON THE PAGE
  counter.innerHTML = moves;

  updateScore();
}

//update score
function updateScore(){
  const twoStars = 4;
  const oneStar = 8;

  if(moves === twoStars || moves === oneStar) {
    stars--;
    deleteStar();
  }
}

//delete star
function deleteStar() {
  const starsList = document.querySelectorAll('ul.stars li');
  const allStars = 3;
  const starsToDelete = allStars - stars;
  for(let star = 0; star < starsToDelete; star++) {
  //console.log('hey');
    starsList[star].style.display = 'none';
  }
}

//end game
function endGame() {
  displayMessage();
  playAgain();
}

//IF ALL CARDS ARE MATCHED, DISPLAY IT ON THE PAGE
function displayMessage() {
  finalTime = timer.innerHTML;
  //modal appears
  popup.classList.toggle('hide');
  let starRating = document.querySelector('.stars').innerHTML;
  document.getElementById('totalTime').innerHTML = finalTime;
  document.getElementById('starRating').innerHTML = starRating;
  document.getElementById('finalMoves').innerHTML = moves;
  //console.log('it works')
}

//ADD PLAY AGAIN BUTTON
function playAgain() {
  resetEveryting();
}

//function to replay when clicked on a replay button
replayButton.addEventListener('click', function(event) {
  //modal disappears
  popup.classList.toggle('hide');
});

//reset everything to start a new game
function resetEveryting() {
  resetMoves();
  resetStars();
  resetClock();
  resetCards();
  shuffleCards();
  }

//reset cards
function resetCards() {
  for(card of cards) {
    cardsContainer.innerHTML = "";
    openedCards = [];
    totalMatches = 0;
  }
}

//shuffle cards
function shuffleCards() {
  cards = shuffle(cards);
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
}

//reset moves
function resetMoves() {
  moves = 0;
  counter.innerHTML = moves;
}

//reset stars
function resetStars() {
  stars = 3;
  const starsList = document.querySelectorAll('ul.stars li');
  for(let star of starsList) {
    star.style.display = 'inline';
  }
}

//reset clock
function resetClock() {
  clearInterval(timerId);
  second = 0;
  minute = 0;
  hour = 0;
  timer.innerHTML = '00:00';
  //set the timer to off so that it can start again when the game begins
  timerOff = true;
}

//MAKE A RESTART SIGN WORK WHEN CLICKING ON IT
document.querySelector('.restart').addEventListener('click', resetEveryting);





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
