export interface IdData<T extends string | number> {
  id: T;
}

export interface NameData<T extends string | number> extends IdData<T> {
  name: string;
}
