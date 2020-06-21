const deckCards = document.querySelector(".deck");
let openedCards = [];
let matchedCards = [];
const memCards = [
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-diamond",
    "fa fa-diamond",    
    "fa fa-bomb",
    "fa fa-bomb",
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bicycle"
];

/* Let the game start */
function startGame() {
    //shuffle cards when game is started
    startTimer();
    let shuffledCards = shuffle(memCards);
    let card;
    for (card of shuffledCards) {
        const liCard = document.createElement("li");
        liCard.classList.add("card");
        liCard.innerHTML = `<i class="${card}"></i>`
        deckCards.appendChild(liCard);
        clickCard(liCard);
    }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the cards symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card"s symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function clickCard(card) {
    card.addEventListener("click", function () {
        const currentCard = this;
        const previousCard = openedCards[0];
        if(openedCards.length === 1) {
            card.classList.add("open", "show", "disable");
            openedCards.push(this);
            compareOpenedCards(previousCard, currentCard);
        } else {
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }
    });
}

/* Compare the two opened cards */
function compareOpenedCards(prev, curr) {
    //if matched and then check game is over
    if (prev.innerHTML === curr.innerHTML) {
        prev.classList.add("match");
        curr.classList.add("match");
        matchedCards.push(curr, prev);
        gameOver();
    } else {
        //wait until next click
        setTimeout(function() {
            prev.classList.remove("open", "show", "disable");
            curr.classList.remove("open", "show", "disable");
        }, 600);
    };
    openedCards = [];
    moveCounter();
};

/* if the Game is Over */
function gameOver() {
    if (matchedCards.length === memCards.length) {
        congratsModal();
        stopTimer();
    };
};

/* Add new move */
let movesCount = 0;
let moveElement = document.querySelector(".moves");
moveElement.innerHTML = 0;
function moveCounter() {
    movesCount++;
    moveElement.innerHTML = movesCount;
    starRating();
};

/* Check Rating */
const starElement = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starElement.innerHTML = star + star + star;
function starRating() {
    if (movesCount > 10 && movesCount < 16) {
        starElement.innerHTML = star + star
    } else if (movesCount >= 16) {
        starElement.innerHTML = star
    };
};

/* RESET & RESTART */
/* restart button */
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function () {
    resetCards();
})

/*reset everything*/
function resetCards() {
    stopTimer();
    matchedCards = [];
    openedCards = [];
    movesCount = 0;
    deckCards.innerHTML = "";
    moveElement.innerHTML = 0;
    starElement.innerHTML = star + star + star;
    startGame();
};

////////////////////////////////////////////////////
//when all the cards matched
function congratsModal() {
    $("#congrats").modal("show");
    document.getElementById("totalMove").innerHTML = movesCount;
    document.getElementById("totalTime").innerHTML = timer.innerHTML;
    document.getElementById("starRating").innerHTML = starElement.childElementCount;
}

let closeIcon = document.querySelector(".close");
closeIcon.addEventListener("click", function (e) {
    resetCards();
});

let closeButton = document.getElementById("close");
closeButton.addEventListener("click", function (e) {
    resetCards();
});

let playAgainButton = document.getElementById("playAgain");
playAgainButton.addEventListener("click", function (e) {
    $("#congrats").modal("hide");
    resetCards(); 
});
////////////////////////////////////////////////////

//Starting the game 
startGame();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
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

////////////////////////////////////////////////////

/* Game Timer */
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
    let second = 0;
    let minute = 0;
    interval = setInterval(function () {
        timer.innerHTML = `${minute} minutes ${second} seconds`;
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
};

//reset timer
function stopTimer() {
    clearInterval(interval);
    timer.innerHTML = "0 minutes 0 seconds";
};
////////////////////////////////////////////////////