export interface CallHeaderMobileProps {
    webcam?: boolean;
    mic?: boolean
    onWebCamChange?: () => void;
    onMicChange?: () => void;
    onEndClick?: () => void;
    onEndInterViewClick?: () => void;
}