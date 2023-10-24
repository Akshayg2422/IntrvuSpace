
import { RsInputProps, InputVariants, InputHeadingProps } from '@Components'
export interface InputProps extends RsInputProps, InputHeadingProps {
    heading?: string | undefined | null;
    id?: string
    variant?: InputVariants;
 
}   