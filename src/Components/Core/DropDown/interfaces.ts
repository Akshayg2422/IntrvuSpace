import { Option, InputHeadingProps } from '@Components'
export interface DropDownProps extends InputHeadingProps {
    placeHolder?: string;
    data?: Array<Option>;
    defaultValue?: Option;
    onChange?: (item: Option) => void;
    multiple?: string;
    value?: Option;
    disabled?: boolean;
    selected?: Option;
    className?:string;
}