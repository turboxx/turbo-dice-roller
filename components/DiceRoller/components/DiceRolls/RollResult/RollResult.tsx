import React from 'react';
import { Typography } from 'antd';
import { GroupConfig } from '../../../types';

type Props = {
  roll: number;
  die: number;
  groupConfig: GroupConfig;
};

const RollResult = ({ roll, die, groupConfig }: Props) => {
  return (
    <>
      <Typography.Text strong style={{ fontSize: !groupConfig.hasSum ? 40 : 26 }}>
        {roll}
      </Typography.Text>
      <Typography.Text> ({die})</Typography.Text>
    </>
  );
};

export default RollResult;
