import { RsInputProps, InputVariants, InputHeadingProps } from '@Components'

export interface InputPasswordProps extends RsInputProps, InputHeadingProps {
    heading?: string | undefined | null;
    id?: string
    variant?: InputVariants;
    noSpace?: boolean
}
