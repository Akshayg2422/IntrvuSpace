export interface SlidersProps {
    min: number;
    max: number;
    value: any;
    step: number;
    onChange: (value: number) => void;
    heading?: string;
    disabled?: boolean;
}