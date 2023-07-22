import { Color } from "@Components//Interfaces"

export interface DownloadImageProps {
    Url?: any;
    size?: 'xs' | 'sm' | 'md'
    color?: Color;
    title: string
}