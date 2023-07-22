import { BreadcrumbProps } from '@Components'

export type BreadCrumbItem = {
    id: string;
    title: string
}

export interface BreadcrumbsProps extends BreadcrumbProps {
    items?: Array<BreadCrumbItem>;
    defaultSelected?: BreadCrumbItem;
}