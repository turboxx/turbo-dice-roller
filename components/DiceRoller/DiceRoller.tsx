import React, { useCallback, useEffect, useState } from 'react';
import DiceConfig from './components/DiceConfig';
import { Button } from 'antd';
import { GroupConfig, GroupRoll } from './types';
import { useRouter } from 'next/router';
import DiceRolls from './components/DiceRolls';
import { getRandomIntInclusive } from './utils';

const baseUrl = '/';

type Props = {
  diceConfig: GroupConfig[];
};

const DiceRoller = ({ diceConfig }: Props) => {
  const router = useRouter();
  const [dice, setDice] = useState<GroupConfig[]>(diceConfig);
  const [rolls, setRolls] = useState<GroupRoll[]>();

  useEffect(() => {
    if (dice?.length) {
      console.log('setting url params');
      router.replace({
        query: {
          dice: JSON.stringify(dice),
        },
      });
    }
  }, [dice]);

  const rollDice = useCallback(() => {
    setRolls(
      dice.map((group) => {
        let sum = 0;
        const rolls = [];
        group.dices.forEach(({ die, numberOfDices }) => {
          for (let i = 1; i <= numberOfDices; i += 1) {
            const roll = getRandomIntInclusive(1, die);
            sum += roll;
            rolls.push({ die, roll });
          }
        });

        return {
          hasSum: !!group.hasSum,
          sum,
          rolls,
        };
      }),
    );
  }, [dice]);

  console.log('rendering', dice);

  return (
    <div>
      {rolls ? <DiceRolls groupRolls={rolls} /> : null}
      <Button type="primary" onClick={rollDice}>
        Roll
      </Button>
      <DiceConfig setDice={setDice} defaultDice={dice} />
    </div>
  );
};

export default DiceRoller;
