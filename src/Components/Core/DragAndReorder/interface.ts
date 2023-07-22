
export interface DragAndReorderProps {
    isOpen?: boolean;
    size?: 'lg' | 'sm' | 'xl' | 'md'; 
    onModalClose?: ()=> void;
    title?: string;
    dndData?: Array<{ id: string, name: string }>
    buttonText?: string;
    onSubmitClick?: (data:any)=> void
    onDndClick?: ()=> void;
    isDndModalOpen?: boolean;
}