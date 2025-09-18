import { useState, useMemo, useCallback } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
}

interface PaginationState {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
}

export const usePagination = <T>({ data, itemsPerPage = 10 }: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationState: PaginationState = useMemo(() => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
      currentPage,
      totalPages,
      startIndex,
      endIndex,
      totalItems
    };
  }, [data.length, itemsPerPage, currentPage]);

  const paginatedData = useMemo(() => {
    return data.slice(paginationState.startIndex, paginationState.endIndex);
  }, [data, paginationState.startIndex, paginationState.endIndex]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= paginationState.totalPages) {
      setCurrentPage(page);
    }
  }, [paginationState.totalPages]);

  const nextPage = useCallback(() => {
    if (currentPage < paginationState.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, paginationState.totalPages]);

  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    paginatedData,
    paginationState,
    goToPage,
    nextPage,
    previousPage,
    resetPagination
  };
};
