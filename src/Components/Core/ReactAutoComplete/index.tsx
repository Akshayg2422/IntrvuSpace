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
        const suggestions = data && data.filter(each => regex.test(each.name)).slice(0, 5);

        if (suggestions?.length <= 0) {
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
        console.log(addValue, 'check');



        return (
            <div className='ml--2'>
                {
                    isExist && <span className='h5'>{suggestion.name.charAt(0).toUpperCase() + suggestion.name.slice(1)}</span>
                }
                {
                    !isExist &&
                    <div className='d-flex align-items-center flex-wrap'>
                        <span className='text-sm text-secondary'>{value}</span>
                        <h3
                            className='text-primary ml-2 mb-0'
                            onClick={() => {
                                onAdd(addValue)
                            }}>
                            {"ADD NEW"}
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
