import React from 'react';

const RecallDetailCell = ({ recall }) => (
    <div className="detail-cell">
        <h2>
            {'Campaign '}
            {recall.NHTSACampaignNumber}{' '}
            {recall.NHTSAActionNumber && `/ Action ${recall.NHTSAActionNumber}`}
        </h2>
        <div className="inline detail">
            <h3>Date Reported</h3>
            <p>{recall.ReportReceivedDate}</p>
        </div>
        <div className="inline detail">
            <h3>Component</h3>
            <p>{recall.Component}</p>
        </div>
        <h3>Summary</h3>
        <p>{recall.Summary}</p>
        <h3>Consequence</h3>
        <p>{recall.Conequence}</p> {/* Lol yes, they did spell it wrong */}
        <h3>Remedy</h3>
        <p>{recall.Remedy}</p>
        <h3>Notes</h3>
        <p>{recall.Notes}</p>
    </div>
);
export default RecallDetailCell;
