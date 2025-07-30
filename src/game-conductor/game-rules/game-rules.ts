import { GameSecretNumber, GuessResult } from '../game-conductor';
import { ClassicGameRules } from './classic-rules';

export enum GameRulesType {
  Classic = 'Classic'
};

export interface GameRules {
  pickSecret(): GameSecretNumber;
  guessValid(guess: GameSecretNumber): boolean;
  compare(guess: GameSecretNumber, secret: GameSecretNumber): GuessResult;
}


export const GameRulesMap: Record<GameRulesType, GameRules> = {
  [GameRulesType.Classic]: new ClassicGameRules()
} as const;