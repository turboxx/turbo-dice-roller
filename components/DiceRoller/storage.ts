import { RollerConfig } from './types';

const CONFIG_PARAM = 'config';

export const sanitizeUrlParam = (asPath: string) =>
  asPath.replace('/', '').replace(`?${CONFIG_PARAM}=`, '');

export const extractUrlParam = (configParam: string): RollerConfig | null => {
  const decoded = decodeURIComponent(configParam).replace(/\+/g, ' '); // urls don't like spaces and decode to +
  try {
    const parsed = JSON.parse(decoded);

    return parsed;
  } catch (e) {
    return null;
  }
};

export const createUrlParam = (config: RollerConfig) => ({
  query: {
    [CONFIG_PARAM]: JSON.stringify(config),
  },
});

export const getUrlForConfig = (config: RollerConfig) => {
  const { protocol, hostname, port } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}/?${CONFIG_PARAM}=${encodeURIComponent(
    JSON.stringify(config),
  )}`;
};

export const copyToClipboard = (str: string) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
