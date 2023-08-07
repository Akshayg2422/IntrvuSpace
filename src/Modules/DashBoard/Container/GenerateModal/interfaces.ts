import { ModalProps as RsModalProps } from 'reactstrap'

export interface GenerateModalProps extends RsModalProps {
    onClose?: () => void;
    children?: React.ReactNode;
    title?: string
} 