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
import { type AuditUserActivity, methodMap } from 'types/audit';
import type { Method } from 'axios';
import { formatDate } from 'utils/date';
import { withAuthorization } from 'hoc/withAuthorization';
import { useQuery } from '@tanstack/react-query';

export const UserActivityPage = withAuthorization(() => {
  const {
    data: { response: logs },
  } = useQuery<{ response: AuditUserActivity[] }>({
    queryKey: ['admin/logs/user'],
    initialData: { response: [] },
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<AuditUserActivity>();
  const columns = useMemo(
    () => [
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
      columnHelper.accessor('createdAt', {
        id: 'createdAt',
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
            data={logs ?? []}
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
});
