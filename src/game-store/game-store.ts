import { GameSecretNumber } from '../game-conductor/game-conductor';
import { GameRulesType } from '../game-conductor/game-rules/game-rules';
import { v4 as uuidv4 } from 'uuid';

export type GameSessionId = string & {_tag: 'GameSessionId'};

export type GameConfig = Omit<StoredGame, 'id'>;

export type StoredGame = {
    id: GameSessionId;
    secret: GameSecretNumber;
    rules: GameRulesType;
};

export interface GameStore {
    createGame({secret, rules}: GameConfig): Promise<GameSessionId>;
    getGame(sessionId: GameSessionId): Promise<StoredGame>;
    deleteGame(sessionId: GameSessionId): Promise<void>;
}

class GameStoreImpl implements GameStore{
  private readonly store: Map<GameSessionId, GameConfig>;
  constructor(){
    this.store = new Map();
  }

  public async createGame({ secret, rules }: GameConfig): Promise<GameSessionId> {
    const id = uuidv4() as GameSessionId;
    this.store.set(id, {secret, rules});
    return id;
  }

  public async getGame(sessionId: GameSessionId): Promise<StoredGame> {
    const game = this.store.get(sessionId);
    if(!game){
      throw new Error(`No game with given id (${sessionId})`);
    }
    return {id: sessionId, ...game};
  }

  public async deleteGame(sessionId: GameSessionId): Promise<void> {
    this.store.delete(sessionId);
  }
}

const GamesStorage = new GameStoreImpl();
export {GamesStorage};