import { ModalProps } from '@Components'
export interface BulkUploadProps extends ModalProps {
    tempFile?: string
    onUpload?: (file: any) => void
}