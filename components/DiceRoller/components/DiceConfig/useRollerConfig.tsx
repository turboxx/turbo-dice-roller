import { RollerConfig } from '../../types';
import { useCallback, useEffect } from 'react';
import * as utils from './utils';
import { useStateWithLocalStorage } from '../../../../lib/hooks/useStateWithLocalStorage';
import { copyToClipboard, getUrlForConfig } from '../../storage';
import { message } from 'antd';

type Props = {
  initialConfig?: RollerConfig;
  defaultConfig?: RollerConfig;
};

const emptyConfig: RollerConfig = { showConfig: true, groups: [] };

const getValidInitialValue = (
  initialConfig?: RollerConfig,
  defaultConfig?: RollerConfig,
): RollerConfig => {
  if (initialConfig) return { ...initialConfig };
  if (defaultConfig) return { ...defaultConfig };
  return { ...emptyConfig };
};

export const useRollerConfig = ({ initialConfig, defaultConfig }: Props) => {
  const [config, setConfig, clearConfig] = useStateWithLocalStorage<RollerConfig>(
    'roller-config',
    getValidInitialValue(initialConfig, defaultConfig),
  );

  useEffect(() => {
    if (initialConfig) {
      setConfig(initialConfig);
    }
  }, []);

  const addGroup = useCallback(() => {
    setConfig((existing) =>
      utils.addGroup(existing, {
        name: `Group ${existing.groups.length + 1}`,
        hasSum: true,
        dices: [],
        modifiers: [],
      }),
    );
  }, [config]);

  const addDie = useCallback(
    (groupIndex: number) => {
      setConfig((existing) => utils.addDice(existing, groupIndex, { die: 6, numberOfDices: 1 }));
    },
    [config],
  );

  const removeGroup = useCallback(
    (groupIndex: number) => {
      setConfig((existing) => utils.removeGroup(existing, groupIndex));
    },
    [config],
  );

  const removeDice = useCallback(
    (groupIndex: number, diceIndex: number) => {
      setConfig((existing) => utils.removeDice(existing, groupIndex, diceIndex));
    },
    [config],
  );

  const changeDie = useCallback(
    (groupIndex: number, diceIndex: number, die: number) => {
      setConfig((existing) => utils.updateDice(existing, groupIndex, diceIndex, { die }));
    },
    [config],
  );

  const changeNumberOfDices = useCallback(
    (groupIndex: number, diceIndex: number, numberOfDices: number) => {
      setConfig((existing) => utils.updateDice(existing, groupIndex, diceIndex, { numberOfDices }));
    },
    [config],
  );

  const addModifier = useCallback(
    (groupIndex: number) => {
      setConfig((existing) => utils.addModifier(existing, groupIndex, { amount: 1 }));
    },
    [config],
  );

  const removeModifier = useCallback(
    (groupIndex: number, modifierIndex: number) => {
      setConfig((existing) => utils.removeModifier(existing, groupIndex, modifierIndex));
    },
    [config],
  );

  const changeModifier = useCallback(
    (groupIndex: number, modifierIndex: number, amount: number) => {
      setConfig((existing) =>
        utils.updateModifier(existing, groupIndex, modifierIndex, { amount }),
      );
    },
    [config],
  );

  const changeHasSum = useCallback(
    (groupIndex: number, hasSum: boolean) => {
      setConfig((existing) => utils.updateGroup(existing, groupIndex, { hasSum, modifiers: [] }));
    },
    [config],
  );

  const renameGroup = useCallback(
    (groupIndex: number, name: string) => {
      setConfig((existing) => utils.updateGroup(existing, groupIndex, { name }));
    },
    [config],
  );

  const toggleVisible = useCallback(() => {
    setConfig((existing) => {
      const copy = utils.copyConfig(existing);
      copy.showConfig = !copy.showConfig;
      return copy;
    });
  }, [config]);

  const copyConfig = useCallback(() => {
    copyToClipboard(getUrlForConfig(config));
    message.success('Copied to clipboard ✅');
  }, [config]);

  return {
    config,
    setConfig,
    callbacks: {
      addGroup,
      removeGroup,
      renameGroup,
      changeHasSum,
      addDie,
      removeDice,
      changeDie,
      changeNumberOfDices,
      addModifier,
      removeModifier,
      changeModifier,
      toggleVisible,
      clearConfig,
      copyConfig,
    },
  };
};
