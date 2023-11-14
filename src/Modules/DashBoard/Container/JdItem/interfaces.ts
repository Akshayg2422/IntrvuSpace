export interface JdItemProps {
    item: any
    onViewMore?: (status: boolean) => void
    onTryAnotherClick?: (id: string) => void
    onProceedClick?: (id: string) => void
    onViewReport?: (id: string) => void
}