type DieConfig = {
  die: number;
  numberOfDices: number;
};

export type GroupConfig = {
  hasSum: number;
  dices: DieConfig[];
};

type DieRoll = {
  die: number;
  roll: number;
};

export type GroupRoll = {
  hasSum: boolean;
  sum: number;
  rolls: DieRoll[];
};
