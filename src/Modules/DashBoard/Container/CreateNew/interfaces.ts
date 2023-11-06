import React from "react";

export interface CreateNewProps {
    title?: string;
    description?: string
    buttonText?: string;
    onButtonClick?: () => void
    image?: any
    keyPoints?: any;
    children?: React.ReactNode
}