function generateGameNumber(): string {
  const gameNumber: Set<number> = new Set();
  while (gameNumber.size < 4) {
    gameNumber.add(getRandomDigit());
  }
  return Array.from(gameNumber).join('');
}

function getRandomDigit(): number {
  return Math.floor(Math.random() * 10);
}

function isValidGameNumber(gameNumber: string): boolean {
  if (gameNumber.length !== 4) return false;
  if (!/^\d{4}$/.test(gameNumber)) return false;
  if (new Set(gameNumber).size !== 4) return false;
  return true;
}

function checkGuess(guess: string, gameNumber: string) {
  let correctPosition: number = 0;
  let correctDigit: number = 0;

  for (let i: number = 0; i < 4; i++) {
    if (guess[i] === gameNumber[i]) {
      correctPosition++;
    } else if (gameNumber.includes(guess[i])) {
      correctDigit++;
    }
  }

  return { correctPosition, correctDigit };
}

function checkWin(guess: string, gameNumber: string): boolean {
  return guess === gameNumber;
}
