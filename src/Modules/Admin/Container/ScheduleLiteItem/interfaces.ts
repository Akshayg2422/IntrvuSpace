export interface ScheduleLiteItemProps {
    item: any
    onTryAnother?: () => void
    onViewMore?: (status: boolean) => void,
    reportOnClick: (id: string) => void
}