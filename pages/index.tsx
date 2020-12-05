import Head from 'next/head';
import { Col, Row, Layout } from 'antd';
import DiceRoller from '../components/DiceRoller';
import { useRouter } from 'next/router';
import { GroupConfig } from '../components/DiceRoller/types';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const diceParam = router.asPath.replace('/?dice=', '');
  const [initiated, setInitiated] = useState(false);
  const [diceConfig, setDiceConfig] = useState<GroupConfig[]>([]);

  useEffect(() => {
    if (diceParam) {
      try {
        const decoded = decodeURIComponent(diceParam);
        setDiceConfig(JSON.parse(decoded));
      } catch (e) {
        console.log(e);
      }
    }
    setInitiated(true);
  }, []);

  // @ts-ignore
  return (
    <Layout>
      <Head>
        <title>Dices</title>
      </Head>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        {initiated ? <DiceRoller diceConfig={diceConfig} /> : null}
      </Row>
      <section></section>
    </Layout>
  );
}
