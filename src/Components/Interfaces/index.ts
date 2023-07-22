export type { ButtonProps as RsButtonProps, BadgeProps as RsBadgeProps, BreadcrumbProps, CardProps as RsCardProps, InputProps as RsInputProps } from 'reactstrap';

export type Variants = 'default' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'white' | 'neutral' | 'dark' | 'darker' | 'inline'
export type Color = 'default' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'white' | 'neutral' | 'dark' | 'darker' | 'black'
export type ButtonVariants = 'default' | 'icon' | 'icon-with-text' | 'icon-rounded'
export type InputVariants = 'default' | 'alternative' | 'flush' | 'muted'

export type Option = {
    id?: number | string;
    text?: string;
    other?: string;
    color?: string;
    icon?: any;
    value?: string
}

