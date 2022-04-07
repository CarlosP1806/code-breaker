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

// Render message to screen
function renderMessage(text, buttonActive = true) {
  const message = document.querySelector('.message');
  message.classList.add('message--active');

  const messageText = document.querySelector('.message__text');
  messageText.textContent = text;

  const messageButton = document.querySelector('.message__btn');
  if (!buttonActive) { messageButton.style.display = 'none'; }
  else { messageButton.style.display = 'block'; }
}

// Generate number on page load, then wait for user input
const SECRET_NUMBER = generateRandomNumber();

// Respond to number submission
const numberForm = document.querySelector('.input-form');
numberForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Retrieve user input
  const userGuess = [];
  const inputElements = document.querySelectorAll('.form__input');
  inputElements.forEach(input => {
    userGuess.push(parseInt(input.value));
    // Empty form
    input.value = '';
  });

  // Check if input has no duplicate values
  const guessSet = new Set(userGuess);
  if (userGuess.length !== guessSet.size) {
    renderMessage('No incluir digitos repetidos.', false)
    setTimeout(() => {
      const message = document.querySelector('.message');
      message.classList.remove('message--active');
    }, 2000);
    return;
  }

  const successCount = getSuccessCount(SECRET_NUMBER, userGuess);
  renderGuess(userGuess, successCount);

  // If user won
  if (successCount.correct === 4) {
    renderMessage('¡Has ganado!');
    // Disable new submissions
    numberForm.style.display = 'none';
  }
});

// Return object indicating success and error count
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

  // Iterate over all guess-value divs and include their corresponding number
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
// Start new game
const newGameButton = document.getElementById('new-game');
newGameButton.addEventListener('click', () => {
  window.location.reload();
});

// Give up
const giveUpButton = document.getElementById('give-up');
giveUpButton.addEventListener('click', () => {
  const text =
    `¡Has Perdido! El número era: ${SECRET_NUMBER.join('')}`;
  renderMessage(text);
  // Disable new submissions
  numberForm.style.display = 'none';
});

// Handle open and close instructions
const instructionModal = document.querySelector('.modal');
const showInstructionsButton = document.getElementById('instructions');
showInstructionsButton.addEventListener('click', () => {
  instructionModal.classList.add('modal--active');
});

const closeModalButton = document.querySelector('.modal__btn');
closeModalButton.addEventListener('click', () => {
  instructionModal.classList.remove('modal--active');
});