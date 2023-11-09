import React, { useEffect, useState } from 'react';

interface ImageCroppingProps {
    imageUrl: string;
    cropX: any;
    cropY: any;
    cropWidth: any;
    cropHeight: any;
    canvasWidth: any;
    canvasHeight: any;
}

const ImageCroppingComponent = ({
    imageUrl,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    canvasWidth,
    canvasHeight,
}: ImageCroppingProps) => {
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const image = new Image();
        image.src = imageUrl;

        image.crossOrigin = 'anonymous'; // Set this for cross-origin images.

        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            const context = canvas.getContext('2d');

            if (context) {
                context.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg'); // Convert to data URL.
                setCroppedImageUrl(dataUrl);
            }
        };
    }, [imageUrl, cropX, cropY, cropWidth, cropHeight, canvasWidth, canvasHeight]);

    return (
        <div className="image-container">
            {croppedImageUrl ? (
                <img src={croppedImageUrl} alt="Cropped Image" />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export { ImageCroppingComponent }
