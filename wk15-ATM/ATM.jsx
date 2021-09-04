const currency = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
});

const ATMDeposit = ({
    onChange,
    onClick,
    isDeposit,
    isValid,
    valueEntered,
}) => {
    const choice = ['Deposit', 'Withdraw'];
    return (
        <div className="atm">
            <h3> {choice[Number(!isDeposit)]}</h3>
            <input
                className="number-input"
                id="number-input"
                type="number"
                width="200"
                onChange={onChange}
                value={valueEntered}
            />
            <button className="submit" onClick={onClick} disabled={!isValid}>
                {(isDeposit ? 'Deposit' : 'Withdraw') +
                    ' ' +
                    (isValid ? currency.format(valueEntered) : '')}
            </button>
        </div>
    );
};

const TransactionType = (props) => (
    <select
        onChange={props.onChange}
        name="mode"
        defaultValue={props.defaultValue}
        id="mode-select"
        value={props.selectedOption}
    >
        {props.children}
    </select>
);

const TransactionLog = (props) => {
    const formatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return (
        <>
            <h1 className="atm">Transaction History</h1>
            <ul className="list-group dark">
                {props.log.map((log) => (
                    <li className="list-group-item dark">
                        <h3 className="text-left">
                            {log.date.toLocaleDateString(
                                'en-CA',
                                formatOptions
                            ) +
                                ' ' +
                                log.date.toLocaleTimeString('en-US')}
                        </h3>
                        <h5 clasName="inline-block">
                            <i>{log.value}</i>
                        </h5>
                        <h3
                            className={`inline-block text-right ${
                                log.runningTotal === 'Unknown' ||
                                log.runningTotal === '$0.00'
                                    ? 'text-danger'
                                    : ''
                            }`}
                        >
                            {log.runningTotal}
                        </h3>
                    </li>
                ))}
            </ul>
        </>
    );
};

const Account = () => {
    const [valueEntered, setValueEntered] = React.useState('');
    const [totalState, setTotalState] = React.useState(0);
    const [atmMode, setAtmMode] = React.useState('');
    const [isDeposit, setIsDeposit] = React.useState(false);
    const [validTransaction, setValidTransaction] = React.useState(false);
    const [numOfTransactions, setNumOfTransactions] = React.useState(0);
    const [message, setMessage] = React.useState(
        'Would you like to deposit or withdraw today?'
    );
    const [transactionLog, setTransactionLog] = React.useState([]);

    let status = `Account Balance ${
        !isNaN(totalState) ? currency.format(totalState) : currency.format(0)
    } `;

    const handleChange = (event) => {
        setValueEntered(event.target.value);
    };

    React.useEffect(() => {
        if (
            isNaN(valueEntered) ||
            Number(valueEntered) <= 0 ||
            (atmMode === 'Withdraw' && Number(valueEntered) > totalState) ||
            valueEntered.length >= 18
        ) {
            setValidTransaction(false);
            return;
        }
        setValidTransaction(true);
    }, [valueEntered]);

    const onClick = (event) => {
        event.preventDefault();
        setNumOfTransactions((num) => (num += 1));
        const value = Number(valueEntered).toFixed(2);
        let newTotal = isDeposit
            ? totalState + Number(value)
            : totalState - Number(value);
        setTotalState(newTotal);
        setValueEntered('');
        setTransactionLog((log) => [
            ...log,
            {
                date: new Date(),
                value: (isDeposit ? '+' : '-') + value,
                runningTotal: !isNaN(newTotal)
                    ? currency.format(Number(newTotal))
                    : 'Unknown',
            },
        ]);
    };

    const handleModeSelect = (e) => {
        if (e.target.value === 'Deposit') {
            setIsDeposit(true);
        } else {
            setIsDeposit(false);
        }
        setAtmMode(e.target.value);
    };

    React.useEffect(() => {
        if (totalState <= 0 && numOfTransactions > 0) {
            setMessage('Would you like to make a deposit today?');
            setAtmMode('Deposit');
            setIsDeposit(true);
        } else if (totalState <= 0) {
            setMessage(
                'Welcome to reactATM! Please make a deposit to continue.'
            );
            setIsDeposit(true);
            setAtmMode('Deposit');
        } else {
            setMessage('Would you like to deposit or withdraw today?');
        }
    }, [totalState]);

    return (
        <>
            <img src="atm.svg" />
            <h2 id="total">{status}</h2>
            <p>{message}</p>
            <TransactionType
                defaultValue={totalState <= 0 && 'Deposit'}
                onChange={(e) => handleModeSelect(e)}
                selectedOption={atmMode}
            >
                <option id="no-selection" value="">
                    Select
                </option>
                <option id="deposit-selection" value="Deposit">
                    Deposit
                </option>
                <option
                    disabled={totalState <= 0}
                    id="withdraw-selection"
                    value="Withdraw"
                >
                    Withdraw
                </option>
            </TransactionType>
            {!!atmMode && (
                <ATMDeposit
                    valueEntered={valueEntered}
                    onChange={handleChange}
                    onClick={onClick}
                    isValid={validTransaction}
                    isDeposit={isDeposit}
                ></ATMDeposit>
            )}
            <TransactionLog log={transactionLog} />
        </>
    );
};

ReactDOM.render(<Account />, document.getElementById('root'));
