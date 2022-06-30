const guessedLettersInput = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guestInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const countDownGuesses = document.querySelector(".remaining span");
const messageBox = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const progressWords = function (word) {
    const progressWordsDots = [];
    for (const letter of word) {
        console.log(letter);
        progressWordsDots.push("●");
    }
    wordInProgress.innerText = progressWordsDots.join("");
};
progressWords(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    //clear text
    messageBox.innerText = "";
    const inputValue = guestInput.value;
    const goodGuess = acceptedInput(inputValue);
    //console.log(inputValue);
    //clear input
    if (goodGuess) {
        makeGuess(inputValue);
    }
    guestInput.value = "";
});

const acceptedInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messageBox.innerText = "You must enter a letter.";
    } else if (input.length > 1) {
        messageBox.innerText = "Only one letter is accepted.";
    } else if (!input.match(acceptedLetter)) {
        messageBox.innerText = "Try again!";
    } else {
        return input;
        //messageBox.innerText = "Great guess!";
    }
};

const makeGuess = function (inputValue) {
    inputValue = inputValue.toUpperCase();
    if (guessedLetters.includes(inputValue)) {
        messageBox.innerText = "Silly, you already tried that one!";
    } else {
        guessedLetters.push(inputValue);
        console.log(guessedLetters);
        showLetters();
        wordUpdate(guessedLetters);
    }
};

const showLetters = function () {
    guessedLettersInput.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersInput.append(li);
    }
};

const wordUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showWord = [];
     for (const letter of wordArray) {
        if (guessedLetters.includes(letter)){
        showWord.push(letter.toUpperCase());
        } else {
        showWord.push("●");
        }
     }    
    wordInProgress.innerText = showWord.join("");
};

const successfulGuess = function (){
    if (word.toUpperCase() === wordInProgress.innerText) {
        messageBox.classList.add("win");
    messageBox.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};