import React, { useEffect, useState } from 'react'
import { MultiSelectProps } from './interfaces'
import { Multiselect } from 'multiselect-react-dropdown';
import { FormGroup } from 'reactstrap';
import { InputHeading } from '@Components';

const MultiSelectDropDown = ({
    options,
    onSelect,
    onRemove,
    selectedValues,
    displayValue,
    heading,
    defaultValue,
    id,
}: MultiSelectProps) => {

    const [selectedOptions, setSelectedOptions] = useState(defaultValue)


    useEffect(() => {
        setSelectedOptions(defaultValue)
    }, [defaultValue])

    const handleSelect = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions)
        onSelect(selectedOptions)
    }

    const handleRemove = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions)
        onRemove(selectedOptions)
    }

    const styles = {

        searchBox: {
            borderColor: '#dee2e6',
        },
        inputField: {
            margin: '5px',
            border: 'dee2e6',
        },
        optionContainer: {
            borderColor: '#dee2e6',
        },
        option: {
            backgroundColor: '#fff',
            color: '#333',
            fontSize: '14px',
        },
        chips: {
            background: '#fcc9e0',
            color: 'white'
        },
    };

    return (
        <FormGroup>
            <InputHeading heading={heading} id={id} />
            <Multiselect
                style={styles}
                options={options}
                selectedValues={selectedOptions}
                onSelect={handleSelect}
                onRemove={handleRemove}
                displayValue={displayValue}
                avoidHighlightFirstOption={true}
            />
        </FormGroup>
    )
}

export { MultiSelectDropDown } 