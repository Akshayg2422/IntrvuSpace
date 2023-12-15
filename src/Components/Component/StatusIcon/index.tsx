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
                return icons.checkBlack;
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
                return icons.checkBlack;
            default:
                return null;
        }
    }


    const variantIcon = type? getVariantColor(variant) : getVariantIcon(variant)

    return (
        <Image
            src={variantIcon}
            alt={`${variantIcon} icon`}
            height={8}
            width={8}
            style={{
                objectFit: "contain",
            }}
        />
    )
}

export { StatusIcon };