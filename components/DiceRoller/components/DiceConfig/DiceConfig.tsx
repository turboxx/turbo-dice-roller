import React, { useCallback, useEffect, useState } from 'react';
import { Button, Divider, Select } from 'antd';
import { GroupConfig } from '../../types';

const optionsMapper = (value: number | string) => ({
  value,
  label: value,
});

const dieOptions = [4, 6, 8, 10, 12, 20].map(optionsMapper);

const numberOfDicesOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(optionsMapper);

const sumOptions = [
  {
    label: 'Yes',
    value: 1,
  },
  { label: 'No', value: 0 },
];

type Props = {
  setDice: (dice: GroupConfig[]) => void;
  defaultDice?: GroupConfig[];
};

const DiceConfig = ({ setDice, defaultDice }: Props) => {
  const [groups, setGroups] = useState<GroupConfig[]>([...defaultDice]);
  const [visible, setVisible] = useState(true);

  const addGroup = useCallback(() => {
    setGroups((existing) => [...existing, { hasSum: 1, dices: [] }]);
  }, [groups]);

  const addDie = useCallback(
    (groupIndex: number) => {
      setGroups((existing) => {
        const copy = [...existing];
        copy[groupIndex].dices = [...copy[groupIndex].dices, { die: 6, numberOfDices: 1 }];
        return copy;
      });
    },
    [groups],
  );

  const removeGroup = useCallback(
    (groupIndex: number) => {
      setGroups((existing) => {
        const copy = [...existing];
        copy.splice(groupIndex, 1);
        return copy;
      });
    },
    [groups],
  );

  const removeDie = useCallback(
    (groupIndex: number, dieIndex: number) => {
      setGroups((existing) => {
        const copy = [...existing];
        copy[groupIndex].dices.splice(dieIndex, 1);
        return copy;
      });
    },
    [groups],
  );

  const changeDie = useCallback(
    (groupIndex: number, dieIndex: number, die: number) => {
      setGroups((existing) => {
        const copy = [...existing];
        const dieConfig = copy[groupIndex].dices[dieIndex];
        copy[groupIndex].dices.splice(dieIndex, 1, { ...dieConfig, die });
        console.log(copy);
        return copy;
      });
    },
    [groups],
  );

  const changeNumberOfDices = useCallback(
    (groupIndex: number, dieIndex: number, numberOfDices: number) => {
      setGroups((existing) => {
        const copy = [...existing];
        const dieConfig = copy[groupIndex].dices[dieIndex];
        copy[groupIndex].dices.splice(dieIndex, 1, { ...dieConfig, numberOfDices });
        console.log(copy);
        return copy;
      });
    },
    [groups],
  );

  const changeHasSum = useCallback(
    (groupIndex: number, hasSum: number) => {
      setGroups((existing) => {
        const copy = [...existing];
        copy[groupIndex].hasSum = hasSum;
        return copy;
      });
    },
    [groups],
  );

  useEffect(() => {
    setDice(groups);
  }, [groups]);

  return (
    <div>
      <h3>Dice config</h3>
      <Button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'}</Button>
      {visible ? (
        <div>
          {groups.map((group, groupIndex) => {
            return (
              <div key={groupIndex}>
                <div>
                  Group {groupIndex}
                  <Button onClick={() => removeGroup(groupIndex)}>Remove the Group</Button>
                </div>
                <Select
                  value={group.hasSum}
                  options={sumOptions}
                  onChange={(value) => changeHasSum(groupIndex, value)}
                >
                  Has Sum
                </Select>

                {group.dices.map((die, dieIndex) => {
                  return (
                    <div key={`${groupIndex}-${dieIndex}`}>
                      <Select
                        value={die.numberOfDices}
                        options={numberOfDicesOptions}
                        onChange={(value) => changeNumberOfDices(groupIndex, dieIndex, value)}
                      />
                      <Select
                        value={die.die}
                        options={dieOptions}
                        onChange={(value) => changeDie(groupIndex, dieIndex, value)}
                      />
                      <Button onClick={() => removeDie(groupIndex, dieIndex)}>
                        Remove the Die
                      </Button>
                    </div>
                  );
                })}

                <Button onClick={() => addDie(groupIndex)}>Add a Die</Button>
                {groupIndex !== groups.length - 1 ? <Divider /> : null}
              </div>
            );
          })}
          <Button onClick={addGroup}>Add a Group</Button>
        </div>
      ) : null}
    </div>
  );
};

export default DiceConfig;
