import React, { useEffect, useState } from 'react'
import { CheckboxProps } from './interfaces'
import { FormGroup } from 'reactstrap'

function Checkbox({ id = '0', text, defaultChecked, variant = 'primary', onCheckChange, ...rest }: CheckboxProps) {

    const [checked, setChecked] = useState(defaultChecked);


    useEffect(() => {
        setChecked(defaultChecked)
    }, [defaultChecked])

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (onCheckChange) {
            const checkStatus = e.target.checked
            setChecked(checkStatus)
            onCheckChange(checkStatus)
        }
    }

    return (
        <FormGroup>
            <div className={`custom-control custom-checkbox custom-checkbox-${variant} mb-3`}>
                <input
                    {...rest}
                    id={id}
                    checked={checked}
                    className={'custom-control-input'}
                    type={'checkbox'}
                    onChange={onChangeHandler}
                />
                <label
                    className={'custom-control-label'}
                    htmlFor={id}>
                    {
                        text
                    }
                </label>
            </div>
        </FormGroup >
    )
}

export { Checkbox };
export type { CheckboxProps };