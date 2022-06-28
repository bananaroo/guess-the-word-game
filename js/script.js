const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guestInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const countDownGuesses = document.querySelector(".remaining span");
const messageBox = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

const progressWords = function () {
    wordInProgress.innerText = ("●");
}
progressWords(word);

