import React from "react";
import { RsCardProps, Color } from '@Components'
export interface CardProps extends RsCardProps {
    title?: string;
    children: React.ReactNode
    color?: Color
}