import React, { useCallback, useEffect, useState } from 'react';
import DiceConfig from './components/DiceConfig';
import { Col, message, Row } from 'antd';
import { GroupRoll, RollerConfig } from './types';
import DiceRolls from './components/DiceRolls';
import { rollAllDice } from './utils';
import { RollButton } from './components/styles';

type Props = {
  rollerConfig: RollerConfig | null;
  defaultConfig?: RollerConfig;
};

const DiceRoller = ({ rollerConfig, defaultConfig }: Props) => {
  const [config, setConfig] = useState(rollerConfig);
  const [rolls, setRolls] = useState<GroupRoll[]>([]);

  const rollAll = useCallback(() => {
    if (!config?.groups?.length) {
      message.error('Please set up some dice');
      return;
    }

    const roundRolls = rollAllDice(config);

    setRolls(roundRolls);
  }, [config]);

  useEffect(() => {
    // there is something to roll and no rolls, sounds like user loaded the page, let's ROLL!
    if (config?.groups?.length && !rolls.length) {
      rollAll();
    }
  }, [config, rolls]);

  return (
    <div style={{ marginTop: 20 }}>
      <DiceRolls groupRolls={rolls} />
      <Row style={{ marginTop: 15 }} gutter={[16, 40]} justify="center">
        <Col>
          <RollButton type="primary" onClick={rollAll}>
            Roll
          </RollButton>
        </Col>
      </Row>
      <DiceConfig
        setRollerConfig={setConfig}
        initialConfig={config}
        defaultConfig={defaultConfig}
      />
    </div>
  );
};

export default DiceRoller;
