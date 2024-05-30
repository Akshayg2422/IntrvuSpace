
import { DateTimePickerProps } from './interfaces';
import ReactDatetime from "react-datetime";
import { FormGroup } from 'reactstrap';
import { InputHeading } from '@Components'
import { Moment, isMoment } from 'moment'


function DateTimePicker({ id, heading, placeholder, type = 'date', format = "", onChange, ...rest }: DateTimePickerProps) {
    return (
        <FormGroup>
            {heading && <InputHeading id={id} heading={heading} />}

            <ReactDatetime
                {...rest}

                inputProps={
                    {

                        placeholder: placeholder

                    }
                }

                dateFormat={type !== 'time' && 'D MMM YYYY'}
                timeFormat={type !== 'date' && 'h:mm A'}
                onChange={
                    (date: Moment | string) => {
                        if (onChange) {

                            if (isMoment(date)) {
                                onChange(date.format(format).toString())
                            }
                            else {
                                onChange(date)
                            }
                        }
                    }
                }
            />
        </FormGroup >
    )
}

export { DateTimePicker };
export type { DateTimePickerProps };