import React from 'react';
import TimeAgo from 'timeago-react';
import { Card, Col, Empty, Row, Typography } from 'antd';

import { RollRound } from '../../types';
import RollResult from './RollResult';

const gutter: [number, number] = [20, 10];

type Props = {
  rolls?: RollRound;
};

const DiceRolls = ({ rolls }: Props) => {
  return (
    <>
      <Row justify="center">
        <Typography.Title level={2}>Rolls</Typography.Title>
      </Row>
      {!rolls?.groupRolls?.length ? (
        <Empty />
      ) : (
        rolls.groupRolls.map((group, groupIndex) => {
          return group.rolls.length ? (
            <Row key={groupIndex} gutter={gutter} justify="space-around">
              <Card
                style={{ width: '100%' }}
                key={groupIndex}
                title={
                  group.config.name ? (
                    <Typography.Title level={4}>{group.config.name}</Typography.Title>
                  ) : null
                }
                extra={
                  group.config.hasSum ? (
                    <Row style={{ width: 100 }} align="middle" justify="space-between">
                      <Col>
                        <Typography.Title style={{ marginBottom: 0 }} level={3}>
                          Sum
                        </Typography.Title>
                      </Col>
                      <Col>
                        <Typography.Title style={{ marginBottom: 0 }} level={3}>
                          {group.sum}
                        </Typography.Title>
                      </Col>
                    </Row>
                  ) : null
                }
              >
                <Row justify="center" gutter={gutter} align="middle">
                  {group.rolls.map(({ roll, die }, rollIndex) => (
                    <Col key={rollIndex}>
                      <RollResult roll={roll} die={die} groupConfig={group.config} />
                    </Col>
                  ))}
                  {group.config.hasSum
                    ? group.config.modifiers?.map(({ amount }, modifierIndex) => {
                        return (
                          <Col key={modifierIndex}>
                            <Typography.Text style={{ fontSize: 26 }}>
                              {amount > 0 ? '+' : ''}
                              {amount}
                            </Typography.Text>
                          </Col>
                        );
                      })
                    : null}
                </Row>
              </Card>
            </Row>
          ) : null;
        })
      )}
      {rolls?.date ? (
        <Row justify="center">
          <TimeAgo datetime={rolls.date} />
        </Row>
      ) : null}
    </>
  );
};

export default DiceRolls;
