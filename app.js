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
    // Empty form
    input.value = '';
  });

  const successCount = getSuccessCount(SECRET_NUMBER, userGuess);
  renderGuess(userGuess, successCount);

  // User won
  if (successCount.correct === 4) {
    const message = document.querySelector('.message');
    message.classList.add('message--active');
    const messageText = message.querySelector('.message__text');
    messageText.textContent = "¡Has Ganado!";

    // Disable new submissions
    numberForm.style.display = 'none';
  }
});

// Return object representing success and error count
function getSuccessCount(correctNumber, userGuess) {
  const successCount = {
    correct: 0,
    misplaced: 0,
    error: 0
  };

  userGuess.forEach((value, index) => {
    if (correctNumber.indexOf(value) === -1) { successCount.error += 1; }
    else if (correctNumber.indexOf(value) === index) { successCount.correct += 1; }
    else { successCount.misplaced += 1; }
  });

  return successCount;
}

// Render user guess to screen, including success count
function renderGuess(userGuess, successCount) {
  const guessTemplate = document.getElementById('prev-guess-template');
  const guessElement = document.importNode(guessTemplate.content, true);

  // Iterate over all guess-value divs and include their corresponding guess number
  const guessDivs = guessElement.querySelectorAll('.guess-value');
  guessDivs.forEach((div, index) => {
    div.textContent = userGuess[index];
  });

  // Iterate over indicators and update their status according to success count
  // First update all correct indicators, when done then update misplaced
  const indicatorDivs = guessElement.querySelectorAll('.indicator');
  let correct = successCount.correct;
  let misplaced = successCount.misplaced;
  indicatorDivs.forEach(div => {
    if (correct > 0) {
      div.classList.add('indicator--correct');
      correct--;
    }
    else if (misplaced > 0) {
      div.classList.add('indicator--misplaced');
      misplaced--;
    }
  });

  // Append guess element to container
  const guessContainer = document.querySelector('.container');
  guessContainer.prepend(guessElement);
}

// Navbar actions
const newGameButton = document.getElementById('new-game');
newGameButton.addEventListener('click', () => {
  window.location.reload();
});

const giveUpButton = document.getElementById('give-up');
giveUpButton.addEventListener('click', () => {
  const message = document.querySelector('.message');
  message.classList.add('message--active');
  const messageText = message.querySelector('.message__text');
  messageText.textContent = 
    `¡Has Perdido! El número era: ${SECRET_NUMBER.join('')}`;
  // Disable new submissions
  numberForm.style.display = 'none';
});

const showInstructionsButton = document.getElementById('instructions');
showInstructionsButton.addEventListener('click', () => {

});