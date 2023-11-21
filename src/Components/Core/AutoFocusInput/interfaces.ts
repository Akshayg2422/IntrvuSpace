import { RsInputProps, InputVariants, InputHeadingProps } from '@Components'
export interface AutoFocusInputProps extends RsInputProps, InputHeadingProps {
    heading?: string | undefined | null;
    id?: string
    variant?: InputVariants;
    noSpace?: boolean
    ref?:string
    
}   