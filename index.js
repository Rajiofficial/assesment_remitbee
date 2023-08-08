let computerNumber;
let how_many_attempts = 0;
let bestScore = Infinity; // Initialize with a large value

document.getElementById('btn').addEventListener('click', NewGame);

function NewGame() {
  const playerName = prompt('Enter your name:');
  if (playerName === null || playerName === '') {
    alert('Please enter a valid name.');
    return;
  }

  computerNumber = generateRandomNumber();
  how_many_attempts = 0;

  document.getElementById('container').style.display = 'block';
  document.getElementById('inputdata').value = '';
  document.getElementById('result').textContent = '';
  document.getElementById('how_many_attempts').textContent = `how_many_attempts: ${how_many_attempts}`;
  document.getElementById('bestScore').textContent = `Best Score: ${bestScore}`;
}

document.getElementById('submit').addEventListener('click', submitGuess);

function submitGuess() {
  const userGuess = document.getElementById('inputdata').value;

  if (!isValidGuess(userGuess)) {
    alert('Please enter a valid four-digit number.');
    return;
  }

  how_many_attempts++;

  const result = compareGuess(userGuess);
  document.getElementById('result').textContent = `Result: ${result}`;
  document.getElementById('how_many_attempts').textContent = `how_many_attempts: ${how_many_attempts}`;

  if (result === '++++') {
    updateBestScore();
    alert(`Congratulations! You found the number ${computerNumber} in ${how_many_attempts} how_many_attempts.`);
    document.getElementById('container').style.display = 'none';
  }
}

function generateRandomNumber() {
  const digits = [];
  while (digits.length < 4) {
    const digit = Math.floor(Math.random() * 10);
    if (!digits.includes(digit)) {
      digits.push(digit);
    }
  }
  return digits.join('');
}

function isValidGuess(guess) {
  return /^\d{4}$/.test(guess);
}

function compareGuess(guess) {
  let result = '';
  for (let i = 0; i < 4; i++) {
    if (guess[i] === computerNumber[i]) {
      result += '+';
    } else if (computerNumber.includes(guess[i])) {
      result += '-';
    } else {
      result += '*';
    }
  }
  return result;
}

function updateBestScore() {
  bestScore = Math.min(bestScore, how_many_attempts);
  document.getElementById('bestScore').textContent = `Best Score: ${bestScore}`;
}