export type TabItem = {
  title: any;
  component: any;
  id: string;
  onPress?: () => void;
}
export interface TabsProps {
  tabs: Array<TabItem>;
  onChange?: (item: any) => void;
  selected?: TabItem
  height?: any
  onPress?:  (() => void | undefined) | undefined
}
