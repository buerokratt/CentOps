import { useTranslation } from 'react-i18next';
import { Button, Card, DataTable, Icon, Track } from 'components';
import { useMemo, useState } from 'react';
import type { Client } from 'types/client';
import {
  createColumnHelper,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table';

export const ClientsListPage = () => {
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

  const clientColumnHelper = createColumnHelper<Client>();
  const clientColumns = useMemo(
    () => [
      clientColumnHelper.accessor('name', {
        id: 'name',
        header: 'Client',
        cell: (message) => message.getValue(),
      }),
      clientColumnHelper.accessor('name', {
        id: 'nameSpace',
        header: 'Name space',
        cell: (message) => message.getValue(),
      }),
      clientColumnHelper.accessor('name', {
        id: 'clusterIp',
        header: 'Cluster IP',
        cell: (message) => message.getValue(),
      }),
      clientColumnHelper.accessor('name', {
        id: 'lastUpdate',
        header: 'Last update',
        cell: (message) => message.getValue(),
      }),
      clientColumnHelper.accessor('id', {
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
              Pods
            </Button>
            <Button appearance="text">
              <Icon name="edit" />
              Edit
            </Button>
            <Button appearance="text">
              <Icon name="delete" />
              Delete
            </Button>
          </Track>
        ),
      }),
    ],
    []
  );

  const { t } = useTranslation();

  return (
    <>
      <Track direction="horizontal" justify="between">
        <h2>{t('menu.clients')}</h2>
        <Button appearance="primary">Add client</Button>
      </Track>

      <Card>
        <Card disablePadding>
          <DataTable
            data={clients}
            columns={clientColumns}
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
