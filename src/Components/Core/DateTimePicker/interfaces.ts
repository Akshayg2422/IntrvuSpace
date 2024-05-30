import { InputHeadingProps } from '@Components'
import { DatetimepickerProps as DefaultProps } from 'react-datetime'


export interface DateTimePickerProps extends InputHeadingProps, DefaultProps {
    type?: 'date' | 'time' | 'both';
    placeholder?: string,
    format?:string
}