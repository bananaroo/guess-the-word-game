const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guestInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const countDownGuesses = document.querySelector(".remaining span");
const messageBox = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

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
    const inputValue = guestInput.value;
    console.log(inputValue);
    //clear input
    inputValue.value = "";
});
