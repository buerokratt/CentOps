import { Button, Card, DataTable, Icon, Label, Track } from 'components';
import { useMemo, useState } from 'react';
import type { ClientCertificate } from 'types/client';
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
import { GenerateCertificateDialog } from 'pages/client/dialog/GenerateCertificateDialog';
import { DeleteCertificateDialog } from 'pages/client/dialog/DeleteCertificateDialog';
import { ConfirmChangesDialog } from 'pages/client/dialog/ConfirmChangesDialog';
import { CertificateDetailsDialog } from 'pages/client/dialog/CertificateDetailsDialog';

export const ClientCertificateList = () => {
  const [clients] = useState<ClientCertificate[]>([
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

  const columnHelper = createColumnHelper<ClientCertificate>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'name',
        header: () => <TransTableHead i18nKey="certificate" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('name', {
        id: 'createdAt',
        header: () => <TransTableHead i18nKey="createdAt" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('name', {
        id: 'updatedAt',
        header: () => <TransTableHead i18nKey="updatedAt" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('id', {
        id: 'status',
        header: '',
        enableSorting: false,
        meta: {
          size: 0,
        },
        cell: () => (
          <Label type="error">
            <Icon name="danger" size="small" />
            <TransLabel i18nKey="revoked" />
          </Label>
        ),
      }),
      columnHelper.accessor('id', {
        id: 'actions',
        header: '',
        enableSorting: false,
        meta: {
          size: 0,
        },
        cell: () => (
          <Button appearance="text">
            <Icon name="delete" />
            <TransButton i18nKey="delete" />
          </Button>
        ),
      }),
    ],
    []
  );

  return (
    <>
      <CertificateDetailsDialog />
      <GenerateCertificateDialog />
      <DeleteCertificateDialog />
      <ConfirmChangesDialog />

      <Track justify="between">
        <Track direction="vertical" align="left">
          <h6>
            <TransTitle i18nKey="client" values={{ client: 'A' }} />
          </h6>
          <h1>
            <Trans i18nKey="title.clientCertificates" defaults="Certificates" />
          </h1>
        </Track>
        <Link
          to={ROUTES.CLIENT_SECRETS_DETAILS_ROUTE}
          params={{ secretId: 'create' }}
        >
          <Button appearance="primary">
            <TransButton i18nKey="generateCertificate" />
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
