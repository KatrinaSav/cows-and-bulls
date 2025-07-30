import { GameSecretNumber, GuessResult } from '../game-conductor';
import { GameRules } from './game-rules';

export class ClassicGameRules implements GameRules{
  public pickSecret(): GameSecretNumber {
    const gameNumber: Set<number> = new Set();
    while (gameNumber.size < 4) {
      gameNumber.add(this.getRandomDigit());
    }
    return Array.from(gameNumber).join('') as GameSecretNumber;
  }

  public guessValid(guess: GameSecretNumber): boolean {
    if (guess.length !== 4) return false;
    if (!/^\d{4}$/.test(guess)) return false;
    if (new Set(guess).size !== 4) return false;
    return true;
  }

  public compare(guess: GameSecretNumber, secret: GameSecretNumber): GuessResult {
    if(guess===secret){
      return { guessed: true};
    }
    let bull: number = 0;
    let cow: number = 0;

    for (let i: number = 0; i < 4; i++) {
      if (guess[i] === secret[i]) {
        bull++;
      } else if (secret.includes(guess[i])) {
        cow++;
      }
    }

    return { bull, cow };
  }

  private getRandomDigit(): number {
    return Math.floor(Math.random() * 10);
  }
}