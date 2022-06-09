export interface TypeCardItem {
  field: string;
  slot: 'start' | 'center' | 'end';
  DOM(value: string, key?: number): any;
}

export interface PropsCardItem {
  onClick: Function;
  cols: Array<TypeCardItem>;
  data: Object | null;
}

export interface StateCardItem {
  IonCardClass: string;
  start: Array<TypeCardItem>;
  center: Array<TypeCardItem>;
  end: Array<TypeCardItem>;
}