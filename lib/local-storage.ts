const prefix = 'theme-hvcore';

export const lsKeys = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  SITESETTINGS: 'site-settings',
};

const isBrowser = typeof window !== 'undefined';

const _safeParse = (value: any) => {
  if (!value || value === 'undefined') return null;

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
    return null;
  }
};

export const get = (key: string) => {
  if (!isBrowser) return null; // Kiểm tra nếu đang chạy trên server
  const fullKey = `${prefix}.${key}`;

  try {
    const value = localStorage.getItem(fullKey);
    return _safeParse(value);
  } catch (error) {
    console.error('Error getting value from localStorage:', error);
    return null;
  }
};

export const set = (key: string, value: any) => {
  if (!isBrowser) return;
  const fullKey = `${prefix}.${key}`;

  try {
    localStorage.setItem(fullKey, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting value in localStorage:', error);
  }
};

export const clear = () => {
  if (!isBrowser) return;

  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export const remove = (key: string) => {
  if (!isBrowser) return;
  const fullKey = `${prefix}.${key}`;

  try {
    localStorage.removeItem(fullKey);
  } catch (error) {
    console.error('Error removing value from localStorage:', error);
  }
};

const ls = { get, set, remove, clear };

export default ls;
