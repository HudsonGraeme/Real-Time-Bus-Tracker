import { get, startCase, toLower } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Button, Card, Col, Table, Row } from 'react-bootstrap';
import { UserContext } from '../services/UserContext';
import { formatCurrency, formatDate } from '../services/Utilities';
import { Link } from 'react-router-dom';
import { routes } from '../constants';
import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import '../styles/AllData.css';

ChartJS.register(
  CategoryScale,
  TimeScale,
  PointElement,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const AllData = () => {
  const { user } = useContext(UserContext);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const transactionsReversed = get(user, 'transactions', []).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setChartData({
      labels: transactionsReversed.map((t) => formatDate(new Date(t.date))),
      datasets: [
        {
          label: 'Running Balance',
          data: transactionsReversed.map((t) => t.runningBalance),
          borderColor: '#f88',
          backgroundColor: '#f88',
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
        },
        {
          label: 'Transaction value',
          data: transactionsReversed.map((t) => t.value),
          borderColor: '#8888ff',
          backgroundColor: '#8888bb',
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
        },
      ],
    });
  }, [user]);

  const renderUserCard = () => (
    <Card key={`user-card-${user.name}`} className="m-4 p-4">
      <Card.Title>
        <h2>{`${user.first_name} ${user.last_name}`}</h2>
      </Card.Title>
      <Card.Body>
        <h4 className="text-left">Recent Transactions</h4>
        <Line
          options={options}
          data={chartData}
          height="50%"
          maintainAspectRatio="false"
        />
        <div>
          <Table>
            <thead>
              <tr>
                {((user.transactions || []).length
                  ? Object.keys(user.transactions[0])
                  : ['Date', 'Value', 'Running Balance']
                )
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
                    transaction.type === 'WITHDRAW' ? '-' : '+'
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
                        className={`${
                          value.charAt(0) === '-'
                            ? 'text-danger'
                            : value.charAt(0) === '+'
                            ? 'text-success'
                            : ''
                        }`}
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
    </Card>
  );

  const renderEmptyCard = () => (
    <Card className="m-4 p-5">
      <Card.Title>No Data Exists</Card.Title>
      <Card.Body className="mb-3">
        Navigate to the Create Account page to add a user
      </Card.Body>
      <Button as={Link} to={routes.create_account.path}>
        Create a new account
      </Button>
    </Card>
  );

  return (
    <Row md={1} className="m-5">
      {Object.keys(user).length ? (
        <Col>{renderUserCard()}</Col>
      ) : (
        <Col>{renderEmptyCard()}</Col>
      )}
    </Row>
  );
};

export default AllData;
