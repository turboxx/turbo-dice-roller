import React from 'react';
import { GroupRoll } from '../../types';
import { Col, Row } from 'antd';

const gutter: [number, number] = [20, 10];

type Props = {
  groupRolls: GroupRoll[];
};

const DiceRolls = ({ groupRolls }: Props) => {
  return (
    <div>
      {groupRolls.map((group, groupIndex) => {
        return (
          <div key={groupIndex}>
            Group {groupIndex}
            <Row gutter={gutter}>
              {group.rolls.map(({ roll, die }, rollIndex) => {
                return (
                  <>
                    <Col>
                      <b>{roll}</b> ({die})
                    </Col>
                  </>
                );
              })}
              {group.hasSum ? (
                <Col>
                  Sum(<b>{group.sum}</b>)
                </Col>
              ) : null}
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default DiceRolls;
