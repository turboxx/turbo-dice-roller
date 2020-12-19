import { RollerConfig, RollRound } from './types';

export const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

export const rollDice = (max: number) => getRandomIntInclusive(1, max);

export const rollAllDice = (config: RollerConfig): RollRound => {
  return {
    date: new Date(),
    groupRolls: config.groups.map((groupConfig) => {
      let sum = 0;
      const rolls = [];
      groupConfig.dices.forEach(({ die, numberOfDices }) => {
        for (let i = 1; i <= numberOfDices; i += 1) {
          const roll = rollDice(die);
          sum += roll;
          rolls.push({ die, roll });
        }
      });

      groupConfig.modifiers?.forEach(({ amount }) => {
        sum += amount;
      });

      return {
        config: groupConfig,
        sum,
        rolls,
      };
    }),
  };
};
