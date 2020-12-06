import { DieConfig, GroupConfig, ModifierConfig, RollerConfig } from '../../types';

export const copyConfig = (config: RollerConfig) => ({ ...config });

export const findGroup = (config: RollerConfig, groupIndex: number) => {
  return config.groups[groupIndex];
};

export const addGroup = (config: RollerConfig, group: GroupConfig) => {
  const copy = copyConfig(config);
  copy.groups = [...copy.groups, group];
  return copy;
};

export const updateGroup = (
  config: RollerConfig,
  groupIndex: number,
  changes: Partial<GroupConfig>,
) => {
  const copy = copyConfig(config);
  for (let [key, value] of Object.entries(changes)) {
    copy.groups[groupIndex][key] = value;
  }
  return copy;
};

export const removeGroup = (config: RollerConfig, groupIndex: number) => {
  const copy = copyConfig(config);
  copy.groups.splice(groupIndex, 1);
  return copy;
};

export const findDice = (config: RollerConfig, groupIndex: number, diceIndex: number) => {
  return findGroup(config, groupIndex).dices[diceIndex];
};

export const addDice = (config: RollerConfig, groupIndex: number, dice: DieConfig) => {
  const copy = copyConfig(config);
  copy.groups[groupIndex].dices = [...copy.groups[groupIndex].dices, dice];
  return copy;
};

export const updateDice = (
  config: RollerConfig,
  groupIndex: number,
  diceIndex: number,
  changes: Partial<DieConfig>,
) => {
  const copy = copyConfig(config);
  const dieConfig = findDice(copy, groupIndex, diceIndex);
  copy.groups[groupIndex].dices.splice(diceIndex, 1, { ...dieConfig, ...changes });
  return copy;
};

export const removeDice = (config: RollerConfig, groupIndex: number, diceIndex: number) => {
  const copy = copyConfig(config);
  copy.groups[groupIndex].dices.splice(diceIndex, 1);
  return copy;
};

export const findModifier = (config: RollerConfig, groupIndex: number, modifierIndex: number) => {
  return findGroup(config, groupIndex).modifiers[modifierIndex];
};

export const addModifier = (config: RollerConfig, groupIndex: number, modifier: ModifierConfig) => {
  const copy = copyConfig(config);
  copy.groups[groupIndex].modifiers = [...(copy.groups[groupIndex].modifiers || []), modifier];
  return copy;
};

export const updateModifier = (
  config: RollerConfig,
  groupIndex: number,
  modifierIndex: number,
  changes: Partial<ModifierConfig>,
) => {
  const copy = copyConfig(config);
  const modifierConfig = findModifier(copy, groupIndex, modifierIndex);
  copy.groups[groupIndex].modifiers.splice(modifierIndex, 1, { ...modifierConfig, ...changes });
  return copy;
};

export const removeModifier = (config: RollerConfig, groupIndex: number, modifierIndex: number) => {
  const copy = copyConfig(config);
  copy.groups[groupIndex].modifiers.splice(modifierIndex, 1);
  return copy;
};

export const optionsMapper = (value: number | string) => ({
  value,
  label: value,
});
