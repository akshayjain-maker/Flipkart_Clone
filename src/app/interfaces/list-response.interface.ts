import { Pagination } from './pagination.interface';

export interface ListResponse<T> {
  items: T[];
  pagination: Pagination;
}
