export interface MultiSelectProps {
    options: { key: string, value: string, name: string }[];
    onSelect: (selectedList: any) => void;
    onRemove: (selectedList: any) => void;
    displayValue: string;
    selectedValues?: any;
    singleSelect?: boolean;
    showCheckbox?: boolean;
    placeholder?: string;
    style?: object;
    disable?: boolean;
    showArrow?: boolean;
    avoidHighlightFirstOption?: boolean;
    heading?: string;
    id?: string;
    defaultValue?: []
}