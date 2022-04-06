// Return a random 4-digit number with distinct digits
function generateRandomNumber() {
  // Shuffle digits 0-9 in random order, then select first four items
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < digits.length-1; i++) {
    const swapIndex = generateRandomIndex(i, digits.length-1);
    const temp = digits[i];
    digits[i] = digits[swapIndex];
    digits[swapIndex] = temp;
  }

  digits.length = 4;
  return digits;
}

// Return random index in range [min, max] inclusive
function generateRandomIndex(min, max) {
  return Math.floor(Math.random() * (max-min+1)) + min;
}

function main() {
  const secretNumber = generateRandomNumber();
  console.log(secretNumber);
}

main();