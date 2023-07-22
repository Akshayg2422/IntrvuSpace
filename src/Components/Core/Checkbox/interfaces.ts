import { InputProps } from 'reactstrap'
import { Variants } from '@Components'
/**
 * id props mandatory don't change option params
 */
export interface CheckboxProps extends InputProps {
    id?: string;
    text?: string
    variant?: Variants;
    onCheckChange?: (checked: boolean) => void;
}
