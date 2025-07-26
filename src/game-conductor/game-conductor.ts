import { isValidGameNumber, checkWin, checkGuess } from './game-rules';

export interface CowsAndBullsGame {
    start(answer: GameSecretNumber): Promise<CowsAndBullsConductor>;
}

export interface CowsAndBullsConductor {
    guess(candidate: GameSecretNumber): Promise<GuessResult>;
}

export type GameSecretNumber = string & {_tag: 'GameSecretNumber'};

export type GuessResult = CorrectGuess | GuessAttempt;

export type CorrectGuess = {
    guessed: true;
};

export type GuessAttempt = {
    bull: number;
    cow: number;
};

class CowsAndBullsImpl implements CowsAndBullsGame {
  public async start(answer: GameSecretNumber): Promise<CowsAndBullsConductor> {
    const numberValid = isValidGameNumber(answer);
    if(!numberValid){
      throw new Error('Invalid picked number format');
    }

    return new CowsAndBullsConductorImpl(answer);
  }
};

class CowsAndBullsConductorImpl implements CowsAndBullsConductor {
  constructor(private readonly secret: GameSecretNumber) {}

  public async guess(candidate: GameSecretNumber): Promise<GuessResult> {
    const numberValid = isValidGameNumber(candidate);
    if(!numberValid){
      throw new Error('Invalid guess format');
    }

    const secretGuessed = checkWin(candidate, this.secret);
    if(secretGuessed){
      return {
        guessed: true
      };
    }

    return checkGuess(candidate, this.secret);
  }
}

const CowsAndBulls = new CowsAndBullsImpl()
export {CowsAndBulls}