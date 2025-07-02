import { Button, Card, DataTable, Icon, Track } from 'components';
import { useMemo, useState } from 'react';
import type { Client } from 'types/client';
import {
  createColumnHelper,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table';
import { TransButton } from 'i18n/trans/button';
import { TransNav } from 'i18n/trans/nav';
import { TransTableHead } from 'i18n/trans/table';
import { ROUTES } from 'resources/routes-constants';
import { Link } from 'components/Router/Link';

export const ClientListPage = () => {
  const [clients] = useState<Client[]>([
    {
      id: '1',
      name: 'Client 1',
    },
    {
      id: '2',
      name: 'Client 2',
    },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<Client>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'name',
        header: () => <TransTableHead i18nKey="client" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('name', {
        id: 'nameSpace',
        header: () => <TransTableHead i18nKey="nameSpace" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('name', {
        id: 'clusterIp',
        header: () => <TransTableHead i18nKey="clusterIp" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('name', {
        id: 'updatedAt',
        header: () => <TransTableHead i18nKey="updatedAt" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('id', {
        id: 'actions',
        header: '',
        enableSorting: false,
        meta: {
          size: 0,
        },
        cell: () => (
          <Track gap={8}>
            <Button appearance="text">
              <Icon name="pods" />
              <TransButton i18nKey="pods" />
            </Button>
            <Button appearance="text">
              <Icon name="edit" />
              <TransButton i18nKey="edit" />
            </Button>
            <Button appearance="text">
              <Icon name="delete" />
              <TransButton i18nKey="delete" />
            </Button>
          </Track>
        ),
      }),
    ],
    []
  );

  return (
    <>
      <Track justify="between">
        <h1>
          <TransNav i18nKey="clients" />
        </h1>
        <Link to={ROUTES.CLIENT_DETAILS_ROUTE} params={{ clientId: 'create' }}>
          <Button appearance="primary">
            <TransButton i18nKey="addClient" />
          </Button>
        </Link>
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
