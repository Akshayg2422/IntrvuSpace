export interface AuthContainerProps {
    children?: React.ReactNode;
    title?:any;
    data?:any;
    displayDataSet?:any;
    tableDataSet?:any;
    tableOnClick?: (event: any, index: number, item: any) => void;
    text?:string;
    onClick?:any;
    childrenS?: React.ReactNode;
    selectedIds?:any;
    selectedId?:string
  }
  