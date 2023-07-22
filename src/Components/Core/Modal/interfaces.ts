import React from 'react'
import { ModalProps as RsModalProps } from 'reactstrap'

export interface ModalProps extends RsModalProps {
    children?: React.ReactNode;
    title?: string;
    size?: 'lg' | 'sm' | 'xl' | 'md';
    onClose ?: () => void
    style?:any;
} 