export interface NoDataFoundProps {
    text?: string
    type?: 'text' | 'action'
    buttonText?: string
    onClick?: () => void,
    isButton?:boolean,
}