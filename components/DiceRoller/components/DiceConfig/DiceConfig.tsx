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
};

const DiceConfig = ({ setRollerConfig, initialConfig }: Props) => {
  const {
    config,
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
  } = useRollerConfig({ setRollerConfig, initialConfig });

  useEffect(() => {
    setRollerConfig(config);
  }, [config]);

  return (
    <div style={{ minWidth: 400, minHeight: 400 }}>
      <Row align="middle" justify="center" gutter={[20, 20]}>
        <Col>
          <Button type="dashed" onClick={toggleVisible}>
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
                    editable={{ onChange: (value) => renameGroupCallback(groupIndex, value) }}
                  >
                    {group.name}
                  </Typography.Title>
                }
                extra={
                  <Button danger onClick={() => removeGroupCallback(groupIndex)}>
                    <DeleteOutlined />
                  </Button>
                }
              >
                <Row gutter={[12, 16]} align="middle" justify="space-between">
                  <Col>Sum results</Col>
                  <Col>
                    <Switch
                      checked={group.hasSum}
                      onChange={(value) => changeHasSumCallback(groupIndex, value)}
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
                            changeNumberOfDicesCallback(groupIndex, dieIndex, value)
                          }
                        />
                      </Col>
                      <Col>Dice</Col>
                      <Col>
                        <Select
                          value={die.die}
                          options={dieOptions}
                          onChange={(value) => changeDieCallback(groupIndex, dieIndex, value)}
                        />
                      </Col>
                      <Col>Sided</Col>
                      <Col>
                        <Button danger onClick={() => removeDiceCallback(groupIndex, dieIndex)}>
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
                            changeModifierCallback(groupIndex, modifierIndex, +value)
                          }
                        />
                      </Col>
                      <Col>
                        <Button
                          danger
                          onClick={() => removeModifierCallback(groupIndex, modifierIndex)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Col>
                    </Row>
                  );
                })}

                <Row gutter={20}>
                  <Col>
                    <Button onClick={() => addDieCallback(groupIndex)}>Add Dice</Button>
                  </Col>

                  {group.hasSum ? (
                    <Col>
                      <Button onClick={() => addModifierCallback(groupIndex)}>
                        Add a Modifier
                      </Button>
                    </Col>
                  ) : null}
                </Row>
              </Card>
            );
          })}
          <Row justify="center" style={{ marginTop: 10, marginBottom: 20 }}>
            <Button onClick={addGroupCallback}>Add a Group</Button>
          </Row>
        </div>
      ) : null}
    </div>
  );
};

export default DiceConfig;
