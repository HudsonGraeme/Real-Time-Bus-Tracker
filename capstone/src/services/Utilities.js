import toLower from 'lodash/toLower';
import startCase from 'lodash/startCase';

const numberFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
});

const dateFormatter = new Intl.DateTimeFormat('default', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});

/**
 * Provides an interface to convert balances into formatted currency strings for display
 * @param {Number} number The number to be formatted
 * @returns {String} A formatted currency string
 */
const formatCurrency = (number) => {
  const float = parseFloat(number);
  return numberFormatter.format(float);
};

/**
 * Formats the provided Date into a string
 * @param {Date} date The date to be formatted
 * @returns {String} A formatter datetime string
 */
const formatDate = (date) => {
  return dateFormatter.format(date);
};

/**
 * Determines whether or not a number exists (0 is truthy, null isn't)
 * @param {Number} number The number that will be checked for a non existent value
 * @returns {Boolean} True or false depending if the number exists or not
 */
const validNumber = (number) => number || number === 0;

/**
 * Capitalize each word in a string
 * @param {String} str The string containing separate words that need to be capitalized
 * @returns {String} The input string where each word is lowercased except for the first character, which is uppercased
 */
const capitalizeEachWord = (str) => startCase(toLower(str));

export { formatCurrency, validNumber, formatDate, capitalizeEachWord };
