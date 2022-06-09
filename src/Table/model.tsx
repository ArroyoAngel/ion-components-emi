import { TypeCardItem } from '../CardItem'

export interface PropsTable {
  data: Array<any>;
  cols: Array<TypeCardItem>;
  onClickItem: Function;
  children?: React.ReactNode;
}

export interface StateTable {
  data: Array<Object>;
  isInfiniteDisabled: boolean;
}