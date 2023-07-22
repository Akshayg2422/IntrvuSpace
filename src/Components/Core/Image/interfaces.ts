export type ImageVariant = 'default' | 'avatar' | 'rounded'
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    variant?: ImageVariant;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}