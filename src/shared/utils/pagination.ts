export interface PaginatedResponse<T> {
  data: T[];
  meta: Pagination;
}

export interface Pagination {
  skip: number;
  take: number;
  total: number;
}
