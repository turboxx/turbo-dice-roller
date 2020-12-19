import React, { useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Col, InputNumber, Row, Select, Switch, Typography } from 'antd';
import { RollerConfig } from '../../types';
import { useRollerConfig } from './useRollerConfig';
import { optionsMapper } from './utils';

const dieOptions = [4, 6, 8, 10, 12, 20].map(optionsMapper);
const numberOfDicesOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(optionsMapper);

type Props = {
  setRollerConfig: (config: RollerConfig) => void;
  initialConfig?: RollerConfig;
  defaultConfig?: RollerConfig;
};

const DiceConfig = ({ setRollerConfig, initialConfig, defaultConfig }: Props) => {
  const { config, setConfig, callbacks } = useRollerConfig({ initialConfig, defaultConfig });

  useEffect(() => {
    if (!config && defaultConfig) {
      console.log('setting default config');
      setConfig(defaultConfig);
    }
  }, []);

  useEffect(() => {
    setRollerConfig(config);
  }, [config]);

  return (
    <div style={{ minWidth: 400, minHeight: 400 }}>
      <Row align="middle" justify="center" gutter={[20, 20]}>
        <Col>
          <Button type="dashed" onClick={callbacks.toggleVisible}>
            {config.showConfig ? 'Hide' : 'Show'} Config
          </Button>
        </Col>
      </Row>
      {config.showConfig ? (
        <div>
          {config.groups.map((group, groupIndex) => {
            return (
              <Card
                key={groupIndex}
                title={
                  <Typography.Title
                    level={4}
                    editable={{ onChange: (value) => callbacks.renameGroup(groupIndex, value) }}
                  >
                    {group.name}
                  </Typography.Title>
                }
                extra={
                  <Button danger onClick={() => callbacks.removeGroup(groupIndex)}>
                    <DeleteOutlined />
                  </Button>
                }
              >
                <Row gutter={[12, 16]} align="middle" justify="space-between">
                  <Col>Sum results</Col>
                  <Col>
                    <Switch
                      checked={group.hasSum}
                      onChange={(value) => callbacks.changeHasSum(groupIndex, value)}
                    />
                  </Col>
                </Row>

                {group.dices.map((die, dieIndex) => {
                  return (
                    <Row
                      gutter={[12, 16]}
                      align="middle"
                      justify="space-between"
                      key={`${groupIndex}-${dieIndex}`}
                    >
                      <Col>
                        <Select
                          value={die.numberOfDices}
                          options={numberOfDicesOptions}
                          onChange={(value) =>
                            callbacks.changeNumberOfDices(groupIndex, dieIndex, value)
                          }
                        />
                      </Col>
                      <Col>Dice</Col>
                      <Col>
                        <Select
                          value={die.die}
                          options={dieOptions}
                          onChange={(value) => callbacks.changeDie(groupIndex, dieIndex, value)}
                        />
                      </Col>
                      <Col>Sided</Col>
                      <Col>
                        <Button danger onClick={() => callbacks.removeDice(groupIndex, dieIndex)}>
                          <DeleteOutlined />
                        </Button>
                      </Col>
                    </Row>
                  );
                })}

                {(group.modifiers || []).map((modifier, modifierIndex) => {
                  return (
                    <Row
                      gutter={[12, 16]}
                      align="middle"
                      justify="space-between"
                      key={`${groupIndex}-${modifierIndex}`}
                    >
                      <Col>Modifier</Col>
                      <Col>
                        <InputNumber
                          type="tel"
                          value={modifier.amount}
                          onChange={(value) =>
                            callbacks.changeModifier(groupIndex, modifierIndex, +value)
                          }
                        />
                      </Col>
                      <Col>
                        <Button
                          danger
                          onClick={() => callbacks.removeModifier(groupIndex, modifierIndex)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Col>
                    </Row>
                  );
                })}

                <Row gutter={20}>
                  <Col>
                    <Button onClick={() => callbacks.addDie(groupIndex)}>Add Dice</Button>
                  </Col>

                  {group.hasSum ? (
                    <Col>
                      <Button onClick={() => callbacks.addModifier(groupIndex)}>
                        Add a Modifier
                      </Button>
                    </Col>
                  ) : null}
                </Row>
              </Card>
            );
          })}
          <Row justify="center" style={{ marginTop: 10, marginBottom: 20 }}>
            <Button onClick={callbacks.addGroup}>Add a Group</Button>
          </Row>
          <Row justify="center" style={{ marginTop: 10, marginBottom: 20 }}>
            <Button onClick={callbacks.copyConfig}>Copy Config</Button>
          </Row>
        </div>
      ) : null}
    </div>
  );
};

export default DiceConfig;
