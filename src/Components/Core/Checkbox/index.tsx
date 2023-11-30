import React from 'react'
import { FormGroup } from 'reactstrap'
import { CheckboxProps } from './interfaces'


function Checkbox({ id = '0', text, defaultChecked, variant = 'primary', onCheckChange, ...rest }: CheckboxProps) {

    // const [checked, setChecked] = useState(defaultChecked);


    // useEffect(() => {
    //     setChecked(defaultChecked)
    // }, [defaultChecked])

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (onCheckChange) {
            const checkStatus = e.target.checked
            // setChecked(checkStatus)
            onCheckChange(checkStatus)
        }
    }

    return (
        <FormGroup className='m-0 p-0'>
            <div className={`custom-control custom-checkbox custom-checkbox-${variant} `} >
                <input
                    {...rest}
                    id={id}
                    checked={defaultChecked}
                    className={'custom-control-input border'}
                    type={'checkbox'}
                    onChange={onChangeHandler}
                />
                <label
                    className={'custom-control-label'}
                    htmlFor={id}>
                    {
                        <span className={'position-relative left--1'}>{text}</span>
                    }
                </label>
            </div>
        </FormGroup >
    )
}

export { Checkbox }
export type { CheckboxProps }
