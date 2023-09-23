
import { TextAreaProps } from './interfaces'
import { FormGroup } from 'reactstrap'
import { InputHeading } from '@Components'

function TextArea({ id, heading, value, onChange, className, placeholder, error, isMandatory }: TextAreaProps) {

    console.log(error + '====eror');


    return (
        <FormGroup>
            <InputHeading heading={heading} id={id} isMandatory={isMandatory} />
            <textarea
                style={{ height: '300px' }}
                value={value}
                onChange={onChange}
                className={`${className} form-control form-control-sm text-black`}
                placeholder={placeholder}

            />
            {error ? <small className='text-red'>{error}</small> : <></>}
        </FormGroup>
    )
}

export { TextArea }


