
import { TextAreaProps } from './interfaces'
import { FormGroup } from 'reactstrap'
import { InputHeading } from '@Components'

function TextArea({ id, heading, value, onChange, className, placeholder }: TextAreaProps) {
    return (
        <FormGroup>
            <InputHeading heading={heading} id={id} />
            <textarea
                style={{ height: '140px' }}
                value={value}
                onChange={onChange}
                className={`${className} form-control form-control-sm`}
                placeholder={placeholder}

            />
        </FormGroup>
    )
}

export { TextArea }


