import { icons } from '@Assets';
import { ImageVariant, StatusIconProps } from './interfaces';
import { Image } from '@Components'

function StatusIcon({ variant = 'check', type = 'round' }: StatusIconProps) {

    function getVariantColor(variant: ImageVariant) {
        switch (variant) {
            case 'check':
                return icons.checkRound;
            case 'frame':
                return icons.frameRound;
            case 'checkBlack':
                return icons.checkBlackRound;
            default:
                return null;
        }
    }

    function getVariantIcon(variant: ImageVariant) {
        switch (variant) {
            case 'check':
                return icons.checkIcon;
            case 'frame':
                return icons.frameIcon;
            case 'checkBlack':
                return icons.checkBlackIcon;
            default:
                return null;
        }
    }


    const variantIcon = type === 'icon' ? getVariantIcon(variant) : getVariantColor(variant)

    const size = 8

    return (
        <Image
            src={variantIcon}
            alt={`${variantIcon} icon`}
            height={size}
            width={size}
            style={{
                objectFit: "contain",
            }}
        />
    )
}

export { StatusIcon };