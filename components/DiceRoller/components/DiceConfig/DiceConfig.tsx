import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, InputNumber, Row, Select, Switch, Typography } from 'antd';
import { RollerConfig } from '../../types';
import { DeleteOutlined } from '@ant-design/icons';

const optionsMapper = (value: number | string) => ({
  value,
  label: value,
});

const dieOptions = [4, 6, 8, 10, 12, 20].map(optionsMapper);

const numberOfDicesOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(optionsMapper);

type Props = {
  setRollerConfig: (config: RollerConfig) => void;
  initialConfig?: RollerConfig;
};

const DiceConfig = ({ setRollerConfig, initialConfig }: Props) => {
  const [config, setConfig] = useState<RollerConfig>({ ...initialConfig });

  const addGroup = useCallback(() => {
    setConfig((existing) => ({
      ...existing,
      groups: [
        ...existing.groups,
        { name: `Group ${existing.groups.length + 1}`, hasSum: true, dices: [] },
      ],
    }));
  }, [config]);

  const addDie = useCallback(
    (groupIndex: number) => {
      setConfig((existing) => {
        const copy = { ...existing };
        copy.groups[groupIndex].dices = [
          ...copy.groups[groupIndex].dices,
          { die: 6, numberOfDices: 1 },
        ];
        return copy;
      });
    },
    [config],
  );

  const removeGroup = useCallback(
    (groupIndex: number) => {
      setConfig((existing) => {
        const copy = { ...existing };
        copy.groups.splice(groupIndex, 1);
        return copy;
      });
    },
    [config],
  );

  const removeDie = useCallback(
    (groupIndex: number, dieIndex: number) => {
      setConfig((existing) => {
        const copy = { ...existing };
        copy.groups[groupIndex].dices.splice(dieIndex, 1);
        return copy;
      });
    },
    [config],
  );

  const changeDie = useCallback(
    (groupIndex: number, dieIndex: number, die: number) => {
      setConfig((existing) => {
        const copy = { ...existing };
        const dieConfig = copy.groups[groupIndex].dices[dieIndex];
        copy.groups[groupIndex].dices.splice(dieIndex, 1, { ...dieConfig, die });
        return copy;
      });
    },
    [config],
  );

  const changeNumberOfDices = useCallback(
    (groupIndex: number, dieIndex: number, numberOfDices: number) => {
      setConfig((existing) => {
        const copy = { ...existing };
        const dieConfig = copy.groups[groupIndex].dices[dieIndex];
        copy.groups[groupIndex].dices.splice(dieIndex, 1, { ...dieConfig, numberOfDices });
        return copy;
      });
    },
    [config],
  );

  const addModifier = useCallback(
    (groupIndex: number) => {
      setConfig((existing) => {
        const copy = { ...existing };
        copy.groups[groupIndex].modifiers = [
          ...(copy.groups[groupIndex].modifiers || []),
          { amount: 1 },
        ];
        return copy;
      });
    },
    [config],
  );

  const removeModifier = useCallback(
    (groupIndex: number, modifierIndex: number) => {
      setConfig((existing) => {
        const copy = { ...existing };
        copy.groups[groupIndex].modifiers.splice(modifierIndex, 1);
        return copy;
      });
    },
    [config],
  );

  const changeModifier = useCallback(
    (groupIndex: number, modifierIndex: number, amount: number) => {
      setConfig((existing) => {
        const copy = { ...existing };
        const modifierConfig = copy.groups[groupIndex].modifiers[modifierIndex];
        copy.groups[groupIndex].modifiers.splice(modifierIndex, 1, { ...modifierConfig, amount });
        return copy;
      });
    },
    [config],
  );

  const changeHasSum = useCallback(
    (groupIndex: number, hasSum: boolean) => {
      setConfig((existing) => {
        const copy = { ...existing };
        copy.groups[groupIndex].hasSum = hasSum;
        copy.groups[groupIndex].modifiers = [];
        return copy;
      });
    },
    [config],
  );

  const renameGroup = useCallback(
    (groupIndex: number, name: string) => {
      setConfig((existing) => {
        const copy = { ...existing };
        copy.groups[groupIndex].name = name;
        return copy;
      });
    },
    [config],
  );

  const toggleVisible = useCallback(() => {
    setConfig((existing) => {
      const copy = { ...existing };
      copy.showConfig = !config.showConfig;
      return copy;
    });
  }, [config]);

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
                    editable={{ onChange: (value) => renameGroup(groupIndex, value) }}
                  >
                    {group.name}
                  </Typography.Title>
                }
                extra={
                  <Button danger onClick={() => removeGroup(groupIndex)}>
                    <DeleteOutlined />
                  </Button>
                }
              >
                <Row gutter={[12, 16]} align="middle" justify="space-between">
                  <Col>Sum results</Col>
                  <Col>
                    <Switch
                      checked={group.hasSum}
                      onChange={(value) => changeHasSum(groupIndex, value)}
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
                          onChange={(value) => changeNumberOfDices(groupIndex, dieIndex, value)}
                        />
                      </Col>
                      <Col>Dice</Col>
                      <Col>
                        <Select
                          value={die.die}
                          options={dieOptions}
                          onChange={(value) => changeDie(groupIndex, dieIndex, value)}
                        />
                      </Col>
                      <Col>Sided</Col>
                      <Col>
                        <Button danger onClick={() => removeDie(groupIndex, dieIndex)}>
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
                          onChange={(value) => changeModifier(groupIndex, modifierIndex, +value)}
                        />
                      </Col>
                      <Col>
                        <Button danger onClick={() => removeModifier(groupIndex, modifierIndex)}>
                          <DeleteOutlined />
                        </Button>
                      </Col>
                    </Row>
                  );
                })}

                <Row gutter={20}>
                  <Col>
                    <Button onClick={() => addDie(groupIndex)}>Add Dice</Button>
                  </Col>

                  {group.hasSum ? (
                    <Col>
                      <Button onClick={() => addModifier(groupIndex)}>Add a Modifier</Button>
                    </Col>
                  ) : null}
                </Row>
              </Card>
            );
          })}
          <Row justify="center" style={{ marginTop: 10, marginBottom: 20 }}>
            <Button onClick={addGroup}>Add a Group</Button>
          </Row>
        </div>
      ) : null}
    </div>
  );
};

export default DiceConfig;
