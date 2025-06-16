import { Button, Card, DataTable, Icon, Track } from 'components';
import { useMemo, useState } from 'react';
import type { ClientSecret } from 'types/client';
import {
  createColumnHelper,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table';
import { TransButton } from 'i18n/trans/button';
import { Trans } from 'react-i18next';
import { TransTableHead } from 'i18n/trans/table';

export const ClientSecretListPage = () => {
  const [clients] = useState<ClientSecret[]>([
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

  const clientColumnHelper = createColumnHelper<ClientSecret>();
  const clientColumns = useMemo(
    () => [
      clientColumnHelper.accessor('name', {
        id: 'name',
        header: () => <TransTableHead i18nKey="usersDb" />,
        cell: (message) => message.getValue(),
      }),
      clientColumnHelper.accessor('name', {
        id: 'updatedAt',
        header: () => <TransTableHead i18nKey="updatedAt" />,
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
              <Icon name="copy" />
              <TransButton i18nKey="difference" />
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
        <h2>
          <Trans i18nKey="title.clientSecrets" defaults="Secrets" />
        </h2>
        <Button appearance="primary">
          <TransButton i18nKey="addSecret" />
        </Button>
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
