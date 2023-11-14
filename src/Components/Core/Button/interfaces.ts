import { RsButtonProps, Color, ButtonVariants } from '@Components'

export interface ButtonProps extends RsButtonProps {
    text?: string | null | undefined | any
    color?: Color
    variant?: ButtonVariants
    size?: 'sm' | 'md' | 'lg'
    icon?: any
    onEnter?: () => void
    icons?: any
    height?: number;
    width?: number;
    outline?: boolean
}