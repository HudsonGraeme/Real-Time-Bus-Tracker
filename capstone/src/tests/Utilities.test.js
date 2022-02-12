import * as Utilties from '../services/Utilities';

test('formatCurrency', () => {
  expect(Utilties.formatCurrency(100)).toEqual('$100.00');
  expect(Utilties.formatCurrency('100')).toEqual('$100.00');
  expect(Utilties.formatCurrency(-100.222222222)).toEqual('-$100.22');
});

test('formatDate', () => {
  expect(Utilties.formatDate(Date.parse('2021-10-29T03:03:03.079Z'))).toEqual(
    '10/28/2021, 11:03:03 PM'
  );
});

test('validNumber', () => {
  expect(Utilties.validNumber(0)).toBeTruthy();
  expect(Utilties.validNumber(null)).toBeFalsy();
  expect(Utilties.validNumber(1)).toBeTruthy();
});
