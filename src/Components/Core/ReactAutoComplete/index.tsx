/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef, useEffect } from 'react'
import Autosuggest from 'react-autosuggest';
import { Input, InputHeading } from '@Components'
import { ReactAutoCompleteProp } from './interfaces'
import './custom.css'

// const data = [
//     { id: 1, title: 'Dummy one', value: 'Dummy Value 1' },
//     { id: 2, title: 'Dummy onee', value: 'Dummy Value 2' },
//     { id: 3, title: 'Dummy oneee', value: 'Dummy Value 3' },
//     { id: 4, title: 'Dummy oneeee', value: 'Dummy Value 4' },
//     { id: 5, title: 'Dummy oneeeee', value: 'Dummy Value 5' },
//     { id: 6, title: 'Dummy oneeeeee', value: 'Dummy Value 6' },
// ];

function ReactAutoComplete({ isMandatory, heading, placeholder, data, state, onAdd, ...rest }: ReactAutoCompleteProp) {
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState<any>([])
    const [addValue, setAddValue] = useState<any>('')

    

    const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const getSuggestions = value => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');
        const suggestions = data.filter(each => regex.test(each.name)).slice(0,5);

        if (suggestions.length < 5) {
            return [
                ...suggestions, { isAddNew: true }
            ];
        }

        return suggestions;
    }


    const renderInputComponent = inputProps => (
        <Input  {...inputProps} />
    );

    const onSuggestionsFetchRequested = ({ value }) => {
        console.log(suggestions, "suggestions");
        setSuggestions(getSuggestions(value))
    };

    const onChange = (event, { newValue, method }) => {
        console.log(newValue + '===newValue');

        setValue(newValue)
    };

    const inputProps = {
        placeholder,
        value,
        onChange,
    };

    const onSuggestionsClearRequested = () => {
        // setSuggestions([])
    };



    const renderSuggestion = suggestion => {

        const isExist = suggestion.isAddNew === undefined;
        if(!isExist){
            setAddValue(value)
        }
        console.log(addValue, 'check');
        
        

        return (
            <div className='ml--2'>
                {
                    isExist && <span className='h5'>{suggestion.name}</span>
                }
                {
                    !isExist && <h3 className='text-primary align-items-center mb-0' onClick={() => {
                        console.log(addValue, "check2");
                        
                        onAdd(addValue)}}>{"ADD NEW"}</h3>
                }
            </div>
        )

    };

    const onSuggestionSelected = (event, { suggestion }) => {
        
        if (suggestion.isAddNew) {
            console.log('Add new:', value);
            state(value)
        }
        else {
            state(suggestion)
        }
    };

    const getSuggestionValue = (suggestion: any) => {
        console.log(suggestion);


        if (suggestion.isAddNew) {
            
            return value;
        }
        return suggestion.name;
    };

    return (
        <div>
            <InputHeading heading={heading} isMandatory={isMandatory} />
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                onSuggestionSelected={onSuggestionSelected}
                renderInputComponent={renderInputComponent}
                inputProps={inputProps}
            />
        </div>
    )
}

export { ReactAutoComplete }