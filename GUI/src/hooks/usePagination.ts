import { useSearchParams } from 'react-router-dom';
import { type Dispatch, type SetStateAction, useState } from 'react';
import type { PaginationState } from '@tanstack/react-table';

export const usePagination = (): [
  PaginationState,
  Dispatch<SetStateAction<PaginationState>>,
] => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page ? parseInt(page) - 1 : 0,
    pageSize: 10,
  });

  return [pagination, setPagination];
};
