
import React, { useState } from 'react';
import { Input } from 'antd';


const SuggestionsList = props => {
    const {
        suggestions,
        inputValue,
        onSelectSuggestion,
        displaySuggestions,
        selectedSuggestion
    } = props;

    if (inputValue && displaySuggestions) {
        if (suggestions.length > 0) {
            return (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => {
                        const isSelected = selectedSuggestion === index;
                        const classname = `suggestion ${isSelected ? "selected" : ""}`;
                        return (
                            <li
                                key={index}
                                className={classname}
                                onClick={() => onSelectSuggestion(index)}
                            >
                                {suggestion}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            return <div>No suggestions available...</div>;
        }
    }
    return <></>;
};

export const Autocomplete = ({ projects, setProjectOuterId, projectOuterId }) => {
    const [inputValue, setInputValue] = React.useState("");
    const [filteredSuggestions, setFilteredSuggestions] = React.useState([]);
    const [mainfilteredSuggestions, setMainFilteredSuggestions] = React.useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = React.useState(0);
    const [displaySuggestions, setDisplaySuggestions] = React.useState(false);


    var labels = projects.map((item) => {
        return `${item.projects.name}|${item.projects.id}`
    })

    const onChange = event => {
        const value = event.target.value;
        setInputValue(value);
        const filteredSuggestions = labels.filter(suggestion =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );

        var lbls = labels.map((item) => {
            return item.split("|")[0];
        });

        const mainfilteredSuggestions = lbls.filter(suggestion =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredSuggestions(filteredSuggestions);
        setMainFilteredSuggestions(mainfilteredSuggestions)
        setDisplaySuggestions(true);
        console.log(displaySuggestions);
    };

    const onSelectSuggestion = index => {
        setSelectedSuggestion(index);
        // labels = labels.map((item) => {
        //     return item.split("|")[0];
        // });

        console.log(filteredSuggestions[index]);
        setInputValue(filteredSuggestions[index].split("|")[0]);
        setFilteredSuggestions([]);
        setDisplaySuggestions(false);
        setProjectOuterId(filteredSuggestions[index].split("|")[1]);

    };

    return (
        <>
            <Input placeholder='Select Project'
                type="text"
                className='rounded-0 py-2'
                onChange={onChange}
                value={inputValue} />
            <SuggestionsList
                inputValue={inputValue}
                selectedSuggestion={selectedSuggestion}
                onSelectSuggestion={onSelectSuggestion}
                displaySuggestions={displaySuggestions}
                suggestions={mainfilteredSuggestions}
            />
        </>
    );
};
