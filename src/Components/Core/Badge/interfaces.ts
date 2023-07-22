import { Color, RsBadgeProps } from '@Components'

export interface BadgeProps extends RsBadgeProps {
    text?: string | null | undefined
    color?: Color
    size?: 'sm' | 'md' | 'lg'
}