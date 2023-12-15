export type ImageVariant = 'check' | 'frame' | 'checkBlack'
export interface StatusIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    variant?: ImageVariant;
    type?:'icon' | 'round'
}