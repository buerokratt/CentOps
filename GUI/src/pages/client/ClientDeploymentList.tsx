import { Button, Card, DataTable, Icon, Label, Track } from 'components';
import { useMemo, useState } from 'react';
import {
  type ApiClient,
  type ApiClientDeployment,
  type ClientDeploymentStatus,
  ClientDeploymentStatuses,
} from 'types/client';
import { createColumnHelper, type SortingState } from '@tanstack/react-table';
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
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { usePagination } from 'hooks/usePagination';
import { initialPaginationData, type Pagination } from 'types/pagination';

const statusMap = new Map<
  ClientDeploymentStatus,
  { icon: IconName; type: LabelProps['type'] }
>([
  [ClientDeploymentStatuses.DEPLOYED, { icon: 'check', type: 'success' }],
  [ClientDeploymentStatuses.DEPLOYING, { icon: 'warning', type: 'warning' }],
  [ClientDeploymentStatuses.FAILED, { icon: 'danger', type: 'error' }],
]);

export const ClientDeploymentList = withAuthorization(() => {
  const [pagination, setPagination] = usePagination();

  const { clientId } = useParams<{ clientId: string }>();
  const { data: client } = useQuery<ApiClient>({
    queryKey: [`admin/client-by-id?clientId=${clientId}`],
  });
  const { data: deployments } = useQuery<Pagination<ApiClientDeployment>>({
    meta: { pagination },
    queryKey: [
      `admin/clients/deployments/all?clientId=${clientId}`,
      ...Object.values(pagination),
    ],
    initialData: initialPaginationData<ApiClientDeployment>(),
  });
  console.log(deployments);

  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<ApiClientDeployment>();
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
      columnHelper.accessor('createdAt', {
        id: 'deployedAt',
        header: () => <TransTableHead i18nKey="deployedAt" />,
        cell: (message) => formatDate(message.getValue()),
      }),
      columnHelper.accessor('status', {
        id: 'status',
        header: '',
        enableSorting: false,
        meta: { size: 1, align: 'right' },
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
            <TransTitle i18nKey="client" values={{ client: client?.name }} />
          </h6>
          <h1>
            <Trans i18nKey="title.clientDeployments" defaults="Deployments" />
          </h1>
        </Track>
        <Link to={ROUTES.CLIENT_DEPLOYMENTS_CREATE_ROUTE} params={{ clientId }}>
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
            data={deployments.items}
            columns={columns}
            sortable
            pagination={pagination}
            pagesCount={deployments.totalPages}
            setPagination={setPagination}
            sorting={sorting}
            setSorting={setSorting}
          />
        </Card>
      </Card>
    </>
  );
});
