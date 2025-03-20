const prefix = 'ai-generator-hub';

export const lsKeys = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  PERMISSION: 'role',
  SITE: 'siteId',
  INFO_PAYMENT: 'infoPayment',
  OUTLINE: 'outline',
};

const _safeParse = (value: any) => {
  if (!value || value === 'undefined') return null;

  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
};

export const get = (key: string) => {
  const fullKey = `${prefix}.${key}`;

  const value = localStorage?.getItem(fullKey);
  return _safeParse(value);
};

export const set = (key: string, value: any) => {
  const fullKey = `${prefix}.${key}`;
  const vValue = JSON.stringify(value);

  return localStorage.setItem(fullKey, vValue);
};

export const clear = () => {
  return localStorage.clear();
};

export const remove = (key: string) => {
  return localStorage.removeItem(`${prefix}.${key}`);
};

const ls = { get, set, remove, clear };

export default ls;
