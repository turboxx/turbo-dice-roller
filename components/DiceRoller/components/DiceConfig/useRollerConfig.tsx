import { RollerConfig } from '../../types';
import { useCallback, useState } from 'react';
import {
  addDice,
  addGroup,
  addModifier,
  copyConfig,
  removeDice,
  removeGroup,
  removeModifier,
  updateDice,
  updateGroup,
  updateModifier,
} from './utils';

type Props = {
  setRollerConfig: (config: RollerConfig) => void;
  initialConfig?: RollerConfig;
};
export const useRollerConfig = ({ setRollerConfig, initialConfig }: Props) => {
  const [config, setConfig] = useState<RollerConfig>({ ...initialConfig });

  const addGroupCallback = useCallback(() => {
    setConfig((existing) =>
      addGroup(existing, {
        name: `Group ${existing.groups.length + 1}`,
        hasSum: true,
        dices: [],
        modifiers: [],
      }),
    );
  }, [config]);

  const addDieCallback = useCallback(
    (groupIndex: number) => {
      setConfig((existing) => addDice(existing, groupIndex, { die: 6, numberOfDices: 1 }));
    },
    [config],
  );

  const removeGroupCallback = useCallback(
    (groupIndex: number) => {
      setConfig((existing) => removeGroup(existing, groupIndex));
    },
    [config],
  );

  const removeDiceCallback = useCallback(
    (groupIndex: number, diceIndex: number) => {
      setConfig((existing) => removeDice(existing, groupIndex, diceIndex));
    },
    [config],
  );

  const changeDieCallback = useCallback(
    (groupIndex: number, diceIndex: number, die: number) => {
      setConfig((existing) => updateDice(existing, groupIndex, diceIndex, { die }));
    },
    [config],
  );

  const changeNumberOfDicesCallback = useCallback(
    (groupIndex: number, diceIndex: number, numberOfDices: number) => {
      setConfig((existing) => updateDice(existing, groupIndex, diceIndex, { numberOfDices }));
    },
    [config],
  );

  const addModifierCallback = useCallback(
    (groupIndex: number) => {
      setConfig((existing) => addModifier(existing, groupIndex, { amount: 1 }));
    },
    [config],
  );

  const removeModifierCallback = useCallback(
    (groupIndex: number, modifierIndex: number) => {
      setConfig((existing) => removeModifier(existing, groupIndex, modifierIndex));
    },
    [config],
  );

  const changeModifierCallback = useCallback(
    (groupIndex: number, modifierIndex: number, amount: number) => {
      setConfig((existing) => updateModifier(existing, groupIndex, modifierIndex, { amount }));
    },
    [config],
  );

  const changeHasSumCallback = useCallback(
    (groupIndex: number, hasSum: boolean) => {
      setConfig((existing) => updateGroup(existing, groupIndex, { hasSum, modifiers: [] }));
    },
    [config],
  );

  const renameGroupCallback = useCallback(
    (groupIndex: number, name: string) => {
      setConfig((existing) => updateGroup(existing, groupIndex, { name }));
    },
    [config],
  );

  const toggleVisible = useCallback(() => {
    setConfig((existing) => {
      const copy = copyConfig(existing);
      copy.showConfig = !copy.showConfig;
      return copy;
    });
  }, [config]);

  return {
    config,
    setConfig,
    addGroupCallback,
    removeGroupCallback,
    renameGroupCallback,
    changeHasSumCallback,
    addDieCallback,
    removeDiceCallback,
    changeDieCallback,
    changeNumberOfDicesCallback,
    addModifierCallback,
    removeModifierCallback,
    changeModifierCallback,
    toggleVisible,
  };
};
