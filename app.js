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
  console.log(successCount);
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