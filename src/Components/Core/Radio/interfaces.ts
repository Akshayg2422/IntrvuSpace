import { RsInputProps } from '@Components'
export interface RadioItem {
    id: string;
    text: string;
    value: string
}
export interface RadioProps extends RsInputProps {
    data: Array<RadioItem>;
    selected?: RadioItem;
    onRadioChange?: (item: RadioItem) => void;
    variant?: 'row' | 'column',
    disableId?: any,
    selectItem?: any;

}