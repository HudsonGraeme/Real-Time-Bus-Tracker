import { startCase, toLower } from 'lodash';
import React from 'react';
import { useContext } from 'react';
import { Button, Card, Col, Table, Row } from 'react-bootstrap';
import { UserContext } from '../services/UserContext';
import { formatCurrency, formatDate } from '../services/Utilities';
import { Link } from 'react-router-dom';
import { routes } from '../constants';
import '../styles/AllData.css';

const AllData = () => {
  const { users, deleteUser } = useContext(UserContext);

  const renderUserCard = (user) => (
    <Card key={`user-card-${user.name}`} className="m-4 p-4">
      <Card.Title>
        <h2>{user.name}</h2>
      </Card.Title>
      <Card.Body>
        <h4 className="text-left">Recent Transactions</h4>
        <div className="alldata__table-scroll">
          <Table>
            <thead>
              <tr>
                {Object.keys(user.transactions[0])
                  .map((header) =>
                    header === 'runningBalance' ? 'Running Balance' : header
                  )
                  .map((key) => (
                    <th key={`table-header-alldata-${key}`}>
                      {
                        startCase(
                          toLower(key)
                        ) /* Very cool! https://stackoverflow.com/a/38084493/10538100 */
                      }
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {user.transactions
                .map((transaction) => ({
                  ...transaction,
                  date: formatDate(Date.parse(transaction.date)),
                  value: `${
                    transaction.type === 'Withdrawal' ? '-' : '+'
                  }${formatCurrency(Math.abs(transaction.value))}`,
                  runningBalance: `${
                    transaction.runningBalance < 0 ? '-' : '+'
                  }${formatCurrency(Math.abs(transaction.runningBalance))}`,
                }))
                .map((transaction) => (
                  <tr key={`transaction-row-${transaction.date}-${user.id}`}>
                    {Object.values(transaction).map((value) => (
                      <td
                        key={`transaction-row-column-${value}-${user.id}-${transaction.date}`}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>

        <h5 className="mt-4">
          Current Balance: {formatCurrency(user.balance)}
        </h5>
      </Card.Body>
      <Button variant="danger" onClick={() => deleteUser(user.id)}>
        Delete User
      </Button>
    </Card>
  );

  const renderUserCards = () =>
    users.map((user) => (
      <Col key={`card-column-${user.id}`}>{renderUserCard(user)}</Col>
    ));

  const renderEmptyCard = () => (
    <Card className="m-4 p-5">
      <Card.Title>No Data Exists</Card.Title>
      <Card.Body className="mb-3">
        Navigate to the Create Account page to add a user
      </Card.Body>
      <Button
        as={Link}
        to={routes.find((route) => route.name === 'Create Account').path}
      >
        Create a new account
      </Button>
    </Card>
  );

  return (
    <Row md={1} xl={2} className="g-4 pb-5">
      {users.length ? renderUserCards() : <Col>{renderEmptyCard()}</Col>}
    </Row>
  );
};

export default AllData;
