
import { TextAreaProps } from './interfaces'
import { FormGroup } from 'reactstrap'
import { InputHeading } from '@Components'

function TextArea({ id, heading, value, onChange, className, placeholder, error }: TextAreaProps) {

    console.log(error + '====eror');

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
            {error && <div className="invalid-feedback">{error + ""}</div>}
        </FormGroup>
    )
}

export { TextArea }


