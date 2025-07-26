import { GuessAttempt } from './game-conductor';

export function generateGameNumber(): string {
  const gameNumber: Set<number> = new Set();
  while (gameNumber.size < 4) {
    gameNumber.add(getRandomDigit());
  }
  return Array.from(gameNumber).join('');
}

function getRandomDigit(): number {
  return Math.floor(Math.random() * 10);
}

export function isValidGameNumber(gameNumber: string): boolean {
  if (gameNumber.length !== 4) return false;
  if (!/^\d{4}$/.test(gameNumber)) return false;
  if (new Set(gameNumber).size !== 4) return false;
  return true;
}

export function checkGuess(guess: string, gameNumber: string): GuessAttempt {
  let bull: number = 0;
  let cow: number = 0;

  for (let i: number = 0; i < 4; i++) {
    if (guess[i] === gameNumber[i]) {
      bull++;
    } else if (gameNumber.includes(guess[i])) {
      cow++;
    }
  }

  return { bull, cow };
}

export function checkWin(guess: string, gameNumber: string): boolean {
  return guess === gameNumber;
}
