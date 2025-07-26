import { CorrectGuess, CowsAndBulls, GameSecretNumber, GuessAttempt } from './game-conductor';


describe('Cows and bulls', () => {
  it('should guess the game number in 1 attempt', async () => {
    const pick: GameSecretNumber = '1234' as GameSecretNumber;
    const gameInstance = await CowsAndBulls.start(pick);
    const result = (await gameInstance.guess(pick)) as CorrectGuess;

    expect(result.guessed).toBe(true);
  });

  it.each(['0000', '105n', '21', '21311', 'saddc'])('should throw an error for start when invalid number is %s', async (pick: GameSecretNumber) => {
    try{
      await CowsAndBulls.start(pick);
      expect(false).toBe(true);
    } catch(err){
      expect(err.message).toBe('Invalid picked number format');
    }
  });

  it.each(['0000', '105n', '21', '21311', 'saddc'])('should throw an error for guess when invalid number is %s', async (pick: GameSecretNumber) => {
    const gameInstance = await CowsAndBulls.start('1234' as GameSecretNumber);
    try{
      await gameInstance.guess(pick);
      expect(false).toBe(true);
    } catch(err){
      expect(err.message).toBe('Invalid guess format');
    }
  });

  it.each([['1908',1,0],['9230',2,0],['3412',0,4],['1324',2,2]])('should return correct count for %s of bulls and cows', async (guess: GameSecretNumber, bull: number, cow:number)=>{
    const pick: GameSecretNumber = '1234' as GameSecretNumber;
    const gameInstance = await CowsAndBulls.start(pick);
    const result = await gameInstance.guess(guess) as GuessAttempt;
    expect(result.bull).toBe(bull);
    expect(result.cow).toBe(cow);
  });
});


