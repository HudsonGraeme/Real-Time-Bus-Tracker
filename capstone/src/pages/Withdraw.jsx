import * as Yup from 'yup';
import { UserContext } from '../services/UserContext';
import { useContext } from 'react';
import { formatCurrency, validNumber } from '../services/Utilities';
import TransactionPage from '../components/TransactionPage';
import capitalize from 'lodash/capitalize';

const Withdraw = () => {
  const { user } = useContext(UserContext);
  const schema = Yup.object().shape({
    account: Yup.string().required(),
    amount: Yup.number()
      .typeError('Please enter a valid, non-negative number')
      .min(0.01, 'Please enter a value above zero')
      .max(
        validNumber(user.balance)
          ? user.balance + 100
          : Number.POSITIVE_INFINITY,
        `Please enter a value below ${capitalize(
          user.name
        )}'s maximum overdraft limit (${formatCurrency(-100)})`
      )
      .required(),
  });

  return (
    <TransactionPage
      validationSchema={schema}
      title={'Make a Withdrawal'}
      transactionType={'Withdraw'}
    />
  );
};

export default Withdraw;
