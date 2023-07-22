
import { RsInputProps, InputVariants } from '@Components'
export interface InputProps extends RsInputProps {
    heading?: string | undefined | null;
    id?: string
    variant?: InputVariants
}   