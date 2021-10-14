import React, { useState, useEffect, useCallback } from 'react';
import RecallDetailCell from './RecallCell';
import { uppercaseFirst } from '../helpers/utils';
import { URLs } from '../helpers/constants';

const RecallList = ({ make, model, year }) => {
    const [recalls, setRecalls] = useState([]);

    const fetchRecalls = useCallback(() => {
        fetch(URLs.recalls(make, model, year))
            .then((r) => r.json())
            .then((json) => {
                setRecalls(json.results);
            });
    }, [make, model, year]);

    useEffect(() => {
        if (!recalls.length) {
            fetchRecalls();
        }
    }, [recalls, fetchRecalls]);

    return (
        <div>
            <h1 className="inline">{`Recalls for the ${year} ${uppercaseFirst(
                make
            )} ${model
                .split(' ')
                .map((str) => uppercaseFirst(str))
                .join(' ')}`}</h1>
            <button
                className="open-button inline"
                onClick={() =>
                    (window.location.href = `https://www.nhtsa.gov/vehicle/${year}/${make.toUpperCase()}/${model.toUpperCase()}#recalls`)
                }
            >
                View on the NHTSA site
            </button>
            <hr />
            <div className="recalls-container">
                {recalls.length ? (
                    recalls.map((recall) => (
                        <RecallDetailCell
                            recall={recall}
                            key={`r-${recall.NHTSACampaignNumber}`}
                        />
                    ))
                ) : (
                    <h2>🎉 No Recalls to Display</h2>
                )}
            </div>
        </div>
    );
};

export default RecallList;
