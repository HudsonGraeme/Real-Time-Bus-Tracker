import * as Yup from 'yup';
import { UserContext } from '../services/UserContext';
import { useContext } from 'react';
import TransactionPage from '../components/TransactionPage';

const Deposit = () => {
  const { users, deposit } = useContext(UserContext);
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
      .required(),
  });

  return (
    <TransactionPage
      title="Make a Deposit"
      transactionType={'Deposit'}
      validationSchema={schema}
      submitFunction={deposit}
    />
  );
};

export default Deposit;
