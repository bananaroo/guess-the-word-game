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
    inputValue.value = "";
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
    }
};