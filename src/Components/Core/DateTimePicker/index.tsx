import { InputHeading } from '@Components';
import moment, { isMoment, Moment } from 'moment';
import ReactDatetime from "react-datetime";
import { FormGroup } from 'reactstrap';
import { DateTimePickerProps } from './interfaces';


function DateTimePicker({ id, heading, placeholder, type = 'date',dateFormatType= "LT", onChange, disableFuture = false,dateShowingFormat="after", ...rest }: DateTimePickerProps) {

  const currentDate = moment();
  const currentDate1 = moment().subtract(1, 'day')
  const disableDt = disableFuture
    ? (current: any) => current.isAfter(currentDate1, 'day')
    : (current: any) => current.isBefore(currentDate, 'day');

  return (
    <FormGroup>
      {heading && <InputHeading Class={"position-relative"} id={id} heading={heading} />}

      <ReactDatetime
      className='position-relative z-index-1'
        {...rest}
        inputProps={
          {
            placeholder: placeholder,
            onKeyDown: (e) => { e.preventDefault() },
            // readOnly: true,

          }
        }
        closeOnSelect={true}
        timeFormat={type !== 'date' && true}
        dateFormat={type === 'time' ? false : 'YYYY-MM-DD'}
        onChange={
          (date: any) => {
            if (onChange)
              if (isMoment(date))
                onChange(type === 'time' ? date.format('LT') : type === 'both' ? date.format() : date.format('YYYY-MM-DD'))
              else
                onChange(date)
          }
        }
        isValidDate={disableDt}
      />
    </FormGroup >
  )
}

export { DateTimePicker };
export type { DateTimePickerProps };