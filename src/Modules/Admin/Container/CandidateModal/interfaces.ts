import React from 'react'
import { ModalProps as RsModalProps } from 'reactstrap'

export interface CandidateModalProps extends RsModalProps {
    children?: React.ReactNode;
    title?: any;
    subTitle?: any
    size?: 'lg' | 'sm' | 'xl' | 'md' | 'xll';
    onClose?: () => void
    style?: any;
    variant?: 'bg-white' | 'bg-primary'
    buttonText?: string
    onClick?: () => void
    loading?: boolean;
    menubar?: any;
    onClickOutline?: () => void;
    outlineButtonText?: string
    imagePicker?: any
} 