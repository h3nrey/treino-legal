export interface paginatedRequest {
  page: number;
  count: number;
  sortBy?: string;
  order?: "asc" | "desc";
}
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  sort?: {
    sortBy: string;
    order: "asc" | "desc";
  };
}

export const paginate = <T>(
  items: T[],
  totalCount: number,
  options: {
    page: number;
    pageSize: number;
    sortBy?: string;
    order?: "asc" | "desc";
  }
): PaginatedResponse<T> => {
  const { page, pageSize, sortBy, order } = options;
  return {
    data: items,
    pagination: {
      currentPage: page,
      pageSize,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    },
    sort: sortBy && order ? { sortBy, order } : undefined,
  };
};
