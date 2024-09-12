import { useState, useMemo } from "react";

interface UsePaginationProps<T> {
  items: T[];
  initialPageSize?: number;
}

export const usePagination = <T>({
  items,
  initialPageSize = 10,
}: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = useMemo(
    () => Math.ceil(items.length / pageSize),
    [items.length, pageSize]
  );

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, pageSize]);

  return {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    paginatedItems,
  };
};
