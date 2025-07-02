import { Button, Card, DataTable, Icon, Label, Track } from 'components';
import { useMemo, useState } from 'react';
import {
  type ClientPod,
  type ClientPodStatus,
  ClientPodStatuses,
} from 'types/client';
import {
  createColumnHelper,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table';
import { TransButton } from 'i18n/trans/button';
import { Trans } from 'react-i18next';
import { TransTableHead } from 'i18n/trans/table';
import { Link } from 'components/Router/Link';
import { ROUTES } from 'resources/routes-constants';
import { TransTitle } from 'i18n/trans/title';
import { TransLabel } from 'i18n/trans/label';
import { formatDate } from 'utils/date';
import type { IconName } from 'components/Icon';
import type { LabelProps } from 'components/Label';

const statusMap = new Map<
  ClientPodStatus,
  { icon: IconName; type: LabelProps['type'] }
>([
  [ClientPodStatuses.BOOTING, { icon: 'warning', type: 'warning' }],
  [ClientPodStatuses.RUNNING, { icon: 'check', type: 'success' }],
  [ClientPodStatuses.NOT_RUNNING, { icon: 'danger', type: 'error' }],
]);

export const ClientPodsList = () => {
  const [clients] = useState<ClientPod[]>([
    {
      id: '1',
      name: 'byrokratt-update-987324-qrbjt',
      image: 'ghr.io/buerokratt/ruuter:v2.2.1',
      createdAt: '2025-06-25T10:38:14.643Z',
      status: ClientPodStatuses.BOOTING,
    },
    {
      id: '2',
      name: 'byrokratt-update-987324-qrbjt',
      image: 'ghr.io/buerokratt',
      createdAt: '2025-06-25T10:38:14.643Z',
      status: ClientPodStatuses.RUNNING,
    },
    {
      id: '3',
      name: 'byrokratt-update-987324-qrbjt',
      image: 'ghr.io/buerokratt',
      createdAt: '2025-06-25T10:38:14.643Z',
      status: ClientPodStatuses.NOT_RUNNING,
    },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<ClientPod>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'name',
        header: () => <TransTableHead i18nKey="name" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('image', {
        id: 'image',
        header: () => <TransTableHead i18nKey="image" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('createdAt', {
        id: 'createdAt',
        header: () => <TransTableHead i18nKey="createdAt" />,
        cell: (message) => formatDate(message.getValue(), 'dateTime'),
      }),
      columnHelper.accessor('status', {
        id: 'status',
        header: '',
        enableSorting: false,
        meta: {
          size: 0,
          align: 'right',
        },
        cell: (message) => {
          const value = message.getValue<ClientPodStatus>();
          const status = statusMap.get(value);

          if (!status) return null;

          return (
            <Label type={status.type} inline>
              <Icon name={status.icon} size="small" />
              <TransLabel i18nKey={`pods.${value}`} />
            </Label>
          );
        },
      }),
    ],
    []
  );

  return (
    <>
      <Track justify="between">
        <Track direction="vertical" align="left">
          <h6>
            <TransTitle i18nKey="client" values={{ client: 'A' }} />
          </h6>
          <h1>
            <Trans i18nKey="title.clientPods" defaults="Pods" />
          </h1>
        </Track>
        <Track gap={16}>
          <Link to={ROUTES.CLIENT_DETAILS_ROUTE}>
            <Button appearance="primary" outlined>
              <TransButton i18nKey="rollback" />
            </Button>
          </Link>
          <Link to={ROUTES.CLIENT_DEPLOYMENTS_CREATE_ROUTE}>
            <Button appearance="primary">
              <TransButton i18nKey="deployment" />
            </Button>
          </Link>
        </Track>
      </Track>

      <Card
        footer={
          <Link to={ROUTES.CLIENT_DETAILS_ROUTE}>
            <Button appearance="primary" outlined>
              <TransButton i18nKey="backToClient" />
            </Button>
          </Link>
        }
      >
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
