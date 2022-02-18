import { createContext, useReducer, useEffect, useCallback } from 'react';
import { routes, sessionStorageKeys } from '../constants';
import { getUserData, login, postTransaction, signUp } from './Requests';
import { capitalizeEachWord } from './Utilities';
import cloneDeep from 'lodash/cloneDeep';

const UserContext = createContext();

const KEYS = {
  LOAD_USER: 'LOAD_USER',
  TRANSACTION: 'TRANSACTION',
  DELETE_USER: 'DELETE_USER',
};

const userReducer = (state, action) => {
  let newState = state;
  switch (action.type) {
    case KEYS.LOAD_USER: {
      // These braces are odd, for some reason eslint doesn't determine scope properly without them. https://stackoverflow.com/questions/33397782/const-already-declared-in-es6-switch-block
      if (!action.user) {
        console.error('Cannot add a user without a user to add');
        break;
      }
      const user = cloneDeep(action.user);
      user.name = capitalizeEachWord(
        [action.first_name, action.last_name].join(' ')
      );
      if (user.token) {
        sessionStorage.setItem(sessionStorageKeys.token, user.token);
      }
      newState = { ...state, ...user };
      break;
    }
    case KEYS.TRANSACTION: {
      if (!action.user || !action.value) {
        console.error('Cannot withdraw without a value or user');
        break;
      }
      newState = { ...state, transactions: action.value };

      break;
    }
    case KEYS.DELETE_USER: {
      if (!action.user) {
        console.error('Cannot remove a user without a username');
        break;
      }
      newState = [...state.filter((usr) => usr.id !== action.user)];
      break;
    }
    default:
      console.error('userReducer called without an action type');
      break;
  }
  return newState;
};

const Provider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {});

  const fetchUser = useCallback(
    () =>
      getUserData()
        .then((user) => dispatch({ type: KEYS.LOAD_USER, user }))
        .catch((err) => console.error('Failed to fetch user data', err)),
    []
  );

  useEffect(fetchUser, [fetchUser]);

  const transact = (value) =>
    postTransaction({
      value,
    })
      .then((transactions) => {
        dispatch({ type: KEYS.TRANSACTION, value: transactions });
        fetchUser();
      })
      .catch((ex) => console.error('Failed to post transaction', ex));

  const createUser = (user) => {
    signUp(user)
      .then((newData) => dispatch({ type: KEYS.LOAD_USER, user: newData }))
      .catch((error) => console.error(error));
  };

  const signin = (user) =>
    login(user).then((newData) =>
      dispatch({ type: KEYS.LOAD_USER, user: newData })
    );

  const deleteUser = (user) => {
    dispatch({ type: KEYS.DELETE_USER, user });
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = routes.login.path;
  };

  const userExists = () =>
    !!Object.keys(user).length ||
    sessionStorage.getItem(sessionStorageKeys.token);

  return (
    <UserContext.Provider
      value={{
        user,
        userExists,
        transact,
        createUser,
        signin,
        deleteUser,
        fetchUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { Provider, UserContext };
