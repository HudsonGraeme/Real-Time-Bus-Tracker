import { createContext } from 'react';
import { useReducer } from 'react';
import { sessionStorageKeys } from '../constants';
import { v4 as uuidv4 } from 'uuid';
import ky from 'ky';
const UserContext = createContext();

const KEYS = {
  ADD_USER: 'ADD_USER',
  WITHDRAW: 'WITHDRAW',
  DEPOSIT: 'DEPOSIT',
  DELETE_USER: 'DELETE_USER',
};

/**
 * Update state with a new transaction
 * @param {Array} state The state of all users at the moment
 * @param {String} type The type of transaction. One of "WITHDRAW" or "DEPOSIT" (Defined in KEYS)
 * @param {String} userId The UUID of the user to be updated
 * @param {Number} value The value of the transaction. If the type is a withdrawal, this value is subtracted rather than added
 * @returns {Array} An updated version of the provided state object, containing the new transaction with a new balance for the modified user
 */
const commitTransaction = (state, type, userId, value) => {
  const user = state.find((usr) => usr.id === userId);
  const floatValue = parseFloat(value);
  user.balance += type === KEYS.WITHDRAW ? -floatValue : floatValue;
  user.transactions.push({
    type: type === KEYS.WITHDRAW ? 'Withdrawal' : 'Deposit',
    value,
    date: new Date(),
    runningBalance: user.balance,
  });
  return [...state.filter((usr) => usr.id !== userId), user];
};

const userReducer = (state, action) => {
  let newState = state;
  switch (action.type) {
    case KEYS.ADD_USER: {
      // These braces are odd, for some reason eslint doesn't determine scope properly without them. https://stackoverflow.com/questions/33397782/const-already-declared-in-es6-switch-block
      if (!action.user) {
        console.error('Cannot add a user without a user to add');
        break;
      }

      ky.post('/auth/signup', {
        json: {
          ...action.user,
        },
      })
        .then((response) => console.log(response))
        .catch((ex) => console.error(ex));
      // Setup a new user, in addition to the provided info we'll add a default transaction,
      // their starting balance and a unique UUID
      newState = [
        ...state,
        {
          ...action.user,
          id: uuidv4(),
          transactions: [
            {
              type: 'Sign Up Bonus',
              value: 100,
              date: new Date(),
              runningBalance: 100,
            },
          ],
          balance: 100,
        },
      ];
      break;
    }
    case KEYS.WITHDRAW: {
      if (!action.user || !action.value) {
        // No need for validNumber() since no transaction takes place for $0
        console.error('Cannot withdraw without a value or user');
        break;
      }
      newState = commitTransaction(
        state,
        KEYS.WITHDRAW,
        action.user,
        action.value
      );
      break;
    }
    case KEYS.DEPOSIT: {
      if (!action.user || !action.value) {
        console.error('Cannot withdraw without a value or user');
        break;
      }
      newState = commitTransaction(
        state,
        KEYS.DEPOSIT,
        action.user,
        action.value
      );
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

  // After any state update, we'll update session storage so that our data persists
  sessionStorage.setItem(sessionStorageKeys.users, JSON.stringify(newState));
  return newState;
};

const Provider = ({ children }) => {
  const [users, dispatch] = useReducer(
    userReducer,
    JSON.parse(sessionStorage.getItem(sessionStorageKeys.users)) || []
  );

  const withdraw = (user, value) =>
    dispatch({ type: KEYS.WITHDRAW, user, value });

  const deposit = (user, value) =>
    dispatch({ type: KEYS.DEPOSIT, user, value });

  const createUser = (user) => {
    dispatch({ type: KEYS.ADD_USER, user });
  };

  const deleteUser = (user) => {
    dispatch({ type: KEYS.DELETE_USER, user });
  };

  return (
    <UserContext.Provider
      value={{ users, withdraw, deposit, createUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { Provider, UserContext };
