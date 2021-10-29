import * as Yup from 'yup';
import { UserContext } from '../services/UserContext';
import { useContext } from 'react';
import { useState } from 'react';
import { formatCurrency, validNumber } from '../services/Utilities';
import TransactionPage from '../components/TransactionPage';

const Withdraw = () => {
  const { users, withdraw } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState({});
  const schema = Yup.object().shape({
    account: Yup.string()
      .oneOf(
        users.map((user) => user.id),
        'Please select a valid account'
      )
      .required(),
    amount: Yup.number()
      .typeError('Please enter a valid, non-negative number')
      .min(0.01, 'Please enter a value above zero')
      .max(
        validNumber(selectedUser.balance)
          ? selectedUser.balance + 100
          : Number.POSITIVE_INFINITY,
        `Please enter a value below ${
          selectedUser.name
        }'s maximum overdraft limit (${formatCurrency(-100)})`
      )
      .required(),
  });

  return (
    <TransactionPage
      validationSchema={schema}
      title={'Make a Withdrawal'}
      transactionType={'Withdraw'}
      submitFunction={withdraw}
      userSelectionSideEffect={(userId) =>
        setSelectedUser(users.find((usr) => usr.id === userId))
      }
    />
  );
};

export default Withdraw;
