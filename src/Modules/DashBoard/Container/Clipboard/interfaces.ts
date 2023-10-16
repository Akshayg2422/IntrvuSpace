export interface ClipboardProps {
    id: any;
    linkToCopy: any;
    tooltipText?: string
    copedText?: string
    onCopy?: (text: string) => void
}