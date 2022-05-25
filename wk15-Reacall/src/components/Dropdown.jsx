import React, { useEffect, useState } from 'react';

const Dropdown = ({ disabled, stage, onSelect, onClick }) => {
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    const [dataset, setDataset] = useState({
        visible: [],
        all: [],
    });

    useEffect(() => {
        console.log(stage);
        if (!stage.dataset) return;
        setDataset({
            all: stage.dataset,
            visible: stage.dataset,
        });
    }, [stage]);

    const onChange = (e) => {
        setInputValue(e.target.value || '');
        if (!e.target.value) {
            setOpen(false);
            return;
        }
        setDataset((set) => ({
            ...set,
            visible: set.all.filter((data) => data.includes(e.target.value)),
        }));
        setOpen(true);
    };

    const checkEnter = (e) => {
        if (e.key === 'Enter') {
            if (dataset.all.includes(e.target.value)) {
                onSelect(e.target.value);
                setOpen(false);
                e.target.blur();
            }
        }
    };

    const dropdownSelection = (value) => {
        setOpen(false);
        setInputValue(value);
        onSelect(value);
    };

    return (
        <div>
            <input
                type="text"
                onClick={onClick}
                className={disabled && 'disabled'}
                placeholder={`Enter a ${stage.name}...`}
                onChange={onChange}
                onKeyDown={checkEnter}
                value={inputValue}
            />
            <div className={`dropdown-values ${open ? 'show' : ''}`}>
                {dataset.visible.map((key) => (
                    <div
                        onClick={() => dropdownSelection(key)}
                        key={`y-${key}`}
                    >
                        {key}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
