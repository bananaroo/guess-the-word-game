const guessedLettersInput = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guestInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const countDownGuesses = document.querySelector(".remaining span");
const messageBox = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuessCount = 8;

const getWord = async function (){
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    //console.log(words);
    const wordArray = words.split("\n");
    const randomWord = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWord].trim();
    progressWords(word);
};

getWord();

const progressWords = function (word) {
    const progressWordsDots = [];
    for (const letter of word) {
        //console.log(letter);
        progressWordsDots.push("●");
    }
    wordInProgress.innerText = progressWordsDots.join("");
};
//progressWords(word);

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
        guessesLeft(inputValue);
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
    successfulGuess();
};

//count guesses remaining
const guessesLeft = function (inputValue) {
  const upperWord = word.toUpperCase();  
  if (!upperWord.includes(inputValue)) {
    messageBox.innerText = `There is no ${inputValue} in this word!`;
    remainingGuessCount -= 1;
  } else {
    messageBox.innerText = `Yep! ${inputValue} is correct!`;
  }
  if (remainingGuessCount === 0) {
    messageBox.innerText = `Sorry, no more guesses! The word was ${word}.`;
    startOver();
  } else if (remainingGuessCount === 1) {
    countDownGuesses.innerText = `${remainingGuessCount}`;
  } else {
    countDownGuesses.innerText = `${remainingGuessCount}`;
  }
};

const successfulGuess = function (){
    if (word.toUpperCase() === wordInProgress.innerText) {
        messageBox.classList.add("win");
    messageBox.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    
    startOver();
    }
};

//hide
const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuesses.classList.add("hide");
    guestInput.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    messageBox.classList.remove("win");
    remainingGuessCount = 8;
    guessedLetters = [];
    countDownGuesses.innerText = `${remainingGuessCount} guesses left.`;
    guessedLettersInput.innerHTML = "";
    messageBox.innerText = "";

    getWord();

    guessButton.classList.remove("hide");
    remainingGuesses.classList.remove("hide");
    guessedLetters.classList.remove("hide");
    playAgainButton.classList.add("hide");
});