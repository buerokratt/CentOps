import { useSearchParams } from 'react-router-dom';
import { type Dispatch, type SetStateAction, useState } from 'react';
import type { PaginationState } from '@tanstack/react-table';

type UsePaginationState = Partial<PaginationState> & {
  sort?: string;
  order?: string;
};

export const usePagination = <T extends UsePaginationState>(
  initialState?: T
): [PaginationState, Dispatch<SetStateAction<PaginationState>>] => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page ? parseInt(page) - 1 : 0,
    pageSize: 10,
    ...initialState,
  });

  return [pagination, setPagination];
};
