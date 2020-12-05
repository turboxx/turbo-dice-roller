import '../styles/global.css';
import { AppProps } from 'next/app';

import "../styles/antd.less";


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
