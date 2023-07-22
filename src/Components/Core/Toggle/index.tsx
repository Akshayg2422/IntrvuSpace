import React, { useState } from 'react'
import { ToggleProps } from './interfaces'
import { Form } from 'reactstrap'

function Toggle({ variant = 'primary', showLabel, checked, onToggleChange, ...rest }: ToggleProps) {

    const [isChecked, setIsChecked] = useState(checked);

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (onToggleChange) {
            const checkStatus = e.target.checked
            setIsChecked(checkStatus)
            onToggleChange(checkStatus)
        }
    }

    return (
        <Form>
            <label className={`custom-toggle custom-toggle-${variant} mr-1`}>
                <input {...rest} checked={isChecked} type={'checkbox'} onChange={onChangeHandler} />
                <span
                    className={'custom-toggle-slider rounded-circle'}
                    data-label-off={showLabel && 'No'}
                    data-label-on={showLabel && 'Yes'}
                />
            </label>
        </Form >
    )
}

export { Toggle }