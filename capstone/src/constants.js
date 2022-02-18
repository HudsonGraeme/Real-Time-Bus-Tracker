import React from 'react';
const HomePage = React.lazy(() => import('./pages/HomePage'));
const Withdraw = React.lazy(() => import('./pages/Withdraw'));
const CreateAccount = React.lazy(() => import('./pages/CreateAccount'));
const Deposit = React.lazy(() => import('./pages/Deposit'));
const AllData = React.lazy(() => import('./pages/AllData'));
const Login = React.lazy(() => import('./pages/Login'));
const Logout = React.lazy(() => import('./pages/Logout'));

export const routes = {
  home: {
    name: 'Home',
    path: '/',
    description: `Our homepage`,
    component: <HomePage />,
    walled: false,
  },
  withdraw: {
    name: 'Withdraw',
    path: '/withdraw',
    description: `Make a withdrawal`,
    component: <Withdraw />,
    walled: true,
  },
  deposit: {
    name: 'Deposit',
    path: '/deposit',
    description: `Make a deposit`,
    component: <Deposit />,
    walled: true,
  },
  data: {
    name: 'My Data',
    path: '/data',
    description: `View all of your data`,
    component: <AllData />,
    walled: true,
  },
  create_account: {
    name: 'Create Account',
    path: '/create-account',
    description: `Create an account`,
    component: <CreateAccount />,
    walled: false,
  },
  login: {
    name: 'Login',
    path: '/login',
    description: 'Log into the bank',
    component: <Login />,
    walled: false,
  },
  logout: {
    name: 'Logout',
    path: '/logout',
    description: 'Log out of the bank',
    component: <Logout />,
    walled: true,
  },
};

export const endpoints = {
  auth: {
    sign_up: '/auth/signup',
    login: '/auth/login',
    logout: '/auth/logout',
  },
  user: '/me',
  transactions: '/transactions',
};

export const methods = {
  post: 'post',
  get: 'get',
  patch: 'patch',
  delete: 'delete',
  put: 'put',
};

export const nodeEnvs = {
  ci: 'ci',
  dev: 'development',
  prod: 'production',
};

export const URLs = {
  api_dev: 'http://localhost:3000',
};

export const sessionStorageKeys = {
  token: 'token',
};
