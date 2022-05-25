import React from 'react';
const HomePage = React.lazy(() => import('./pages/HomePage'));
const Withdraw = React.lazy(() => import('./pages/Withdraw'));
const CreateAccount = React.lazy(() => import('./pages/CreateAccount'));
const Deposit = React.lazy(() => import('./pages/Deposit'));
const AllData = React.lazy(() => import('./pages/AllData'));

export const routes = [
  {
    name: 'Home',
    path: '/',
    description: `Our homepage`,
    component: <HomePage />,
  },
  {
    name: 'Withdraw',
    path: '/withdraw',
    description: `Make a withdrawal`,
    component: <Withdraw />,
  },
  {
    name: 'Deposit',
    path: '/deposit',
    description: `Make a deposit`,
    component: <Deposit />,
  },
  {
    name: 'Create Account',
    path: '/create-account',
    description: `Create an account`,
    component: <CreateAccount />,
  },
  {
    name: 'All Data',
    path: '/alldata',
    description: `View all of your data`,
    component: <AllData />,
  },
];

export const sessionStorageKeys = {
  users: 'users',
};
