import * as Yup from 'yup';
import { UserContext } from '../services/UserContext';
import { useContext } from 'react';
import TransactionPage from '../components/TransactionPage';

const Deposit = () => {
  const { transact } = useContext(UserContext);
  const schema = Yup.object().shape({
    account: Yup.string().required(),
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
      submitFunction={transact}
    />
  );
};

export default Deposit;
