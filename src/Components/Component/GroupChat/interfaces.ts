import { Color } from '@Components';

export interface GroupChatProps {
    children?: React.ReactNode;
    title?: string,
    time?: string,
    // icon?: any,
    color?: Color,
    // showDotterLine: boolean
    rtl?: boolean,
    subTitle?: string;
    isEdit?: boolean;
    isDelete?: boolean;
    editOnclick?: () => void;
    deleteOnClick?: () => void;
}