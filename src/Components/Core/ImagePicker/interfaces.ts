export interface DropZoneImageProps {
    onSelect: (image: any) => void;
    text?: string
    icon?: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
    imageVariant?:any,
    imagePicker?:boolean,
    noOfFilePickers?:number,
    defaultValue?:any,
    className?:string,
    heading?:string,
    noOfFileImagePickers?:number,
}