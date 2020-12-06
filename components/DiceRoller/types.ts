import { number } from 'prop-types';

type DieConfig = {
  die: number;
  numberOfDices: number;
};

export type RollerConfig = {
  showConfig: boolean;
  groups: GroupConfig[];
};

type ModifierConfig = {
  amount: number;
};

export type GroupConfig = {
  name: string;
  hasSum: boolean;
  dices: DieConfig[];
  modifiers?: ModifierConfig[];
};

type DieRoll = {
  die: number;
  roll: number;
};

export type GroupRoll = {
  sum: number;
  rolls: DieRoll[];
  config: GroupConfig;
};
