import { Card, DataTable, Label, Track } from 'components';
import { useMemo, useState } from 'react';
import {
  createColumnHelper,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table';
import { TransTableHead } from 'i18n/trans/table';
import { TransTitle } from 'i18n/trans/title';
import { Trans } from 'react-i18next';
import type { AuditUserActivity } from 'types/audit';
import type { LabelProps } from 'components/Label';
import type { Method } from 'axios';
import { formatDate } from 'utils/date';

const methodMap = new Map<Method, LabelProps['type']>([
  ['post', 'info'],
  ['put', 'info'],
  ['patch', 'warning'],
  ['delete', 'error'],
  ['get', 'success'],
]);

export const UserActivityPage = () => {
  const [clients] = useState<AuditUserActivity[]>([
    {
      id: '1',
      user: 'User 1',
      method: 'delete',
      path: '/admin/clients',
      meta: 'data',
      timestamp: '2025-06-25T10:38:14.643Z',
    },
    {
      id: '1',
      user: 'User 1',
      method: 'get',
      path: '/admin/clients',
      meta: 'data',
      timestamp: '2025-06-25T10:38:14.643Z',
    },
    {
      id: '1',
      user: 'User 1',
      method: 'post',
      path: '/admin/clients',
      meta: 'data',
      timestamp: '2025-06-25T10:38:14.643Z',
    },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<AuditUserActivity>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('user', {
        id: 'user',
        header: () => <TransTableHead i18nKey="user" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('method', {
        id: 'method',
        header: () => <TransTableHead i18nKey="method" />,
        cell: (message) => {
          const value = message.getValue<Method>();
          const type = methodMap.get(value);

          if (!type) return null;

          return (
            <Label type={type} inline>
              {value.toUpperCase()}
            </Label>
          );
        },
      }),
      columnHelper.accessor('path', {
        id: 'path',
        header: () => <TransTableHead i18nKey="path" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('meta', {
        id: 'meta',
        header: () => <TransTableHead i18nKey="metaData" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('timestamp', {
        id: 'timestamp',
        header: () => <TransTableHead i18nKey="dateTime" />,
        cell: (message) => formatDate(message.getValue(), 'dateTime'),
      }),
    ],
    []
  );

  return (
    <>
      <Track direction="vertical" align="left">
        <h6>
          <TransTitle i18nKey="audit" />
        </h6>
        <h1>
          <Trans i18nKey="title.auditUserActivity" defaults="User activity" />
        </h1>
      </Track>

      <Card>
        <Card disablePadding>
          <DataTable
            data={clients}
            columns={columns}
            sortable
            pagination={pagination}
            setPagination={setPagination}
            sorting={sorting}
            setSorting={setSorting}
          />
        </Card>
      </Card>
    </>
  );
};
