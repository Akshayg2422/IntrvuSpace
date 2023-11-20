/* eslint-disable jsx-a11y/alt-text */
import { Input, InputHeading } from '@Components';
import { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './custom.css';
import { ReactAutoCompleteProp } from './interfaces';



function ReactAutoComplete({ selected, isMandatory, heading, placeholder, data, onSelected, onAdd, ...rest }: ReactAutoCompleteProp) {


    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState<any>([])
    const [addValue, setAddValue] = useState<any>('')


    useEffect(() => {
        if (selected)
            setValue(selected);
    }, [selected])


    const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const getSuggestions = value => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');
        let suggestions = data && data.length > 0 && data.filter(each => regex.test(each.name)).slice(0, 5);

        const isValueExist = data && data.length > 0 && data.some(each => each.name.trim().toLowerCase() === value.trim().toLowerCase());

        if (!isValueExist) {
            suggestions = suggestions ? [...suggestions, { isAddNew: true }] : [{ isAddNew: true }]
        }

        return suggestions;
    }


    const renderInputComponent = inputProps => (
        <Input  {...inputProps} />
    );

    const onSuggestionsFetchRequested = ({ value }) => {

        setSuggestions(getSuggestions(value))
    };

    const onChange = (event, { newValue, method }) => {
        onSelected(undefined)
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
        if (!isExist) {
            setAddValue(value)
        }



        return (
            <div className='ml--2'>
                {
                    isExist && <span className='h5'>{suggestion.name.charAt(0).toUpperCase() + suggestion.name.slice(1)}</span>
                }
                {
                    !isExist &&
                    <div className='d-flex align-items-center flex-wrap' onClick={() => {
                        onAdd(addValue)
                    }}>
                        <span className='text-sm text-secondary'>{value}</span>
                        <h3
                            className='text-primary ml-2 mb-0'
                        >
                            {"(ADD NEW)"}
                        </h3>
                    </div>

                }
            </div>
        )

    };

    const onSuggestionSelected = (event, { suggestion }) => {
        if (suggestion.isAddNew) {
            onSelected(undefined)
        }
        else {
            onSelected(suggestion)
        }
    };

    const getSuggestionValue = (suggestion: any) => {
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

export { ReactAutoComplete };
