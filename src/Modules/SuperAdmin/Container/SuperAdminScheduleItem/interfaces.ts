export interface ScheduleLiteItemProps {
    item: any;
    onTryAnother?: () => void;
    onViewMore?: (status: boolean) => void;
    reportOnClick: (id: string) => void;
    otherMenuHandler?: (key: string, id: string) => void;
    proceedInterviewClick?: (id: string) => void;
}