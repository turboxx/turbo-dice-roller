import React from 'react';
import { GroupRoll } from '../../types';
import { Card, Col, Empty, Row, Typography } from 'antd';

const gutter: [number, number] = [20, 10];

type Props = {
  groupRolls: GroupRoll[];
};

const DiceRolls = ({ groupRolls }: Props) => {
  if (!groupRolls?.length) return <Empty />;
  return (
    <>
      <Row justify="center">
        <Typography.Title level={2}>Rolls</Typography.Title>
      </Row>
      {groupRolls.map((group, groupIndex) => {
        return group.rolls.length ? (
          <Row gutter={gutter} justify="space-around">
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
                {group.rolls.map(({ roll, die }) => {
                  return (
                    <Col>
                      <Typography.Text strong style={{ fontSize: !group.config.hasSum ? 40 : 26 }}>
                        {roll}
                      </Typography.Text>
                      <Typography.Text> ({die})</Typography.Text>
                    </Col>
                  );
                })}
                {group.config.hasSum
                  ? group.config.modifiers?.map(({ amount }) => {
                      return (
                        <Col>
                          <Typography.Text style={{ fontSize: 26 }}>
                            {amount > 1 ? '+' : ''}
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
      })}
    </>
  );
};

export default DiceRolls;
