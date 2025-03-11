const images = [
    "https://cdn-icons-png.flaticon.com/512/919/919827.png", 
    "https://cdn-icons-png.flaticon.com/512/919/919826.png", 
    "https://cdn-icons-png.flaticon.com/512/919/919828.png",  
    "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
    "https://cdn-icons-png.flaticon.com/512/919/919854.png",  
    "https://cdn-icons-png.flaticon.com/512/6132/6132221.png", 
    "https://cdn-icons-png.flaticon.com/512/6132/6132222.png", 
    "https://cdn-icons-png.flaticon.com/512/919/919830.png", 
    "https://cdn-icons-png.flaticon.com/512/919/919825.png",  
    "https://cdn-icons-png.flaticon.com/512/919/919847.png"   
];

const cardsArray = [...images, ...images];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

let shuffledCards;
let gameContainer = document.getElementById("game");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Elementos da interface
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const endScreen = document.getElementById("end-screen");
const restartButton = document.getElementById("restart-button");

// Iniciar o jogo
startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameContainer.style.display = "grid";
    startGame();
});

// Reiniciar o jogo
restartButton.addEventListener("click", () => {
    endScreen.style.display = "none";
    gameContainer.style.display = "grid";
    startGame();
});

function startGame() {
    gameContainer.innerHTML = "";
    shuffledCards = shuffle(cardsArray);
    matchedPairs = 0;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    
    shuffledCards.forEach(image => {
        gameContainer.appendChild(createCard(image));
    });
}

function createCard(imageSrc) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = imageSrc;

    const img = document.createElement("img");
    img.src = imageSrc;

    card.appendChild(img);
    card.addEventListener("click", flipCard);
    return card;
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        resetCards(true);
        matchedPairs++;
        
        // Verifica se o jogo foi concluído
        if (matchedPairs === images.length) {
            setTimeout(() => {
                gameContainer.style.display = "none";
                endScreen.style.display = "block";
            }, 500);
        }
    } else {
        setTimeout(() => resetCards(false), 1000);
    }
}

function resetCards(match) {
    if (!match) {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
    }
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}
