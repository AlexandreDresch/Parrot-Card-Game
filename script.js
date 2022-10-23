// Array for storing the gifs
const gifList = [
    'bobrossparrot.gif',
    'explodyparrot.gif',
    'fiestaparrot.gif',
    'metalparrot.gif',
    'revertitparrot.gif',
    'tripletsparrot.gif',
    'unicornparrot.gif'
];

// Variable for storing the number of repetitions
let repetitionCount;

// Array for storing the cards selected to display
const cardsSelectedToDisplay = [];

// Variable for storing the card scheme
let toPrint;

// Variable for storing the main container of the page
let divForCards = document.querySelector('.card-main-container');

// Counter for selected cards per turn
let selectedCardsInGameCounter = 0;

// Counter for player moves
let playsCounter = 0;

// Counter for face up cards
let upturnedCards = 0;

// Counter for seconds of the game timer
let timer = 0;

// Variable for start the timer
let clock;

// Counter for number of cards in game
let cardCount;

// Initialize settings
gameSettings()

function gameSettings() {
    // Choose number of linked cards
    cardCount = prompt('Com quantas cartas você deseja jogar? Selecione uma quantidade par de 4 à 14 cartas.');

    while (cardCount < 4 || cardCount > 14 || cardCount % 2 !== 0) {
        cardCount = prompt('Com quantas cartas você deseja jogar? Selecione uma quantidade par de 4 à 14 cartas.')
    };

    // Shuffles the gif list
    gifList.sort(comparator);

    // Makes the number of repetitions half the number of cards
    repetitionCount = cardCount / 2;

    // For to create array of selected cards
    for (let i = 0; i < repetitionCount; i++) {
        for (let j = 0; j < 2; j++) {
            toPrint =
                `
                <div class='card-container' onclick='clicked(this)'>
                    <div class=" closed-card-container front-card"> 
                        <img src="/assets/back.png">
                    </div>

                    <div class="closed-card-container back-card">
                        <img src="/assets/${gifList[i]}" class="">
                    </div>
                </div>
            `

            // Add card to array
            cardsSelectedToDisplay.push(toPrint);
        }
    }

    // Shuffles the selected cards
    cardsSelectedToDisplay.sort(comparator);

    // For to display the cards
    for (let i = 0; i < cardsSelectedToDisplay.length; i++) {
        divForCards.innerHTML += cardsSelectedToDisplay[i]
    }

    // Start the game time counter
    clock = setInterval(startTimer, 1000);
}

// Function to finish or restart the game
function gameOver() {
    // Checks if the number of face-up cards is the same as the number of cards in the game
    if (upturnedCards == cardCount) {
        // Stop the timer
        clearInterval(clock);

        // Shows the move counter and game time for the player
        alert(`Você ganhou em ${playsCounter} jogadas! E seu tempo foi ${timer} segundos.`);

        // Auxiliary variable to help with the final choice
        let playAgain = 0;

        // As long as this variable is equal to zero, it continues to wait for the correct answer
        while (playAgain === 0) {
            // Ask for the player's final decision
            const tryAgain = prompt(`Você gostaria de reiniciar a partida? Responda sim ou não, assim como foi escrito.`);

            // If the player chose to play again ...
            if (tryAgain === 'sim') {
                // ... increment the auxiliary variable ...
                playAgain++

                // ... and restart the page
                document.location.reload(true);

            // If the player chose to not play again ...
            } else if (tryAgain === 'não'){
                // ... increment the auxiliary variable ...
                playAgain++

                // Says goodbye to the user
                alert("Espero que você tenha se divertido c:")
            }
        }        
    }
}

// Function to count the game time
function startTimer() {
    timer++;
    // implement timer on screen
}

// Function to shuffle the cards and gif list
function comparator() {
    return Math.random() - 0.5;
}

// Function to get the card clicked by the player
function clicked(cardClicked) {
    alert('test clicked card');
    // Checks if the clicked card is not already a flipped card
    let verifyPair = cardClicked.classList.contains('upturned-card');

    // If is not a flipped card ...
    if (!verifyPair) {
        // ... and the counter of selected cards in game is less than two ...
        if (selectedCardsInGameCounter < 2) {
            // ... allows the click and calls the function to verify if the card is available
            allowClick(cardClicked);
        }
    }
}

// Function to verify if the card is available
function allowClick(cardClicked) {
    alert('entered allowClick')
    // Takes te card for verification
    let verifySelected = cardClicked.classList.contains('selected');

    // If the card is not selected yet, then add the class to it
    if (!verifySelected) {
        cardClicked.classList.add('selected');

        // Select the two faces of the card
        let backCard = cardClicked.querySelector('.back-card');
        let frontCard = cardClicked.querySelector('.front-card');

        // Add the animation classes in the card
        frontCard.classList.add('front-to-front');
        backCard.classList.add('front-to-back');

        // Increments the selected cards in game counter
        selectedCardsInGameCounter++;

        // Increments the play counter
        playsCounter++;
        console.log(selectedCardsInGameCounter)
    }

    // Checks if the selected cards counter is equal to two cards
    if (selectedCardsInGameCounter === 2) {
        // Call the comparator function
        handleCardComparison();

        // Reset the selected cards counter
        selectedCardsInGameCounter = 0;
    }
}

// Function to check if the cards are from the same pair
function handleCardComparison() {
    alert('entered card comparison')
    // Take all selected cards
    let selectedCards = document.querySelectorAll('.selected');

    // Checks if the two cards are of the same pair
    if (selectedCards[0].innerHTML === selectedCards[1].innerHTML) {
        // For to remove the selection and add the face up
        for (let i = 0; i < selectedCards.length; i++) {
            selectedCards[i].classList.remove('selected');
            selectedCards[i].classList.add('upturned-card');
        }
        console.log('equal');

        // Increments the face-up card counter
        upturnedCards = upturnedCards + 2;
        console.log(cardCount + 'total')
        console.log(upturnedCards + 'viradas')

        // Reset the repetition counter
        repetitionCount = 0;
    } else {
        // Goes to the turn cards function
        setTimeout(turnCards, 1000)
    }

    // Goes to the game over function
    setTimeout(gameOver, 800)
    console.log(repetitionCount)
}

// Function to turn cards
function turnCards() {
    alert('entered turnCards')
    // Take all selected cards
    let selectedCards = document.querySelectorAll('.selected');

    // Makes the turn work, and remove selection
    for (let i = 0; i < selectedCards.length; i++) {
        // Select the two faces of the card
        let frontCard = document.querySelector('.selected .front-card');
        let backCard = document.querySelector('.selected .back-card');

        console.log(frontCard)
        // Flip the card
        frontCard.classList.remove('front-to-front');
        backCard.classList.remove('front-to-back'); 
        selectedCards[i].classList.remove('selected');
    }

    // Reset the repetition counter
    repetitionCount = 0;
}




