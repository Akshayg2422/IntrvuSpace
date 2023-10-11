export interface DesignationItemProps {
    item: any
    onAdd?: (item: any) => void
    onEdit?: (parent: any, item: any) => void
    onView?: (item: any) => void
}