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

// Initialize settings
gameSettings() 

function gameSettings() {
    // Choose number of linked cards
    let cardCount = prompt('Com quantas cartas você deseja jogar? Selecione uma quantidade par de 4 à 14 cartas.');

    while (cardCount < 4 || cardCount > 14 || cardCount % 2 !== 0) {
        cardCount = prompt('Com quantas cartas você deseja jogar? Selecione uma quantidade par de 4 à 14 cartas.')
    };

    // Shuffles the gif list
    gifList.sort(comparator);

    // Makes the number of repetitions half the number of cards
    repetitionCount = cardCount / 2;

    // For to create array of selected cards
    for(let i = 0; i < repetitionCount; i++) {
        for(let j = 0; j < 2; j++) {
            toPrint = 
            `
                <div class='card-container'>
                    <div class="closed-card-container"> 
                        <img src="/assets/back.png">
                    </div>

                    <div class="closed-card-container">
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
}

// Function to shuffle the cards and gif list
function comparator() { 
	return Math.random() - 0.5; 
}
