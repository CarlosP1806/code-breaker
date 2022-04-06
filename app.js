// Return a random 4-digit number with distinct digits
function generateRandomNumber() {
  // Shuffle digits 0-9 in random order, then select first four items
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < digits.length - 1; i++) {
    const swapIndex = generateRandomIndex(i, digits.length - 1);
    const temp = digits[i];
    digits[i] = digits[swapIndex];
    digits[swapIndex] = temp;
  }
  digits.length = 4;
  return digits;
}

// Return random index in range [min, max] inclusive
function generateRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate number on page load, then wait for user input
const SECRET_NUMBER = generateRandomNumber();
console.log(SECRET_NUMBER);

// Respond to number submission
const numberForm = document.querySelector('.input-form');
numberForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const userGuess = [];
  const inputElements = document.querySelectorAll('.form__input');
  inputElements.forEach(input => {
    userGuess.push(parseInt(input.value));
  });

  const successCount = getSuccessCount(SECRET_NUMBER, userGuess);
  renderGuess(userGuess, successCount);
});

// Return object representing success and error count
function getSuccessCount(correctNumber, userGuess) {
  const successCount = {
    correct: 0,
    misplaced: 0,
    error: 0
  };

  userGuess.forEach((value, index) => {
    if (correctNumber.indexOf(value) === -1) {
      successCount.error += 1;
    }
    else if (correctNumber.indexOf(value) === index) {
      successCount.correct += 1;
    }
    else {
      successCount.misplaced += 1;
    }
  });

  return successCount;
}

// Render user guess to screen, including success count
function renderGuess(userGuess, successCount) {
  const guessTemplate = document.getElementById('prev-guess-template');
  const guessElement = document.importNode(guessTemplate.content, true);

  // Iterate over all guess-value divs and include the corresponding guess number
  const guessDivs = guessElement.querySelectorAll('.guess-value');
  guessDivs.forEach((div, index) => {
    div.textContent = userGuess[index];
  });

  // Append template to container
  const guessContainer = document.querySelector('.container');
  guessContainer.appendChild(guessElement);
} 