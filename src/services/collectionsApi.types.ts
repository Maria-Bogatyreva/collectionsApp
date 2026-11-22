export interface Specialization {
  id: number;
  title: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  limit: number;
  page: number;
  total: number;
}