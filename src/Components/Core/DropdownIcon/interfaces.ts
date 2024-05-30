
import React from "react";
export interface DropDownProp {
    heading?: string | null;
    placeholder?: string;
    data?: Array<{ id?: string | number; name?: string; value?: string, title?: string, type?: string, group_name?: string, text?: string, other?: string,color?: string }>;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name?: string
    title?: string
    value?: string;
    id?: string | number;
    disabled?: boolean
}