export class Pagination<T> {
  total?: number;
  page?: number;
  pageSize?: number;
  items: T;
  constructor(dataInput: Partial<Pagination<T>>) {
    Object.assign(this, dataInput);
  }
}
