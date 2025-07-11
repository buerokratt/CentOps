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
import { type AuditSecretsAccess, methodMap } from 'types/audit';
import { formatDate } from 'utils/date';
import { withAuthorization } from 'hoc/withAuthorization';
import type { Method } from 'axios';
import { useQuery } from '@tanstack/react-query';

export const SecretAccessPage = withAuthorization(() => {
  const {
    data: { response: logs },
  } = useQuery<{ response: AuditSecretsAccess[] }>({
    queryKey: ['admin/logs/secrets'],
    initialData: { response: [] },
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<AuditSecretsAccess>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('clientId', {
        id: 'clientId',
        header: () => <TransTableHead i18nKey="client" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('action', {
        id: 'method',
        header: () => <TransTableHead i18nKey="operation" />,
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
      columnHelper.accessor('ipAddress', {
        id: 'meta',
        header: () => <TransTableHead i18nKey="ipAddress" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('userAgent', {
        id: 'userAgent',
        header: () => <TransTableHead i18nKey="userAgent" />,
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
          <Trans i18nKey="title.auditSecretsAccess" defaults="Secret access" />
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
