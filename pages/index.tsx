import Head from 'next/head';
import { Row, Layout, message } from 'antd';
import DiceRoller from '../components/DiceRoller';
import { useRouter } from 'next/router';
import { RollerConfig } from '../components/DiceRoller/types';
import { useEffect, useState } from 'react';

const title = 'Turbo Dice Roller';

const defaultConfig: RollerConfig = {
  showConfig: true,
  groups: [
    {
      hasSum: 0,
      name: '',
      dices: [
        {
          die: 20,
          numberOfDices: 1,
        },
      ],
    },
  ],
};

export default function Home() {
  const router = useRouter();
  const configParam = router.asPath.replace('/', '').replace('?config=', '');
  const [initiated, setInitiated] = useState(false);
  const [rollerConfig, setRollerConfig] = useState<RollerConfig>(defaultConfig);

  useEffect(() => {
    if (configParam) {
      try {
        const decoded = decodeURIComponent(configParam);
        setRollerConfig(JSON.parse(decoded.replace(/\+/g, ' ')));
      } catch (e) {
        message.error('Failed to load config from url 😢');
        console.error(e);
        setRollerConfig(defaultConfig);
      }
    }
    setInitiated(true);
  }, []);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={title} />
      </Head>
      <section>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          {initiated ? <DiceRoller rollerConfig={rollerConfig} /> : null}
        </Row>
      </section>
    </Layout>
  );
}
