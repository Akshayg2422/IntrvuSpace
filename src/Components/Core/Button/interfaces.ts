import { RsButtonProps, Color, ButtonVariants } from '@Components'

export interface ButtonProps extends RsButtonProps {
    text?: string | null | undefined
    color?: Color
    variant?: ButtonVariants
    size?: 'sm' | 'md' | 'lg'
    icon?: any
    onEnter?: () => void 
}