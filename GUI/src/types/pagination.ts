export interface Pagination<D> {
  items: D[];
  page: number;
  pageSize: number;
  totalPages: number;
}

export const initialPaginationData = <D>() => ({
  items: [] as D[],
  page: 0,
  pageSize: 10,
  totalPages: 0,
});
