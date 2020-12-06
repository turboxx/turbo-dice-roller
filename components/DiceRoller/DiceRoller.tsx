import React, { useCallback, useEffect, useState } from 'react';
import DiceConfig from './components/DiceConfig';
import { Col, message, Row } from 'antd';
import { GroupRoll, RollerConfig } from './types';
import { useRouter } from 'next/router';
import DiceRolls from './components/DiceRolls';
import { getRandomIntInclusive } from './utils';
import { RollButton } from './components/styles';

type Props = {
  rollerConfig: RollerConfig;
};

const DiceRoller = ({ rollerConfig }: Props) => {
  const router = useRouter();
  const [config, setConfig] = useState<RollerConfig>(rollerConfig);
  const [rolls, setRolls] = useState<GroupRoll[]>();

  const rollDice = useCallback(() => {
    if (!config.groups?.length) {
      message.error('Please set up some dice');
      return;
    }

    setRolls(
      config.groups.map((groupConfig) => {
        let sum = 0;
        const rolls = [];
        groupConfig.dices.forEach(({ die, numberOfDices }) => {
          for (let i = 1; i <= numberOfDices; i += 1) {
            const roll = getRandomIntInclusive(1, die);
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
    );
  }, [config]);

  useEffect(() => {
    if (config.groups?.length) {
      rollDice();
    }
  }, []);

  useEffect(() => {
    if (config.groups?.length) {
      router.replace({
        query: {
          config: JSON.stringify(config),
        },
      });
    }
  }, [config]);

  return (
    <div style={{ marginTop: 20 }}>
      <DiceRolls groupRolls={rolls} />
      <Row style={{ marginTop: 15 }} gutter={[16, 40]} justify="center">
        <Col>
          <RollButton type="primary" onClick={rollDice}>
            Roll
          </RollButton>
        </Col>
      </Row>
      <DiceConfig setRollerConfig={setConfig} initialConfig={config} />
    </div>
  );
};

export default DiceRoller;
