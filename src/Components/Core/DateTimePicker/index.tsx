import { InputHeading } from '@Components';
import moment, { isMoment, Moment } from 'moment';
import ReactDatetime from "react-datetime";
import { FormGroup } from 'reactstrap';
import { DateTimePickerProps } from './interfaces';


function DateTimePicker({ id, heading, noSpace, placeholder, type = 'date', dateFormatType = "LT", onChange, disableFuture = false, dateShowingFormat = "after", ...rest }: DateTimePickerProps) {

  const currentDate = moment();
  const currentDate1 = moment().subtract(1, 'day')
  const disableDt = disableFuture
    ? (current: any) => current.isAfter(currentDate1, 'day')
    : (current: any) => current.isBefore(currentDate, 'day');
    

  return (
    <FormGroup className={noSpace ? 'm-0 b-0' : ""}>
      {heading && <InputHeading id={id} heading={heading} />}

      <ReactDatetime
        {...rest}
        inputProps={
          {
            placeholder: placeholder,
            onKeyDown: (e) => { e.preventDefault() },
          }
        }
        closeOnSelect={true}
        timeFormat={type !== 'date' && true}
        dateFormat={type === 'time' ? false : 'MMM D YYYY'}
        onChange={
          (date: any) => {
            if (onChange)
              if (isMoment(date))   
                onChange(type === 'time' ? date.format('LT') : type === 'both' ? date.format() : date.format('MMM D YYYY'))
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