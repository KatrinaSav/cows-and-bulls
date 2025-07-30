import { GameSessionId, GamesStorage } from '../game-store/game-store';
import { GameRulesMap, GameRulesType } from './game-rules/game-rules';


export interface CowsAndBullsGame {
    start(rulesType: GameRulesType): Promise<GameSessionId>;
    start(rulesType: GameRulesType, answer: GameSecretNumber): Promise<GameSessionId>;
    guess(sessionId: GameSessionId, candidate: GameSecretNumber): Promise<GuessResult>;
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


class CowsAndBullsGameImpl implements CowsAndBullsGame{
  public async start(rulesType: GameRulesType): Promise<GameSessionId>;
  public async start(rulesType: GameRulesType, answer: GameSecretNumber): Promise<GameSessionId>;
  public async start(rulesType: GameRulesType, answer?: GameSecretNumber): Promise<GameSessionId> {
    const rules = GameRulesMap[rulesType];
    if(!answer){
      return GamesStorage.createGame({secret:rules.pickSecret(),rules:rulesType});
    }
    if(!rules.guessValid(answer)){
      throw new Error('Invalid game number');
    }
    return GamesStorage.createGame({secret:answer,rules:rulesType});

  }
  public async guess(sessionId: GameSessionId, candidate: GameSecretNumber): Promise<GuessResult> {
    const game = await GamesStorage.getGame(sessionId);
    const rules = GameRulesMap[game.rules];

    if(!rules.guessValid(candidate)){
      throw new Error('Invalid game number');
    }
    return rules.compare(candidate,game.secret);
  }

}

const CowsAndBulls = new CowsAndBullsGameImpl();
export {CowsAndBulls};