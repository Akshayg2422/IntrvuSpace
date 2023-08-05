export interface ButtonGroupProps {
    sortData: Array<{ id: number, title: string }>
    onClick?: (selected: any) => void;
    selected?: any;
    size?: 'btn-sm' | 'btn-md' | 'btn-lg'
    customWidth?: string
}
