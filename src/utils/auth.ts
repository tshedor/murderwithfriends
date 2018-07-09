let disallowedSessionStorage = {};
const tokenKey = 'graphcoolToken';

const getItem = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return disallowedSessionStorage[key];
  }
}

const setItem = (key: string, value: string) => {
  try {
    return localStorage.setItem(key, value);
  } catch (e) {
    disallowedSessionStorage[key] = value;
    return disallowedSessionStorage;
  }
}

const removeItem = (key: string) => {
  try {
    return localStorage.removeItem(key);
  } catch (e) {
    delete disallowedSessionStorage[key];
    return disallowedSessionStorage;
  }
}

export const getToken = () => getItem(tokenKey);
export const setToken = (value) => setItem(tokenKey, value);
export const removeToken = () => removeItem(tokenKey);
