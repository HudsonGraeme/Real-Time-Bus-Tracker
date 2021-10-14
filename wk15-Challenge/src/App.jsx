import './App.css';
import React, { useState, useEffect } from 'react';
import RecallList from './components/RecallList';
import Dropdown from './components/Dropdown';
import { STAGES } from './helpers/constants';

const Main = () => {
    const [data, setData] = useState({ ...STAGES });
    const [currentStage, setCurrentStage] = useState(STAGES.year);
    const [init, setInit] = useState(false);
    const [inputStates, setInputStates] = useState({
        year: false,
        make: true,
        model: true,
    });

    useEffect(() => {
        console.log(data);
        if (
            currentStage.name === STAGES.year.name &&
            (!data.year || !data.year.dataset) &&
            !init
        ) {
            const getData = async () => {
                const res = await currentStage.getDataset();
                setData((d) => ({
                    ...d,
                    [currentStage.name]: {
                        ...currentStage,
                        dataset: res,
                    },
                }));
            };
            setInit(true);
            getData();
        }
    }, [currentStage, data.year, data, init]);

    useEffect(
        () => setCurrentStage(data[currentStage.name]),
        [data, currentStage.name]
    );

    const enableIfDisabled = (e) => {
        if ([...e.target.classList].includes('disabled')) {
            setInputStates((current) => ({ ...current, year: false }));
        }
    };

    return (
        <div className="App">
            <h1>Vehicle Recall Finder</h1>
            {Object.keys(STAGES).map((stage) => (
                <Dropdown stage={STAGES[stage]} />
            ))}
            <RecallList make={'tesla'} model={'model y'} year={2020} />
        </div>
    );
};

export default Main;
