
import { TextAreaProps } from './interfaces'
import { FormGroup } from 'reactstrap'
import { InputHeading } from '@Components'

function TextArea({ id, heading, value, onChange, className, placeholder, error, isMandatory, height = '300px' }: TextAreaProps) {

    return (
        <FormGroup>
            <InputHeading heading={heading} id={id} isMandatory={isMandatory} />
            <textarea
                style={{ height: height }}
                value={value}
                onChange={onChange}
                className={` form-control ${className}`}
                placeholder={placeholder}

            />
            {error ? <small className='text-red'>{error}</small> : <></>}
        </FormGroup>
    )
}

export { TextArea }


