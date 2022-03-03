const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');
const greaterThanZero = document.getElementById('lowError');
const lessThanOneHundred = document.getElementById("highError");
const pleaseGuess = document.getElementById("pleaseGuess");

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts++;

  hideAllMessages();
  if(guess < 1){
    greaterThanZero.style.display = '';
    greaterThanZero.innerHTML = `You must guess a number greater than 0.`;
    attempts--;
  }
  if(guess > 99){
    lessThanOneHundred.style.display = '';
    lessThanOneHundred.innerHTML = `You must guess a number less than 100.`;
    attempts--;
  }
  if(guessInput.value === ''){
    pleaseGuess.style.display = '';
    pleaseGuess.innerHTML = `Please guess a number between 1 and 99.`;
    attempts--;
  }

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber && guess >= 1 && guess <= 99) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;
    if (remainingAttempts !== 1){
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    } else {
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
    }
  }

  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
