import { InputHeadingProps } from '@Components'
import { DatetimepickerProps as DefaultProps } from 'react-datetime'


export interface DateTimePickerProps extends InputHeadingProps, DefaultProps {
    type?: 'date' | 'time' | 'both';
    placeholder?: string;
    disableFuture?: boolean;
    dateFormatType?: string;
    dateShowingFormat?: 'current' | "after";
    onChange?: any;
    noSpace?: boolean
}