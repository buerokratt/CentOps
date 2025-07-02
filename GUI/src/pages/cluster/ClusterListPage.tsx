import { Button, Card, DataTable, Icon, Track } from 'components';
import { useMemo, useState } from 'react';
import type { Cluster } from 'types/cluster';
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

export const ClusterListPage = () => {
  const [clients] = useState<Cluster[]>([
    {
      id: '1',
      name: 'Cluster 1',
    },
    {
      id: '2',
      name: 'Cluster 2',
    },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<Cluster>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'name',
        header: () => <TransTableHead i18nKey="clusterName" />,
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
        <Track direction="vertical" align="left">
          <h6>
            <TransNav i18nKey="settings" />
          </h6>
          <h1>
            <TransNav i18nKey="clusters" />
          </h1>
        </Track>
        <Link
          to={ROUTES.CLUSTER_DETAILS_ROUTE}
          params={{ clusterId: 'create' }}
        >
          <Button appearance="primary">
            <TransButton i18nKey="addCluster" />
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
