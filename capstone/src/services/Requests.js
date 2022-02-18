import ky from 'ky';
import {
  endpoints,
  nodeEnvs,
  URLs,
  methods,
  sessionStorageKeys,
} from '../constants';

// If it's the development environment then use a different API URL
const prefix = process.env.NODE_ENV === nodeEnvs.dev ? URLs.api_dev : '';

const request =
  (endpoint, method, authenticated = false) =>
  async (data) => {
    const request = {};
    if (data) {
      request.json = { ...data };
    }
    if (authenticated) {
      const token = sessionStorage.getItem(sessionStorageKeys.token);
      if (token) {
        request.headers = { token };
      }
    }
    return ky[method](prefix + endpoint, request).then((response) =>
      response.json()
    );
  };

export const signUp = request(endpoints.auth.sign_up, methods.post);

export const login = request(endpoints.auth.login, methods.post);

export const logout = request(endpoints.auth.logout, methods.post, true);

export const getUserData = request(endpoints.user, methods.get, true);

export const updateUserData = request(endpoints.user, methods.patch, true);

export const getTransactions = request(
  endpoints.transactions,
  methods.get,
  true
);

export const postTransaction = request(
  endpoints.transactions,
  methods.patch,
  true
);
