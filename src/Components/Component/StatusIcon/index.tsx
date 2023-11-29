import { icons } from '@Assets';
import { ImageVariant, StatusIconProps } from './interfaces';
import { Image } from '@Components'

function StatusIcon({ variant = 'check' }: StatusIconProps) {

    function getVariantIcon(variant: ImageVariant) {

        switch (variant) {
            case 'check':
                return icons.check;
            case 'frame':
                return icons.frame;
            case 'checkBlack':
                return icons.checkBlack;
            default:
                return null;
        }
    }

    const variantIcon = getVariantIcon(variant)

    return (
        <Image
            src={variantIcon}
            alt={`${variantIcon} icon`}
            height={10}
            width={10}
            style={{
                objectFit: "contain",
            }}
        />
    )
}

export { StatusIcon };