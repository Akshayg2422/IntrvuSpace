import { RsInputProps, Variants } from '@Components'

export interface ToggleProps extends RsInputProps {
    variant?: Variants;
    onToggleChange?: (status: boolean) => void;
    showLabel?: boolean
}