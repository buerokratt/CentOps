import { Button, Card, DataTable, Icon, Label, Track } from 'components';
import { useMemo, useState } from 'react';
import {
  type ClientDeployment,
  type ClientDeploymentStatus,
  ClientDeploymentStatuses,
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
import type { LabelProps } from 'components/Label';
import type { IconName } from 'components/Icon';
import { withAuthorization } from 'hoc/withAuthorization';

const statusMap = new Map<
  ClientDeploymentStatus,
  { icon: IconName; type: LabelProps['type'] }
>([
  [ClientDeploymentStatuses.DEPLOYED, { icon: 'check', type: 'success' }],
  [ClientDeploymentStatuses.DEPLOYING, { icon: 'warning', type: 'warning' }],
  [ClientDeploymentStatuses.FAILED, { icon: 'danger', type: 'error' }],
]);

export const ClientDeploymentList = withAuthorization(() => {
  const [deployments] = useState<ClientDeployment[]>([
    {
      id: '1',
      manifestVersion: 'ghr.io/buerokratt/ruuter:v2.2.1',
      deployedBy: 'abc',
      deployedAt: '2025-06-25T10:38:14.643Z',
      status: 'DEPLOYING',
    },
    {
      id: '2',
      manifestVersion: 'ghr.io/buerokratt',
      deployedBy: 'abc',
      deployedAt: '2025-06-27T14:38:04.643Z',
      status: 'DEPLOYED',
    },
    {
      id: '3',
      manifestVersion: 'ghr.io/buerokratt',
      deployedBy: 'abc',
      deployedAt: '2025-06-28T22:18:24.643Z',
      status: 'FAILED',
    },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<ClientDeployment>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('manifestVersion', {
        id: 'manifestVersion',
        header: () => <TransTableHead i18nKey="manifestVersion" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('deployedBy', {
        id: 'deployedBy',
        header: () => <TransTableHead i18nKey="deployedBy" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('deployedAt', {
        id: 'deployedAt',
        header: () => <TransTableHead i18nKey="deployedAt" />,
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
          const value = message.getValue<ClientDeploymentStatus>();
          const status = statusMap.get(value);
          if (!status) return null;

          return (
            <Label type={status.type} inline>
              <Icon name={status.icon} size="small" />
              <TransLabel i18nKey={`deployment.${value}`} />
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
            <Trans i18nKey="title.clientDeployments" defaults="Deployments" />
          </h1>
        </Track>
        <Link
          to={ROUTES.CLIENT_SECRETS_DETAILS_ROUTE}
          params={{ secretId: 'create' }}
        >
          <Button appearance="primary">
            <TransButton i18nKey="newDeployment" />
          </Button>
        </Link>
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
            data={deployments}
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
