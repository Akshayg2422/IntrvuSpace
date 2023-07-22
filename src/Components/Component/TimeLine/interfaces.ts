import { Color } from '@Components';

export interface TimeLineProps {
    children?: React.ReactNode;
    title?: string,
    time?: string,
    icon?: any,
    color?: Color,
    showDotterLine: boolean
    rtl?: boolean,
    subTitle?: string;
}